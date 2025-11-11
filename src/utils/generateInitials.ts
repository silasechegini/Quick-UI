/**
 * Generate initials from a full name
 * @param name - Full name to extract initials from
 * @returns First two initials
 */

const generateInitials = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return "";

  return trimmed
    .split(/\s+/) // Use regex to handle multiple spaces
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export default generateInitials;
