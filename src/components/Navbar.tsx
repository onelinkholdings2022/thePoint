"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import GradientButton from "./ui/GradientButton";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events", gradient: true },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const navShadow = useTransform(
    scrollY,
    [0, 80],
    ["0px 8px 30px 0px rgba(188, 10, 0, 0)", "0px 8px 30px 0px rgba(188, 10, 0, 0.45)"]
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav style={{ boxShadow: navShadow }} className="fixed top-0 left-0 right-0 z-50 h-20 bg-main transition-colors duration-300">

        {/* Container */}
        <div 
          className="w-full mx-auto h-full flex items-center justify-between"
          style={{ paddingInline: "clamp(20px, 8vw, 100px)" }}
        >
          
          {/* CỤM TRÁI: Nhóm Logo và Nav Links */}
          <div className="flex items-center gap-8 lg:gap-15 xl:gap-26.5">
            
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 z-50 relative">
              <div className="relative h-10 w-16 md:h-12 md:w-20 transition-all">
                <Image
                  src="/assets/images/logo.png"
                  alt="The Point Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-12.75">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="relative group">
                  {link.gradient ? (
                    <span className="google-sans-flex text-[16px] xl:text-[18px] font-semibold text-brand-glow events-glow">
                      {link.label}
                    </span>
                  ) : (
                    <span className="google-sans-flex text-[16px] xl:text-[18px] text-white/90 hover:text-white transition-colors duration-200">
                      {link.label}
                    </span>
                  )}
                  {!link.gradient && (
                    <span className="google-sans-flex absolute -bottom-1 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* CỤM PHẢI: Book Now & Hamburger Menu */}
          <div className="flex items-center gap-4 shrink-0 z-50">
            {/* Nút Book Now - Desktop/Tablet */}
            <div className="hidden sm:block">
              <GradientButton size="md" className="w-28 xl:w-33.75 google-sans-flex text-sm xl:text-base">
                Book Now
              </GradientButton>
            </div>

            {/* Nút Hamburger cho Mobile */}
            <button
              className="md:hidden p-2 text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Wrapper */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* 1. Lớp nền đen mờ (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* 2. Menu trượt từ phải sang (Sidebar) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              // Bỏ class padding ở đây đi để tránh lỗi không nhận diện
              className="fixed top-20 right-0 bottom-0 z-45 w-[65vw] max-w-75 bg-main border-l border-brand-nav/50 shadow-2xl md:hidden overflow-y-auto"
            >
              {/* VÙNG CHỨA NỘI DUNG CHÍNH: Ép cứng lề bằng style inline */}
              <div 
                className="flex flex-col items-start gap-8 w-full"
                style={{ padding: "32px 24px" }} 
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative w-full"
                  >
                    {link.gradient ? (
                      <span className="google-sans-flex text-[18px] font-semibold text-brand-glow block w-full">
                        {link.label}
                      </span>
                    ) : (
                      <span className="google-sans-flex text-[18px] text-white/90 hover:text-white transition-colors duration-200 block w-full">
                        {link.label}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Nút Book Now */}
                <div className="sm:hidden mt-2 w-full">
                   <GradientButton size="md" className="w-full google-sans-flex py-3 text-base">
                    Book Now
                  </GradientButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}