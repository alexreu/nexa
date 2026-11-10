import {
  Blocks,
  History,
  Inbox,
  Send,
  Settings2,
  Sparkles,
  SquareCheckBig,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type NodeKind = "trigger" | "ai" | "action";

export type WorkflowStep = {
  id: string;
  kind: NodeKind;
  /** Short category shown above the step title. */
  label: string;
  title: string;
  app: string;
  /** Run time of the step, in milliseconds. */
  durationMs: number;
  icon: LucideIcon;
};

/** The scenario shown in the product mockup and replayed in the demo dialog. */
export const workflowSteps: WorkflowStep[] = [
  {
    id: "trigger",
    kind: "trigger",
    label: "Quand",
    title: "Nouveau formulaire reçu",
    app: "Formulaires",
    durationMs: 200,
    icon: Inbox,
  },
  {
    id: "analyse",
    kind: "ai",
    label: "Nexa AI",
    title: "Analyser la demande",
    app: "Nexa AI",
    durationMs: 1100,
    icon: Sparkles,
  },
  {
    id: "task",
    kind: "action",
    label: "Action",
    title: "Créer une tâche Notion",
    app: "Notion",
    durationMs: 600,
    icon: SquareCheckBig,
  },
  {
    id: "notify",
    kind: "action",
    label: "Action",
    title: "Notifier l'équipe Slack",
    app: "Slack",
    durationMs: 300,
    icon: Send,
  },
];

export type MockupNavItem = {
  label: string;
  icon: LucideIcon;
};

/** Decorative sidebar of the fake Nexa application. */
export const mockupNav: MockupNavItem[] = [
  { label: "Workflows", icon: Workflow },
  { label: "Historique", icon: History },
  { label: "Intégrations", icon: Blocks },
  { label: "Équipe", icon: Users },
  { label: "Réglages", icon: Settings2 },
];

/** French-formatted seconds: 1100 → "1,1 s". */
export function formatSeconds(ms: number) {
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(ms / 1000)}\u00a0s`;
}

export const mockupWorkflowName = "Demande client entrante";

export type MockupRun = {
  time: string;
  duration: string;
};

/** Decorative run history shown beside the canvas on wide screens. */
export const mockupRuns: MockupRun[] = [
  { time: "09:42", duration: "2,2 s" },
  { time: "09:18", duration: "2,0 s" },
  { time: "08:57", duration: "2,4 s" },
  { time: "08:31", duration: "1,9 s" },
];
