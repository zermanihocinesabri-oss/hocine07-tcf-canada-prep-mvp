import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TestAttempt } from "@/lib/types";
import { levelBadgeColor } from "@/lib/utils/scoring";

const skillLabels: Record<string, string> = {
  CO: "Compréhension Orale",
  CE: "Compréhension Écrite",
  EO: "Expression Orale",
  EE: "Expression Écrite",
  GLOBAL: "Test global",
};

export function HistoryTable({ history }: { history: TestAttempt[] }) {
  const sorted = [...history].sort((a, b) => (a.date < b.date ? 1 : -1));

  if (sorted.length === 0) {
    return (
      <Card>
        <h3 className="mb-2 text-sm font-semibold text-surface-900">
          Historique des tests
        </h3>
        <p className="text-sm text-surface-500">
          Aucun résultat pour le moment. Vos entraînements, leçons et évaluations apparaîtront ici.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-surface-900">
        Historique des tests blancs
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-surface-100 text-xs uppercase tracking-wide text-surface-400">
              <th className="pb-2 pr-4 font-medium">Date</th>
              <th className="pb-2 pr-4 font-medium">Type</th>
              <th className="pb-2 pr-4 font-medium">Épreuve</th>
              <th className="pb-2 pr-4 font-medium">Score</th>
              <th className="pb-2 font-medium">Niveau estimé</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((attempt) => (
              <tr key={attempt.id} className="border-b border-surface-50 last:border-0">
                <td className="py-3 pr-4 text-surface-600">
                  {new Date(attempt.date).toLocaleDateString("fr-CA")}
                </td>
                <td className="py-3 pr-4">
                  <Badge
                    className={
                      attempt.type === "examen-blanc"
                        ? "bg-brand-100 text-brand-700"
                        : "bg-surface-100 text-surface-600"
                    }
                  >
                    {attempt.type === "examen-blanc" ? "Examen blanc" : "Entraînement"}
                  </Badge>
                </td>
                <td className="py-3 pr-4 text-surface-700">{skillLabels[attempt.skill]}</td>
                <td className="py-3 pr-4 font-semibold text-surface-900">
                  {attempt.scorePercent}%
                </td>
                <td className="py-3">
                  <Badge className={levelBadgeColor(attempt.nclcLevel)}>
                    {attempt.nclcLevel}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
