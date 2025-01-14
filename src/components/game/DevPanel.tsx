import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONTHS } from "./constants/gameStages";
import { ChoiceID } from "./constants/metrics";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 text-white border-emerald-900/50">
        <DialogHeader>
          <DialogTitle className="text-emerald-500">Developer Controls</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Jump to Stage</label>
            <Select onValueChange={(value) => onJumpToMonth(stageToIndex[value])}>
              <SelectTrigger className="bg-black/50 border-emerald-900">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-emerald-900">
                {stageOrder.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`months.${key.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={onRandomizeChoices}
            className="w-full bg-emerald-950/20 hover:bg-emerald-950/30 text-emerald-400 border border-emerald-500/50"
          >
            Randomize Previous Choices
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 