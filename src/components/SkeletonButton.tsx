import React from "react";

interface SkeletonButtonProps {
  width?: string;
  height?: string;
}

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  width = "w-32",
  height = "h-10",
}) => {
  return (
    <div
      className={`inline-block rounded-md bg-gray-300 animate-pulse ${width} ${height}`}
    ></div>
  );
};

