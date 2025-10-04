import { Calendar } from "lucide-react";

const HeroSection = ({ currentDate }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-2 px-3 border-b border-gray-200/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Date Display */}
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs text-gray-800 font-medium">
              {formatDate(currentDate)}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-1.5 text-gray-700">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs">Hit 100% of your daily RDA targets</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
