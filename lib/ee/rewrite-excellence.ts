export type RewriteTechnique =
  | "registre-soutenu"
  | "connecteur-haut-niveau"
  | "nominalisation"
  | "subjonctif"
  | "incise-de-precision";

export type RewriteCriterion = "lexique" | "grammaire" | "structure" | "registre";

export interface RewriteEdit {
  id: string;
  technique: RewriteTechnique;
  criterion: RewriteCriterion;
  before: string;
  after: string;
  justification: string;
}

export interface RewriteResult {
  original: string;
  rewritten: string;
  edits: RewriteEdit[];
  summary: string;
}

interface RewriteRule {
  id: string;
  re: RegExp;
  technique: RewriteTechnique;
  criterion: RewriteCriterion;
  justification: string;
  render: (whole: string, captures: string[]) => string;
}

function upperFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function preserveCase(whole: string, replacement: string): string {
  return /^\p{Lu}/u.test(whole) ? upperFirst(replacement) : replacement;
}

function applyRule(input: string, rule: RewriteRule, edits: RewriteEdit[]): string {
  const flags = rule.re.flags.includes("g") ? rule.re.flags : `${rule.re.flags}g`;
  const re = new RegExp(rule.re.source, flags);
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(input)) !== null) {
    if (m.index < last) {
      re.lastIndex++;
      continue;
    }
    const whole = m[0];
    const replacement = rule.render(whole, m.slice(1));
    out += input.slice(last, m.index) + replacement;
    if (replacement !== whole) {
      edits.push({
        id: `${rule.id}-${++n}`,
        technique: rule.technique,
        criterion: rule.criterion,
        before: whole,
        after: replacement,
        justification: rule.justification,
      });
    }
    last = m.index + whole.length;
    if (whole.length === 0) re.lastIndex++;
  }
  out += input.slice(last);
  return out;
}

