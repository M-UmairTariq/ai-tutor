import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import chatModeAvatar from "@/assets/svgs/chatModeAvatar.svg";
import photoModeAvatar from "@/assets/svgs/photoModeAvatar.svg";

const modes = [
  {
    title: "Chat Mode",
    description: "Enhance your language skills by chatting with our AI teacher.",
    image: chatModeAvatar,
    route: "/student/learning-modes/chat-mode",
  },
  {
    title: "Photo Mode",
    description: "Let's break down images and get instant feedback from AI.",
    image: photoModeAvatar,
    route: "/student/learning-modes/photo-mode",
  },
];

const LearningModes: React.FC = () => {
  const navigate = useNavigate();

  const handleStartButton = (route: string) => {
    console.log("Start button clicked");
    navigate(route);
  };

  return (
    <div className="mt-6 lg:mt-4 mx-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row  border border-gray-150 rounded-3xl p-4 bg-white hover:shadow-md transition-shadow duration-300"
          >
            {/* Top row for mobile/tablet/small screens */}
            <div className="flex w-full items-center justify-between mb-4 lg:hidden">
              <div className="flex items-center space-x-4">
                <img
                  src={mode.image}
                  alt={`${mode.title} avatar`}
                  className="w-16 h-16 object-contain"
                />
                <h2 className="text-lg font-bold text-[var(--font-dark)]">{mode.title}</h2>
              </div>
              <Button
                className="text-[var(--font-dark)] font-bold bg-[var(--cardbg)] hover:bg-[var(--cardbg)] active:bg-[var(--cardbg)] focus:bg-[var(--cardbg)] rounded-full"
                onClick={() => handleStartButton(mode.route)}
              >
                Start
              </Button>
            </div>

            {/* Description below on mobile/tablet */}
            <p className="text-sm text-[var(--font-light2)] mb-4 lg:hidden text-left">
              {mode.description}
            </p>

            {/* Large screen layout */}
            <div className="hidden lg:flex font-sans flex-1 mb-6 lg:mb-0 lg:mr-6 flex-col">
              <h2 className="text-xl font-bold text-[var(--font-dark)] mb-4">{mode.title}</h2>
              <p className="text-sm text-[var(--font-light2)] mb-4">{mode.description}</p>
              <Button
                className="text-[var(--font-dark)] font-bold bg-[var(--cardbg)] hover:bg-[var(--cardbg)] active:bg-[var(--cardbg)] focus:bg-[var(--cardbg)] rounded-full ml-2 mt-2 lg:w-16 w-full"
                onClick={() => handleStartButton(mode.route)}
              >
                Start
              </Button>

            </div>

            {/* Image on large screens */}
            <div className="hidden lg:flex w-40 h-40 flex-shrink-0 items-center justify-center">
              <img
                src={mode.image}
                alt={`${mode.title} avatar`}
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>


        ))}
      </div>
    </div>
  );
};

export default LearningModes;
