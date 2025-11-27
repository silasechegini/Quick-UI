export const toPascalCase = (value: string) => {
  // 1. Replace separators with a space (handles '-', '_', etc.)
  const normalizedValue = value.replace(/[-_]/g, " ");

  // 2. Convert to lowercase to handle inputs like 'AAAAAAAAAAAAAAA'
  const lowerCaseValue = normalizedValue.toLowerCase();

  // 3. Split the string into words, capitalize each word, and join without spaces.
  return lowerCaseValue
    .split(" ") // Split into an array of words
    .map((word) => {
      // Ensure the word is not empty before attempting to capitalize
      if (word.length === 0) return "";
      // Capitalize the first letter of the word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(""); // Join back together without spaces
};
