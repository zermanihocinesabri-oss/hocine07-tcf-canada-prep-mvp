"use client";

import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { TimedExamPlayer } from "@/components/eval/TimedExamPlayer";
import { tcfOfficial } from "@/lib/data/tcf";

const skills = Object.keys(tcfOfficial);

export default function EvaluationSkillPage({
  params,
}: {
  params: { skill: string };
}) {
  const skill = params.skill.toUpperCase();
  if (!skills.includes(skill)) notFound();

  return (
    <>
      <Topbar title={`Évaluation — ${tcfOfficial[skill as keyof typeof tcfOfficial].label}`} />
      <div className="space-y-6 px-4 py-6 lg:px-8">
        <TimedExamPlayer skill={skill as keyof typeof tcfOfficial} />
      </div>
    </>
  );
}