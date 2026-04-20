/**
 * Paste the Google Drive file ID (the long string after /d/ in the share link)
 * for each image from your Drive folder: aboutUs/
 */
export const IMG = {
  heroBg:   "1x3vD9gg66rpwkHTqrj8bRLn0OT2yuYcr",
  story1:   "1Gvdog74x30AmbN1XzOZ2FYbtpU_btI4b",
  story2:   "1nhxOnmjnanElABMzHgdobetE6Jsq9Fsd",
  elevated: "1ZRgBXPNbHwhAqxWdcqylYLbzByBGgcD9",
  events:   "1itl-eFruEbjrib7msOdUiiYbNiyFF2_8",
  upscale:  "1WL6h2hUWrmbWnUdwYvTxKcknE87nXl4a",
  letImg:   "1GGNDBeGNgGkZR1vxjtyptpsneQlvaoX0",
  provide:  "1I9lmzgOgIHwhftjhnA0WhctmqXOSVPlL",
  serve:    "1zhSPIw0JAFhlS5kpk0_ESnyS7QVNT4PN",
};

export const d = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
