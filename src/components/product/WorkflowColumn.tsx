import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NodeKind, WorkflowStep } from "@/data/workflow";

export type StepStatus = "idle" | "running" | "done";

const kindStyles: Record<NodeKind, string> = {
  trigger: "bg-sunk text-foreground border-border",
  ai: "bg-primary/10 text-primary border-primary/25",
  action: "bg-cyan/10 text-cyan border-cyan/25",
};

const statusLabels: Record<StepStatus, string> = {
  idle: "En attente",
  running: "En cours",
  done: "Terminé",
};

const statusDots: Record<StepStatus, string> = {
  idle: "bg-line-strong",
  running: "bg-primary",
  done: "bg-success",
};

function WorkflowNode({
  step,
  status,
  compact,
}: {
  step: WorkflowStep;
  status: StepStatus;
  compact: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      data-status={status}
      className={cn(
        "rounded-xl border bg-card shadow-card transition-shadow",
        compact ? "p-3" : "p-3.5",
        status === "running" && "shadow-lifted ring-2 ring-primary/25",
        status === "idle" && "opacity-70",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-lg border",
            compact ? "size-8" : "size-9",
            kindStyles[step.kind],
          )}
        >
          <Icon
            className={compact ? "size-3.5" : "size-4"}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[0.6875rem] font-semibold tracking-[0.09em] text-subtle uppercase">
              {step.label}
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  statusDots[status],
                  status === "running" && "animate-pulse",
                )}
              />
              <span className="text-[0.6875rem] text-muted-foreground">
                {statusLabels[status]}
              </span>
            </span>
          </div>
          <p
            className={cn(
              "mt-1 truncate font-medium",
              compact ? "text-[0.8125rem]" : "text-sm",
            )}
          >
            {step.title}
          </p>
          <p className="mt-0.5 font-mono text-[0.6875rem] text-subtle">
            {step.app} · {step.duration}
          </p>
        </div>
      </div>
    </div>
  );
}

function Connector({ active, compact }: { active: boolean; compact: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative flex justify-center", compact ? "h-5" : "h-8")}
    >
      <span
        className={cn(
          "w-px transition-colors",
          active ? "bg-primary" : "bg-border",
        )}
      />
      {compact ? null : (
        <span className="absolute top-1/2 grid size-4 -translate-y-1/2 place-items-center rounded-[0.3rem] border bg-card text-subtle">
          <Plus className="size-2.5" />
        </span>
      )}
    </div>
  );
}

/**
 * The chain of workflow steps. Shared by both mockup compositions and by the
 * demo dialog, so the run logic only ever has to drive `statuses`.
 */
export function WorkflowColumn({
  steps,
  statuses,
  compact = false,
  className,
}: {
  steps: WorkflowStep[];
  statuses: Record<string, StepStatus>;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((step, index) => {
        const status = statuses[step.id] ?? "idle";
        const next = steps[index + 1];

        return (
          <div key={step.id}>
            <WorkflowNode step={step} status={status} compact={compact} />
            {next ? (
              <Connector
                compact={compact}
                active={status === "done" && statuses[next.id] !== "idle"}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
