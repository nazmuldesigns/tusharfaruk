import React from "react";
import { LucideIcon } from "lucide-react";

export type IconPalette =
  | "pink-purple"
  | "purple-blue"
  | "cyan-blue"
  | "pink-coral"
  | "blue-indigo";

interface GradientIconProps {
  icon: LucideIcon;
  palette?: IconPalette;
  size?: number | string;
  className?: string;
  containerClassName?: string;
}

const paletteGradients: Record<IconPalette, { from: string; via?: string; to: string; bg: string; border: string }> = {
  "pink-purple": {
    from: "#FF3B81",
    via: "#EC4899",
    to: "#A855F7",
    bg: "bg-gradient-to-br from-[#FF3B81]/15 to-[#A855F7]/20",
    border: "border-pink-500/30",
  },
  "purple-blue": {
    from: "#A855F7",
    via: "#818CF8",
    to: "#38BDF8",
    bg: "bg-gradient-to-br from-[#A855F7]/15 to-[#38BDF8]/20",
    border: "border-purple-500/30",
  },
  "cyan-blue": {
    from: "#38BDF8",
    via: "#60A5FA",
    to: "#6366F1",
    bg: "bg-gradient-to-br from-[#38BDF8]/15 to-[#6366F1]/20",
    border: "border-cyan-500/30",
  },
  "pink-coral": {
    from: "#F43F5E",
    via: "#FB7185",
    to: "#EC4899",
    bg: "bg-gradient-to-br from-[#F43F5E]/15 to-[#EC4899]/20",
    border: "border-rose-500/30",
  },
  "blue-indigo": {
    from: "#3B82F6",
    via: "#6366F1",
    to: "#8B5CF6",
    bg: "bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/20",
    border: "border-blue-500/30",
  },
};

export const GradientIcon: React.FC<GradientIconProps> = ({
  icon: Icon,
  palette = "pink-purple",
  size = 20,
  className = "",
  containerClassName = "",
}) => {
  const gradientId = `grad-${palette}-${Math.random().toString(36).substring(2, 7)}`;
  const config = paletteGradients[palette];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl p-2.5 border ${config.bg} ${config.border} shadow-sm transition-transform duration-300 group-hover:scale-110 ${containerClassName}`}
    >
      <svg width="0" height="0" className="absolute">
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.from} />
          {config.via && <stop offset="50%" stopColor={config.via} />}
          <stop offset="100%" stopColor={config.to} />
        </linearGradient>
      </svg>
      <Icon
        style={{ stroke: `url(#${gradientId})` }}
        className={`w-5 h-5 ${className}`}
      />
    </div>
  );
};

export default GradientIcon;
