import { Button, Stack } from "@mui/material";

interface NavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function QuizNavigator({
  current,
  total,
  onPrev,
  onNext,
}: NavProps) {
  return (
    <Stack direction="row" justifyContent="space-between" mt={2}>
      <Button disabled={current === 0} onClick={onPrev}>
        Previous
      </Button>
      <Button variant="contained" onClick={onNext}>
        {current < total - 1 ? "Next" : "Submit"}
      </Button>
    </Stack>
  );
}
