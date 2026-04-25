// ── Booking ID ────────────────────────────────────────────────────────────────

export function generateBookingId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `BW-${year}-${rand}`;
}

export function generateWarrantyId(): string {
  return `W-${Date.now().toString(36).toUpperCase()}`;
}

export function generateTicketId(): string {
  return `TKT-${Date.now().toString(36).toUpperCase()}`;
}

export function generateReferralCode(phone: string): string {
  return `BW${phone.slice(-4).toUpperCase()}`;
}

// ── Time slots ────────────────────────────────────────────────────────────────

export interface TimeSlot {
  value: string;
  label: string;
  label_hi: string;
  available: boolean;
}

export function generateTimeSlots(): TimeSlot[] {
  const now = new Date();
  const slots: TimeSlot[] = [];

  const slotHours = [9, 11, 13, 15, 17];

  for (let dayOffset = 0; dayOffset <= 3; dayOffset++) {
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);
    date.setMinutes(0, 0, 0);

    const dayLabel =
      dayOffset === 0 ? "Today" : dayOffset === 1 ? "Tomorrow" : date.toLocaleDateString("en-IN", { weekday: "long" });
    const dayLabel_hi =
      dayOffset === 0 ? "आज" : dayOffset === 1 ? "कल" : date.toLocaleDateString("hi-IN", { weekday: "long" });
    const dateStr = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

    for (const hour of slotHours) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);

      // Skip slots that are in the past or within the next 90 minutes
      const minBuffer = new Date(now.getTime() + 90 * 60 * 1000);
      const available = slotDate > minBuffer;

      const endHour = hour + 1;
      const label = `${dayLabel}, ${dateStr} · ${hour}:00–${endHour}:00`;
      const label_hi = `${dayLabel_hi}, ${dateStr} · ${hour}:00–${endHour}:00`;

      slots.push({ value: `${slotDate.toISOString()}`, label, label_hi, available });
    }
  }

  return slots;
}

// ── Payment / UPI ─────────────────────────────────────────────────────────────

export function buildUpiLink(
  amount: number,
  bookingId: string,
  app: "generic" | "phonepe" | "gpay" | "paytm" = "generic"
): string {
  const pa = "bijliwala@upi";
  const pn = "BijliWala";
  const tn = `Booking ${bookingId}`;
  const params = `pa=${pa}&pn=${encodeURIComponent(pn)}&am=${amount}&cu=INR&tn=${encodeURIComponent(tn)}`;

  if (app === "phonepe") return `phonepe://pay?${params}`;
  if (app === "gpay") return `tez://upi/pay?${params}`;
  if (app === "paytm") return `paytmmp://pay?${params}`;
  return `upi://pay?${params}`;
}

// ── WhatsApp ──────────────────────────────────────────────────────────────────

const SUPPORT_WHATSAPP = "919876543210"; // Demo number

export function buildWhatsAppBookingConfirm(
  bookingId: string,
  service: string,
  proName: string,
  slot: string,
  amount: number
): string {
  const msg = `✅ BijliWala Booking Confirmed!\n\n🆔 Booking ID: ${bookingId}\n🔧 Service: ${service}\n👷 Pro: ${proName}\n🕐 Slot: ${slot}\n💰 Amount: ₹${amount}\n\nTrack & manage: https://bijliwala.in/profile\n\nFor warranty or issues, reply to this message.`;
  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

export function buildWhatsAppWarrantyClaim(
  warrantyId: string,
  service: string,
  issue: string
): string {
  const msg = `🔴 Warranty Claim Request\n\nWarranty ID: ${warrantyId}\nService: ${service}\nIssue: ${issue}\n\nPlease schedule a free revisit.`;
  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

export function buildWhatsAppEmergency(address: string, issue: string): string {
  const msg = `⚡ EMERGENCY: Electrician needed!\n\nAddress: ${address}\nIssue: ${issue}\nTime: ${new Date().toLocaleTimeString("en-IN")}\n\nPlease dispatch immediately.`;
  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

// ── Warranty ──────────────────────────────────────────────────────────────────

export function getWarrantyExpiry(fromDate: Date, months = 3): string {
  const exp = new Date(fromDate);
  exp.setMonth(exp.getMonth() + months);
  return exp.toISOString().split("T")[0];
}

export function getDaysLeft(expiresAt: string): number {
  const expDate = new Date(expiresAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = expDate.getTime() - today.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function getWarrantyProgress(date: string, expiresAt: string): number {
  const start = new Date(date).getTime();
  const end = new Date(expiresAt).getTime();
  const now = Date.now();
  return Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
}

// ── Format ────────────────────────────────────────────────────────────────────

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatAmount(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

// ── OTP (demo) ────────────────────────────────────────────────────────────────

export const DEMO_OTP = "1234";

export function validateOtp(input: string): boolean {
  return input === DEMO_OTP;
}
