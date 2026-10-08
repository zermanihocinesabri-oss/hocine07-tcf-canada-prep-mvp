import { CefrLevel, NclcLevel } from "@/lib/types";
import { connectorCategories } from "@/lib/data/writingAid";

export type WritingCriterionId =
  | "consigne"
  | "structure"
  | "grammaire"
  | "lexique"
  | "orthographe";

export type IssueSeverity = "info" | "warning" | "error";

export interface CriterionVerdict {
  id: WritingCriterionId;
  label: string;
  weight: number;
  points: number;
  note: string;
  findings: string[];
}

export interface CorrectionIssue {
  id: string;
  criterion: WritingCriterionId;
  severity: IssueSeverity;
  message: string;
  suggestion?: string;
}

export interface WordCountStatus {
  words: number;
  minWords: number;
  maxWords: number;
  status: "ok" | "short" | "long";
}

export type PlanKind = "explicite" | "implicite" | "absent";

export interface StructureFinding {
  paragraphs: number;
  connectorTotal: number;
  connectorDensity: number;
  byCategory: { id: string; label: string; count: number }[];
  planKind: PlanKind;
  hasAntithesis: boolean;
  hasSynthesis: boolean;
  findings: string[];
}

export interface LexicalFinding {
  tokens: number;
  types: number;
  ttr: number;
  diversityLabel: "faible" | "moyenne" | "élevée" | "très élevée";
  c2Signals: string[];
  familiarMarkers: string[];
  anglicisms: { match: string; preferred: string }[];
}

export interface RegisterFinding {
  register: "soutenu" | "standard" | "mixte" | "familier";
  formalSignals: string[];
  familiarSignals: string[];
}

export interface CefrEstimate {
  cefr: CefrLevel;
  score699: number;
  nclc: NclcLevel;
  confidence: "haute" | "moyenne" | "faible";
}

export interface WritingCorrectionOptions {
  taskNumber: 1 | 2 | 3;
  minWords: number;
  maxWords: number;
}

export interface CorrectionResult {
  valid: boolean;
  wordCount: WordCountStatus;
  criteria: CriterionVerdict[];
  weightedScore20: number;
  cefr: CefrEstimate;
  issues: CorrectionIssue[];
  plan: StructureFinding;
  lexical: LexicalFinding;
  register: RegisterFinding;
}

const CRITERION_LABELS: Record<WritingCriterionId, string> = {
  consigne: "Consigne & traitement du sujet",
  structure: "Organisation & progression",
  grammaire: "Grammaire & syntaxe",
  lexique: "Lexique & registre",
  orthographe: "Orthographe & ponctuation",
};

