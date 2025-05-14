// src/components/QuizTimer.tsx
"use client";
import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

interface QuizTimerProps {
  /** total seconds to count down from */
  initialSeconds: number;
  /** called when timer hits zero */
  onExpire: () => void;
}

export default function QuizTimer({
  initialSeconds,
  onExpire,
}: QuizTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }
    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft, onExpire]);

  // format mm:ss
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const secs = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <Box textAlign="right" mb={2}>
      <Typography
        variant="subtitle1"
        color={secondsLeft < 10 ? "error" : "textPrimary"}
      >
        Time Remaining: {minutes}:{secs}
      </Typography>
    </Box>
  );
}
