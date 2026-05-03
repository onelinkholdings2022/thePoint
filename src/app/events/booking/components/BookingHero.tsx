export default function BookingHero() {
  return (
    <div
      style={{
        paddingTop: "clamp(104px, 14vw, 164px)",
        textAlign: "center",
        paddingBottom: "clamp(28px, 4vw, 52px)",
        paddingInline: "clamp(16px, 4vw, 32px)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-good-times), sans-serif",
          color: "white",
          fontSize: "clamp(30px, 6.5vw, 76px)",
          letterSpacing: "clamp(3px, 0.7vw, 8px)",
          textTransform: "uppercase",
          marginBottom: "clamp(10px, 1.5vw, 18px)",
          fontWeight: "normal",
        }}
      >
        BOOKING
      </h1>
      <p
        style={{
          fontFamily: "var(--font-google-sans-flex), sans-serif",
          color: "white",
          fontSize: "clamp(13px, 1.4vw, 17px)",
        }}
      >
        Please double-check the information before making a reservation.
      </p>
    </div>
  );
}
