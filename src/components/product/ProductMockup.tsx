import { ChevronRight, Play } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import {
  WorkflowColumn,
  type StepStatus,
} from "@/components/product/WorkflowColumn";
import {
  mockupNav,
  mockupRuns,
  mockupWorkflowName,
  workflowSteps,
} from "@/data/workflow";
import { cn } from "@/lib/utils";

/** Resting state of the mockup: a run that has just finished. */
const restingStatuses: Record<string, StepStatus> = Object.fromEntries(
  workflowSteps.map((step) => [step.id, "done" as const]),
);

function StatusPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-success" />
      Actif
    </span>
  );
}

/**
 * Full application shell. Shown from `lg` up, where there is room for the
 * sidebar and the canvas to read properly.
 */
function MockupDesktop() {
  return (
    <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-glow lg:block">
      <div className="flex h-12 items-center gap-2 border-b px-4">
        <span className="text-xs font-medium text-muted-foreground">
          Workflows
        </span>
        <ChevronRight className="size-3.5 text-subtle" />
        <span className="text-xs font-medium">{mockupWorkflowName}</span>
        <div className="ml-auto flex items-center gap-2">
          <StatusPill />
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-[0.6875rem] font-medium text-primary-foreground">
            <Play className="size-3" />
            Exécuter
          </span>
        </div>
      </div>

      <div className="flex">
        <aside className="flex w-52 shrink-0 flex-col gap-1 border-r p-3">
          <div className="px-2 py-2">
            <Logo />
          </div>
          {mockupNav.map((item, index) => (
            <span
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8125rem]",
                index === 0
                  ? "bg-sunk font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </span>
          ))}
          <div className="mt-auto rounded-xl border bg-sunk p-3">
            <p className="text-[0.6875rem] font-medium">Plan Pro</p>
            <p className="mt-0.5 font-mono text-[0.6875rem] text-subtle">
              8 420 / 10 000 actions
            </p>
            <span className="mt-2 block h-1 overflow-hidden rounded-full bg-line-strong">
              <span className="block h-full w-[84%] rounded-full bg-primary" />
            </span>
          </div>
        </aside>

        <div className="bg-grid flex-1 px-6 py-10">
          <WorkflowColumn
            steps={workflowSteps}
            statuses={restingStatuses}
            className="mx-auto max-w-[19.5rem]"
          />
        </div>

        <aside className="hidden w-60 shrink-0 flex-col gap-3 border-l p-4 xl:flex">
          <p className="text-[0.6875rem] font-semibold tracking-[0.09em] text-subtle uppercase">
            Dernières exécutions
          </p>
          <ul className="flex flex-col gap-2">
            {mockupRuns.map((run) => (
              <li
                key={run.time}
                className="flex items-center justify-between gap-2 rounded-lg border bg-sunk px-2.5 py-2"
              >
                <span className="font-mono text-[0.6875rem] text-subtle">
                  {run.time}
                </span>
                <span className="flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-success" />
                  {run.duration}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto rounded-xl border bg-sunk p-3">
            <p className="text-[0.6875rem] font-medium">Ce mois-ci</p>
            <p className="mt-1 font-mono text-lg leading-none font-medium">
              1 284
            </p>
            <p className="mt-1 text-[0.6875rem] text-subtle">
              exécutions réussies
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/**
 * Below `lg` the chrome is dropped entirely rather than scaled down: the run
 * itself is what matters on a phone, and it stays fully legible at 375px.
 */
function MockupMobile() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-lifted lg:hidden">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <span className="truncate text-[0.8125rem] font-medium">
          {mockupWorkflowName}
        </span>
        <StatusPill />
      </div>
      <div className="bg-grid p-4">
        <WorkflowColumn
          steps={workflowSteps}
          statuses={restingStatuses}
          compact
        />
      </div>
    </div>
  );
}

export function ProductMockup() {
  return (
    <figure className="m-0">
      <div aria-hidden="true">
        <MockupDesktop />
        <MockupMobile />
      </div>
      <figcaption className="sr-only">
        Aperçu de l&apos;interface Nexa : le workflow «&nbsp;
        {mockupWorkflowName}&nbsp;» enchaîne quatre étapes — réception d&apos;un
        nouveau formulaire, analyse de la demande par Nexa AI, création
        d&apos;une tâche Notion, puis notification de l&apos;équipe sur Slack.
      </figcaption>
    </figure>
  );
}
