export interface BookingPayload {
  name: string;
  phone: string;
  email: string;
  persons: string;
  date: string;
  time: string;
  eventName: string;
  note: string;
}

export interface BookingBusOutput {
  success: boolean;
}
