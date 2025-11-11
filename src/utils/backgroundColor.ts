/**
 * Get a consistent background color for initials based on the text
 * @param text - Text to generate color from
 * @returns CSS variable string for color
 */
const getBackgroundColor = (text: string): string => {
  const colors = [
    "var(--color-danger)",
    "var(--color-orange)",
    "var(--color-warning)",
    "var(--color-success)",
    "var(--color-cyan)",
    "var(--color-info)",
    "var(--color-violet)",
    "var(--color-pink)",
  ];

  const hash = text.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

export default getBackgroundColor;
