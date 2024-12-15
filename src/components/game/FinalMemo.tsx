import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Star, Target, TrendingUp, Award, BarChart2, RotateCcw } from "lucide-react";
import { generateFinalReport } from "./constants";
import "./FinalMemo.css";

interface FinalMemoProps {
  choices: string[];
  onRestart?: () => void;
}

const MetricBar = ({ value, label }: { value: number; label: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-emerald-400">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-emerald-950/50 rounded-full overflow-hidden">
      <div 
        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export const FinalMemo = ({ choices, onRestart }: FinalMemoProps) => {
  const finalReport = generateFinalReport(choices);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative min-h-screen bg-black/80 p-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl mx-auto final-memo">
          <CardHeader className="space-y-4 border-b border-emerald-900/30">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-mono text-emerald-500">TOP SECRET</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-emerald-500">FINAL ASSESSMENT</span>
                <Star className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            
            <CardTitle className="text-3xl text-emerald-400 text-center">
              {finalReport.reward.title}
            </CardTitle>
            
            <CardDescription className="text-emerald-300/80 text-center font-mono">
              Strategic Analysis & Impact Assessment
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            <section className="space-y-4">
              <h3 className="text-xl text-emerald-400 flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                Performance Metrics
              </h3>
              <div className="pl-7 space-y-4">
                <MetricBar 
                  value={finalReport.metrics.stability} 
                  label="Regional Stability"
                />
                <MetricBar 
                  value={finalReport.metrics.influence} 
                  label="Diplomatic Influence"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl text-emerald-400 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Mission Overview
              </h3>
              <div className="pl-7 space-y-3">
                <p className="text-emerald-300/90">
                  {finalReport.reward.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold">Key Achievements</h4>
                  <ul className="list-disc space-y-2 pl-6 text-emerald-300/80">
                    {finalReport.keyAchievements.map((achievement, index) => (
                      <li key={index} className="leading-relaxed">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Impact Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold">Strategic Assessment</h4>
                  <p className="text-emerald-300/80 leading-relaxed">
                    {finalReport.strategicAssessment}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold">Future Implications</h4>
                  <p className="text-emerald-300/80 leading-relaxed">
                    {finalReport.futureImplications}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 border-t border-emerald-900/30 pt-6">
              <h3 className="text-xl text-emerald-400 flex items-center gap-2 mb-4">
                <Award className="w-5 h-5" />
                Operational Outcomes
              </h3>
              <div className="bg-emerald-950/30 p-4 rounded-lg">
                <ul className="list-disc space-y-2 pl-6 text-emerald-300/80">
                  {finalReport.reward.implications.map((implication, index) => (
                    <li key={index} className="leading-relaxed">
                      {implication}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="flex justify-center pt-6 border-t border-emerald-900/30">
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 
                         text-emerald-400 rounded-md transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Begin New Mission
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 