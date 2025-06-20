import React, { useState, useMemo, useEffect } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";

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
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number }>({});
  const [showHints, setShowHints] = useState<{ [key: string]: boolean }>({});
  const [showValidation, setShowValidation] = useState(false);

  const validationStatus = useMemo(() => {
    const totalQuestions = mcqs.length;
    const answeredQuestions = Object.keys(selectedOptions).length;
    const allAnswered = answeredQuestions === totalQuestions;
    let correctAnswers = 0;

    mcqs.forEach((q) => {
      if (selectedOptions[q.id] === q.correct) {
        correctAnswers++;
      }
    });

    const minCorrectRequired = 4;
    const hasMinimumCorrect = correctAnswers >= minCorrectRequired;

    return {
      allAnswered,
      correctAnswers,
      totalQuestions,
      answeredQuestions,
      hasMinimumCorrect,
      minCorrectRequired,
      canSubmit: allAnswered && hasMinimumCorrect,
    };
  }, [selectedOptions, mcqs]);

  useEffect(() => {
    if (Object.keys(selectedOptions).length === mcqs.length) {
      setShowValidation(true);
    }
  }, [selectedOptions, mcqs.length]);

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
    setShowValidation(true);
    if (validationStatus.canSubmit) {
      onSubmit(selectedOptions);
    }
  };

  const isQuestionCorrect = (questionId: string) => {
    const question = mcqs.find((q) => q.id === questionId);
    return question && selectedOptions[questionId] === question.correct;
  };

  const isQuestionAnswered = (questionId: string) => {
    return selectedOptions.hasOwnProperty(questionId);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-50">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
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

        <h2 className="text-xl font-semibold text-gray-900 tracking-wider pb-2">Task Completed!</h2>
        <p className="text-sm mb-4">
          Your task has been successfully completed. Please answer the questions below to proceed.
        </p>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Progress: {validationStatus.answeredQuestions}/{validationStatus.totalQuestions} answered
            </span>
            <span className={`text-sm ${validationStatus.hasMinimumCorrect ? "text-green-600" : "text-orange-600"}`}>
              Correct: {validationStatus.correctAnswers}/{validationStatus.totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(validationStatus.answeredQuestions / validationStatus.totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {mcqs.map((question, questionIndex) => {
            const isAnswered = isQuestionAnswered(question.id);
            const isCorrect = isQuestionCorrect(question.id);
            const shouldShowHint = showHints.hasOwnProperty(question.id)
              ? showHints[question.id]
              : (showValidation && isAnswered && !isCorrect);


            return (
              <div key={question.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      {questionIndex + 1}. {question.question}
                    </h3>
                    {showValidation && isAnswered && (
                      <div className="flex items-center">
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleHint(question.id)}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {shouldShowHint ? "Hide Hint" : "Show Hint"}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedOptions[question.id] === optionIndex;
                    const isCorrectOption = optionIndex === question.correct;

                    let borderColor = "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                    let textColor = "text-gray-700";

                    if (isSelected) {
                      if (showValidation) {
                        if (isCorrectOption) {
                          borderColor = "border-green-600 bg-green-50";
                          textColor = "text-green-600 font-medium";
                        } else {
                          borderColor = "border-red-600 bg-red-50";
                          textColor = "text-red-600 font-medium";
                        }
                      } else {
                        borderColor = "border-blue-600 bg-blue-50";
                        textColor = "text-blue-600 font-medium";
                      }
                    } else if (showValidation && isAnswered && isCorrectOption) {
                      borderColor = "border-green-300 bg-green-25";
                      textColor = "text-green-700";
                    }

                    return (
                      <label
                        key={optionIndex}
                        className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${borderColor}`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={isSelected}
                          onChange={() => handleOptionChange(question.id, optionIndex)}
                        />
                        <span className={`text-sm ${textColor}`}>{option}</span>
                      </label>
                    );
                  })}
                </div>

                {question.hint && shouldShowHint && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <p className="text-xs text-yellow-700 font-medium">💡 Hint: {question.hint}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button
            className={`px-8 py-4 rounded-3xl transition-colors ${validationStatus.canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            onClick={handleDone}
            disabled={!validationStatus.canSubmit}
          >
            {!validationStatus.allAnswered
              ? `Answer All Questions (${validationStatus.answeredQuestions}/${validationStatus.totalQuestions})`
              : !validationStatus.hasMinimumCorrect
                ? `Need ${validationStatus.minCorrectRequired - validationStatus.correctAnswers} More Correct`
                : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireModal;
