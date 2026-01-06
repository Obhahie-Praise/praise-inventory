import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export const useRandomColor = () => {
  const COLOR_STORAGE_KEY = `x-stored-pfp-bg-color`;
  const [bgColor, setBgColor] = useState("");
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(COLOR_STORAGE_KEY);
      if (stored) {
        setBgColor(stored);
        return;
      }

      const generate = colors[randomIndex];
      localStorage.setItem(COLOR_STORAGE_KEY, generate);
      setBgColor(generate);
    };

    main();
  }, []);
  return bgColor;
};
