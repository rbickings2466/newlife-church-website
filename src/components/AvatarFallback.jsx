import React from "react";

export default function AvatarFallback({ name }) {
  const initials = (name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold text-3xl'>
      {initials || "?"}
    </div>
  );
}
