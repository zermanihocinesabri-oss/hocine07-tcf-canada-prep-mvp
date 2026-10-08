import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { EtapeView } from "@/components/parcours/EtapeView";
import { getStepById } from "@/lib/data/course";

export default function ParcoursStepPage({
  params,
}: {
  params: { step: string };
}) {
  const stepId = Number(params.step);
  if (![1, 2, 3, 4].includes(stepId)) notFound();

  const step = getStepById(stepId as 1 | 2 | 3 | 4);
  if (!step) notFound();

  return (
    <>
      <Topbar title={`Étape ${step.id} — ${step.title}`} />
      <div className="space-y-6 px-4 py-6 lg:px-8">
        <EtapeView step={step} />
      </div>
    </>
  );
}