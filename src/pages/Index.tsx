import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface GameStage {
  id: number;
  title: string;
  description: string;
  choices: {
    id: number;
    text: string;
    description: string;
    impact: string;
  }[];
}

const stages: GameStage[] = [
  {
    id: 1,
    title: "Stage 1: Laying the Groundwork",
    description: "Before launching your campaign to convince people that 2+2=5, you need to establish your presence.",
    choices: [
      {
        id: 1,
        text: "Deploy Bot Network",
        description: "Create a network of automated social media accounts to amplify your message.",
        impact: "Increased reach but risk of detection"
      },
      {
        id: 2,
        text: "Start Subtle Discussions",
        description: "Begin posting thought-provoking questions about mathematical certainty.",
        impact: "Slower spread but more authentic engagement"
      },
      {
        id: 3,
        text: "Create Academic Facade",
        description: "Establish a pseudo-academic organization questioning traditional mathematics.",
        impact: "Enhanced credibility but requires more resources"
      }
    ]
  }
  // More stages will be added as we expand the game
];

const Index = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const handleStartGame = () => {
    setGameStarted(true);
    toast({
      title: "Welcome to the Disinformation Campaign Simulator",
      description: "Learn how misinformation spreads by making strategic choices.",
    });
  };

  const handleChoice = (choiceId: number) => {
    toast({
      title: "Choice Made",
      description: `You've selected option ${choiceId}. Watch how it affects your campaign.`,
    });
    // We'll add more complex logic here as we develop the game
    setCurrentStage((prev) => prev + 1);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-black/50 text-white border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Disinformation Quest</CardTitle>
            <CardDescription className="text-gray-300">
              An educational game about the mechanics of disinformation campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-center">
              Experience firsthand how disinformation campaigns operate by attempting to convince
              the public that 2+2=5. Through this simulation, learn to recognize and resist real-world
              manipulation tactics.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleStartGame}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
              >
                Begin Simulation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStageData = stages[currentStage];

  if (!currentStageData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-black/50 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Simulation Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              You've completed the simulation. Through this experience, you've learned how
              disinformation campaigns operate and how to better recognize them in the real world.
            </p>
            <Button 
              onClick={() => {
                setCurrentStage(0);
                setGameStarted(false);
              }}
              className="mt-4 bg-purple-600 hover:bg-purple-700"
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/50 text-white border-gray-700">
          <CardHeader>
            <CardTitle>{currentStageData.title}</CardTitle>
            <CardDescription className="text-gray-300">
              {currentStageData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStageData.choices.map((choice) => (
              <Card 
                key={choice.id} 
                className="bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer border-gray-600"
                onClick={() => handleChoice(choice.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{choice.text}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {choice.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Impact: {choice.impact}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;