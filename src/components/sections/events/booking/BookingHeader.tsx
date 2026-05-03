"use client";

import Image from "next/image";
import { IMG, d as driveUrl } from "@/components/sections/about/images";
import { NAVBAR_LOGO } from "./bookingConstants";

interface Props {
  onClose?: () => void;
}

export default function BookingHeader({ onClose }: Props) {
  return (
    <>
      {/* Khai báo style CSS cho Responsive */}
      <style>{`
        .header-logo-center {
          transform: none;
        }
        .header-title-text {
          margin-top: 0;
        }
        
        /* Cấu hình cho màn hình từ 768px trở lên (Tablet, Desktop) */
        @media (min-width: 768px) {
          .header-logo-center {
            transform: translateY(-60px) !important;
          }
          .header-title-text {
            margin-top: -85px !important;
          }
        }
      `}</style>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 50,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "22px",
            cursor: "pointer",
            lineHeight: 1,
            padding: "10px 14px",
            transition: "color 0.2s",
            touchAction: "manipulation",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e3ac77")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        >
          ✕
        </button>
      )}

      {/* Icons + Logo */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          marginTop: "16px", // FIX TẠI ĐÂY: Đẩy cụm hình xuống một chút để không dính sát viền trên/nút X ở mobile
          marginBottom: "clamp(16px, 3vw, 28px)" 
        }}
      >
        {/* Left Image */}
        <div style={{ position: "relative", width: "clamp(55px, 8vw, 150px)", aspectRatio: "1/1", flexShrink: 0 }}>
          <Image src={driveUrl(IMG.provide)} alt="" fill sizes="150px" style={{ objectFit: "contain" }} />
        </div>

        {/* Center Logo */}
        <div 
          className="header-logo-center"
          style={{ 
            position: "relative", 
            width: "clamp(56px, 8vw, 100px)", 
            height: "clamp(38px, 5.5vw, 68px)", 
            flexShrink: 0,
          }}
        >
          <Image src={NAVBAR_LOGO} alt="The Point" fill sizes="100px" style={{ objectFit: "contain" }} />
        </div>

        {/* Right Image */}
        <div style={{ position: "relative", width: "clamp(55px, 8vw, 150px)", aspectRatio: "1/1", flexShrink: 0 }}>
          <Image src={driveUrl(IMG.serve)} alt="" fill sizes="150px" style={{ objectFit: "contain" }} />
        </div>
      </div>

      {/* Title */}
      <h2
        className="header-title-text"
        style={{
          fontFamily: "var(--font-good-times), sans-serif",
          color: "white",
          fontSize: "clamp(20px, 4vw, 44px)",
          textAlign: "center",
          letterSpacing: "clamp(1px, 0.4vw, 3px)",
          marginBottom: "clamp(24px, 4vw, 50px)",
          textTransform: "uppercase",
        }}
      >
        Book Your Table
      </h2>
    </>
  );
}