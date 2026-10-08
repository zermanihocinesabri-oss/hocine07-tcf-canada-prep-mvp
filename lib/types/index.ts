export type Skill = "CO" | "CE" | "EO" | "EE";

export type NclcLevel = "NCLC 4-6" | "NCLC 7" | "NCLC 8" | "NCLC 9" | "NCLC 10+";

// Niveaux du CECRL, du plus facile (A1) au plus avancé (C2)
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface SkillProgress {
  skill: Skill;
  label: string;
  progressPercent: number; // 0-100, avancement dans le programme d'entraînement
  estimatedLevel: NclcLevel;
  bestScoreOn699: number; // score TCF sur l'échelle 0-699 (CO/CE)
}

export interface TestAttempt {
  id: string;
  date: string; // ISO date
  type: "entrainement" | "examen-blanc";
  skill: Skill | "GLOBAL";
  scorePercent: number;
  nclcLevel: NclcLevel;
}

export interface QcmOption {
  id: string;
  text: string;
}

/** Accent oral du locuteur (métadonnée C2 — CO). */
export type SpeechAccent =
  | "accent-montrealais"
  | "accent-quebecois"
  | "accent-acadien"
  | "accent-francais"
  | "accent-neutre";

/** Débit de parole (métadonnée C2 — CO). */
export type SpeechSpeed = "lent" | "normal" | "rapide";

/** Entrée de lexique contextuel (CE — documents soutenus/idiomatiques). */
export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface QcmQuestion {
  id: string;
  skill: "CO" | "CE";
  level: CefrLevel;
  theme: string;
  sequence: string; // numéro de l'exercice dans la section réelle du TCF
  audioPrompt?: string; // description du script audio (simulation du fichier MP3)
  transcript?: string; // retranscription complète du script, révélée après la réponse
  passage?: string; // document support pour la compréhension écrite
  passageType?: string; // type de document : panneau, annonce, message, article...
  question: string;
  options: QcmOption[];
  correctOptionId: string;
  explanation: string; // correction détaillée : pourquoi la bonne réponse
  vocabularyNotes?: string[]; // lexique utile extrait du document
  difficulty: "facile" | "moyen" | "difficile";
  // ===== Métadonnées de maîtrise (items C2) =====
  /** Accent du locuteur — CO uniquement. */
  accent?: SpeechAccent;
  /** Débit de parole — CO uniquement. */
  speed?: SpeechSpeed;
  /** Écoute unique (mode officiel TCF) : l'audio n'est diffusé qu'une fois. */
  singleListen?: boolean;
  /** La bonne réponse exige une inférence au-delà du contenu littéral (implicite). */
  implicite?: boolean;
  /** Explication, par option erronée, de la raison pour laquelle le distracteur est faux. */
  distractorExplanations?: Record<string, string>;
  /** Lexique soutenu / idiomatique du document, avec définition contextuelle (CE). */
  glossary?: GlossaryEntry[];
  /** Couche de déduction logique exigée pour arriver à la bonne réponse (CE). */
  logicalDeduction?: string;
}

export interface EvaluationCriterion {
  label: string;
  description: string;
}

export interface WritingTask {
  id: string;
  taskNumber: 1 | 2 | 3;
  level: CefrLevel;
  title: string;
  type: "message" | "article" | "essai";
  prompt: string;
  situation: string; // contexte de la situation de communication réelle
  minWords: number;
  maxWords: number;
  timeLimitMinutes: number;
  modelAnswer: string; // corrigé type respectant les critères officiels
  modelAnswerAnalysis: string[]; // commentaire du corrigé : ce qui fait qu'il répond à la consigne
  evaluationCriteria: EvaluationCriterion[]; // grille officielle TCF
  vocabularyNotes?: string[]; // vocabulaire attendu / utile
}

export interface SpeakingTopic {
  id: string;
  taskNumber: 1 | 2 | 3;
  level: CefrLevel;
  theme: string;
  prompt: string;
  situation: string; // contexte pour la tâche 2 (interaction)
  prepTimeSeconds: number;
  speakTimeSeconds: number;
  samplePoints: string[]; // points clés du corrigé type à aborder à l'oral
  modelAnswer?: string; // exemple de production orale possible
  evaluationCriteria: EvaluationCriterion[]; // grille officielle TCF
  vocabularyNotes?: string[]; // vocabulaire utile pour le sujet
}

