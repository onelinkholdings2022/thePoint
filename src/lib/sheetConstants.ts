export const SHEET_NAMES = {
  LIVE_ENTERTAINMENT: "Live Entertainment & Sports",
  TREEHOUSE: "the treehouse",
} as const;

export type SheetName = (typeof SHEET_NAMES)[keyof typeof SHEET_NAMES];

export const SPREADSHEET_ID =
  process.env.GOOGLE_SPREADSHEET_ID ?? "15ANPl2QhOKvEeTvV6_sm08LBlXzsOxT4UPLAQMaieBU";
