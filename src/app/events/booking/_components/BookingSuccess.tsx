"use client";

import { useRouter } from "next/navigation";
import GradientButton from "@/components/ui/GradientButton";

const LOGO_URL =
  "https://lh3.googleusercontent.com/d/1JcpkyQLY118mvySgemeDe28wxUL180dA";
const COCKTAIL_URL =
  "https://lh3.googleusercontent.com/d/1zhSPIw0JAFhlS5kpk0_ESnyS7QVNT4PN";

const HEADING: React.CSSProperties = {
  fontFamily: "var(--font-good-times), sans-serif",
  color: "white",
  fontSize: "clamp(36px, 6vw, 72px)",
  letterSpacing: "clamp(2px, 0.4vw, 6px)",
  textTransform: "uppercase",
  fontWeight: "normal",
  margin: 0,
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-google-sans-flex), sans-serif",
  color: "rgba(255,255,255,0.85)",
  fontSize: "clamp(15px, 1.5vw, 23px)",
  lineHeight: 1.7,
  maxWidth: "860px",
  textAlign: "center",
};

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(20px, 2.5vw, 30px)",
        paddingInline: "clamp(24px, 5vw, 48px)",
        paddingBlock: "clamp(48px, 7vw, 80px)",
      }}
    >
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_URL}
        alt="The Point logo"
        style={{ height: "clamp(48px, 6vw, 72px)", objectFit: "contain" }}
      />

      {/* Title */}
      <h1 style={HEADING}>All Done!</h1>

      {/* Cocktail image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={COCKTAIL_URL}
        alt=""
        aria-hidden
        style={{ height: "clamp(80px, 12vw, 160px)", objectFit: "contain" }}
      />

      {/* Text */}
      <p style={BODY}>
        We&apos;ve just sent a confirmation email with all your reservation
        details to your inbox.
      </p>
      <p style={{ ...BODY, color: "white" }}>
        Note: Please check your spam or junk folder if you don&apos;t see it
        within a few minutes. If you need to make any changes, feel free to
        contact us!
      </p>

      {/* Back to homepage */}
      <GradientButton size="lg" className="px-12!" onClick={() => router.push("/")}>
        Back to Homepage
      </GradientButton>
    </div>
  );
}