export interface ExamBlancSection {
  skill: Skill;
  label: string;
  durationMinutes: number;
}

export interface SavedRecording {
  id: string;
  name: string;
  createdAt: string; // ISO date
  durationSeconds: number;
  dataUrl: string; // audio encodé en base64 pour stockage localStorage
}

// ============================ PARCOURS D'APPRENTISSAGE ============================

export type CourseStepId = 1 | 2 | 3 | 4;

export interface TheorySection {
  heading: string;
  content: string[]; // paragraphes ou points
  tip?: string; // encadré « À retenir / Conseil »
  examples?: string[]; // exemples concrets
}

export type LessonExercise =
  | { kind: "quiz"; skill: "CO" | "CE"; level: CefrLevel; count?: number }
  | { kind: "writing"; level: CefrLevel; taskNumber: 1 | 2 | 3 }
  | { kind: "speaking"; level: CefrLevel; taskNumber: 1 | 2 | 3 };

export interface CourseLesson {
  id: string;
  step: CourseStepId;
  order: number; // position dans l'étape (1..n)
  title: string;
  objective: string; // objectif pédagogique
  level: CefrLevel; // niveau ciblé par la leçon
  durationMinutes: number; // temps de travail estimé
  theory: TheorySection[];
  exercise: LessonExercise;
  minScoreToPass: number; // % minimal pour valider la leçon (exercices notés)
}

export interface CourseStep {
  id: CourseStepId;
  skill: Skill;
  title: string;
  subtitle: string;
  icon?: "headphones" | "book" | "pen" | "mic";
  chapter: string; // intitulé pédagogique (ex: « Module 1 — Structures et repérage »)
  lessons: CourseLesson[];
}

// ============================ GRAMMAIRE & VOCABULAIRE THEMATIQUE ============================

/** Grandes catégories grammaticales ciblées B2/C1 (épreuves écrites et orales). */
export type GrammarCategoryId =
  | "hypotaxe"
  | "subordination"
  | "mise-en-relief"
  | "subjonctif"
  | "accords-participe"
  | "connecteurs";

export interface GrammarCategory {
  id: GrammarCategoryId;
  title: string;
  level: "B2" | "C1";
  description: string;
  /** clé d'icône lucide, résolue dans le composant d'affichage */
  icon: string;
}

export interface GrammarLesson {
  id: string;
  category: GrammarCategoryId;
  level: "B2" | "C1";
  order: number;
  title: string;
  summary: string;
  durationMinutes: number;
  sections: TheorySection[];
  /** pièges classiques au TCF, à éviter */
  traps?: string[];
  /** nombre de questions QCM d'application pour cette leçon */
  exerciseCount: number;
}

export interface VocabularyWord {
  word: string;
  /** traduction éclair (anglais), utile aux candidats */
  translation?: string;
  wordClass?: string;
  definition: string;
  example: string;
  /** mots de la même famille */
  family?: string[];
}

export interface VocabularyTheme {
  id: string;
  title: string;
  emoji: string;
  level: CefrLevel;
  description: string;
  words: VocabularyWord[];
}

// ============================ AIDE A LA REDACTION (EE) ============================

export interface ConnectorItem {
  text: string;
  example: string;
}

export interface ConnectorCategory {
  id: string;
  title: string;
  description: string;
  connectors: ConnectorItem[];
}

export interface WritingPlanSection {
  label: string;
  description: string;
  starters: string[];
}

export interface WritingPlan {
  taskNumber: 1 | 2 | 3;
  title: string;
  sections: WritingPlanSection[];
}

// ============================ AUTO-EVALUATION ORALE (EO) ============================

export type SelfCriterionKey = "aisance" | "lexique" | "grammaire" | "prononciation";

export interface SelfCriterionLevel {
  label: string;
  description: string;
}

