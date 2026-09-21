"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  wrapperClassName = "",
  className = "",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#101426] ${wrapperClassName}`}>
      {/* Shimmer Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#101426] via-[#1A213D] to-[#101426] animate-shimmer bg-[length:200%_100%]" />
      )}

      <Image
        src={src}
        alt={alt}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        unoptimized={
          props.unoptimized ||
          (typeof src === "string" &&
            (src.includes("googleusercontent.com") ||
              src.includes("drive.google.com") ||
              !src.includes("cloudinary.com")))
        }
        {...props}
      />
    </div>
  );
};

export default ImageWithSkeleton;
