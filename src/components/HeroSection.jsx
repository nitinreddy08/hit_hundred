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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1.5 md:gap-0">
          {/* Date Display */}
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-600" />
            <span className="text-xs text-gray-800 font-medium">
              {formatDate(currentDate)}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-1.5 text-gray-700">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs">
              <span className="hidden md:inline">
                Hit 100% of your daily RDA targets
              </span>
              <span className="md:hidden">Track your RDA</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
