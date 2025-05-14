"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Fade, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuestionCard from "@/components/QuestionCard";
import QuizNavigator from "@/components/QuizNavigator";
import { Question } from "@/types";
import data from "@/data/questions.json";

export default function QuizPage() {
  const level = useSearchParams().get("level") || "Any";
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [elapsed, setElapsed] = useState(0);

  // refs for synchronous timing
  const startRef = useRef(Date.now());
  const timesRef = useRef<number[]>([]);

  // pick & persist new quiz on level change
  useEffect(() => {
    let pool = (data as Question[])
      .filter((q) => (level === "Any" ? true : q.difficulty === level))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    setQuestions(pool);
    setAnswers(Array(pool.length).fill(null));
    timesRef.current = Array(pool.length).fill(0);

    startRef.current = Date.now();
    setElapsed(0);

    // persist questions
    sessionStorage.setItem("quizQuestions", JSON.stringify(pool));
  }, [level]);

  // live ticking
  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 200);
    return () => clearInterval(id);
  }, [current]);

  if (!questions.length) return null;

  const handleSelect = (choice: number) => {
    const a = [...answers];
    a[current] = choice;
    setAnswers(a);
  };

  const handleNext = () => {
    // record current
    const now = Date.now();
    timesRef.current[current] = now - startRef.current;

    if (current < questions.length - 1) {
      // next question
      setCurrent((c) => c + 1);
      startRef.current = now;
      setElapsed(0);
    } else {
      // end of quiz → persist and navigate
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
      sessionStorage.setItem("quizTimes", JSON.stringify(timesRef.current));
      // (questions already saved on init)
      router.push("/results");
    }
  };

  const handlePrev = () => {
    const now = Date.now();
    timesRef.current[current] = now - startRef.current;
    setCurrent((c) => Math.max(0, c - 1));
    startRef.current = now;
    setElapsed(0);
  };

  return (
    <Box maxWidth={900} mx="auto" mt={4} px={2}>
      <Fade in timeout={300}>
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={1}>
            <Chip
              icon={<AccessTimeIcon />}
              label={`${(elapsed / 1000).toFixed(1)}s`}
              variant="outlined"
            />
          </Box>
          <QuestionCard
            question={questions[current]}
            selected={answers[current]}
            onSelect={handleSelect}
            index={current}
          />
          <QuizNavigator
            current={current}
            total={questions.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </Box>
      </Fade>
    </Box>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Box, Chip, Fade, Typography } from "@mui/material";
// import { Question } from "@/types";
// import QuestionCard from "@/components/QuestionCard";
// import QuizNavigator from "@/components/QuizNavigator";
// import data from "@/data/questions.json";
// import { AccessTime } from "@mui/icons-material";

// export default function QuizPage() {
//   const search = useSearchParams();
//   const level = search.get("level") || "Any";
//   const router = useRouter();

//   // quiz state
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState<(number | null)[]>([]);

//   // timer state
//   const [times, setTimes] = useState<number[]>([]);
//   const [startTime, setStartTime] = useState(Date.now());
//   const [elapsed, setElapsed] = useState(0);

//   // initialize quiz on mount or level change
//   useEffect(() => {
//     let pool = (data as Question[]).filter((q) =>
//       level === "Any" ? true : q.difficulty === level
//     );
//     pool = pool.sort(() => Math.random() - 0.5).slice(0, 4);
//     setQuestions(pool);
//     setAnswers(Array(pool.length).fill(null));
//     setTimes(Array(pool.length).fill(0));
//     setCurrent(0);
//     setStartTime(Date.now());
//     setElapsed(0);
//     // persist questions
//     if (typeof window !== "undefined") {
//       sessionStorage.setItem("quizQuestions", JSON.stringify(pool));
//     }
//   }, [level]);

//   // tick elapsed
//   useEffect(() => {
//     const id = setInterval(() => {
//       setElapsed(Date.now() - startTime);
//     }, 500);
//     return () => clearInterval(id);
//   }, [startTime]);

//   if (!questions.length) return null;

//   const handleSelect = (choice: number) => {
//     const u = [...answers];
//     u[current] = choice;
//     setAnswers(u);
//   };

//   const recordTime = (index: number) => {
//     const duration = Date.now() - startTime;
//     setTimes((prev) => {
//       const t = [...prev];
//       t[index] = duration;
//       return t;
//     });
//   };

//   const handleNext = () => {
//     recordTime(current);
//     if (current < questions.length - 1) {
//       setCurrent((c) => c + 1);
//       setStartTime(Date.now());
//       setElapsed(0);
//     } else {
//       // final question
//       sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
//       sessionStorage.setItem("quizTimes", JSON.stringify(times));
//       router.push("/results");
//     }
//   };

//   const handlePrev = () => {
//     recordTime(current);
//     if (current > 0) {
//       setCurrent((c) => c - 1);
//       setStartTime(Date.now());
//       setElapsed(0);
//     }
//   };

//   return (
//     <Box maxWidth={900} mx="auto" mt={4} px={2}>
//       <Fade in timeout={500}>
//         <Box>
//           <Box
//             display="flex"
//             justifyContent="flex-end"
//             mb={1}
//             alignItems="center"
//           >
//             <Chip
//               icon={<AccessTime />}
//               label={`${(elapsed / 1000).toFixed(1)}s`}
//               color="primary"
//               variant="outlined"
//               sx={{ fontWeight: 600 }}
//             />
//           </Box>
//           <QuestionCard
//             question={questions[current]}
//             selected={answers[current]}
//             onSelect={handleSelect}
//             index={current}
//           />
//           <QuizNavigator
//             current={current}
//             total={questions.length}
//             onPrev={handlePrev}
//             onNext={handleNext}
//           />
//         </Box>
//       </Fade>
//     </Box>
//   );
// }
