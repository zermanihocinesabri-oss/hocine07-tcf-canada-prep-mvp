import { QcmQuestion } from "@/lib/types";

/**
 * BANQUE DE QUESTIONS DE GRAMMAIRE — B2 / C1.
 * Questions d'application directe des 6 catégories pédagogiques :
 * hypotaxe, subordination, mise en relief, subjonctif, accord des
 * participes passés, connecteurs logiques.
 *
 * Chaque question présente un énoncé (passage) suivi de QCM. La correction
 * (explanation) détaille POURQUOI la réponse est correcte et pourquoi les
 * autres options sont fautives — correction instantanée pédagogique.
 */

export const GRAMMAR_QUIZ_BANK: QcmQuestion[] = [
  // ============================ HYPOTAXE ============================
  {
    id: "g-hy-1",
    skill: "CE",
    level: "C1",
    theme: "hypotaxe",
    sequence: "Exercice 1",
    passageType: "Exercice de grammaire",
    passage:
      "Choisissez la phrase qui maîtrise l'hypotaxe : une subordonnée correctement insérée dans une principale claire.",
    question: "Laquelle de ces phrases est correctement construite ?",
    options: [
      {
        id: "a",
        text: "La proposition que le comité a votée, bien qu'elle soit contestée, reste le cadre de travail adopté.",
      },
      {
        id: "b",
        text: "La proposition que le comité a votée, bien qu'elle est contestée, reste le cadre de travail adopté.",
      },
      {
        id: "c",
        text: "La proposition qu'a votée le comité, malgré qu'elle est contestée, reste le cadre adopté.",
      },
      {
        id: "d",
        text: "Bien que la proposition est contestée, le comité que l'a votée reste le cadre adopté.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "La phrase a est correcte : la relative « que le comité a votée » (accord avec proposition, COD avant) est insérée dans une principale claire, et « bien que » est suivi du subjonctif (« soit contestée »). Les autres options placent un indicatif après « bien que » (b, c, d).",
    difficulty: "difficile",
  },
  {
    id: "g-hy-2",
    skill: "CE",
    level: "C1",
    theme: "hypotaxe",
    sequence: "Exercice 2",
    passageType: "Exercice de grammaire",
    passage:
      "Évitez l'accumulation fautive de deux subordonnées sans rapport construit.",
    question: "Quelle reformulation corrige l'accumulation « l'idée qui a été proposée, qui a été discutée, a été rejetée » ?",
    options: [
      { id: "a", text: "L'idée proposée, longuement discutée, a finalement été rejetée." },
      { id: "b", text: "L'idée qui a été proposée et qui a été discutée et qui a été rejetée." },
      { id: "c", text: "L'idée qui a été proposée, elle a été discutée, elle a été rejetée." },
      { id: "d", text: "L'idée proposée, discutée longtemps, rejetée finalement l'a été." },
    ],
    correctOptionId: "a",
    explanation:
      "La reformulation a remplace les trois relatives par des participes passés épithètes (« proposée, discutée »), beaucoup plus élégants : c'est la nominalisation/participation propre au niveau C1. Les options b et c conservent l'accumulation ; la d, maladroite, garde une dislocation confuse.",
    difficulty: "difficile",
  },
  {
    id: "g-hy-3",
    skill: "CE",
    level: "C1",
    theme: "hypotaxe",
    sequence: "Exercice 3",
    passageType: "Exercice de grammaire",
    passage: "Le gérondif et le participe demandent un sujet commun au verbe principal.",
    question: "Complétez : « ___ le dossier, la commission a demandé des compléments. »",
    options: [
      { id: "a", text: "Ayant examiné" },
      { id: "b", text: "En examinant" },
      { id: "c", text: "Examinant" },
      { id: "d", text: "Avoir examiné" },
    ],
    correctOptionId: "a",
    explanation:
      "« Ayant examiné » (participe passé composé) exprime ici le rapport temporel avant l'action principale, avec le même sujet (la commission). « En examinant » conviendrait pour une action simultanée, « examinant » marque mal l'antériorité, et « avoir examiné » est un infinitif, impossible comme subordonnée participiale.",
    difficulty: "difficile",
  },
  {
    id: "g-hy-4",
    skill: "CE",
    level: "C1",
    theme: "hypotaxe",
    sequence: "Exercice 4",
    passageType: "Exercice de grammaire",
    passage: "La subordonnée participiale doit avoir un sujet explicite et autonome.",
    question: "Repérez la phrase fautive :",
    options: [
      { id: "a", text: "La pluie ayant cessé, la manifestation a pu se dérouler." },
      { id: "b", text: "Les résultats publiés, l'entreprise a tenu une conférence de presse." },
      { id: "c", text: "Ayant été malade, le rapport n'a pas pu être rédigé." },
      { id: "d", text: "Le vote terminé, les délégués ont quitté la salle." },
    ],
    correctOptionId: "c",
    explanation:
      "La phrase c est fautive : « ayant été malade » devrait se rapporter au sujet de la principale (« le rapport »), ce qui est absurde (un rapport ne tombe pas malade). Il faut reformuler : « ayant été malade, le rédacteur n'a pas pu... ». Les autres participiales (a, b, d) ont des sujets autonomes corrects.",
    difficulty: "difficile",
  },

  // ============================ SUBORDINATION ============================
  {
    id: "g-sub-1",
    skill: "CE",
    level: "B2",
    theme: "subordination",
    sequence: "Exercice 1",
    passageType: "Exercice de grammaire",
    passage: "Le pronom relatif dépend du verbe introduit dans la relative.",
    question: "Complétez : « C'est une décision ___ je me souviendrai longtemps. »",
    options: [
      { id: "a", text: "que" },
      { id: "b", text: "dont" },
      { id: "c", text: "à qui" },
      { id: "d", text: "où" },
    ],
    correctOptionId: "b",
    explanation:
      "Le verbe « se souvenir de » exige la préposition de : on dit « se souvenir de quelque chose ». Le relatif qui remplace donc « de + décision » est « dont ». « Que » serait correct pour « se souvenir que » mais pas avec cette construction ; « à qui » concerne des personnes ; « où » un lieu ou une époque.",
    difficulty: "moyen",
  },
  {
    id: "g-sub-2",
    skill: "CE",
    level: "B2",
    theme: "subordination",
    sequence: "Exercice 2",
    passageType: "Exercice de grammaire",
    passage: "Après une préposition, on emploie lequel, etc., pas « que ».",
    question: "Complétez : « Le projet ___ je me bats n'a pas encore été financé. »",
    options: [
      { id: "a", text: "que" },
      { id: "b", text: "dont" },
      { id: "c", text: "pour lequel" },
      { id: "d", text: "duquel" },
    ],
    correctOptionId: "c",
    explanation:
      "On se bat « pour quelque chose » : la préposition « pour » + l'antécédent « projet » donne « pour lequel ». « Que » est impossible après une préposition, « dont » remplace « de + nom » (ici il n'y a pas de de), et « duquel » conviendrait pour « le financement duquel ».",
    difficulty: "moyen",
  },
  {
    id: "g-sub-3",
    skill: "CE",
    level: "B2",
    theme: "subordination",
    sequence: "Exercice 3",
    passageType: "Exercice de grammaire",
    passage: "Bien que et même si n'appellent pas le même mode.",
    question: "À quelle forme conjuguez-vous le verbe après « bien que » ?",
    options: [
      { id: "a", text: "L'indicatif, comme après « même si »." },
      { id: "b", text: "Le subjonctif, toujours." },
      { id: "c", text: "Le conditionnel." },
      { id: "d", text: "L'infinitif." },
    ],
    correctOptionId: "b",
    explanation:
      "« Bien que » exige TOUJOURS le subjonctif (« bien qu'elle soit contestée »). C'est précisément ce qui le distingue de « même si », suivi de l'indicatif (« même si elle est contestée »). Le conditionnel et l'infinitif sont impossibles après cette conjonction.",
    difficulty: "moyen",
  },
  {
    id: "g-sub-4",
    skill: "CE",
    level: "B2",
    theme: "subordination",
    sequence: "Exercice 4",
    passageType: "Exercice de grammaire",
    passage: "La juxtaposition et la coordination ne hiérarchisent pas les idées.",
    question: "Parmi ces phrases, laquelle contient une proposition subordonnée circonstancielle de but ?",
    options: [
      { id: "a", text: "Il a révisé toute la nuit, car il voulait réussir." },
      { id: "b", text: "Il a révisé toute la nuit pour réussir son examen." },
      { id: "c", text: "Il a révisé toute la nuit, donc il a réussi." },
      { id: "d", text: "Il a révisé toute la nuit et il a réussi." },
    ],
    correctOptionId: "b",
    explanation:
      "La proposition « pour réussir son examen » exprime le but, mais sous forme infinitive. Strictement parlant, une circonstancielle de but est formée avec « pour que » + subjonctif (« pour qu'il réussisse »). Parmi les options, la b est la seule à exprimer un but ; la a est une cause (car), la c une conséquence (donc), la d une simple coordination.",
    difficulty: "difficile",
  },

  // ============================ MISE EN RELIEF ============================
  {
    id: "g-mr-1",
    skill: "CE",
    level: "B2",
    theme: "mise-en-relief",
    sequence: "Exercice 1",
    passageType: "Exercice de grammaire",
    passage: "« C'est ... qui/que » : qui introduit un sujet, que un objet.",
    question: "Complétez : « C'est la transparence ___ les citoyens exigent. »",
    options: [
      { id: "a", text: "qui" },
      { id: "b", text: "que" },
      { id: "c", text: "dont" },
      { id: "d", text: "où" },
    ],
    correctOptionId: "b",
    explanation:
      "Dans « les citoyens exigent la transparence », « la transparence » est le COD (objet) du verbe exiger. On emploie donc « que » (c'est ... que). On aurait « qui » si la transparence était le sujet : « c'est la transparence qui fait défaut ».",
    difficulty: "moyen",
  },
  {
    id: "g-mr-2",
    skill: "CE",
    level: "B2",
    theme: "mise-en-relief",
    sequence: "Exercice 2",
    passageType: "Exercice de grammaire",
    passage: "Le tour « ce qui / ce que + c'est » met un élément en valeur.",
    question: "Complétez : « ___ me rassure, c'est la régularité du suivi. »",
    options: [
      { id: "a", text: "Ce qui" },
      { id: "b", text: "Ce que" },
      { id: "c", text: "Quoi que" },
      { id: "d", text: "Celui qui" },
    ],
    correctOptionId: "a",
    explanation:
      "« Ce qui » est le sujet de « rassure » (la régularité rassure → ce qui rassure). On emploierait « ce que » pour un objet (« ce que je redoute »). « Quoi que » signifie « quelle que soit la chose » et « celui qui » reprend un antécédent masculin précis (une personne ou un objet déjà nommé).",
    difficulty: "moyen",
  },
  {
    id: "g-mr-3",
    skill: "CE",
    level: "B2",
    theme: "mise-en-relief",
    sequence: "Exercice 3",
    passageType: "Exercice de grammaire",
    passage: "L'accord du verbe se fait avec l'élément introduit par « qui ».",
    question: "Complétez : « Ce sont les équipes locales ___ portent le projet. »",
    options: [
      { id: "a", text: "qui" },
      { id: "b", text: "que" },
      { id: "c", text: "dont" },
      { id: "d", text: "auxquelles" },
    ],
    correctOptionId: "a",
    explanation:
      "« Les équipes locales » est le sujet de « portent » : on emploie « qui », et le verbe s'accorde au pluriel (portent). « Que » ferait des équipes l'objet (« les équipes que l'on mobilise »), « dont » introduirait un complément en de, et « auxquelles » une préposition à + personnes.",
    difficulty: "difficile",
  },
  {
    id: "g-mr-4",
    skill: "CE",
    level: "B2",
    theme: "mise-en-relief",
    sequence: "Exercice 4",
    passageType: "Exercice de grammaire",
    passage: "La dislocation (oral) : « la réforme, on en parle ».",
    question: "Repérez la phrase qui utilise correctement la mise en relief en « c'est... que » :",
    options: [
      { id: "a", text: "C'est au printemps que la ligne sera mise en service." },
      { id: "b", text: "C'est au printemps qui la ligne sera mise en service." },
      { id: "c", text: "C'est la ligne au printemps que sera mise en service." },
      { id: "d", text: "C'est au printemps dont la ligne sera mise en service." },
    ],
    correctOptionId: "a",
    explanation:
      "L'élément mis en valeur (le moment : au printemps) est un complément de temps → on emploie « que » : « c'est au printemps que... ». « Qui » exige un sujet, « dont » un complément en de, et l'option c construit un ordre incohérent.",
    difficulty: "moyen",
  },

  // ============================ SUBJONCTIF ============================
  {
    id: "g-subj-1",
    skill: "CE",
    level: "B2",
    theme: "subjonctif",
    sequence: "Exercice 1",
    passageType: "Exercice de grammaire",
    passage: "Après les verbes de volonté : vouloir que, exiger que, il faut que.",
    question: "Complétez : « Le directeur exige que chaque collaborateur ___ son rapport avant vendredi. »",
    options: [
      { id: "a", text: "remet" },
      { id: "b", text: "remette" },
      { id: "c", text: "remettra" },
      { id: "d", text: "a remis" },
    ],
    correctOptionId: "b",
    explanation:
      "« Exiger que » appelle le subjonctif : « que chaque collaborateur remette ». L'indicatif « remet » (a) et le futur « remettra » (c) sont fautifs ; « a remis » (d) exprimerait une action déjà accomplie, incompatible avec la consigne.",
    difficulty: "moyen",
  },
  {
    id: "g-subj-2",
    skill: "CE",
    level: "B2",
    theme: "subjonctif",
    sequence: "Exercice 2",
    passageType: "Exercice de grammaire",
    passage: "Après un verbe de pensée à la forme négative, subjonctif requis.",
    question: "Complétez : « Je ne pense pas que ce projet ___ dans les délais. »",
    options: [
      { id: "a", text: "aboutit" },
      { id: "b", text: "aboutira" },
      { id: "c", text: "aboutisse" },
      { id: "d", text: "a abouti" },
    ],
    correctOptionId: "c",
    explanation:
      "Affirmatif, « je pense que » se construit à l'indicatif ; à la forme négative (« je ne pense pas que »), le subjonctif est exigé : « que ce projet aboutisse ». Les options a (présent indicatif) et b (futur) sont fautives après la négation.",
    difficulty: "difficile",
  },
  {
    id: "g-subj-3",
    skill: "CE",
    level: "B2",
    theme: "subjonctif",
    sequence: "Exercice 3",
    passageType: "Exercice de grammaire",
    passage: "Les conjonctions : pour que, pourvu que, avant que, sans que.",
    question: "Complétez : « Nous diffuserons la note, à condition que vous la ___ avant minuit. »",
    options: [
      { id: "a", text: "relirez" },
      { id: "b", text: "relisez" },
      { id: "c", text: "relisez-en" },
      { id: "d", text: "relisiez" },
    ],
    correctOptionId: "d",
    explanation:
      "« À condition que » exige le subjonctif : « que vous relisiez ». « Relirez » (futur) et « relisez » (présent indicatif) sont fautifs ; « relisez-en » est un impératif mal formé ici.",
    difficulty: "difficile",
  },
  {
    id: "g-subj-4",
    skill: "CE",
    level: "B2",
    theme: "subjonctif",
    sequence: "Exercice 4",
    passageType: "Exercice de grammaire",
    passage: "Émotion : être content que, regretter que, redouter que.",
    question: "Complétez : « Nous nous réjouissons que les négociations ___ abouti. »",
    options: [
      { id: "a", text: "ont" },
      { id: "b", text: "aient" },
      { id: "c", text: "auront" },
      { id: "d", text: "avaient" },
    ],
    correctOptionId: "b",
    explanation:
      "« Se réjouir que » (expression d'une émotion) se construit avec le subjonctif : au passé composé du subjonctif, « que les négociations aient abouti ». Les options a, c, d sont toutes des formes de l'indicatif, donc fautives.",
    difficulty: "moyen",
  },

  // ============================ ACCORD DES PARTICIPES PASSES ============================
  {
    id: "g-acc-1",
    skill: "CE",
    level: "C1",
    theme: "accords-participe",
    sequence: "Exercice 1",
    passageType: "Exercice de grammaire",
    passage: "Avec avoir, on accorde avec le COD placé avant.",
    question: "Complétez : « Les mesures que le gouvernement a ___ sont ambitieuses. »",
    options: [
      { id: "a", text: "annoncé" },
      { id: "b", text: "annoncées" },
      { id: "c", text: "annoncer" },
      { id: "d", text: "annonçant" },
    ],
    correctOptionId: "b",
    explanation:
      "Le COD « que » (= les mesures) est placé AVANT le participe avec avoir → on accorde au féminin pluriel : « annoncées ». Si le COD était après (« le gouvernement a annoncé des mesures »), le participe resterait invariable.",
    difficulty: "moyen",
  },
  {
    id: "g-acc-2",
    skill: "CE",
    level: "C1",
    theme: "accords-participe",
    sequence: "Exercice 2",
    passageType: "Exercice de grammaire",
    passage: "Verbes pronominaux à COI : se téléphoner, se parler, se plaire…",
    question: "Complétez : « Elles se sont ___ toute la soirée. » (téléphoner)",
    options: [
      { id: "a", text: "téléphonées" },
      { id: "b", text: "téléphoné" },
      { id: "c", text: "téléphonaient" },
      { id: "d", text: "téléphoner" },
    ],
    correctOptionId: "b",
    explanation:
      "« Se téléphoner » = téléphoner à quelqu'un : « se » est un complément d'objet indirect, il n'y a pas de COD. Le participe reste donc invariable : « elles se sont téléphoné ». On accorderait si « se » était COD (par exemple « elles se sont téléphoné des nouvelles » : là encore téléphoné reste invariable, mais le COD serait « des nouvelles », placé après). Dans tous les cas ici, « téléphoné » (invariable) est la seule forme correcte.",
    difficulty: "difficile",
  },
  {
    id: "g-acc-3",
    skill: "CE",
    level: "C1",
    theme: "accords-participe",
    sequence: "Exercice 3",
    passageType: "Exercice de grammaire",
    passage: "COD placé après avec avoir → participe invariable.",
    question: "Complétez : « La direction a ___ les revendications des employés. » (entendre)",
    options: [
      { id: "a", text: "entendues" },
      { id: "b", text: "entendre" },
      { id: "c", text: "entendu" },
      { id: "d", text: "entendus" },
    ],
    correctOptionId: "c",
    explanation:
      "Ici, le COD « les revendications » est placé APRÈS le verbe « a entendu ». Pour avoir + COD après, le participe reste invariable : « a entendu ». Les accords « entendues/entendus » seraient fautifs puisqu'aucun COD ne précède le participe.",
    difficulty: "moyen",
  },
  {
    id: "g-acc-4",
    skill: "CE",
    level: "C1",
    theme: "accords-participe",
    sequence: "Exercice 4",
    passageType: "Exercice de grammaire",
    passage: "Avec être : accord automatique avec le sujet.",
    question: "Complétez : « Les clauses de l'accord ont été ___ par les deux parties. » (signer)",
    options: [
      { id: "a", text: "signé" },
      { id: "b", text: "signée" },
      { id: "c", text: "signés" },
      { id: "d", text: "signées" },
    ],
    correctOptionId: "d",
    explanation:
      "Le participe passé passif avec « être » s'accorde avec le SUJET : « les clauses » (féminin pluriel) → « signées ». Les formes signé (masculin singulier), signée (féminin singulier) et signés (masculin pluriel) ne correspondent pas au sujet féminin pluriel des clauses.",
    difficulty: "moyen",
  },

  // ============================ CONNECTEURS ============================
  {
    id: "g-conn-1",
    skill: "CE",
    level: "B2",
    theme: "connecteurs",
    sequence: "Exercice 1",
    passageType: "Exercice de grammaire",
    passage: "car = cause ; donc = conséquence. Ne les confondez pas.",
    question: "Complétez : « Le télétravail séduit, ___ il réduit les déplacements. »",
    options: [
      { id: "a", text: "donc" },
      { id: "b", text: "car" },
      { id: "c", text: "par conséquent" },
      { id: "d", text: "ainsi" },
    ],
    correctOptionId: "b",
    explanation:
      "Le « il réduit les déplacements » est la CAUSE de la séduction du télétravail → on emploie « car » (cause). « Donc », « par conséquent » et « ainsi » marquent des conséquences ; ils inverseraient le rapport logique (« le télétravail séduit donc il réduit les déplacements » n'a pas de sens).",
    difficulty: "moyen",
  },
  {
    id: "g-conn-2",
    skill: "CE",
    level: "B2",
    theme: "connecteurs",
    sequence: "Exercice 2",
    passageType: "Exercice de grammaire",
    passage: "En revanche (opposition) ≠ en effet (justification) ≠ par ailleurs (addition).",
    question: "Complétez : « La formation coûte cher. ___, elle ouvre des perspectives réelles. »",
    options: [
      { id: "a", text: "En effet" },
      { id: "b", text: "En revanche" },
      { id: "c", text: "Par ailleurs" },
      { id: "d", text: "D'ailleurs" },
    ],
    correctOptionId: "b",
    explanation:
      "La deuxième phrase oppose le coût élevé et les perspectives positives : on emploie « en revanche » (opposition avec nuance). « En effet » justifierait en ajoutant une preuve au coût ; « par ailleurs »/« d'ailleurs » ajouteraient une idée sans opposition.",
    difficulty: "moyen",
  },
  {
    id: "g-conn-3",
    skill: "CE",
    level: "B2",
    theme: "connecteurs",
    sequence: "Exercice 3",
    passageType: "Exercice de grammaire",
    passage: "La concession : certes... mais ; même si + indicatif ; en dépit de + nom.",
    question: "Complétez : « ___, la réunion est décevante, elle a le mérite de parler enfin du sujet. »",
    options: [
      { id: "a", text: "Certes" },
      { id: "b", text: "Par conséquent" },
      { id: "c", text: "Toutefois" },
      { id: "d", text: "Puisque" },
    ],
    correctOptionId: "a",
    explanation:
      "« Certes..., mais... » est la structure de concessin par excellence : on reconnaît un défaut puis on fonde le propos. « Toutefois » (opposition) nécessiterait une virgule simple et non un point ; « par conséquent » est une conséquence ; « puisque » une cause.",
    difficulty: "moyen",
  },
  {
    id: "g-conn-4",
    skill: "CE",
    level: "B2",
    theme: "connecteurs",
    sequence: "Exercice 4",
    passageType: "Exercice de grammaire",
    passage: "Les connecteurs de bilan ferment la démonstration.",
    question: "Quel connecteur convient pour conclure une argumentation ?",
    options: [
      { id: "a", text: "En définitive" },
      { id: "b", text: "D'une part" },
      { id: "c", text: "Aussi bien" },
      { id: "d", text: "Voici pourquoi" },
    ],
    correctOptionId: "a",
    explanation:
      "« En définitive » (comme « en somme », « en conclusion », « au total ») annonce le bilan final d'une argumentation. « D'une part » ouvre une énumération, « aussi bien » n'exprime pas un bilan et « voici pourquoi » introduit une cause : aucun ne clôt une démonstration.",
    difficulty: "facile",
  },
];

export function getGrammarQuizAll(): QcmQuestion[] {
  return GRAMMAR_QUIZ_BANK;
}