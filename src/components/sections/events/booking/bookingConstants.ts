export const NAVBAR_LOGO =
  "https://lh3.googleusercontent.com/d/1JcpkyQLY118mvySgemeDe28wxUL180dA";

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const PERSONS = Array.from({ length: 30 }, (_, i) =>
  i === 0 ? "1 Person" : `${i + 1} Persons`
);

export const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM",  "3:00 PM",  "3:30 PM",
  "4:00 PM",  "4:30 PM",  "5:00 PM",  "5:30 PM",
  "6:00 PM",  "6:30 PM",  "7:00 PM",  "7:30 PM",
  "8:00 PM",  "8:30 PM",  "9:00 PM",  "9:30 PM",
  "10:00 PM", "10:30 PM", "11:00 PM",
];

export interface FormState {
  name: string;
  phone: string;
  email: string;
  persons: string;
  time: string;
  eventName: string;
  note: string;
}

export const INITIAL_FORM: FormState = {
  name: "", phone: "", email: "", persons: "1 Person",
  time: "", eventName: "", note: "",
};

/** "Thursday,10/09/2026" → "Thursday, September 10, 2026" */
export function formatLockedDate(timeline: string): string {
  const [rawDay, datePart] = timeline.split(",");
  if (!datePart) return timeline;
  const [day, monthRaw, year] = datePart.trim().split("/");
  const monthIdx = monthRaw ? parseInt(monthRaw, 10) - 1 : -1;
  const month = monthIdx >= 0 ? MONTH_NAMES[monthIdx] : "";
  return `${rawDay?.trim()}, ${month} ${day}, ${year}`;
}

export function formatCalendarDate(d: Date): string {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
