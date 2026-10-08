import { FilledPauseInfo, OralMetrics, SpeechSample } from "@/lib/types";

/**
 * Métriques de production orale dérivées des échantillons reconnus par la
 * Web Speech API (langue fr-CA). La reconnaissance ne fournissant pas
 * d'horodatage par segment, on enregistre un échantillon à chaque événement
 * « onresult » : { t : performance.now(), text : transcription cumulée }.
 *
 * Les longues pauses (> 1 s) sont estimées par les écarts entre deux
 * échantillons successifs — une approximation volontaire et pédagogique,
 * suffisante pour un indicateur de fluidité en entraînement.
 */

const WORDS_REGEX = /[a-zàâäéèêëîïôöùûüÿçœæ'-]+/gi;

const FILLER_PATTERN = /\b(?:euh|eum|hum|heu|ben|bah|genre|du coup|en fait)\b/g;

/** Durée (secondes) au-delà de laquelle un silence est compté comme pause longue. */
export const LONG_PAUSE_THRESHOLD_SECONDS = 1;

export function countWords(text: string): number {
  const matches = text.match(WORDS_REGEX);
  return matches ? matches.length : 0;
}

function collectFilledPauses(text: string): FilledPauseInfo[] {
  const counts = new Map<string, number>();
  for (const match of text.toLowerCase().matchAll(FILLER_PATTERN)) {
    const token = match[0];
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([token, count]) => ({ token, count }))
    .sort((a, b) => b.count - a.count);
}

function countImmediateRepeats(text: string): number {
  const words = (text.toLowerCase().match(WORDS_REGEX) ?? []).filter(
    (w) => w.length > 1
  );
  let repeats = 0;
  for (let i = 1; i < words.length; i++) {
    if (words[i] === words[i - 1]) repeats++;
  }
  return repeats;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Calcule les métriques à partir de la suite des échantillons de la tâche. */
export function computeOralMetrics(samples: SpeechSample[]): OralMetrics {
  const usable = samples.filter((s) => s.text.trim().length > 0);

  if (usable.length === 0) {
    return emptyMetrics();
  }

  const transcript = usable[usable.length - 1].text.trim();
  const wordCount = countWords(transcript);
  const elapsedSeconds = (usable[usable.length - 1].t - usable[0].t) / 1000;

  const longPauses = [];
  for (let i = 1; i < usable.length; i++) {
    const gap = (usable[i].t - usable[i - 1].t) / 1000;
    if (gap > LONG_PAUSE_THRESHOLD_SECONDS) {
      longPauses.push({
        start: usable[i - 1].t,
        end: usable[i].t,
        duration: round1(gap),
      });
    }
  }

  const pauseSeconds = longPauses.reduce((sum, p) => sum + p.duration, 0);
  const speechSeconds = Math.max(0, elapsedSeconds - pauseSeconds);
  const wordsPerMinute =
    speechSeconds > 0 ? Math.round((wordCount / speechSeconds) * 60) : 0;
  const longestPauseSeconds = longPauses.length
    ? Math.max(...longPauses.map((p) => p.duration))
    : 0;

  return {
    transcript,
    wordCount,
    elapsedSeconds: round1(elapsedSeconds),
    speechSeconds: round1(speechSeconds),
    wordsPerMinute,
    filledPauses: collectFilledPauses(transcript),
    longPauses,
    longestPauseSeconds: round1(longestPauseSeconds),
    repeatedWordCount: countImmediateRepeats(transcript),
  };
}

export function emptyMetrics(): OralMetrics {
  return {
    transcript: "",
    wordCount: 0,
    elapsedSeconds: 0,
    speechSeconds: 0,
    wordsPerMinute: 0,
    filledPauses: [],
    longPauses: [],
    longestPauseSeconds: 0,
    repeatedWordCount: 0,
  };
}

/** Agrège les métriques des tâches d'une session (affichage du récapitulatif global). */
export function mergeOralMetrics(list: OralMetrics[]): OralMetrics {
  if (list.length === 0) return emptyMetrics();

  const filledCounts = new Map<string, number>();
  for (const metrics of list) {
    for (const f of metrics.filledPauses) {
      filledCounts.set(f.token, (filledCounts.get(f.token) ?? 0) + f.count);
    }
  }
  const filledPauses: FilledPauseInfo[] = [...filledCounts.entries()]
    .map(([token, count]) => ({ token, count }))
    .sort((a, b) => b.count - a.count);

  const longPauses = list.flatMap((metrics) => metrics.longPauses);
  const wordCount = list.reduce((sum, m) => sum + m.wordCount, 0);
  const elapsedSeconds = list.reduce((sum, m) => sum + m.elapsedSeconds, 0);
  const speechSeconds = list.reduce((sum, m) => sum + m.speechSeconds, 0);
  const longestPauseSeconds = list.reduce(
    (max, m) => Math.max(max, m.longestPauseSeconds),
    0
  );

  return {
    transcript: list
      .map((m) => m.transcript)
      .filter(Boolean)
      .join(" "),
    wordCount,
    elapsedSeconds: round1(elapsedSeconds),
    speechSeconds: round1(speechSeconds),
    wordsPerMinute: speechSeconds > 0 ? Math.round((wordCount / speechSeconds) * 60) : 0,
    filledPauses,
    longPauses,
    longestPauseSeconds: round1(longestPauseSeconds),
    repeatedWordCount: list.reduce((sum, m) => sum + m.repeatedWordCount, 0),
  };
}