import { ConnectorCategory, ConnectorItem, WritingPlan, WritingPlanSection } from "@/lib/types";

/**
 * AIDE A LA REDACTION (Tâches 1, 2, 3 de l'expression écrite TCF).
 * 1. Connecteurs logiques classés par fonction (insertion au clip en 1 clic).
 * 2. Plans type pour chaque tâche (méthode + amorces de phrases).
 * 3. Banque de formules de politesse selon le registre (formel / semi-formel / familier).
 */

// ============================ 1. CONNECTEURS LOGIQUES ============================

export const connectorCategories: ConnectorCategory[] = [
  {
    id: "addition",
    title: "Addition",
    description: "Ajouter une idée, enrichir l'argumentation.",
    connectors: [
      { text: "De plus,", example: "De plus, la formation continue bénéficie aux adultes." },
      { text: "En outre,", example: "En outre, ce dispositif réduit le gaspillage." },
      { text: "Par ailleurs,", example: "Par ailleurs, les coûts restent maîtrisés." },
      { text: "Également,", example: "Également, la ville a planté des milliers d'arbres." },
      { text: "De surcroît,", example: "De surcroît, les horaires sont flexibles." },
      { text: "S'ajoute à cela", example: "S'ajoute à cela une meilleure qualité de vie." },
    ],
  },
  {
    id: "opposition",
    title: "Opposition / Contraste",
    description: "Introduire une idée contraire, nuancer.",
    connectors: [
      { text: "En revanche,", example: "En revanche, le coût initial est élevé." },
      { text: "Cependant,", example: "Cependant, les résultats tardent à venir." },
      { text: "Néanmoins,", example: "Néanmoins, les avis restent partagés." },
      { text: "Toutefois,", example: "Toutefois, cette mesure reste à confirmer." },
      { text: "Alors que / tandis que", example: "Alors que certains avancent, d'autres hésitent." },
      { text: "À l'inverse,", example: "À l'inverse, la demande ne cesse de croître." },
    ],
  },
  {
    id: "cause",
    title: "Cause",
    description: "Expliquer l'origine d'un phénomène.",
    connectors: [
      { text: "Car", example: "Car la demande dépasse largement l'offre." },
      { text: "En effet,", example: "En effet, les ressources manquent." },
      { text: "Étant donné que", example: "Étant donné que les délais sont courts, agissons." },
      { text: "Puisque", example: "Puisque la formation est gratuite, tout le monde peut y accéder." },
      { text: "À cause de / Grâce à", example: "Grâce aux subventions, le projet a vu le jour." },
      { text: "Sous l'effet de", example: "Sous l'effet de la sécheresse, les récoltes baissent." },
    ],
  },
  {
    id: "consequence",
    title: "Conséquence",
    description: "Présenter le résultat d'une action ou d'une idée.",
    connectors: [
      { text: "Donc,", example: "Donc, le projet peut démarrer." },
      { text: "Par conséquent,", example: "Par conséquent, les émissions diminuent." },
      { text: "Ainsi,", example: "Ainsi, chacun peut devenir acteur du changement." },
      { text: "C'est pourquoi", example: "C'est pourquoi la prévention est essentielle." },
      { text: "De ce fait,", example: "De ce fait, ce secteur manque de main-d'œuvre." },
      { text: "Par suite,", example: "Par suite, les délais ont été rallongés." },
    ],
  },
  {
    id: "but",
    title: "But",
    description: "Exprimer un objectif, une intention.",
    connectors: [
      { text: "Afin de", example: "Afin de réduire les coûts, il mutualise les achats." },
      { text: "Pour que + subjonctif", example: "Pour que chacun soit informé, organisez une réunion." },
      { text: "Dans le but de", example: "Dans le but de mieux servir les usagers." },
      { text: "De manière à", example: "De manière à garantir la sécurité de tous." },
      { text: "En vue de", example: "En vue de renforcer leur compétitivité." },
    ],
  },
  {
    id: "concession",
    title: "Concession / Opposition",
    description: "Reconnaître un fait avant de nuancer.",
    connectors: [
      { text: "Bien que + subjonctif", example: "Bien que les coûts soient élevés, le projet est rentable." },
      { text: "Certes, ... mais", example: "Certes, le résultat est modeste, mais il est encourageant." },
      { text: "Malgré + nom", example: "Malgré les obstacles, l'équipe a tenu ses délais." },
      { text: "Quoi qu'il en soit,", example: "Quoi qu'il en soit, la décision est prise." },
      { text: "En dépit de", example: "En dépit des critiques, la loi a été adoptée." },
    ],
  },
  {
    id: "exemple",
    title: "Illustration / Exemple",
    description: "Concrétiser une idée abstraite.",
    connectors: [
      { text: "Par exemple,", example: "Par exemple, le Québec investit dans l'hydroélectricité." },
      { text: "Ainsi,", example: "Ainsi, la ville d'Ottawa a réduit ses déchets de moitié." },
      { text: "Prenons le cas de", example: "Prenons le cas de la rénovation énergétique." },
      { text: "À titre d'exemple,", example: "À titre d'exemple, ce programme a formé 500 adultes." },
      { text: "En témoigne", example: "En témoigne le succès des coopératives locales." },
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion / Synthèse",
    description: "Clore l'argumentation et ouvrir sur une perspective.",
    connectors: [
      { text: "En conclusion,", example: "En conclusion, la transition est indispensable." },
      { text: "Pour conclure,", example: "Pour conclure, chacun peut agir à son échelle." },
      { text: "En somme,", example: "En somme, les bénéfices l'emportent sur les risques." },
      { text: "Finalement,", example: "Finalement, la décision appartient aux citoyens." },
      { text: "Au final,", example: "Au final, la qualité de vie s'en trouve améliorée." },
    ],
  },
];

// ============================ 2. PLANS TYPE PAR TACHE ============================

export const writingPlans: WritingPlan[] = [
  {
    taskNumber: 1,
    title: "Tâche 1 — Réponse à une demande",
    sections: [
      {
        label: "Ouvrir le message",
        description: "Rappelez le contexte de la demande et saluez le destinataire.",
        starters: [
          "Suite à votre message du…",
          "Je fais suite à votre demande concernant…",
          "Vous me demandez des informations sur…",
          "Bonjour / Chère Madame, Cher Monsieur,…",
        ],
      },
      {
        label: "Répondre point par point",
        description: "Traitez chaque élément de la consigne, dans l'ordre, sans oublier les deux exigences demandées.",
        starters: [
          "En ce qui concerne…, je vous informe que…",
          "Quant à…, il est possible de…",
          "Concernant votre question sur…",
          "Par ailleurs, je vous précise que…",
        ],
      },
      {
        label: "Clore et proposer une suite",
        description: "Résumez d'un mot et proposez une action complémentaire (envoi, appel, rendez-vous).",
        starters: [
          "En espérant avoir répondu à votre demande,…",
          "N'hésitez pas à me recontacter pour toute précision.",
          "Je reste à votre disposition pour…",
          "Cordialement / Sincèrement,…",
        ],
      },
    ],
  },
  {
    taskNumber: 2,
    title: "Tâche 2 — Compte-rendu, article ou courrier",
    sections: [
      {
        label: "Introduire",
        description: "Rappelez le sujet, la situation de communication et annoncez le plan en une phrase.",
        starters: [
          "Cet article se propose d'examiner…",
          "Dans cette enquête, nous avons analysé…",
          "Le présent compte-rendu relate…",
          "Nous aborderons tout d'abord…, puis…",
        ],
      },
      {
        label: "Développer",
        description: "Décrivez, expliquez et illustrez avec au moins un exemple précis et chiffré.",
        starters: [
          "Selon les données recueillies,…",
          "En effet, la majorité des participants estiment que…",
          "Prenons l'exemple de…",
          "Par ailleurs, ce phénomène s'explique par…",
        ],
      },
      {
        label: "Conclure",
        description: "Synthétisez les idées clés et terminez par une ouverture ou une recommandation.",
        starters: [
          "Pour conclure, il ressort que…",
          "En synthèse, trois points se dégagent :…",
          "Il serait souhaitable de…",
          "Ces constats invitent à poursuivre la réflexion sur…",
        ],
      },
    ],
  },
  {
    taskNumber: 3,
    title: "Tâche 3 — Essai argumenté (point de vue)",
    sections: [
      {
        label: "Introduire et prendre position",
        description: "Présentez le sujet, reformulez la question et annoncez clairement votre thèse.",
        starters: [
          "La question de… suscite un vif débat.",
          "Faut-il… ? Ce sujet divise l'opinion.",
          "Il me semble que…, et ce pour plusieurs raisons.",
          "Nous examinerons d'abord…, ensuite…, enfin….",
        ],
      },
      {
        label: "Argumenter (2 à 3 idées)",
        description: "Chaque argument = idée + explication + exemple concret. Introduisez un contre-argument pour nuancer.",
        starters: [
          "En premier lieu, … car…",
          "De plus, … comme en témoigne…",
          "Certes, on pourrait objecter que… ; cependant,…",
          "Enfin, force est de constater que…",
        ],
      },
      {
        label: "Conclure",
        description: "Réaffirmez votre position en une phrase et ouvrez sur une perspective.",
        starters: [
          "En définitive, je reste convaincu(e) que…",
          "Tout bien considéré,…",
          "Ainsi, la balance penche en faveur de…",
          "Il ne reste plus qu'à espérer que…",
        ],
      },
    ],
  },
];

// ============================ 3. FORMULES DE POLITESSE PAR REGISTRE ============================

export interface FormuleItem {
  text: string;
  usage: string;
}

export interface FormuleCategory {
  id: string;
  title: string;
  register: "formel" | "semi-formel" | "familier";
  openers: FormuleItem[];
  closers: FormuleItem[];
}

export const formuleRegisters: FormuleCategory[] = [
  {
    id: "formel",
    title: "Registre formel",
    register: "formel",
    openers: [
      { text: "Madame, Monsieur,", usage: "Destinataire inconnu, courrier administratif." },
      { text: "Monsieur le Directeur, / Madame la Ministre,", usage: "Interlocuteur identifié avec titre." },
      { text: "À qui de droit,", usage: "Courrier sans destinataire précis." },
      { text: "Chère Madame, / Cher Monsieur,", usage: "Interlocuteur identifié, relation polie." },
    ],
    closers: [
      { text: "Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.", usage: "Clôture la plus formelle." },
      { text: "Je vous prie d'agréer l'assurance de ma considération distinguée.", usage: "Clôture très formelle." },
      { text: "Sincères salutations,", usage: "Formel mais chaleureux." },
      { text: "Cordialement,", usage: "Standard, tous contextes formels." },
    ],
  },
  {
    id: "semi",
    title: "Semi-formel",
    register: "semi-formel",
    openers: [
      { text: "Bonjour Madame, / Bonjour Monsieur,", usage: "Échange de travail courant." },
      { text: "Bonjour à toute l'équipe,", usage: "Courrier collectif d'entreprise." },
      { text: "Cher collègue, / Chère collègue,", usage: "Message entre collaborateurs." },
    ],
    closers: [
      { text: "Cordialement,", usage: "Clôture standard d'entreprise." },
      { text: "Bien cordialement,", usage: "Un peu plus chaleureux que « Cordialement »." },
      { text: "Merci de votre aide,", usage: "Une fois une demande exprimée." },
      { text: "À très bientôt,", usage: "Suite de conversation prévue." },
    ],
  },
  {
    id: "familier",
    title: "Familier",
    register: "familier",
    openers: [
      { text: "Salut Paul,", usage: "Ami ou collègue proche prénommé." },
      { text: "Coucoo !", usage: "Message très informel entre amis." },
      { text: "Hey, tu vas bien ?", usage: "Ouverture conviviale." },
    ],
    closers: [
      { text: "Bisous,", usage: "Très familier, amis proches." },
      { text: "À plus !", usage: "Familier, conversation à poursuivre." },
      { text: "Merci d'avance !", usage: "Courrier dispatché entre proches." },
      { text: "Bien à toi,", usage: "Chaleureux et courtois." },
    ],
  },
];

// ============================ HELPERS ============================

export function getConnectorCategories(): ConnectorCategory[] {
  return connectorCategories;
}

export function getConnectorsByCategory(categoryId: string): ConnectorItem[] {
  return connectorCategories.find((c) => c.id === categoryId)?.connectors ?? [];
}

export function getWritingPlan(taskNumber: 1 | 2 | 3): WritingPlan | undefined {
  return writingPlans.find((p) => p.taskNumber === taskNumber);
}

export function getPlanSections(taskNumber: 1 | 2 | 3): WritingPlanSection[] {
  return getWritingPlan(taskNumber)?.sections ?? [];
}

export function getFormuleRegisters(): FormuleCategory[] {
  return formuleRegisters;
}