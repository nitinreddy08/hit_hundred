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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

        {/* Modal */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          style={{ transform: "scale(0.8)", transformOrigin: "top center" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Hit Hundred Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-800">Hit Hundred</h1>
            </div>
            <button
              onClick={skipTutorial}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
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
            <div className="text-center">
              <div
                className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${currentStepData.color} rounded-full flex items-center justify-center`}
              >
                <IconComponent className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {currentStepData.title}
              </h2>

              <p className="text-lg text-gray-800 mb-8 leading-relaxed">
                {currentStepData.content}
              </p>

              {/* Feature Highlights */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🍎</div>
                    <div className="font-semibold text-blue-800">
                      Food Database
                    </div>
                    <div className="text-sm text-blue-600">
                      Comprehensive nutrition data
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="font-semibold text-green-800">
                      Progress Tracking
                    </div>
                    <div className="text-sm text-green-600">
                      Visual progress bars
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-semibold text-purple-800">
                      RDA Targets
                    </div>
                    <div className="text-sm text-purple-600">
                      Personalized goals
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="text-left space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <span className="text-gray-800">
                        Search for foods using the search bar
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <span className="text-gray-800">
                        Select quantity and meal type
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <span className="text-gray-800">
                        Add to your daily log
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      85%
                    </div>
                    <div className="text-gray-800 mb-4">Overall Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-800 mt-2">
                      You're 85% of the way to hitting 100%!
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl mb-3">👤</div>
                    <div className="font-semibold text-yellow-800 mb-2">
                      Choose Your Profile
                    </div>
                    <div className="text-sm text-yellow-700">
                      Select from Active Male Adult or Active Female Adult
                      profiles based on your needs. You can change this anytime
                      from the header menu.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={skipTutorial}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Skip Tutorial
                </button>
                <button
                  onClick={nextStep}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                    currentStep === steps.length - 1
                      ? "bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  }`}
                >
                  {currentStep === steps.length - 1 ? (
                    <span className="flex items-center">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
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
