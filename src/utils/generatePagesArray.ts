export default function generatePagesArray(from: number, to: number) {
  return Array.from({ length: to - from })
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}
