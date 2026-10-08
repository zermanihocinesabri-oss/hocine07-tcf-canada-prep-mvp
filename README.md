# TCF Prep — Plateforme d'entraînement au TCF Canada (MVP)

Application web (Next.js 14 + TypeScript + Tailwind CSS) pour s'entraîner aux 4
épreuves officielles du TCF Canada : Compréhension Orale (CO), Compréhension
Écrite (CE), Expression Orale (EO) et Expression Écrite (EE).

## Démarrage rapide

```bash
npm install
npm run dev
```

Puis ouvrez http://localhost:3000

Pour une build de production :

```bash
npm run build
npm run start
```

## Stack technique

- **Next.js 14 (App Router)** — routage par dossiers, layouts imbriqués
- **TypeScript strict** — typage de bout en bout (`lib/types`)
- **Tailwind CSS** — palette personnalisée `brand` (bleu) et `surface` (gris),
  cf. `tailwind.config.ts`
- **lucide-react** — icônes
- Aucune base de données à ce stade : toutes les données (questions, sujets,
  historique) sont mockées dans `lib/data/` pour permettre un remplacement
  facile par une vraie API/BDD plus tard (voir "Prochaines étapes").

## Structure du projet

```
tcf-prep/
├── app/
│   ├── page.tsx                       # Landing page publique
│   ├── layout.tsx                     # Layout racine (HTML, fonts, meta)
│   ├── globals.css                    # Styles globaux Tailwind
│   └── (app)/                         # Groupe de routes "espace connecté"
│       ├── layout.tsx                 # Sidebar + Topbar + nav mobile
│       ├── dashboard/page.tsx         # Tableau de bord
│       ├── entrainement/
│       │   ├── comprehension-orale/page.tsx
│       │   ├── comprehension-ecrite/page.tsx
│       │   ├── expression-ecrite/page.tsx
│       │   └── expression-orale/page.tsx
│       └── examen-blanc/page.tsx      # Mode simulation réelle
│
├── components/
│   ├── ui/                Button, Card, Badge, ProgressBar (design system)
│   ├── layout/             Sidebar, Topbar, MobileNav
│   ├── dashboard/          SkillProgressCard, HistoryTable
│   ├── quiz/                QuizPlayer (QCM CO/CE), Timer
│   ├── writing/             WritingEditor (EE)
│   ├── speaking/            AudioRecorder, SpeakingSession (EO)
│   └── exam/                 ExamBlancRunner (orchestrateur des 4 épreuves)
│
└── lib/
    ├── types/index.ts       Types partagés (Skill, QcmQuestion, WritingTask...)
    ├── data/                Données mockées (questions, tâches, sujets, progression)
    └── utils/scoring.ts     Estimation NCLC + helpers (cn, badges)
```

## Fonctionnalités MVP livrées

1. **Tableau de bord** : progression globale (%), historique des tests,
   estimation NCLC par compétence (`app/(app)/dashboard`).
2. **Entraînement CO/CE** : QCM avec chronomètre par question (60s),
   correction instantanée et explication (`components/quiz/QuizPlayer.tsx`).
3. **Entraînement EE** : éditeur avec compteur de mots en temps réel,
   respect des consignes (min/max mots, type de tâche) et grille
   d'évaluation indicative (`components/writing/WritingEditor.tsx`).
4. **Entraînement EO** : enregistrement vocal via l'API `MediaRecorder` du
   navigateur, sujets classés par thème avec temps de préparation/parole
   (`components/speaking/`).
5. **Examen Blanc** : enchaîne CO → CE → EE → EO avec chronomètres et un
   écran de résultat global (`components/exam/ExamBlancRunner.tsx`).
6. **Design** : interface responsive (sidebar desktop / nav basse mobile),
   palette bleu/blanc/gris, composants réutilisables.

## Limites connues de ce MVP (assumées)

- Les questions, textes et sujets sont des exemples mockés en nombre limité —
  à remplacer par une vraie banque de contenus (fichier JSON, CMS ou API).
- L'estimation NCLC (`lib/utils/scoring.ts`) utilise un barème simplifié à
  but pédagogique, pas le barème officiel du TCF Canada.
- La correction de l'Expression Écrite et Orale est indicative (règles de
  comptage de mots) : pas encore de correction automatique par IA humaine.
- Pas de compte utilisateur ni de persistance : les données du tableau de
  bord sont statiques (`lib/data/progress.ts`).

## Prochaines étapes suggérées

1. **Authentification** (NextAuth.js ou Clerk) pour de vrais comptes utilisateurs.
2. **Base de données** (PostgreSQL + Prisma) pour persister scores, historique
   et enregistrements audio (stockage S3/Supabase Storage).
3. **Correction IA** de l'Expression Écrite/Orale via l'API Claude (grille de
   correction officielle TCF).
4. **Vraie banque de contenu audio** pour la Compréhension Orale (fichiers
   MP3 avec transcription et minutage).
5. **Paiement / plans** (Stripe) si le produit devient un SaaS payant.
