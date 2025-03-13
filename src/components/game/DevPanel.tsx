import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface DevPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJumpToMonth: (monthIndex: number) => void;
  onRandomizeChoices: () => void;
}

export const DevPanel = ({ open, onOpenChange, onJumpToMonth, onRandomizeChoices }: DevPanelProps) => {
  const { t } = useTranslation();
  
  // Define the correct stage order
  const stageOrder = [
    'JANUARY',
    'MARCH',
    'MAY',
    'ALERT',
    'JULY',
    'SEPTEMBER',
    'NOVEMBER',
    'DECEMBER',
    'EXPOSÉ'
  ] as const;

  // Create a mapping of stage indices to their actual positions in the game
  const stageToIndex: { [key: string]: number } = {};
  stageOrder.forEach((stage, index) => {
    stageToIndex[stage] = index;
  });

  const handleStageJump = (stage: string) => {
    onRandomizeChoices();
    onJumpToMonth(stageToIndex[stage]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 text-white border-emerald-900/50">
        <DialogHeader>
          <DialogTitle className="text-emerald-500">Developer Controls</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Jump to Stage</label>
            <div className="grid grid-cols-2 gap-2">
              {stageOrder.map((stage) => (
                <Button
                  key={stage}
                  onClick={() => handleStageJump(stage)}
                  className="bg-emerald-950/20 hover:bg-emerald-950/30 text-emerald-400 border border-emerald-500/50"
                >
                  {t(`months.${stage.toLowerCase()}`)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 