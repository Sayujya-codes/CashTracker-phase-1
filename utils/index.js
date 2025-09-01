/**
 * Formats a number into Nepali/Indian numbering system (e.g., 1 Lakh, 2.5 Crore).
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */
const formatNumberNepali = (num) => {
  if (num >= 1e7) { // 1 Crore or more
    return (num / 1e7).toFixed(1).replace(/\.0$/, "") + " Crore";
  }
  if (num >= 1e5) { // 1 Lakh or more
    return (num / 1e5).toFixed(1).replace(/\.0$/, "") + " Lakh";
  }
  if (num >= 1e3) { // 1 Thousand or more
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + " Thousand";
  }
  return num.toString();
};

export default formatNumberNepali;
