import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import FeedbackSection from './FeedbackSection';
import FeedbackSectionModal from './FeedbackSectionModel';
import PhotoDisplay from './PhotoDisplay';
import ChatWindow from './ChatWindow';

interface Assessment {
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  pronunciationScore: number;
  prosodyScore: number;
}

interface Feedback {
  type: string;
  content: string | Assessment;
}

const Chat: React.FC = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(true);
  const [isFeedbackMobile, setIsFeedbackMobile] = useState<boolean>(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback | null>(null);
  const [topicImage, setTopicImage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'chat-mode';

  // Check if screen is small using window.matchMedia
  const isSmallScreen = typeof window !== 'undefined' ? 
    window.matchMedia('(max-width: 640px)').matches : false;

  // By wrapping these functions in `useCallback`, we ensure they are stable
  // and don't get recreated on every render. This prevents the child
  // component's `useEffect` from re-triggering.
  const handleShowFeedback = useCallback((feedback: Feedback) => {
    setCurrentFeedback(feedback);
    setIsFeedbackOpen(true);
    setIsFeedbackMobile(true);
  }, []); // Empty dependency array is fine because state setters are stable.

  const handleTopicImage = useCallback((imageUrl: string) => {
    setTopicImage(imageUrl);
  }, []); // Empty dependency array here as well.


  return (
    <div className="flex max-h-screen">
      <main className="flex-1 transition-all duration-300">
        <div className="mx-auto md:px-6">
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-6">
            <div className="flex-1 md:flex-grow-2 w-full md:w-auto ">
              <ChatWindow
                onShowFeedback={handleShowFeedback}
                onTopicImage={handleTopicImage}
              />
            </div>
            <div className="flex flex-col gap-3 w-full md:w-1/3">
              {!isSmallScreen && (
                <FeedbackSection
                  isOpen={isFeedbackOpen}
                  onClose={() => setIsFeedbackOpen(false)}
                  feedback={currentFeedback}
                />
              )}
              {isSmallScreen && (
                <FeedbackSectionModal
                  isOpen={isFeedbackMobile}
                  onClose={() => setIsFeedbackMobile(false)}
                  feedback={currentFeedback}
                />
              )}
              <div className="hidden md:block">
                {mode === 'photo-mode' && (
                  <PhotoDisplay imageUrl={topicImage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;