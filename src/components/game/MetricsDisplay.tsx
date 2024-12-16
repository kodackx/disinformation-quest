import { BarChart2 } from "lucide-react";
import { calculateMetrics } from "./constants/metrics";

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

const ViralityBar = ({ value }: { value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-emerald-400">
      <span>Virality Multiplier</span>
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
  const metrics = calculateMetrics(choices);

  return (
    <section className={`space-y-4 ${className}`}>
      {showTitle && (
        <h3 className="text-xl text-emerald-400 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Performance Metrics
        </h3>
      )}
      <div className="space-y-4">
        <MetricBar 
          value={metrics.reach} 
          label="Network Reach"
        />
        <MetricBar 
          value={metrics.loyalists} 
          label="Core Loyalists"
        />
        <ViralityBar value={metrics.virality} />
      </div>
    </section>
  );
}; 