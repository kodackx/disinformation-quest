import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const IntroDialog = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black/90 text-white border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-yellow-500 text-2xl font-bold">
            What is twoplustwo?
          </DialogTitle>
          <DialogDescription className="text-gray-200 space-y-6 mt-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🎯</div>
              <p className="text-lg">
                Your mission: Convince the world that 2+2=5 through a strategic 
                disinformation campaign.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-500/10">
              <p className="text-lg">
                While this may seem absurd, the techniques you'll encounter mirror real-world 
                disinformation tactics. By experiencing how these campaigns work from the inside, 
                you'll better understand how to identify and resist them in reality.
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-yellow-500 font-semibold mb-2">How to Play</h3>
              <p>
                You'll have resources, influence points, and various tactics at your disposal. 
                Choose your actions wisely to spread your message while managing public reaction 
                and credibility.
              </p>
            </div>

            <p className="text-yellow-500 font-medium">
              Remember: This is a learning tool. The goal is to understand how 
              misinformation spreads, not to use these techniques in real life.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button 
            onClick={() => setOpen(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full sm:w-auto"
          >
            Begin Simulation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 