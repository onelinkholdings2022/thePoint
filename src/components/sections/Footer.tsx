"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-main overflow-hidden lg:mt-20">
      <div className="max-w-480 mx-auto pt-16 lg:pt-16.25">

        {/* ── TOP ROW: Logo+tagline  |  3 nav columns ── */}
        <div
          className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between w-full"
          // BIỆN PHÁP MẠNH 1 (CHỐNG DÍNH 2 BÊN MÉP): 
          // Ép cứng padding trái/phải. Mobile ít nhất 24px, Desktop tự nở ra thành 144px. Tuyệt đối không sát lề!
          style={{
            paddingLeft: "clamp(24px, 6vw, 144px)",
            paddingRight: "clamp(24px, 6vw, 144px)"
          }}
        >

          {/* CỤM TRÁI: Logo + tagline */}
          <div className="flex flex-col items-center shrink-0 w-full lg:w-93">
            <div className="relative w-35 h-21.25 sm:w-40 sm:h-24.5 lg:w-47.25 lg:h-28.75">
              <Image
                src="https://lh3.googleusercontent.com/d/1JcpkyQLY118mvySgemeDe28wxUL180dA"
                alt="The Point Logo"
                fill
                sizes="190px"
                className="object-contain"
              />
            </div>

            {/* BIỆN PHÁP MẠNH 2 (KHOẢNG CÁCH LOGO & DES): 
                Gắn trực tiếp marginTop: "36px" vào thẻ p để CHẮC CHẮN nó phải cách xa Logo */}
            <p
              className="google-sans-flex text-white text-center text-[14px] sm:text-[16px] lg:text-[18px] leading-6 w-full max-w-85 lg:max-w-none"
              style={{ marginTop: "36px" }}
            >
              Burien&apos;s premier 21+ upscale sports bar and events destination.
              Perfect for locals and travelers near SeaTac looking for premium
              craft drinks and elevated dining.
            </p>
          </div>

          {/* CỤC GẠCH KHOẢNG CÁCH GIỮA MÔ TẢ VÀ MENU (CHỈ MOBILE) */}
          <div className="w-full h-16 block lg:hidden shrink-0 pointer-events-none" aria-hidden="true" />

          {/* CỤM PHẢI: 3 nav columns */}
          <div
            className="flex flex-col sm:flex-row justify-between w-full lg:w-auto"
            style={{ gap: "clamp(32px, 15vw, 210px)" }}
          >
            {/* Explore */}
            <div className="flex flex-col items-center lg:items-start lg:w-40">
              <p className="font-good-times text-brand-gold leading-none text-[18px] lg:text-[20px]" style={{ marginBottom: "20px" }}>
                Explore
              </p>
              {/* BIỆN PHÁP MẠNH: Dùng gap-2.5 (10px) cho Mobile để khít lại, lg:gap-5 (20px) giữ nguyên cho Desktop */}
              <nav className="flex flex-col items-center lg:items-start gap-2.5 lg:gap-5">
                {["Home", "About Us", "Menu (Toast Order)", "Events Hub"].map((item) => (
                  <Link key={item} href="#" className="google-sans-flex text-white hover:text-brand-gold transition-colors duration-200 text-[15px] lg:text-[18px] leading-6">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Private Dining */}
            <div className="flex flex-col items-center lg:items-start lg:w-47.5">
              <p className="font-good-times text-brand-gold leading-none text-[18px] lg:text-[20px]" style={{ marginBottom: "20px" }}>
                Private Dining
              </p>
              {/* Thay style inline bằng gap-2.5 lg:gap-5 */}
              <nav className="flex flex-col items-center lg:items-start gap-2.5 lg:gap-5">
                {["The Treehouse", "Book a Party", "General Contact"].map((item) => (
                  <Link key={item} href="#" className="google-sans-flex text-white hover:text-brand-gold transition-colors duration-200 text-[15px] lg:text-[18px] leading-6">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Visit Us */}
            <div className="flex flex-col items-center lg:items-start lg:w-40">
              <p className="font-good-times text-brand-gold leading-none text-[18px] lg:text-[20px]" style={{ marginBottom: "20px" }}>
                Visit Us
              </p>
              {/* Thay style inline bằng gap-2.5 lg:gap-5 */}
              <div className="flex flex-col items-center lg:items-start gap-2.5 lg:gap-5">
                <address className="google-sans-flex text-white not-italic text-center lg:text-left text-[15px] lg:text-[18px] leading-6">
                  435 SW 152nd St<br />Burien, WA 98166
                </address>
                <a href="tel:+12065357455" className="google-sans-flex text-white hover:text-brand-gold transition-colors duration-200 text-[15px] lg:text-[18px] leading-6">
                  (206) 535-7455
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Khoảng cách xuống đường line */}
        <div className="w-full pointer-events-none" style={{ height: "clamp(40px, 4vw, 52px)" }} aria-hidden="true" />

        {/* ── GRADIENT DIVIDER LINE ── */}
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, #bc0a00 15%, #d05b3c 35%, #e3ac77 50%, #d05b3c 65%, #bc0a00 85%, transparent 100%)" }}
        />

        <div className="w-full h-12 block lg:hidden shrink-0 pointer-events-none" aria-hidden="true" />


        {/* ── BOTTOM BAR ── */}
        <div
          // BIỆN PHÁP MẠNH 4: Đổi `py-10` thành `pt-20 pb-10` để dội khoảng cách cực lớn từ đường Line xuống ở Mobile. 
          // Lên Desktop lg:py-0 sẽ tự động hủy nó đi.
          className="flex flex-col lg:flex-row items-center lg:justify-between w-full pt-20 pb-10 lg:py-0 lg:h-35 gap-10 lg:gap-0"
          style={{
            paddingLeft: "clamp(24px, 6vw, 158px)",
            paddingRight: "clamp(24px, 6vw, 144px)"
          }}
        >
          {/* Nhóm Copyright & Links */}
          <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto gap-6 lg:gap-50">
            <p className="google-sans-flex text-white text-center whitespace-nowrap text-[14px] sm:text-[15px] lg:text-[18px] leading-6">
              2026 © The Point Burien. All rights reserved.
            </p>

            {/* THAY ĐỔI TẠI ĐÂY: Dùng flex-row thay cho flex-col để Privacy và Terms LUÔN nằm ngang trên Mobile.
                Dùng gap-6 để cách nhau 24px trên Mobile, và lg:gap-[260px] trên Desktop */}
            <div className="flex flex-row items-center justify-center gap-6 lg:gap-65 w-full lg:w-auto">
              <Link href="/privacy" className="google-sans-flex text-white hover:text-brand-gold transition-colors whitespace-nowrap text-[14px] sm:text-[15px] lg:text-[18px] leading-6">
                Privacy Policy
              </Link>
              <Link href="/terms" className="google-sans-flex text-white hover:text-brand-gold transition-colors whitespace-nowrap text-[14px] sm:text-[15px] lg:text-[18px] leading-6">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* 21+ badge */}
          <div className="brand-gradient-bg flex items-center justify-center shrink-0 rounded-[5px] w-full max-w-75 sm:max-w-65 h-13.75 sm:h-15.75">
            <p className="google-sans-flex text-white whitespace-nowrap text-[15px] sm:text-[16px] lg:text-[18px] leading-6">
              21+ Only Establishment
            </p>
          </div>
        </div>

        <div className="w-full h-12 block lg:hidden shrink-0 pointer-events-none" aria-hidden="true" />


      </div>
    </footer>
  );
}