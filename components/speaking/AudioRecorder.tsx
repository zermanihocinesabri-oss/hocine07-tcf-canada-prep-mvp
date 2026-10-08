"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Square,
  Trash2,
  AlertTriangle,
  Download,
  Save,
  FileAudio,
  CheckCircle2,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/scoring";
import { useAuth } from "@/lib/utils/authStore";
import { userScopedKey } from "@/lib/utils/userStorage";
import {
  isStoredRecordingArray,
  MAX_RECORDING_NAME_LENGTH,
  readJson,
  sanitizeText,
  StoredRecording,
} from "@/lib/utils/sanitize";
import { randomTokenB64url } from "@/lib/utils/password";

type RecorderState = "idle" | "recording" | "paused" | "recorded";

function readStored(key: string): StoredRecording[] {
  return readJson(key, isStoredRecordingArray, []);
}

function persist(key: string, recordings: StoredRecording[]) {
  try {
    localStorage.setItem(key, JSON.stringify(recordings));
    return true;
  } catch {
    return false;
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function pickMimeType(): string {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
  for (const type of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return "";
}

const MAX_LOCALSTORAGE_BYTES = 4_500_000; // marge sous la limite ~5 Mo de localStorage

export function AudioRecorder({
  recordingLabel = "Enregistrement",
}: {
  recordingLabel?: string;
}) {
  const { user } = useAuth();
  // Stockage lié au compte connecté : chaque utilisateur a ses enregistrements.
  const storageKey = userScopedKey("tcf-recordings", user?.id ?? null);

  const [state, setState] = useState<RecorderState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [savedRecordings, setSavedRecordings] = useState<StoredRecording[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSavedRecordings(readStored(storageKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    setError(null);
    setState("idle");
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "L'accès au micro n'est pas disponible sur votre navigateur (contexte non sécurisé ?)."
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.onerror = () => {
        setError("Une erreur est survenue lors de l'enregistrement.");
        setState("idle");
      };

      recorder.start();
      setState("recording");
      setDuration(0);
      intervalRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch (err) {
      setError(
        "Impossible d'accéder au micro. Vérifiez les autorisations de votre navigateur."
      );
    }
  }

  function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    mediaRecorderRef.current?.stop();
    setState("recorded");
  }

  function pauseRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState("paused");
    }
  }

  function resumeRecording() {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      intervalRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
      setState("recording");
    }
  }

  function resetRecording() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setDuration(0);
    setState("idle");
    setError(null);
  }

  function downloadRecording() {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `${recordingLabel.toLowerCase().replace(/\s+/g, "-")}.webm`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function saveToLocalStorage() {
    if (!audioUrl) return;
    setError(null);
    const blob = await (await fetch(audioUrl)).blob();
    const dataUrl = await blobToDataUrl(blob);
    const sizeBytes = dataUrl.length * 0.75; // approximation base64 ~ 4/3
    if (sizeBytes > MAX_LOCALSTORAGE_BYTES) {
      setError(
        "Enregistrement trop volumineux pour le stockage local du navigateur. Utilisez le bouton de téléchargement."
      );
      return;
    }
    const record: StoredRecording = {
      id: randomTokenB64url(12),
      name: sanitizeText(recordingLabel, MAX_RECORDING_NAME_LENGTH),
      createdAt: new Date().toISOString(),
      durationSeconds: duration,
      dataUrl,
    };
    const next = [record, ...savedRecordings];
    if (!persist(storageKey, next)) {
      setError(
        "Stockage local saturé. Supprimez d'anciens enregistrements ou téléchargez celui-ci."
      );
      return;
    }
    setSavedRecordings(next);
    setLastSaved(record.id);
  }

  function deleteRecording(id: string) {
    const next = savedRecordings.filter((r) => r.id !== id);
    setSavedRecordings(next);
    persist(storageKey, next);
    if (lastSaved === id) setLastSaved(null);
  }

  const minutes = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (duration % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface-50 p-6">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-colors",
            state === "recording"
              ? "bg-red-100 text-red-600"
              : state === "paused"
                ? "bg-amber-100 text-amber-600"
                : "bg-brand-100 text-brand-600"
          )}
        >
          <Mic
            size={30}
            className={cn(state === "recording" && "animate-pulse")}
          />
        </div>
        <div>
          <p className="font-mono text-2xl font-semibold text-surface-800">
            {minutes}:{seconds}
          </p>
          <p className="text-xs text-surface-400">
            {state === "recording"
              ? "Enregistrement en cours…"
              : state === "paused"
                ? "Enregistrement en pause."
                : state === "recorded"
                  ? "Enregistrement terminé."
                  : "Prêt à enregistrer"}
          </p>
        </div>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
          <AlertTriangle size={14} className="shrink-0" /> {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {state === "idle" && (
          <Button onClick={startRecording}>
            <Mic size={16} /> Démarrer l'enregistrement
          </Button>
        )}
        {state === "recording" && (
          <>
            <Button variant="secondary" onClick={pauseRecording}>
              <Pause size={16} /> Pause
            </Button>
            <Button variant="danger" onClick={stopRecording}>
              <Square size={16} /> Arrêter
            </Button>
          </>
        )}
        {state === "paused" && (
          <>
            <Button onClick={resumeRecording}>
              <Play size={16} /> Reprendre
            </Button>
            <Button variant="danger" onClick={stopRecording}>
              <Square size={16} /> Arrêter
            </Button>
          </>
        )}
        {state === "recorded" && audioUrl && (
          <>
            <Button onClick={downloadRecording}>
              <Download size={16} /> Télécharger
            </Button>
            <Button variant="secondary" onClick={saveToLocalStorage}>
              <Save size={16} /> Sauvegarder (local)
            </Button>
            <Button variant="ghost" onClick={resetRecording}>
              <Trash2 size={16} /> Recommencer
            </Button>
          </>
        )}
      </div>

      {audioUrl && (
        <audio controls src={audioUrl} className="h-10 w-full" />
      )}

      {lastSaved && (
        <p className="flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 size={14} /> Enregistrement sauvegardé dans votre navigateur.
        </p>
      )}

      {savedRecordings.length > 0 && (
        <div className="border-t border-surface-200 pt-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-surface-400">
            <FileAudio size={13} /> Mes enregistrements sauvegardés ({savedRecordings.length})
          </p>
          <ul className="space-y-2">
            {savedRecordings.map((r) => (
              <li key={r.id} className="flex items-center gap-3 rounded-xl bg-white p-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-surface-800">{r.name}</p>
                  <p className="text-[11px] text-surface-400">
                    {new Date(r.createdAt).toLocaleDateString("fr-CA")} ·{" "}
                    {Math.floor(r.durationSeconds / 60)}:
                    {(r.durationSeconds % 60).toString().padStart(2, "0")} min
                  </p>
                </div>
                <audio controls src={r.dataUrl} className="h-9 flex-1" />
                <a href={r.dataUrl} download={`${r.name.replace(/\s+/g, "-")}.webm`}>
                  <Button size="sm" variant="ghost">
                    <Download size={14} />
                  </Button>
                </a>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteRecording(r.id)}
                  aria-label="Supprimer l'enregistrement"
                >
                  <Trash2 size={14} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Badge className="w-fit bg-surface-100 text-surface-500">
        Audio traité localement : rien n'est envoyé à un serveur.
      </Badge>
    </div>
  );
}