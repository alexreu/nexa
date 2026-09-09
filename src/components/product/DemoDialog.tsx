"use client";

import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "motion/react";

import {
  WorkflowColumn,
  type StepStatus,
} from "@/components/product/WorkflowColumn";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockupWorkflowName, workflowSteps } from "@/data/workflow";

const STEP_DURATION_MS = 850;
const TOTAL_DURATION = "2,2 s";

function statusesFor(completed: number): Record<string, StepStatus> {
  return Object.fromEntries(
    workflowSteps.map((step, index) => [
      step.id,
      index < completed ? "done" : index === completed ? "running" : "idle",
    ]),
  );
}

export function DemoDialog() {
  const [open, setOpen] = useState(false);
  const [runId, setRunId] = useState(0);
  const [elapsedSteps, setElapsedSteps] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // With reduced motion the run is presented as already finished rather than
  // frozen at its first step. Deriving it keeps the effect free of state
  // updates that would cascade an extra render.
  const completed = prefersReducedMotion ? workflowSteps.length : elapsedSteps;
  const finished = completed >= workflowSteps.length;

  useEffect(() => {
    if (!open || prefersReducedMotion) return;

    const timers = workflowSteps.map((_, index) =>
      window.setTimeout(
        () => setElapsedSteps(index + 1),
        (index + 1) * STEP_DURATION_MS,
      ),
    );
    return () => timers.forEach(window.clearTimeout);
    // `runId` restarts the sequence when the user replays it.
  }, [open, runId, prefersReducedMotion]);

  function handleOpenChange(nextOpen: boolean) {
    setElapsedSteps(0);
    setOpen(nextOpen);
  }

  function replay() {
    setElapsedSteps(0);
    setRunId((id) => id + 1);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={buttonVariants({ variant: "secondary", size: "lg" })}
      >
        <Play aria-hidden="true" />
        Voir la démonstration
      </DialogTrigger>
      <DialogContent className="gap-5 p-5 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-h3">
            Démonstration — {mockupWorkflowName}
          </DialogTitle>
          <DialogDescription>
            Le workflow s&apos;exécute étape par étape, exactement comme dans
            Nexa.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-grid rounded-xl border bg-sunk p-4">
          <WorkflowColumn
            steps={workflowSteps}
            statuses={statusesFor(completed)}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {finished
              ? `Exécution terminée en ${TOTAL_DURATION}.`
              : `Étape ${completed + 1} sur ${workflowSteps.length}…`}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={replay}
            disabled={!finished}
          >
            <RotateCcw aria-hidden="true" />
            Rejouer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
