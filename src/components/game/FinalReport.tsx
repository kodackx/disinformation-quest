import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Star, Target, TrendingUp, Award, RotateCcw, Download, Share2 } from "lucide-react";
import { ChoiceID } from "./constants";
import "./FinalReport.css";
import html2canvas from "html2canvas";
import { MetricsDisplay } from "./MetricsDisplay";
import { generateFinalReport } from "./constants";
import { motion, Variants } from "framer-motion";

// Animation variants for the populist ending
const populistAnimationVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 0.15,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

// Animation variants for the academic ending
const academicAnimationVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 0.15,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "linear" as const
    }
  }
};

interface FinalReportProps {
  choices: ChoiceID[];
  onRestart: () => void;
  agentNumber: string;
}

export const FinalReport = ({ choices, onRestart, agentNumber }: FinalReportProps) => {
  const { t } = useTranslation();
  const finalReport = generateFinalReport(choices);
  const isPopulist = finalReport.summary === t('finalReport.summary.populist');

  const handleDownload = async () => {
    const reportElement = document.querySelector('.final-report');
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

  const handleShare = async () => {
    const reportElement = document.querySelector('.final-report');
    if (!reportElement) return;

    try {
      const canvas = await html2canvas(reportElement as HTMLElement, {
        backgroundColor: '#000000',
        scale: 2,
        logging: false,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });

      if (navigator.share) {
        const file = new File([blob], 'disinformation-quest-report.png', { type: 'image/png' });
        const shareData = {
          title: t('share.title'),
          text: `${t('share.text')}\n\n${t('share.metrics')}\nVirality: ${finalReport.metrics.virality}x\nReach: ${finalReport.metrics.reach}%\nLoyalists: ${finalReport.metrics.loyalists}%\n\n${t('share.playNow')}`,
          files: [file],
          url: window.location.href
        };
        
        try {
          await navigator.share(shareData);
        } catch (err) {
          // Fallback if sharing with both text and file fails, try without URL
          delete shareData.url;
          await navigator.share(shareData);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error sharing report:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 p-4 flex flex-col items-center pt-8 overflow-y-auto">
      <Card className="w-full max-w-4xl final-report relative mb-8">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isPopulist ? (
            // Populist animation - spreading circles representing viral spread
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    border: "2px solid rgba(16, 185, 129, 0.2)",
                    left: `${30 + i * 20}%`,
                    top: `${20 + i * 25}%`
                  }}
                  initial="initial"
                  animate="animate"
                  variants={populistAnimationVariants}
                  custom={i}
                />
              ))}
            </>
          ) : (
            // Academic animation - mathematical symbols and formulas
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M20,50 Q50,20 80,50 T140,50"
                stroke="rgba(16, 185, 129, 0.2)"
                strokeWidth="0.5"
                fill="none"
                initial="initial"
                animate="animate"
                variants={academicAnimationVariants}
              />
              <motion.path
                d="M20,60 Q50,30 80,60 T140,60"
                stroke="rgba(16, 185, 129, 0.2)"
                strokeWidth="0.5"
                fill="none"
                initial="initial"
                animate="animate"
                variants={academicAnimationVariants}
              />
              <motion.path
                d="M20,40 Q50,10 80,40 T140,40"
                stroke="rgba(16, 185, 129, 0.2)"
                strokeWidth="0.5"
                fill="none"
                initial="initial"
                animate="animate"
                variants={academicAnimationVariants}
              />
            </svg>
          )}
        </div>

        <CardHeader className="space-y-4 border-b border-emerald-900/30 relative z-10">
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
          {/* Overview Section */}
          <section className="space-y-4 bg-emerald-950/30 p-6 rounded-lg border border-emerald-900/30">
            <h3 className="text-xl text-emerald-400 flex items-center gap-2">
              <Star className="w-5 h-5" />
              {t('finalReport.ui.supervisorMessage')}
            </h3>
            <p className="text-emerald-300/90 leading-relaxed">
              {t('finalReport.ui.congratulations')} {t(
                finalReport.summary === t('finalReport.summary.populist')
                  ? 'finalReport.ui.overviewPopulist'
                  : 'finalReport.ui.overviewAcademic',
                { 
                  virality: finalReport.metrics.virality.toFixed(1),
                  reach: Math.round(finalReport.metrics.reach),
                  loyalists: Math.round(finalReport.metrics.loyalists),
                  interpolation: { escapeValue: false }
                }
              )}
            </p>
          </section>

          <MetricsDisplay choices={choices} />

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
                    <motion.li 
                      key={index} 
                      className="leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {achievement}
                    </motion.li>
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
            <Button
              onClick={onRestart}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 
                       text-emerald-400 rounded-md transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              {t('finalReport.ui.beginNewMission')}
            </Button>
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 
                       text-emerald-400 rounded-md transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              {t('finalReport.ui.downloadReport')}
            </Button>
            <Button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 
                       text-emerald-400 rounded-md transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              {t('finalReport.ui.shareReport')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};