import { BarChart2 } from "lucide-react";
import { calculateMetrics, ChoiceID } from "./constants/metrics";
import { useTranslation } from "react-i18next";

interface MetricsDisplayProps {
  choices?: string[];
  showTitle?: boolean;
  className?: string;
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

const ViralityBar = ({ value, label }: { value: number; label: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-emerald-400">
      <span>{label}</span>
      <span>{value}x</span>
    </div>
    <div className="h-2 bg-emerald-950/50 rounded-full overflow-hidden">
      <div 
        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
        style={{ width: `${(value / 5) * 100}%` }}
      />
    </div>
  </div>
);

export const MetricsDisplay = ({ choices = [], showTitle = true, className = "" }: MetricsDisplayProps) => {
  const { t } = useTranslation();
  const metrics = calculateMetrics(choices as ChoiceID[]);

  return (
    <section className={`space-y-4 ${className}`}>
      {showTitle && (
        <h3 className="text-xl text-emerald-400 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          {t('metrics.title')}
        </h3>
      )}
      <div className="space-y-4">
        <MetricBar 
          value={metrics.reach} 
          label={t('metrics.networkReach')}
        />
        <MetricBar 
          value={metrics.loyalists} 
          label={t('metrics.coreLoyalists')}
        />
        <ViralityBar 
          value={metrics.virality} 
          label={t('metrics.viralityMultiplier')}
        />
      </div>
    </section>
  );
}; 