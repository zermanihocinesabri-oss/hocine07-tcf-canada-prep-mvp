import Link from "next/link";
import { GraduationCap, Headphones, BookOpenText, Mic, PenLine, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Headphones,
    title: "Compréhension Orale",
    text: "QCM chronométrés avec correction instantanée et explications détaillées.",
  },
  {
    icon: BookOpenText,
    title: "Compréhension Écrite",
    text: "Textes authentiques et questions calibrées par niveau NCLC.",
  },
  {
    icon: PenLine,
    title: "Expression Écrite",
    text: "Éditeur avec compteur de mots, consignes officielles et grille d'évaluation.",
  },
  {
    icon: Mic,
    title: "Expression Orale",
    text: "Enregistrement vocal face à des sujets types, comme le jour de l'examen.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-lg font-bold text-surface-900">TCF Prep</span>
        </div>
        <Link href="/login">
          <Button variant="secondary">Se connecter</Button>
        </Link>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-16 text-center lg:py-24">
        <span className="mb-4 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
          Spécial immigration Canada
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-surface-900 lg:text-5xl">
          Préparez le TCF Canada avec confiance
        </h1>
        <p className="mt-4 max-w-xl text-base text-surface-600 lg:text-lg">
          Entraînez-vous aux 4 épreuves officielles, suivez votre progression NCLC et
          passez des examens blancs dans les conditions réelles.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/login">
            <Button size="lg">Créer un compte</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              J'ai déjà un compte
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title} className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <f.icon size={20} />
            </div>
            <h3 className="font-semibold text-surface-900">{f.title}</h3>
            <p className="text-sm text-surface-600">{f.text}</p>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Card className="flex flex-col items-center gap-4 bg-brand-600 py-10 text-center text-white">
          <Clock3 size={28} />
          <h2 className="text-2xl font-bold">Mode Examen Blanc</h2>
          <p className="max-w-lg text-brand-50">
            Enchaînez les 4 épreuves dans les conditions réelles et chronométrées du TCF
            Canada pour évaluer votre niveau global.
          </p>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
              Lancer un examen blanc
            </Button>
          </Link>
        </Card>
      </section>
    </main>
  );
}
