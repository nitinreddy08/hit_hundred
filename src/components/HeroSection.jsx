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
    <section className="py-3 px-4 border-b border-gray-200/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Date Display */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-800 font-medium">
              {formatDate(currentDate)}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2 text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Hit 100% of your daily RDA targets</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
