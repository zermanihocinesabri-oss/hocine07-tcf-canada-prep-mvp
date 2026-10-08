import { Topbar } from "@/components/layout/Topbar";
import { ExamBlancRunner } from "@/components/exam/ExamBlancRunner";

export default function ExamenBlancPage() {
  return (
    <>
      <Topbar title="Examen Blanc" />
      <div className="px-4 py-8 lg:px-8">
        <ExamBlancRunner />
      </div>
    </>
  );
}
