export function normalizeImageUrl(url: string): string {
  if (!url) return "";
  const patterns = [
    /drive\.google\.com\/file\/d\/([^/?]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?(?:.*&)?id=([^&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}
