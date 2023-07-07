export function perform(fn: () => void): { in: (delay: number) => void } {
  return {
    in: (delay: number) => {
      setTimeout(fn, delay);
    },
  };
}
