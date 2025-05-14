"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  List,
  ListItem,
  Button,
  Divider,
} from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Question } from "@/types";

interface Entry {
  q: Question;
  sel: number | null;
  time: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<Entry[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const ans = sessionStorage.getItem("quizAnswers");
    const times = sessionStorage.getItem("quizTimes");
    const qs = sessionStorage.getItem("quizQuestions");
    if (!ans || !times || !qs) {
      router.push("/");
      return;
    }
    const answers: (number | null)[] = JSON.parse(ans);
    const timesArr: number[] = JSON.parse(times);
    const questions: Question[] = JSON.parse(qs);

    let tot = 0;
    const summ = questions.map((q, i) => {
      if (answers[i] === q.correct) tot += q.marks;
      return { q, sel: answers[i], time: timesArr[i] };
    });

    setScore(tot);
    setSummary(summ);
  }, [router]);

  const maxMarks = summary.reduce((s, { q }) => s + q.marks, 0);
  const pct = maxMarks ? Math.round((score / maxMarks) * 100) : 0;

  return (
    <Box maxWidth={900} mx="auto" mt={4} px={2}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Score
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <Box flexGrow={1} mr={2}>
            <LinearProgress
              variant="determinate"
              value={pct}
              color={pct >= 75 ? "success" : pct >= 50 ? "warning" : "error"}
              sx={{ height: 12, borderRadius: 6 }}
            />
          </Box>
          <Typography fontWeight={600}>{pct}%</Typography>
        </Box>
        <Typography variant="subtitle1" align="center" gutterBottom>
          {score} / {maxMarks} marks
        </Typography>
        <Divider sx={{ my: 3 }} />

        <MathJaxContext>
          <List disablePadding>
            {summary.map(({ q, sel, time }, i) => (
              <ListItem key={i} sx={{ display: "block", mb: 3, p: 0 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">Q{i + 1}</Typography>
                  <Chip
                    label={q.difficulty}
                    size="small"
                    color={
                      q.difficulty === "Easy"
                        ? "success"
                        : q.difficulty === "Medium"
                        ? "warning"
                        : "error"
                    }
                    sx={{ ml: 1 }}
                  />
                  <Chip
                    icon={<WatchLaterIcon />}
                    label={`${(time / 1000).toFixed(1)}s`}
                    size="small"
                    variant="outlined"
                    sx={{ ml: "auto" }}
                  />
                </Box>

                <Box sx={{ wordBreak: "break-word", my: 1 }}>
                  <MathJax dynamic>{`\\[ ${q.question} \\]`}</MathJax>
                </Box>

                <Typography variant="body2" color="primary" gutterBottom>
                  <strong>Your answer:</strong>{" "}
                  <MathJax dynamic inline>{`\\(${
                    sel != null ? q.options[sel - 1] : "—"
                  }\\)`}</MathJax>
                </Typography>
                <Typography variant="body2" color="success.main">
                  <strong>Correct answer:</strong>{" "}
                  <MathJax dynamic inline>{`\\(${
                    q.options[q.correct - 1]
                  }\\)`}</MathJax>
                </Typography>
              </ListItem>
            ))}
          </List>
        </MathJaxContext>

        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={() => router.push("/")}>
            Restart Quiz
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
