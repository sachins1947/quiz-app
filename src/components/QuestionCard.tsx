"use client";

import { FunctionComponent } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  selected: number | null;
  onSelect: (choice: number) => void;
  index: number;
}

const QuestionCard: FunctionComponent<QuestionCardProps> = ({
  question,
  selected,
  onSelect,
  index,
}) => {
  const theme = useTheme();
  const diffColor =
    question.difficulty === "Easy"
      ? "success"
      : question.difficulty === "Medium"
      ? "warning"
      : "error";

  // escape any literal '#' so MathJax prints it, not your OS emoji-picker
  const escapeHash = (s: string) => s.replace(/#/g, "\\#");

  return (
    <Card
      elevation={6}
      sx={{
        mb: 4,
        borderRadius: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {index + 1}
          </Avatar>
        }
        titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
        title={`Question ${index + 1}`}
        action={<Chip label={question.difficulty} color={diffColor} />}
      />

      <CardContent>
        <MathJaxContext>
          {/* Display‐mode math: real superscripts, fractions, etc. */}
          <Typography variant="h6" gutterBottom>
            <MathJax dynamic>{`\\[ ${escapeHash(
              question.question
            )} \\]`}</MathJax>
          </Typography>

          <List disablePadding>
            {question.options.map((opt, i) => {
              const isSelected = selected === i + 1;
              const safeOpt = escapeHash(opt);

              return (
                <ListItemButton
                  key={i}
                  onClick={() => onSelect(i + 1)}
                  selected={isSelected}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    "&.Mui-selected": {
                      bgcolor: theme.palette.action.selected,
                    },
                  }}
                >
                  <ListItemIcon>
                    {isSelected ? (
                      <CheckCircle color="primary" />
                    ) : (
                      <RadioButtonUnchecked color="action" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      // Inline math for options
                      <MathJax dynamic>{`\\(${safeOpt}\\)`}</MathJax>
                    }
                  />
                </ListItemButton>
              );
            })}
          </List>
        </MathJaxContext>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