const CRITERION_WEIGHTS: Record<WritingCriterionId, number> = {
  consigne: 0.25,
  structure: 0.2,
  grammaire: 0.25,
  lexique: 0.2,
  orthographe: 0.1,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

const LETTER_TOKEN_RE = /[\p{L}\p{N}]+(?:['’\-\p{L}\p{N}]+)*/gu;

export function countFrenchWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function letterTokens(text: string): string[] {
  return (text.match(LETTER_TOKEN_RE) ?? []).map((t) => t.toLowerCase());
}

function escapeRe(phrase: string): string {
  return phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countRegex(re: RegExp, text: string): number {
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const r = new RegExp(re.source, flags);
  let n = 0;
  let m: RegExpExecArray | null;
  while ((m = r.exec(text)) !== null) {
    n++;
    if (m.index === r.lastIndex) r.lastIndex++;
  }
  return n;
}

type ConnectorMap = Map<string, string>;

function buildConnectorMap(): ConnectorMap {
  const map: ConnectorMap = new Map();
  for (const cat of connectorCategories) {
    for (const c of cat.connectors) {
      const parts = c.text
        .split(/[\/+]/)
        .map((s) => s.replace(/\s*\.\.\.\s*\+?\s*$/, "").replace(/,$/, "").trim().toLowerCase())
        .filter(Boolean);
      for (const p of parts) {
        if (p.includes("...")) continue;
        if (/\+ (subjonctif|nom|indicatif)/.test(p)) continue;
        map.set(p, cat.id);
      }
    }
  }
  const circuitBreaker: Record<string, string> = {
    "au final": "conclusion",
    "en résumé": "conclusion",
    "pour conclure": "conclusion",
    "en conclusion": "conclusion",
    "en définitive": "conclusion",
    "en somme": "conclusion",
    "certes": "concession",
    "pourtant": "opposition",
    "et pourtant": "opposition",
    "or": "opposition",
    "en dépit de": "concession",
    "quoi qu'il en soit": "concession",
    "tout d'abord": "structure",
    "d'abord": "structure",
    "ensuite": "structure",
    "enfin": "structure",
    "premièrement": "structure",
    "deuxièmement": "structure",
    "troisièmement": "structure",
    "dans un premier temps": "structure",
    "dans un second temps": "structure",
    "d'une part": "structure",
    "d'autre part": "structure",
  };
  for (const [k, v] of Object.entries(circuitBreaker)) {
    map.set(k, v);
  }
  return map;
}

const CONNECTOR_MAP = buildConnectorMap();
const CONNECTOR_CATEGORY_LABELS: Record<string, string> = {
  addition: "Addition",
  opposition: "Opposition",
  cause: "Cause",
  consequence: "Conséquence",
  but: "But",
  concession: "Concession",
  exemple: "Illustration",
  conclusion: "Conclusion",
  structure: "Plan",
};

const PLAN_MARKERS = [
  "d'une part",
  "d'autre part",
  "premièrement",
  "deuxièmement",
  "troisièmement",
  "en premier lieu",
  "en second lieu",
  "en troisième lieu",
  "tout d'abord",
  "dans un premier temps",
  "dans un second temps",
  "dans un dernier temps",
  "ensuite",
  "pour conclure",
  "en conclusion",
  "en définitive",
  "en somme",
  "au final",
  "en résumé",
];

const FORMAL_SIGNALS = [
  "au demeurant",
  "néanmoins",
  "toutefois",
  "en revanche",
  "par ailleurs",
  "de surcroît",
  "qui plus est",
  "à l'aune de",
  "au regard de",
  "force est de constater",
  "il convient de",
  "il importe de",
  "cela étant",
  "en l'occurrence",
  "pour ma part",
  "quant à",
  "d'aucuns",
  "en définitive",
  "en somme",
  "dès lors",
  "par conséquent",
  "au vu de",
  "à cet égard",
  "d'ores et déjà",
  "à toutes fins utiles",
  "nonobstant",
  "in fine",
  "en dernier ressort",
  "à n'en point douter",
  "indubitablement",
  "s'agissant de",
  "eu égard à",
  "en dépit de",
  "sous l'égide de",
];

const FAMILIAR_MARKERS = [
  "du coup",
  "en mode",
  "en vrai",
  "n'importe quoi",
  "beaucoup trop",
  "vachement",
  "carrément",
  "tranquille",
  "top",
  "bof",
  "grave",
  "truc",
  "machin",
  "bidule",
  "super",
  "cool",
];

const C2_SIGNALS = [
  "abonder",
  "accréditer",
  "aiguiser",
  "amorcer",
  "étayer",
  "corroborer",
  "inférer",
  "postuler",
  "articuler",
  "conforter",
  "étoffer",
  "fructueux",
  "structurant",
  "vertueux",
  "substantiel",
  "plausible",
  "susceptible",
  "indubitable",
  "réfractaire",
  "propice",
  "fédérateur",
  "paradigme",
  "dichotomie",
  "dialectique",
  "heuristique",
  "prisme",
  "oscillation",
  "injonction",
  "corollaire",
  "immanent",
  "essor",
  "inopinément",
  "concomitant",
  "laconique",
  "péremptoire",
  "sceptique",
  "a fortiori",
  "a contrario",
  "en l'espèce",
];

const ANGLICISMS: { match: string; preferred: string }[] = [
  { match: "deadline", preferred: "échéance" },
  { match: "feedback", preferred: "retour / retour d'expérience" },
  { match: "workshop", preferred: "atelier" },
  { match: "backup", preferred: "sauvegarde" },
  { match: "briefing", preferred: "séance d'information" },
  { match: "meeting", preferred: "réunion" },
  { match: "best practices", preferred: "bonnes pratiques" },
  { match: "to-do", preferred: "liste de tâches" },
  { match: "en lien avec", preferred: "en rapport avec / relativement à" },
  { match: "job", preferred: "emploi / poste" },
  { match: "leader", preferred: "dirigeant / meneur" },
];

interface GrammarSignal {
  id: string;
  re: RegExp;
  label: string;
}

const COMPLEX_SIGNALS: GrammarSignal[] = [
  {
    id: "relatif-compose",
    re: /\b(dont|auquel|à laquelle|auxquels|auxquelles|lequel|laquelle|lesquels|lesquelles|duquel|de laquelle)\b/gi,
    label: "pronom relatif complexe",
  },
  {
    id: "gerondif",
    re: /\ben\s+\p{L}+ant\b/giu,
    label: "gérondif",
  },
  {
    id: "conditionnel-politesse",
    re: /\b(aurait|serait|pourrait|devrait|conviendrait|faudrait|pourrait bien)\b/gi,
    label: "conditionnel de modération",
  },
  {
    id: "incise",
    re: /\b(semble-t-il|à l'en croire|si l'on en croit|pour ainsi dire|je dirais même)\b/gi,
    label: "incise de précision",
  },
  {
    id: "euphonie",
    re: /\bl'on\b/gi,
    label: "euphonie « l'on »",
  },
  {
    id: "tournure-soutenue",
    re: /\b(s'agissant de|eu égard à|nonobstant|au demeurant|à l'aune de|force est de constater|fût-ce)\b/gi,
    label: "tournure soutenue",
  },
];

const SUBJUNCTIVE_TRIGGERS = [
  "pour que",
  "afin que",
  "bien que",
  "quoique",
  "à condition que",
  "avant que",
  "jusqu'à ce que",
  "sans que",
  "à moins que",
  "en admettant que",
  "il faut que",
  "il importe que",
  "il convient que",
  "il est essentiel que",
  "il est indispensable que",
  "il est nécessaire que",
  "encore faut-il que",
  "pourvu que",
  "souhaitons que",
  "on souhaite que",
];

const SUBJUNCTIVE_RE = new RegExp(
  `\\b(${SUBJUNCTIVE_TRIGGERS.map(escapeRe).join("|")})\\b`,
  "gi"
);

interface GrammarRule {
  id: string;
  re: RegExp;
  severity: IssueSeverity;
  criterion: WritingCriterionId;
  message: string;
  suggestion: string;
}

const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: "quelque-soit",
    re: /\bquelque\s+soi(?:t|e)\b/gi,
    severity: "error",
    criterion: "grammaire",
    message: "« quelque soit » s'écrit « quel que soit » : l'adverbe « quel » s'accorde avec le sujet.",
    suggestion: "quel que soit / quels que soient / quelle que soit",
  },
  {
    id: "malgre-que",
    re: /\bmalgré\s+que\b/gi,
    severity: "warning",
    criterion: "grammaire",
    message: "« malgré que » est rejeté du registre soutenu. On emploie « bien que + subjonctif » ou « malgré + nom ».",
    suggestion: "bien que… / malgré le fait que…",
  },
  {
    id: "quand-a",
    re: /\bquand\s+à\b/gi,
    severity: "error",
    criterion: "grammaire",
    message: "Pour introduire un sujet (« en ce qui concerne »), on écrit « quant à », sans d.",
    suggestion: "quant à / quant aux",
  },
  {
    id: "au-jour-d-aujourdhui",
    re: /\bau\s+jour\s+d'aujourd'hui\b/gi,
    severity: "info",
    criterion: "lexique",
    message: "Pléonasme : « aujourd'hui » suffit dans un essai de maîtrise.",
    suggestion: "aujourd'hui / de nos jours",
  },
  {
    id: "par-contre",
    re: /\bpar\s+contre\b/gi,
    severity: "info",
    criterion: "lexique",
    message: "« Par contre » reste mal vu à l'écrit argumentatif de haut niveau.",
    suggestion: "en revanche / en contrepartie",
  },
  {
    id: "apres-que",
    re: /\baprès\s+que\b/gi,
    severity: "info",
    criterion: "grammaire",
    message: "Le français soigné impose l'indicatif après « après que » (le subjonctif y est toléré mais jugé relâché).",
    suggestion: "après que + indicatif",
  },
  {
    id: "du-fait-de-que",
    re: /\bdu\s+fait\s+de\s+que\b/gi,
    severity: "error",
    criterion: "grammaire",
    message: "« du fait de » se construit avec un nom ; pour une proposition, on dit « du fait que ».",
    suggestion: "du fait que / du fait de + nom",
  },
  {
    id: "afin-de-que",
    re: /\bafin\s+de\s+que\b/gi,
    severity: "error",
    criterion: "grammaire",
    message: "« afin que » se construit directement (sans « de ») avec le subjonctif.",
    suggestion: "afin que",
  },
  {
    id: "autant-pour-moi",
    re: /\bautant\s+pour\s+moi\b/gi,
    severity: "warning",
    criterion: "orthographe",
    message: "L'expression correcte est « au temps pour moi ».",
    suggestion: "au temps pour moi",
  },
  {
    id: "plus-mieux",
    re: /\bplus\s+mieux\b/gi,
    severity: "warning",
    criterion: "grammaire",
    message: "« plus mieux » est un double comparatif incorrect.",
    suggestion: "mieux",
  },
  {
    id: "comme-meme",
    re: /\bcomme\s+même\b/gi,
    severity: "error",
    criterion: "orthographe",
    message: "« comme même » n'existe pas : on écrit « quand même ».",
    suggestion: "quand même",
  },
];

const ACCENTLESS_WORDS = ["etre", "etes", "ete"];

function countOccurrences(text: string, phrase: string): number {
  const re = new RegExp(`\\b${escapeRe(phrase)}\\b`, "gi");
  return countRegex(re, text);
}

function presentSignals(text: string, signals: string[], max: number): string[] {
  const found: string[] = [];
  for (const s of signals) {
    if (found.length >= max) break;
    const re = new RegExp(`\\b${escapeRe(s)}\\b`, "i");
    if (re.test(text)) found.push(s);
  }
  return found;
}

function buildStructure(text: string): StructureFinding {
  const lower = ` ${text.toLowerCase()} `;
  const byCategory = new Map<string, number>();
  let connectorTotal = 0;
  for (const [phrase, category] of CONNECTOR_MAP.entries()) {
    const count = countOccurrences(lower, phrase);
    if (count > 0) {
      byCategory.set(category, (byCategory.get(category) ?? 0) + count);
      connectorTotal += count;
    }
  }
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const paragraphs = Math.max(1, blocks.length);
  const words = countFrenchWords(text);
  const connectorDensity = words > 0 ? (connectorTotal / words) * 100 : 0;
  const markerCount = PLAN_MARKERS.reduce(
    (acc, m) => acc + countOccurrences(lower, m),
    0
  );
  const hasAntithesis =
    (byCategory.get("opposition") ?? 0) > 0 || (byCategory.get("concession") ?? 0) > 0;
  const hasSynthesis = (byCategory.get("conclusion") ?? 0) > 0;
  const planKind: PlanKind =
    markerCount >= 2 ? "explicite" : hasAntithesis || hasSynthesis ? "implicite" : "absent";

  const findings: string[] = [];
  findings.push(
    planKind === "explicite"
      ? "Plan annoncé : les charnières de progression sont visibles."
      : planKind === "implicite"
        ? "Plan implicite : l'opposition ou la synthèse structure le propos sans être annoncée."
        : "Aucune charnière de plan détectée : le texte risque de juxtaposer les idées."
  );
  findings.push(
    connectorTotal >= 6
      ? `${connectorTotal} connecteurs logiques : réseau argumentatif dense.`
      : connectorTotal >= 3
        ? `${connectorTotal} connecteurs logiques : réseau correct mais à densifier pour le C2.`
        : `Seulement ${connectorTotal} connecteur(s) : la progression logique n'est pas balisée.`
  );
  findings.push(
    paragraphs >= 3
      ? "Paragraphes distincts, unité de sens respectée."
      : paragraphs === 2
        ? "Deux blocs seulement : découpez intro/développement/conclusion."
        : "Texte en un seul bloc : le correcteur perçoit un manque de structuration."
  );

  return {
    paragraphs,
    connectorTotal,
    connectorDensity: round1(connectorDensity),
    byCategory: Array.from(byCategory.entries())
      .map(([id, count]) => ({
        id,
        label: CONNECTOR_CATEGORY_LABELS[id] ?? id,
        count,
      }))
      .sort((a, b) => b.count - a.count),
    planKind,
    hasAntithesis,
    hasSynthesis,
    findings,
  };
}

function buildLexical(text: string): LexicalFinding {
  const tokens = letterTokens(text);
  const types = new Set(tokens);
  const ttr = tokens.length > 0 ? types.size / tokens.length : 0;
  const diversityLabel =
    ttr >= 0.5
      ? "très élevée"
      : ttr >= 0.44
        ? "élevée"
        : ttr >= 0.38
          ? "moyenne"
          : "faible";

  const c2Signals = presentSignals(text, C2_SIGNALS, 6);
  const familiarMarkers = presentSignals(text, FAMILIAR_MARKERS, 6);
  const anglicisms = ANGLICISMS.filter((a) =>
    new RegExp(`\\b${escapeRe(a.match)}\\b`, "gi").test(text)
  ).slice(0, 6);

  return {
    tokens: tokens.length,
    types: types.size,
    ttr: round1(ttr),
    diversityLabel,
    c2Signals,
    familiarMarkers,
    anglicisms,
  };
}

function buildRegister(text: string): RegisterFinding {
  const formal = presentSignals(text, FORMAL_SIGNALS, 8);
  const familiar = presentSignals(text, FAMILIAR_MARKERS, 8);
  const register: RegisterFinding["register"] =
    familiar.length > 0
      ? formal.length > 0
        ? "mixte"
        : "familier"
      : formal.length >= 2
        ? "soutenu"
        : "standard";
  return { register, formalSignals: formal, familiarSignals: familiar };
}

function wordCountStatus(text: string, minWords: number, maxWords: number): WordCountStatus {
  const words = countFrenchWords(text);
  const status: WordCountStatus["status"] =
    words < minWords ? "short" : words > maxWords ? "long" : "ok";
  return { words, minWords, maxWords, status };
}

function evaluateConsigne(
  taskNumber: 1 | 2 | 3,
  text: string,
  wc: WordCountStatus
): { points: number; note: string; findings: string[]; issues: CorrectionIssue[] } {
  const findings: string[] = [];
  const issues: CorrectionIssue[] = [];
  let bonus = 0;

  if (wc.status === "short") {
    issues.push({
      id: "consigne-court",
      criterion: "consigne",
      severity: "error",
      message: `Texte trop court (${wc.words} mots, minimum ${wc.minWords}). Au TCF, une copie sous le minimum n'est pas corrigée.`,
    });
    findings.push(`Longueur : ${wc.words} / ${wc.minWords} mots minimum — consigne non respectée.`);
  } else if (wc.status === "long") {
    issues.push({
      id: "consigne-long",
      criterion: "consigne",
      severity: "warning",
      message: `Texte de ${wc.words} mots pour un maximum de ${wc.maxWords} : pénalité sur le respect de la consigne.`,
    });
    findings.push(`Longueur : ${wc.words} / ${wc.maxWords} mots maximum — à densifier ou resserrer.`);
  } else {
    findings.push(`Longueur officielle respectée : ${wc.words} mots (${wc.minWords}–${wc.maxWords}).`);
  }

  if (taskNumber === 1) {
    const salutation = countOccurrences(text, "madame") + countOccurrences(text, "monsieur") +
      countOccurrences(text, "bonjour") + countOccurrences(text, "à l'attention");
    if (salutation > 0) {
      bonus += 2;
      findings.push("Formule d'adresse présente (register professionnel).");
    } else {
      issues.push({
        id: "t1-ouverture",
        criterion: "consigne",
        severity: "warning",
        message: "Pas de formule d'adresse, attendue dans un courrier officiel.",
        suggestion: "« Madame, Monsieur, » ou « Bonjour Monsieur, »",
      });
    }
    const closing =
      countOccurrences(text, "cordialement") > 0 ||
      countOccurrences(text, "veuillez agréer") > 0 ||
      countOccurrences(text, "sincères salutations") > 0 ||
      countOccurrences(text, "bien à vous") > 0;
    if (closing) {
      bonus += 2;
      findings.push("Formule de clôture conforme à l'usage épistolaire.");
    } else {
      issues.push({
        id: "t1-cloture",
        criterion: "consigne",
        severity: "warning",
        message: "Formule de clôture absente ou peu adaptée.",
        suggestion: "« Cordialement, » / « Veuillez agréer mes salutations. »",
      });
    }
    const context =
      countOccurrences(text, "votre demande") > 0 ||
      countOccurrences(text, "votre message") > 0 ||
      countOccurrences(text, "suite à") > 0 ||
      countOccurrences(text, "vous me demandez") > 0 ||
      countOccurrences(text, "en réponse à") > 0;
    if (context) {
      bonus += 2;
      findings.push("Contexte de la demande rappelé en ouverture.");
    } else {
      findings.push("Contexte non rappelé : précisez l'objet de votre réponse.");
    }
    const vouvoiement = countRegex(/\b(votre|vos|vous)\b/gi, text);
    if (vouvoiement >= 2) {
      bonus += 2;
      findings.push("Vouvoiement maintenu, ton de service adapté.");
    } else {
      issues.push({
        id: "t1-vouvoiement",
        criterion: "consigne",
        severity: "info",
        message: "Vouvoiement peu présent : assurez la cohérence du ton.",
      });
    }
  } else if (taskNumber === 2) {
    const firstPerson = countRegex(
      /\b(je\s+(pense|trouve|préfère|veux|crois))\b|\bà mon avis\b|\bmoi,?\s+je\b/gi,
      text
    );
    if (firstPerson > 0) {
      const penalty = Math.min(4, firstPerson * 2);
      bonus -= penalty;
      issues.push({
        id: "t2-objectivite",
        criterion: "consigne",
        severity: "warning",
        message:
          "Un compte-rendu ou un article de presse reste objectif : l'opinion directe (« je pense… ») contredit le registre attendu.",
        suggestion: "Préférez : « il ressort que… », « les données montrent que… »",
      });
      findings.push(`Subjectivité détectée (${firstPerson} marqueur(s) de la 1re personne) : −${penalty} pts.`);
    } else {
      findings.push("Ton objectif : aucune impression personnelle directe.");
    }
    const data =
      countOccurrences(text, "selon") > 0 ||
      countOccurrences(text, "les données") > 0 ||
      countOccurrences(text, "enquête") > 0 ||
      countOccurrences(text, "sondage") > 0 ||
      countOccurrences(text, "étude") > 0 ||
      /%/.test(text);
    if (data) {
      bonus += 3;
      findings.push("Ancrage dans des données chiffrées ou recensées (exigence du compte-rendu).");
    } else {
      issues.push({
        id: "t2-donnees",
        criterion: "consigne",
        severity: "info",
        message: "Aucune donnée, référence ou exemple chiffré repéré : l'habillage journalistique manque.",
      });
    }
    const conclusion = /(pour conclure|en conclusion|en somme|en définitive|au final|en synthèse|il ressort)/i.test(
      text
    );
    if (conclusion) {
      bonus += 2;
      findings.push("Conclusion de synthèse présente.");
    } else {
      issues.push({
        id: "t2-conclusion",
        criterion: "consigne",
        severity: "info",
        message: "Pas de phrase de conclusion observée, obligatoire pour clore un article.",
        suggestion: "« Pour conclure, il ressort que… »",
      });
    }
  } else {
    const position =
      countOccurrences(text, "il me semble") > 0 ||
      countOccurrences(text, "pour ma part") > 0 ||
      countOccurrences(text, "je suis convaincu") > 0 ||
      countOccurrences(text, "quant à moi") > 0 ||
      countOccurrences(text, "j'estime") > 0 ||
      countOccurrences(text, "je considère") > 0 ||
      countOccurrences(text, "je maintiens") > 0;
    if (position) {
      bonus += 2;
      findings.push("Position personnelle clairement annoncée.");
    } else {
      issues.push({
        id: "t3-position",
        criterion: "consigne",
        severity: "warning",
        message: "La thèse n'est pas posée de manière explicite : énoncez d'emblée votre position.",
        suggestion: "« J'estime que… », « Pour ma part, je maintiens que… »",
      });
    }
    const antithesis =
      countOccurrences(text, "certes") > 0 ||
      countOccurrences(text, "cependant") > 0 ||
      countOccurrences(text, "en revanche") > 0 ||
      countOccurrences(text, "on pourrait objecter") > 0 ||
      countOccurrences(text, "néanmoins") > 0 ||
      countOccurrences(text, "toutefois") > 0;
    if (antithesis) {
      bonus += 3;
      findings.push("Antithèse / contre-argument envisagé : la nuance distingue le C2 du B2.");
    } else {
      issues.push({
        id: "t3-antithese",
        criterion: "consigne",
        severity: "info",
        message:
          "Pas de contre-argument visible. Le C2 exige de nuancer la thèse (concession puis retour à sa position).",
        suggestion: "« Certes, on peut objecter que… ; cependant… »",
      });
    }
    const synthesis = /(en conclusion|en définitive|en somme|pour conclure|au final|il ressort|en fin de compte)/i.test(
      text
    );
    if (synthesis) {
      bonus += 3;
      findings.push("Synthèse conclusive adossée à la thèse initiale.");
    } else {
      issues.push({
        id: "t3-synthese",
        criterion: "consigne",
        severity: "warning",
        message: "Conclusion absente ou trop abrupte.",
        suggestion: "« En définitive, la balance penche en faveur de… »",
      });
    }
  }

  const base = wc.status === "ok" ? 14 : 5;
  const points = clamp(base + bonus, 0, 20);
  const note =
    wc.status === "ok"
      ? `Consigne traitée, note ${points}/20.`
      : "Consigne non respectée sur la longueur : la copie est hors barème officiel.";
  return { points, note, findings, issues };
}

function evaluateStructure(plan: StructureFinding): { points: number; note: string } {
  let pts = 1;
  if (plan.planKind === "explicite") pts += 5;
  else if (plan.planKind === "implicite") pts += 3;
  if (plan.connectorDensity >= 5) pts += 8;
  else if (plan.connectorDensity >= 3.5) pts += 6;
  else if (plan.connectorDensity >= 2) pts += 4;
  else if (plan.connectorDensity >= 1) pts += 2.5;
  else pts += 1;
  pts += plan.paragraphs >= 3 ? 3 : plan.paragraphs === 2 ? 2 : 1;
  const points = clamp(Math.round(pts), 0, 20);
  const note =
    plan.planKind === "explicite"
      ? `Progression structurée (${plan.connectorTotal} connecteurs, ${plan.paragraphs} paragraphes).`
      : plan.paragraphs < 3
        ? "Texte peu segmenté : la progression n'est pas lisible d'un coup d'œil."
        : "Structure présente mais charnières à rendre plus visibles.";
  return { points, note };
}

function evaluateGrammar(
  text: string,
  tokensCount: number,
  issues: CorrectionIssue[]
): { points: number; note: string; findings: string[] } {
  const findings: string[] = [];
  if (tokensCount < 40) {
    return {
      points: 8,
      note: "Corpus trop court pour juger la grammaire avec fiabilité.",
      findings: ["Texte trop court : pas d'analyse grammaticale concluante."],
    };
  }
  const complexFound: string[] = [];
  for (const s of COMPLEX_SIGNALS) {
    if (countRegex(s.re, text) > 0) complexFound.push(s.label);
  }
  if (countRegex(SUBJUNCTIVE_RE, text) > 0) complexFound.push("subjonctif");
  const complexBonus = Math.min(4, complexFound.length);

  let deductions = 0;
  for (const rule of GRAMMAR_RULES) {
    const n = countRegex(rule.re, text);
    if (n === 0) continue;
    if (rule.severity === "error") deductions += 4;
    else if (rule.severity === "warning") deductions += 2;
    else deductions += 1;
    issues.push({
      id: rule.id,
      criterion: rule.criterion,
      severity: rule.severity,
      message: rule.message,
      suggestion: rule.suggestion,
    });
  }
  const points = clamp(12 + complexBonus - deductions, 0, 20);
  const note =
    points >= 16
      ? "Syntaxe riche et contrôlée : subordination complexe, modes maniés avec aisance."
      : points >= 12
        ? "Syntaxe globalement correcte mais quelques risques à lever pour viser le C2."
        : "Des écarts de flexion ou de construction pèsent sur la clarté de la démonstration.";
  findings.push(
    complexFound.length > 0
      ? `Tournures de haut niveau détectées : ${complexFound.slice(0, 5).join(", ")}.`
      : "Aucune structure complexe repérée : enrichissez la syntaxe (subordonnées, gérondif, incises)."
  );
  return { points, note, findings };
}

function evaluateLexique(
  lexical: LexicalFinding,
  issues: CorrectionIssue[]
): { points: number; note: string; findings: string[] } {
  const findings: string[] = [];
  let pts = 12;
  if (lexical.ttr >= 0.5) pts += 3;
  else if (lexical.ttr >= 0.44) pts += 2;
  else if (lexical.ttr >= 0.38) pts += 1;
  if (lexical.c2Signals.length >= 3) pts += 2;
  else if (lexical.c2Signals.length >= 1) pts += 1;
  pts -= Math.min(4, lexical.familiarMarkers.length * 2);
  pts -= Math.min(3, lexical.anglicisms.length);

  if (lexical.familiarMarkers.length > 0) {
    issues.push({
      id: "lexique-familier",
      criterion: "lexique",
      severity: "warning",
      message: `Marques d'oralité ou de registre familier : ${lexical.familiarMarkers.slice(0, 4).join(", ")}.`,
      suggestion: "Remplacer par des formules soutenues équivalentes.",
    });
  }
  if (lexical.anglicisms.length > 0) {
    issues.push({
      id: "lexique-anglicismes",
      criterion: "lexique",
      severity: "info",
      message: `Anglicismes détectés : ${lexical.anglicisms.map((a) => a.match).slice(0, 4).join(", ")}.`,
      suggestion: "Privilégier les équivalents français.",
    });
  }

  const points = clamp(pts, 0, 20);
  const note =
    points >= 16
      ? "Lexique riche, précis et diversifié : la palette abstraite du C2 est présente."
      : points >= 12
        ? "Lexique correct ; encore trop de vocabulaire générique pour le niveau de maîtrise."
        : "Lexique courant dominant : élevez le registre (abstraction, précision, abstraction du sens).";
  findings.push(
    `Diversité lexicale ${lexical.diversityLabel} (TTR ${lexical.ttr.toFixed(2)} sur ${lexical.tokens} mots).`
  );
  if (lexical.c2Signals.length > 0) {
    findings.push(`Signaux de lexique avancé : ${lexical.c2Signals.slice(0, 5).join(", ")}.`);
  }
  if (lexical.familiarMarkers.length > 0) {
    findings.push(`Marques de registre à corriger : ${lexical.familiarMarkers.slice(0, 5).join(", ")}.`);
  }
  return { points, note, findings };
}

function evaluateOrthographe(text: string, tokensCount: number): { points: number; note: string; findings: string[] } {
  const findings: string[] = [];
  if (tokensCount < 40) {
    return {
      points: 8,
      note: "Corpus trop court pour un contrôle fiable de l'orthographe.",
      findings: ["Contrôle orthographique non concluant (texte court)."],
    };
  }
  let deduction = 0;
  const doubleSpace = countRegex(/\s{2,}/g, text);
  if (doubleSpace > 0) deduction += 2;
  const lowerAfterPunct = countRegex(/([.!?])\s+[a-zàâäéèêëîïôöùûüç]/g, text);
  if (lowerAfterPunct > 0) deduction += 2;
  const repeatedWord = countRegex(/\b(\p{L}{4,})\b\s+\1\b/giu, text);
  if (repeatedWord > 0) deduction += 3;
  let accentless = 0;
  const lower = ` ${text.toLowerCase()} `;
  for (const w of ACCENTLESS_WORDS) {
    accentless += countRegex(new RegExp(`\\b${w}\\b`, "g"), lower);
  }
  if (accentless > 0) deduction += 2;

  const points = clamp(14 - deduction, 0, 20);
  const note =
    points >= 16
      ? "Propreté orthographique satisfaisante (contrôle par règles, sans dictionnaire complet)."
      : "Des coquilles d'orthographe ou de ponctuation affaiblissent la crédibilité de la copie.";
  if (accentless > 0) {
    findings.push(`${accentless} mot(s) sans accents : les accents sont attendus au C2.`);
  }
  if (repeatedWord > 0) {
    findings.push("Mot répété à l'identique : signe de relecture incomplète.");
  }
  if (lowerAfterPunct > 0) {
    findings.push("Majuscules absentes après la ponctuation forte.");
  }
  findings.push("Indices calculés localement : la réécriture C2 fournie sert de modèle sans faute.");
  return { points, note, findings };
}

export function analyzeWriting(text: string, options: WritingCorrectionOptions): CorrectionResult {
  const wc = wordCountStatus(text, options.minWords, options.maxWords);
  const tokensCount = letterTokens(text).length;
  const valid = wc.words > 0;

  if (!valid) {
    const emptyCriteria: CriterionVerdict[] = (
      Object.keys(CRITERION_LABELS) as WritingCriterionId[]
    ).map((id) => ({
      id,
      label: CRITERION_LABELS[id],
      weight: CRITERION_WEIGHTS[id],
      points: 0,
      note: "Aucune copie à analyser.",
      findings: [],
    }));
    return {
      valid: false,
      wordCount: wc,
      criteria: emptyCriteria,
      weightedScore20: 0,
      cefr: { cefr: "A1", score699: 0, nclc: "NCLC 4-6", confidence: "faible" },
      issues: [
        {
          id: "texte-vide",
          criterion: "consigne",
          severity: "error",
          message: "Copie vide : rédigez votre texte avant l'analyse.",
        },
      ],
      plan: buildStructure(""),
      lexical: buildLexical(""),
      register: buildRegister(""),
    };
  }

  const issues: CorrectionIssue[] = [];
  const plan = buildStructure(text);
  const lexical = buildLexical(text);
  const register = buildRegister(text);

  const consigne = evaluateConsigne(options.taskNumber, text, wc);
  issues.push(...consigne.issues);

  const struct = evaluateStructure(plan);
  const gram = evaluateGrammar(text, tokensCount, issues);
  const lex = evaluateLexique(lexical, issues);
  const orth = evaluateOrthographe(text, tokensCount);

  const criteria: CriterionVerdict[] = [
    {
      id: "consigne",
      label: CRITERION_LABELS.consigne,
      weight: CRITERION_WEIGHTS.consigne,
      points: consigne.points,
      note: consigne.note,
      findings: consigne.findings,
    },
    {
      id: "structure",
      label: CRITERION_LABELS.structure,
      weight: CRITERION_WEIGHTS.structure,
      points: struct.points,
      note: struct.note,
      findings: plan.findings,
    },
    {
      id: "grammaire",
      label: CRITERION_LABELS.grammaire,
      weight: CRITERION_WEIGHTS.grammaire,
      points: gram.points,
      note: gram.note,
      findings: gram.findings,
    },
    {
      id: "lexique",
      label: CRITERION_LABELS.lexique,
      weight: CRITERION_WEIGHTS.lexique,
      points: lex.points,
      note: lex.note,
      findings: lex.findings,
    },
    {
      id: "orthographe",
      label: CRITERION_LABELS.orthographe,
      weight: CRITERION_WEIGHTS.orthographe,
      points: orth.points,
      note: orth.note,
      findings: orth.findings,
    },
  ];

  const weightedScore20 = round1(
    criteria.reduce((acc, c) => acc + c.points * c.weight, 0)
  );
  const score699 = Math.round((weightedScore20 / 20) * 699);
  const cefr: CefrLevel =
    score699 >= 600
      ? "C2"
      : score699 >= 500
        ? "C1"
        : score699 >= 400
          ? "B2"
          : score699 >= 300
            ? "B1"
            : score699 >= 200
              ? "A2"
              : "A1";
  const nclc: NclcLevel =
    cefr === "C2"
      ? "NCLC 10+"
      : cefr === "C1"
        ? "NCLC 9"
        : cefr === "B2"
          ? "NCLC 8"
          : cefr === "B1"
            ? "NCLC 7"
            : "NCLC 4-6";
  const confidence: CefrEstimate["confidence"] =
    wc.status !== "ok" || tokensCount < 60
      ? "faible"
      : tokensCount < 140
        ? "moyenne"
        : "haute";

  return {
    valid: true,
    wordCount: wc,
    criteria,
    weightedScore20,
    cefr: { cefr, score699, nclc, confidence },
    issues,
    plan,
    lexical,
    register,
  };
}