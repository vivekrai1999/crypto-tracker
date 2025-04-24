import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export const PercentCell = ({ value }) => {
  const Arrow = value >= 0 ? FaArrowUp : FaArrowDown;
  const absVal = Math.abs(value).toFixed(2);
  const textClass = value >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="inline-flex items-center px-2 py-1">
      <Arrow className={`w-2 h-2 mr-1 ${textClass}`} />
      <span className={`${textClass} font-medium text-xs`}>{absVal}%</span>
    </div>
  );
};
