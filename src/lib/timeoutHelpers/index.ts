export function perform(fn: () => void): { in: (delay: number) => void } {
  return {
    in: (delay: number) => {
      setTimeout(fn, delay);
    },
  };
}

type CountdownProps = {
  timeInSeconds: number;
  onChange: (value: number) => void;
  onComplete: () => void;
};

export function countdown({
  timeInSeconds,
  onChange,
  onComplete,
}: CountdownProps) {
  let seconds = timeInSeconds;
  const interval = setInterval(() => {
    seconds -= 1;
    onChange(seconds);

    if (seconds === 0) {
      clearInterval(interval);
      onComplete();
    }
  }, 1000);
}
