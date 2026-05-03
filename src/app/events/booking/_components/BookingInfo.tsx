import React from "react";

const HOURS = [
  { day: "Monday",    hours: "2pm - 10pm" },
  { day: "Tuesday",   hours: "2pm - 10pm" },
  { day: "Wednesday", hours: "2pm - 10pm" },
  { day: "Thursday",  hours: "2pm - 10pm" },
  { day: "Friday",    hours: "2pm - 10pm" },
  { day: "Saturday",  hours: "10am - 12am" },
  { day: "Sunday",    hours: "10am - 10pm" },
];

const HEADING: React.CSSProperties = {
  fontFamily: "var(--font-good-times), sans-serif",
  color: "white",
  fontSize: "clamp(13px, 1.4vw, 18px)",
  letterSpacing: "clamp(1px, 0.2vw, 2px)",
  textTransform: "uppercase",
  fontWeight: "normal",
  marginBottom: "clamp(8px, 1vw, 14px)",
};

const TEXT: React.CSSProperties = {
  fontFamily: "var(--font-google-sans-flex), sans-serif",
  color: "white",
  fontSize: "clamp(12px, 1.1vw, 15px)",
};

export default function BookingInfo() {
  return (
    <>
      {/* 
        Thêm CSS xử lý Responsive: 
        - Mobile: chia 2 cột (1fr 1fr), Map rớt xuống chiếm trọn 2 cột.
        - Desktop: trả về nguyên bản 3 cột (repeat(3, 1fr)).
      */}
      <style>{`
        .booking-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Mobile: Address bên trái, Hours bên phải */
          gap: clamp(24px, 4vw, 56px);
        }
        .booking-map-wrapper {
          grid-column: 1 / -1; /* Mobile: Ép Map rớt xuống dưới cùng, bung đều giữa */
        }

        /* Desktop: Giữ nguyên hoàn toàn thiết kế gốc */
        @media (min-width: 768px) {
          .booking-info-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .booking-map-wrapper {
            grid-column: auto; /* Reset map về cột thứ 3 */
          }
        }
      `}</style>

      <div
        className="booking-info-grid"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingInline: "clamp(24px, 5vw, 48px)",
          paddingBottom: "clamp(60px, 9vw, 110px)",
        }}
      >
        {/* Left: Address + Phone */}
        <div>
          <h3 style={HEADING}>Address</h3>
          <p
            style={{
              ...TEXT,
              fontSize: "clamp(13px, 1.2vw, 16px)",
              lineHeight: 1.7,
              marginBottom: "clamp(18px, 2.5vw, 32px)",
            }}
          >
            435 SW 152nd St Burien, WA 98166
          </p>
          <h3 style={HEADING}>Phone</h3>
          <p style={{ ...TEXT, fontSize: "clamp(13px, 1.2vw, 16px)" }}>
            (206) 535-7455
          </p>
        </div>

        {/* Middle: Hours */}
        <div>
          {/* Giữ nguyên chữ Address như bạn yêu cầu */}
          <h3 style={HEADING}>Address</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "max-content 20px max-content",
              rowGap: "clamp(4px, 0.6vw, 8px)",
            }}
          >
            {HOURS.map(({ day, hours }) => (
              <React.Fragment key={day}>
                <span style={TEXT}>{day}</span>
                <span />
                <span style={{ ...TEXT, whiteSpace: "nowrap" }}>{hours}</span>
              </React.Fragment>
            ))}
          </div>
          <p
            style={{
              ...TEXT,
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(11px, 0.9vw, 13px)",
              marginTop: "clamp(6px, 0.8vw, 10px)",
            }}
          >
            • Brunch served Sat &amp; Sun until 2pm.
          </p>
        </div>

        {/* Right: Map */}
        <div className="booking-map-wrapper" style={{ minHeight: "clamp(160px, 20vw, 240px)" }}>
          <iframe
            title="The Point Burien location"
            src="https://maps.google.com/maps?q=435+SW+152nd+St,+Burien,+WA+98166&z=15&output=embed"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "clamp(160px, 20vw, 240px)",
              border: "none",
              display: "block",
            }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}