export interface SelfCriterion {
  key: SelfCriterionKey;
  label: string;
  description: string;
  /** 4 niveaux descriptifs correspondant aux notes 1 à 4 */
  levels: SelfCriterionLevel[];
}

export interface OralSelfAssessment {
  id: string;
  topicId: string;
  date: string; // ISO
  scores: Record<SelfCriterionKey, number>; // 1..4
  comment?: string;
}

/** Catégorie de phrases utiles pour structurer une intervention orale. */
export interface OralPhraseCategory {
  id: string;
  title: string;
  phrases: string[];
}

// ============================ SIMULATEUR D'ORAL MESURÉ (EO) ============================

/** Échantillon de reconnaissance vocale (Web Speech API) à un instant donné. */
export interface SpeechSample {
  /** horodatage performance.now() en millisecondes */
  t: number;
  /** texte reconnu cumulé jusqu'à cet instant (interim ou final) */
  text: string;
}

/** Occurrence d'un marqueur d'hésitation (euh, heu, genre…). */
export interface FilledPauseInfo {
  token: string;
  count: number;
}

/** Silence long (> 1 s) repéré entre deux échantillons. */
export interface LongPause {
  start: number;
  end: number;
  duration: number; // secondes
}

/** Métriques objectives calculées à partir des échantillons reconnus. */
export interface OralMetrics {
  transcript: string;
  wordCount: number;
  elapsedSeconds: number;
  speechSeconds: number; // temps hors longues pauses
  wordsPerMinute: number;
  filledPauses: FilledPauseInfo[];
  longPauses: LongPause[];
  longestPauseSeconds: number;
  repeatedWordCount: number;
}

/** Les 6 critères de la grille d'évaluation officielle de l'expression orale. */
export type OralCriterionKey =
  | "task"
  | "fluency"
  | "cohesion"
  | "lexicon"
  | "grammar"
  | "pronunciation";

/** Auto-évaluation (note 1 à 5) par critère, pour une tâche. */
export type OralCriterionScores = Record<OralCriterionKey, number>;

/** Résultat d'une tâche orale simulée (métriques + notes auto-évaluées). */
export interface OralSimulationTaskRecord {
  taskNumber: 1 | 2 | 3;
  theme: string;
  metrics: OralMetrics;
  scores: OralCriterionScores;
}

/** Session complète de simulation orale (3 tâches), persistée en localStorage. */
export interface OralSimulationRecord {
  id: string;
  date: string; // ISO
  level: CefrLevel;
  tasks: OralSimulationTaskRecord[];
  averageScorePercent: number;
  nclc: NclcLevel;
  cefr: CefrLevel;
}

// ============================ SUIVI DE PROGRESSION ============================

export type AttemptKind = "leçon" | "entraînement" | "examen-blanc" | "évaluation";

export interface AttemptRecord {
  id: string;
  date: string; // ISO
  kind: AttemptKind;
  skill: Skill;
  label: string; // intitulé du test / de la leçon
  scorePercent: number;
}

export interface ProgressState {
  completedLessonIds: string[];
  attempts: AttemptRecord[];
}

// ============================ AUTHENTIFICATION & RÔLES ============================

export type UserRole = "admin" | "user";

/**
 * Compte utilisateur stocké localement (MVP).
 * Le mot de passe n'est JAMAIS stocké en clair : on conserve un hachage
 * SHA-256 + sel individuel (Web Crypto API).
 */
export interface AppUser {
  id: string;
  name: string;
  email: string; // normalisé en minuscules
  role: UserRole;
  passwordSalt: string; // base64 (sel aléatoire de 128 bits)
  passwordHash: string; // base64 — voir hashAlgo pour l'algorithme
  /** "pbkdf2" (actuel, PBKDF2-HMAC-SHA256) ou "sha256" (legacy, à migrer). */
  hashAlgo?: "pbkdf2" | "sha256";
  /** Itérations PBKDF2 utilisées (défaut : valeur de référence). */
  hashIterations?: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/** Session active de l'utilisateur connecté (localStorage). */
export interface UserSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string; // ISO
  expiresAt: string; // ISO
}

export interface Credentials {
  email: string;
  password: string;
}