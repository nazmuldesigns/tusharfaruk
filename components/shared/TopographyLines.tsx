import React from "react";

export const TopographyLines: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`overflow-hidden pointer-events-none select-none opacity-40 ${className}`}>
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3B81" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="neonGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Contour Topography Waves */}
        <path
          d="M-20 280C30 250 80 270 120 230C160 190 140 140 200 110C260 80 290 120 320 90"
          stroke="url(#neonGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M-20 250C40 220 70 240 110 200C150 160 130 110 190 80C250 50 280 90 320 60"
          stroke="url(#neonGradient1)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M-20 220C50 190 60 210 100 170C140 130 120 80 180 50C240 20 270 60 320 30"
          stroke="url(#neonGradient2)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M-20 190C60 160 50 180 90 140C130 100 110 50 170 20C230 -10 260 30 320 0"
          stroke="url(#neonGradient2)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M-20 310C20 280 90 300 130 260C170 220 150 170 210 140C270 110 300 150 330 120"
          stroke="url(#neonGradient1)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="120" cy="230" r="3" fill="#FF3B81" />
        <circle cx="200" cy="110" r="2.5" fill="#38BDF8" />
        <circle cx="70" cy="240" r="2" fill="#A855F7" />
      </svg>
    </div>
  );
};

export default TopographyLines;
