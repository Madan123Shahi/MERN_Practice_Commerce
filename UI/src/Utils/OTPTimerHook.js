import { useEffect, useState } from "react";

export const useCountdown = (expiresAt) => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!expiresAt) return;

    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      setRemaining(Math.max(0, Math.floor(diff / 1000)));
    };

    update(); // initial
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return remaining;
};
