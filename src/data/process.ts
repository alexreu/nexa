export type ProcessStep = {
  title: string;
  description: string;
};

/** The three-step story of how a workflow comes to life. */
export const processSteps: ProcessStep[] = [
  {
    title: "Décrivez votre objectif",
    description:
      "Écrivez ce que vous voulez automatiser en une phrase, dans vos mots.",
  },
  {
    title: "Nexa construit le workflow",
    description:
      "L'IA choisit les déclencheurs, les actions et les outils à connecter.",
  },
  {
    title: "Le workflow s'exécute automatiquement",
    description:
      "Chaque déclenchement est traité, journalisé et vérifiable à tout moment.",
  },
];

/** Prompt shown in the first step's illustration. */
export const processPrompt =
  "Quand un client remplit le formulaire, crée la tâche et préviens l'équipe.";
