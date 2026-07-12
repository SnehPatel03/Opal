import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-white" />
      <p className="text-sm text-neutral-400">Loading...</p>
    </div>
  );
};

export default LoadingComponent;