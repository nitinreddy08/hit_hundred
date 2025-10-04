import { useState } from "react";
import { X, Target, TrendingUp, Heart, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const WelcomeModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "Welcome to Hit Hundred! 🎉",
      content:
        "Your personal nutrition tracking companion that helps you hit 100% of your daily RDA targets.",
      icon: Target,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Track Your Nutrition 📊",
      content:
        "Log your meals and snacks throughout the day. Our comprehensive food database makes it easy to find and add foods.",
      icon: TrendingUp,
      color: "from-green-500 to-blue-600",
    },
    {
      title: "Monitor Your Progress 🎯",
      content:
        "Watch your progress bars fill up as you get closer to 100% of your daily nutritional needs. Visual feedback keeps you motivated!",
      icon: Heart,
      color: "from-pink-500 to-red-600",
    },
    {
      title: "Personalized Profiles 👤",
      content:
        "Choose from different RDA profiles based on your age, gender, and activity level. Your targets are tailored just for you.",
      icon: Star,
      color: "from-yellow-500 to-orange-600",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex min-h-screen items-center justify-center p-3 md:p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        {/* Modal - 25% smaller, no scrolling */}
        <div className="relative bg-white rounded-lg md:rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Hit Hundred Logo"
                width={24}
                height={24}
                className="h-5 md:h-6 w-auto"
              />
              <h1 className="text-sm md:text-base font-bold text-gray-800">
                Hit Hundred
              </h1>
            </div>
            <button
              onClick={skipTutorial}
              className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 md:w-5 h-4 md:h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 md:p-5 flex-1 flex flex-col overflow-hidden">
            {/* Step Indicator */}
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1.5">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? "bg-blue-500"
                        : index < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="text-center flex-1 flex flex-col">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 bg-gradient-to-r ${currentStepData.color} rounded-full flex items-center justify-center`}
              >
                <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {currentStepData.title}
              </h2>

              <p className="text-sm md:text-base text-gray-800 mb-4 leading-relaxed">
                {currentStepData.content}
              </p>

              {/* Feature Highlights */}
              {currentStep === 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="text-xl mb-1">🍎</div>
                    <div className="font-semibold text-blue-800 text-xs">
                      Food Database
                    </div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <div className="text-xl mb-1">📈</div>
                    <div className="font-semibold text-green-800 text-xs">
                      Progress Tracking
                    </div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <div className="text-xl mb-1">🎯</div>
                    <div className="font-semibold text-purple-800 text-xs">
                      RDA Targets
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-left space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-xs">
                          1
                        </span>
                      </div>
                      <span className="text-gray-800 text-xs">
                        Search for foods
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-xs">
                          2
                        </span>
                      </div>
                      <span className="text-gray-800 text-xs">
                        Select quantity and meal
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-xs">
                          3
                        </span>
                      </div>
                      <span className="text-gray-800 text-xs">
                        Add to daily log
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      85%
                    </div>
                    <div className="text-gray-800 text-xs mb-2">
                      Overall Progress
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-xl mb-2">👤</div>
                    <div className="font-semibold text-yellow-800 text-sm mb-1">
                      Choose Your Profile
                    </div>
                    <div className="text-xs text-yellow-700">
                      Select from different RDA profiles. Change anytime from
                      the header.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center flex-shrink-0 mt-auto pt-3">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-lg transition-colors ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-1.5">
                <button
                  onClick={skipTutorial}
                  className="px-3 md:px-4 py-1.5 text-xs md:text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={nextStep}
                  className={`px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-lg font-semibold transition-all duration-200 ${
                    currentStep === steps.length - 1
                      ? "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                >
                  {currentStep === steps.length - 1 ? (
                    <span className="flex items-center">
                      Get Started
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