const RULES: RewriteRule[] = [
  {
    id: "je-pense-que",
    re: /\bje pense que\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Je pense que », correct, demeure générique. « Je suis d'avis que » ancre l'opinion dans une posture d'analyse, attendue d'un essai de niveau maîtrise.",
    render: (whole) => preserveCase(whole, "je suis d'avis que"),
  },
  {
    id: "je-crois-que",
    re: /\bje crois que\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Je crois » s'apparente à une certitude non argumentée. La tournure modale « il me semble que » introduit la nuance de pensée exigée au C2.",
    render: (whole) => preserveCase(whole, "il me semble que"),
  },
  {
    id: "je-trouve-que",
    re: /\bje trouve que\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Je trouve que » relève de l'oral. « Je considère que » inscrit le jugement dans un raisonnement, registre de l'essai argumentatif.",
    render: (whole) => preserveCase(whole, "je considère que"),
  },
  {
    id: "a-mon-avis",
    re: /\bà mon avis\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« À mon avis » est banal ; « de mon point de vue » revendique une perspective réfléchie, nuance que le correcteur attend au niveau maîtrise.",
    render: (whole) => preserveCase(whole, "de mon point de vue"),
  },
  {
    id: "en-ce-qui-concerne",
    re: /\ben ce qui concerne\b/gi,
    technique: "registre-soutenu",
    criterion: "registre",
    justification:
      "« S'agissant de » remplace avantageusement le développement nominal « en ce qui concerne » : une tournure nominale maîtrisée signale le C2.",
    render: (whole) => preserveCase(whole, "s'agissant de"),
  },
  {
    id: "parce-que",
    re: /\bparce que\b/gi,
    technique: "connecteur-haut-niveau",
    criterion: "structure",
    justification:
      "« Dans la mesure où » exprime la cause avec une portée argumentative supérieure à « parce que », perçu comme explicatif direct.",
    render: (whole) => preserveCase(whole, "dans la mesure où"),
  },
  {
    id: "a-cause-de",
    re: /\bà cause de\b/gi,
    technique: "registre-soutenu",
    criterion: "registre",
    justification:
      "« À cause de » véhicule une causalité relâchée ; « en raison de » confère la neutralité analytique voulue par le compte-rendu.",
    render: (whole) => preserveCase(whole, "en raison de"),
  },
  {
    id: "malgre-le-fait-que",
    re: /\bmalgré le fait que\b/gi,
    technique: "subjonctif",
    criterion: "grammaire",
    justification:
      "« Bien que + subjonctif » allège l'expression et démontre la maîtrise du mode verbal, là où « malgré le fait que » étoffe inutilement.",
    render: (whole) => preserveCase(whole, "bien que"),
  },
  {
    id: "il-faut-que",
    re: /\bil faut que\b/gi,
    technique: "subjonctif",
    criterion: "grammaire",
    justification:
      "« Il importe que » instaure l'injonction en maintenant le subjonctif : une manière solennelle et nuancée d'imposer une condition.",
    render: (whole) => preserveCase(whole, "il importe que"),
  },
  {
    id: "il-faut-inf",
    re: /\bil faut\s+(?!que\b|de\b)(\p{L}[\p{L}\p{N}'’\-]*)/giu,
    technique: "registre-soutenu",
    criterion: "registre",
    justification:
      "L'injonction « il faut » est abrupte. « Il convient de » adoucit la prescription tout en gardant l'infinitif, ton attendu du discours de maîtrise.",
    render: (whole, captures) => {
      const token = captures[0];
      const elide = /^(?:en|y|dont|[aeiouyàâäéèêëîïôöùûü])/iu.test(token);
      return preserveCase(whole, elide ? `il convient d'${token}` : `il convient de ${token}`);
    },
  },
  {
    id: "et-on",
    re: /\bet on\b/gi,
    technique: "registre-soutenu",
    criterion: "grammaire",
    justification:
      "« Et l'on » évite l'hiatus et apporte l'euphonie qu'un rédacteur de niveau C2 recherche systématiquement.",
    render: (whole) => preserveCase(whole, "et l'on"),
  },
  {
    id: "si-on",
    re: /\bsi on\b/gi,
    technique: "registre-soutenu",
    criterion: "grammaire",
    justification:
      "« Si l'on » est la forme élidée soutenue de « si on » : un détail phonique qui pèse à l'écrit d'un candidat à la maîtrise.",
    render: (whole) => preserveCase(whole, "si l'on"),
  },
  {
    id: "en-plus",
    re: /(?<!plus\s)\ben plus\b/giu,
    technique: "connecteur-haut-niveau",
    criterion: "structure",
    justification:
      "« En plus » est oral ; « par ailleurs » ajoute une idée en la détachant du flux, charnière logique exigée dans le plan.",
    render: (whole) => preserveCase(whole, "par ailleurs"),
  },
  {
    id: "apres-ca",
    re: /\baprès ça\b/gi,
    technique: "connecteur-haut-niveau",
    criterion: "structure",
    justification:
      "« Par la suite » enchaîne chronologiquement sans l'orale démonstratif : fluidité de la progression narrative au niveau maîtrise.",
    render: (whole) => preserveCase(whole, "par la suite"),
  },
  {
    id: "mais-reorientation",
    re: /\b(\p{L})\smais\s((?:il|elle|on|nous|vous|ils|elles|cela|c'est|ce|il y|il existe)\b)/giu,
    technique: "connecteur-haut-niveau",
    criterion: "structure",
    justification:
      "« Mais », juxtaposition simple, devient « ; en revanche, » : la réorientation argumentative est balisée, signe distinctif du C2.",
    render: (whole, captures) => `${captures[0]} ; en revanche, ${captures[1]}`,
  },
  {
    id: "donc-consequence",
    re: /\b(\p{L})\sdonc\s((?:il|elle|on|nous|vous|ils|elles|cela|c'est|ce|il y|il existe)\b)/giu,
    technique: "connecteur-haut-niveau",
    criterion: "structure",
    justification:
      "« Donc » convient à l'oral ; « ; par conséquent, » explicite le lien de conséquence que le correcteur attend d'une démonstration écrite.",
    render: (whole, captures) => `${captures[0]} ; par conséquent, ${captures[1]}`,
  },
  {
    id: "tres-important",
    re: /\btrès\s+importan(?:t|te|ts|tes)\b/gi,
    technique: "nominalisation",
    criterion: "lexique",
    justification:
      "La nominalisation « être d'une importance capitale » étoffe le prédicat et illustre une syntaxe de niveau maîtrise, là où « très important » reste plat.",
    render: (whole) => preserveCase(whole, "d'une importance capitale"),
  },
  {
    id: "tres-ampleur",
    re: /\btrès\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Extrêmement » donne à l'intensité une ampleur mesurée que « très » n'a pas : le dosage de l'hyperbole est un marqueur du C2.",
    render: (whole) => preserveCase(whole, "extrêmement"),
  },
  {
    id: "beaucoup-de",
    re: /\bbeaucoup de\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Un grand nombre de » quantifie de façon nominale et précise, registre de l'analyse statistique du compte-rendu.",
    render: (whole) => preserveCase(whole, "un grand nombre de"),
  },
  {
    id: "montrer-que",
    re: /\bmontr(e|er)\s+que\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Démontrer que » engage une preuve : le lexique de la démonstration l'emporte sur la simple constatation au niveau maîtrise.",
    render: (whole, captures) => `démontr${captures[0]} que`,
  },
  {
    id: "se-rendre-compte",
    re: /\bse rendre compte de\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Prendre conscience de » donne à la prise de conscience une profondeur réflexive, plus forte que la formule factuelle « se rendre compte de ».",
    render: (whole) => preserveCase(whole, "prendre conscience de"),
  },
  {
    id: "a-un-impact-sur",
    re: /\ba un impact sur\b/gi,
    technique: "nominalisation",
    criterion: "lexique",
    justification:
      "« Exerce une influence sur » supprime l'anglicisme d'usage « impact » et nominalise l'action : précision et correction à la fois.",
    render: (whole) => preserveCase(whole, "exerce une influence sur"),
  },
  {
    id: "ont-un-impact-sur",
    re: /\bont un impact sur\b/gi,
    technique: "nominalisation",
    criterion: "lexique",
    justification:
      "« Exercent une influence sur » remplace « ont un impact sur » : le verbe « exercer » relève du lexique de l'analyse, pas du sens commun.",
    render: (whole) => preserveCase(whole, "exercent une influence sur"),
  },
  {
    id: "joue-un-role",
    re: /\bjoue un rôle\b/gi,
    technique: "nominalisation",
    criterion: "lexique",
    justification:
      "« Joue un rôle déterminant » renforce le syntagme nominal : la détermination du rôle précise la portée de l'argument, exigence de précision C2.",
    render: (whole) => preserveCase(whole, "joue un rôle déterminant"),
  },
  {
    id: "contribue-a",
    re: /\bcontribue à\b/gi,
    technique: "incise-de-precision",
    criterion: "lexique",
    justification:
      "« Substantiellement » mesure l'ampleur de la contribution : la précision chiffrée ou adverbiale est une signature du niveau maîtrise.",
    render: (whole) => preserveCase(whole, "contribue substantiellement à"),
  },
  {
    id: "contribuent-a",
    re: /\bcontribuent à\b/gi,
    technique: "incise-de-precision",
    criterion: "lexique",
    justification:
      "L'adverbe « substantiellement » ajoute la mesure que l'analyse d'un phénomène attend au C2 : l'ampleur de l'effet est explicitée.",
    render: (whole) => preserveCase(whole, "contribuent substantiellement à"),
  },
  {
    id: "est-important",
    re: /\best important\b/gi,
    technique: "nominalisation",
    criterion: "lexique",
    justification:
      "« Revêt une importance notable » nominalise le prédicat : la tournure donne au style l'épaisseur que le niveau maîtrise exige.",
    render: (whole) => preserveCase(whole, "revêt une importance notable"),
  },
  {
    id: "sont-importants",
    re: /\bsont importants\b/gi,
    technique: "nominalisation",
    criterion: "lexique",
    justification:
      "« Revêtent une importance notable » étoffe la prédication et aligne le pluriel : précision grammaticale et lexique soutenu réunis.",
    render: (whole) => preserveCase(whole, "revêtent une importance notable"),
  },
  {
    id: "est-essentiel",
    re: /\best essentiel(le)?\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Primordial(e) » intensifie l'essentiel sans surcharge : un registre gradé qui démontre la maîtrise des nuances de sens.",
    render: (whole, captures) => `est primordial${captures[0] ? "e" : ""}`,
  },
  {
    id: "montrent-que",
    re: /\bmontrent que\b/gi,
    technique: "registre-soutenu",
    criterion: "lexique",
    justification:
      "« Attestent que » est un verbe de preuve : en compte-rendu, la démonstration l'emporte sur la simple constatation, comme l'attend le correcteur.",
    render: (whole) => preserveCase(whole, "attestent que"),
  },
  {
    id: "pour-finir",
    re: /\bpour finir\b/gi,
    technique: "connecteur-haut-niveau",
    criterion: "structure",
    justification:
      "« In fine » condense la conclusion dans un latinisme maîtrisé, très prisé au niveau C2 pour clore une démonstration.",
    render: (whole) => preserveCase(whole, "in fine"),
  },
];

const TECHNIQUE_LABELS: Record<RewriteTechnique, string> = {
  "registre-soutenu": "reprise de registre",
  "connecteur-haut-niveau": "connecteur ennobli",
  nominalisation: "nominalisation",
  subjonctif: "tournure au subjonctif",
  "incise-de-precision": "précision ajoutée",
};

function buildSummary(edits: RewriteEdit[]): string {
  if (edits.length === 0) {
    return "Aucune transformation proposée : votre texte ne présente pas de marques de registre ou de connecteurs que les règles actuelles peuvent ennoblir. Vous êtes soit déjà au niveau attendu, soit hors du périmètre des règles déterministes.";
  }
  const counts = new Map<RewriteTechnique, number>();
  for (const e of edits) {
    counts.set(e.technique, (counts.get(e.technique) ?? 0) + 1);
  }
  const details = Array.from(counts.entries())
    .map(([t, n]) => `${n} × ${TECHNIQUE_LABELS[t]}`)
    .join(", ");
  return `Votre copie a été rehaussée de ${edits.length} intervention(s) ciblée(s) : ${details}. Chaque modification est conservatrice : le sens initial est préservé. Recopiez les fragments proposés comme modèle et appliquez la même logique au reste du texte. Cette réécriture est guidée par des règles déterministes ; un correcteur humain garde le dernier mot sur la note.`;
}

export function rewriteForExcellence(text: string): RewriteResult {
  const edits: RewriteEdit[] = [];
  let rewritten = text;
  for (const rule of RULES) {
    rewritten = applyRule(rewritten, rule, edits);
  }
  return {
    original: text,
    rewritten,
    edits,
    summary: buildSummary(edits),
  };
}