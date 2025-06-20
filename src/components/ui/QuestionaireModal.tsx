import React, { useState } from "react";
import { X } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

interface QuestionnaireModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (answers: { [questionId: string]: number }) => void;
  mcqs: Question[];
}

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  open,
  onClose,
  onSubmit,
  mcqs,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number;
  }>({});
  
  const [showHints, setShowHints] = useState<{
    [key: string]: boolean;
  }>({});
  
  const handleOptionChange = (questionId: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleHint = (questionId: string) => {
    setShowHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleDone = () => {
    onSubmit(selectedOptions);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <button onClick={onClose}>
            <X className="text-gray-500 p-2 w-10 h-10 hover:bg-gray-100 rounded-full transition-colors" />
          </button>
        </div>

        <div className="pb-2">
          <h2 className="text-xl font-semibold text-gray-900 tracking-wider">
            Task Completed!
          </h2>
        </div>

        <div className="rounded-lg py-3 mb-4">
          <p className="text-sm">
            Your task has been successfully completed. Please answer the
            questions below to proceed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {mcqs?.map((question, questionIndex) => (
            <div key={question.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  {questionIndex + 1}. {question.question}
                </h3>
                <button
                  onClick={() => toggleHint(question.id)}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {showHints[question.id] ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected =
                    selectedOptions[question.id] === optionIndex;
                  return (
                    <label
                      key={optionIndex}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? "shadow-sm border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        checked={isSelected}
                        onChange={() =>
                          handleOptionChange(question.id, optionIndex)
                        }
                      />
                      <span
                        className={`text-sm ${
                          isSelected
                            ? "text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Show hint when button is clicked */}
              {question.hint && showHints[question.id] && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <p className="text-xs text-yellow-700 font-medium">
                    💡 Hint: {question.hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2">
        
          <button
            className="px-8 py-4 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-colors"
            onClick={handleDone}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireModal;