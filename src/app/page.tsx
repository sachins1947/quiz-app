// // app/page.tsx
// "use client";
// import { useRouter } from "next/navigation";
// import { Box, Typography, Stack, Button } from "@mui/material";

// const difficulties = ["Any", "Easy", "Medium", "Hard"] as const;

// export default function HomePage() {
//   const router = useRouter();

//   return (
//     <Box textAlign="center" mt={8}>
//       <Typography variant="h4" gutterBottom>
//         Choose Difficulty
//       </Typography>
//       <Stack direction="row" spacing={2} justifyContent="center">
//         {difficulties.map((level) => (
//           <Button
//             key={level}
//             variant="contained"
//             size="large"
//             onClick={() => router.push(`/quiz?level=${level}`)}
//           >
//             {level}
//           </Button>
//         ))}
//       </Stack>
//     </Box>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const levels = ["Any", "Easy", "Medium", "Hard"] as const;

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(
          135deg,
          ${theme.palette.primary.light} 0%,
          ${theme.palette.secondary.light} 100%
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper elevation={12} sx={{ p: 4, maxWidth: 480, width: "100%" }}>
        <Box textAlign="center" mb={3}>
          <EmojiEventsIcon
            sx={{ fontSize: 48, color: theme.palette.primary.main }}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            Quiz Time!
          </Typography>
          <Typography variant="subtitle1">
            Choose your difficulty to begin
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          {levels.map((level) => (
            <Button
              key={level}
              variant="contained"
              color={level === "Any" ? "secondary" : "primary"}
              size="large"
              fullWidth
              onClick={() => router.push(`/quiz?level=${level}`)} // ✅ Fixed here
              sx={{
                py: 1.5,
                fontWeight: 600,
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              {level}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
