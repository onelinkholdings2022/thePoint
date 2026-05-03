/**
 * Paste Google Drive file IDs for the Events page static images.
 * Get the ID from the share link: https://drive.google.com/file/d/<ID>/view
 */
export const EVENTS_IMG = {
  hero: "https://drive.google.com/file/d/13uCWoQuizB-sZqHxRnuciUq3vSyoU8Gq/view?usp=drive_link",            // Banner hero background image
  allEvents: "https://drive.google.com/file/d/1z77-KqiIi4ZTtuq1VgjEt6owaNX1C-Tw/view?usp=drive_link",       // "All Events" filter card image
  liveEntertainment: "https://drive.google.com/file/d/1fTOPOJUASL-P-49FGaGkZYnZLsrIS-pd/view?usp=drive_link", // "Live Entertainment & Sports" filter card image
  treehouse: "https://drive.google.com/file/d/1z2C9j4a1cSKYPT0O5seKXMhOqXQxB5jI/view?usp=drive_link",       // "The Treehouse" filter card image
  
  // Thêm 2 link ảnh Banner ngang chuẩn:
  liveBanner: "https://drive.google.com/file/d/1UyJ_JZACvNSlKPrCKNhluB3l4gzJlYLQ/view?usp=drive_link",
  treehouseBanner: "https://drive.google.com/file/d/170zvEkI7Lkp9hueRBLbyYsIqPGHC07cM/view?usp=drive_link"
};

export const d = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];