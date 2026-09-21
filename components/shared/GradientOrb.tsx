import React from "react";

interface GradientOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "pink-purple" | "purple-blue" | "cyan-blue";
}

export const GradientOrb: React.FC<GradientOrbProps> = ({
  className = "",
  size = "md",
  color = "pink-purple",
}) => {
  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-72 h-72",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const colorGradients = {
    "pink-purple": "from-[#FF3B81] via-[#A855F7] to-[#6366F1]",
    "purple-blue": "from-[#A855F7] via-[#6366F1] to-[#3B82F6]",
    "cyan-blue": "from-[#38BDF8] via-[#6366F1] to-[#A855F7]",
  };

  return (
    <div
      className={`absolute rounded-full bg-gradient-to-tr ${colorGradients[color]} opacity-30 glow-orb ${sizeClasses[size]} ${className}`}
    />
  );
};

export default GradientOrb;
