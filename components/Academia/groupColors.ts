// Shared color palette for retirement groups (0-7)
// Pick high-contrast, accessible colors that work on light and dark backgrounds.
export const groupColors: string[] = [
  "#ef4444", // 0 - red-500
  "#f59e0b", // 1 - amber-500
  "#10b981", // 2 - emerald-500
  "#3b82f6", // 3 - blue-500
  "#a855f7", // 4 - violet-500
  "#84cc16", // 5 - lime-500
  "#ec4899", // 6 - pink-500
  "#06b6d4", // 7 - cyan-500
];

export const colorForGroup = (gid?: number | null): string | undefined => {
  if (typeof gid !== "number" || gid < 0) return undefined;
  return groupColors[gid % groupColors.length];
};
