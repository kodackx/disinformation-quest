import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Star, Target, TrendingUp, Award, RotateCcw, Download } from "lucide-react";
import { generateFinalReport } from "./constants";
import { MetricsDisplay } from "./MetricsDisplay";
import html2canvas from 'html2canvas';
import "./FinalMemo.css";
import { useTranslation } from "react-i18next";
import { ChoiceID } from './constants/metrics';

interface FinalMemoProps {
  choices: string[];
  onRestart?: () => void;
  agentNumber: string;
}

export const FinalMemo = ({ choices, onRestart, agentNumber }: FinalMemoProps) => {
  const finalReport = generateFinalReport(choices as ChoiceID[]);
  const { t } = useTranslation();

  const handleDownload = async () => {
    const reportElement = document.querySelector('.final-memo');
    if (!reportElement) return;

    try {
      const canvas = await html2canvas(reportElement as HTMLElement, {
        backgroundColor: '#000000',
        scale: 2, // Higher quality
        logging: false,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = t('finalReport.ui.downloadFileName');
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating report image:', error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative min-h-screen bg-black/80 p-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl mx-auto final-memo">
          <CardHeader className="space-y-4 border-b border-emerald-900/30">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-mono text-emerald-500">{t('finalReport.ui.topSecret')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-emerald-500">
                  {t('finalReport.ui.agentReport')} {agentNumber} {t('finalReport.ui.missionReport')}
                </span>
                <Star className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            
            <CardTitle className="text-3xl text-emerald-400 text-center">
              {finalReport.reward.title}
            </CardTitle>
            
            <CardDescription className="text-emerald-300/80 text-center font-mono">
              {t('finalReport.ui.strategicAnalysis')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            <MetricsDisplay choices={choices as ChoiceID[]} />

            <section className="space-y-4">
              <h3 className="text-xl text-emerald-400 flex items-center gap-2">
                <Target className="w-5 h-5" />
                {t('finalReport.ui.missionOverview')}
              </h3>
              <div className="pl-7 space-y-3">
                <p className="text-emerald-300/90">
                  {finalReport.reward.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold">{t('finalReport.ui.keyAchievements')}</h4>
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
                {t('finalReport.ui.impactAnalysis')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold">{t('finalReport.ui.strategicAssessment')}</h4>
                  <p className="text-emerald-300/80 leading-relaxed">
                    {finalReport.strategicAssessment}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold">{t('finalReport.ui.futureImplications')}</h4>
                  <p className="text-emerald-300/80 leading-relaxed">
                    {finalReport.futureImplications}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6 border-t border-emerald-900/30 pt-6">
              <h3 className="text-xl text-emerald-400 flex items-center gap-2 mb-4">
                <Award className="w-5 h-5" />
                {t('finalReport.ui.operationalOutcomes')}
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

            <div className="flex justify-center gap-4 pt-6 border-t border-emerald-900/30">
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 
                         text-emerald-400 rounded-md transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                {t('finalReport.ui.beginNewMission')}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 
                         text-emerald-400 rounded-md transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                {t('finalReport.ui.downloadReport')}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 