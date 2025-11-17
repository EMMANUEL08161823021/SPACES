"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Search from "../components/ui/Search";
import { CTAButton } from "../components/ui/button";
import Link from "next/link";

const exampleSuggestions = [
  "React components",
  "Next.js tips",
  "Tailwind layout",
  "CSS tricks",
  "FFmpeg tutorial",
];


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const shouldReduce = useReducedMotion();

    const logoVariants = {
      initial: { scale: 0.75, opacity: 0.4 },
      animate: {
        scale: 1.03,
        // rotate: 0,
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: 'easeInOut',
          repeat: shouldReduce ? 0 : Infinity,
          repeatType: 'loop',
        },
      },
      // exit: { opacity: 0, scale: 1.08, transition: { duration: 0.95, ease: 'easeInOut' } },
    }


    // Close on Escape and prevent body scroll when sidebar is open

    const handleSearch = (q) => {
      console.log("Search:", q);
      // call API or route to /search?q=...
    };
    useEffect(() => {
      function onKey(e) {

        if (e.key === "Escape") setOpen(false);

      }
      if (open) {
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
      } else {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      }
      // cleanup
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }, [open]);

  return (
      <header className="w-[100%] flex justify-center h-16">
        <div className="w-[100%] fixed top-0 bg-background z-50 ">
          <div className="flex w-full md:max-w-5xl mx-auto px-4 justify-between items-center h-16">
            {/* Logo + Brand */}
            <div className="flex items-center gap-4">
              <Link href={"/"}>
                <motion.div>
                  <motion.img
                  variants={logoVariants} 
                  initial="initial"
                  animate="animate"
                  // exit="exit"
                  className="" height={70} width={90} src={"/assets/spaces-gold.svg"} alt="logo"/>
                </motion.div>
              </Link>
          
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-4">
                <ul className="flex items-end gap-4 text-[#F3F4F6] text-sm">
                  <a href="#movies"><li className="hover:text-primary mt-1">Movies</li></a>
                  <a href="#scenes"><li className="hover:text-primary">Scenes</li></a>
                  <a href="#casts"><li className="hover:text-primary">Casts</li></a>
                  <a href="#pricing"><li className="hover:text-primary">Pricing</li></a>
                  {/* <a href="#"><li className="hover:text-primary">Contact</li></a> */}
                </ul>
              </nav>
            </div>

            {/* Actions + Mobile Hamburger */}
            <div className="flex items-center gap-3">
                <div className="hidden sm:flex gap-3">
                    <Search placeholder="Search assets or start creating..." onSearch={handleSearch} suggestions={exampleSuggestions} />                
                    {/* <button className="px-3 py-1 text-sm rounded-md text-[#FF553E]">Login</button> */}
                    <CTAButton href="/login">Login</CTAButton>
                    {/* <button className="text-sm px-4 py-2 whitespace-nowrap rounded-full bg-gray-600 text-white"></button> */}
                </div>

                {/* Hamburger for mobile */}
                
                <button
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="md:hidden p-2 rounded-md text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#D6862E]"
                  onClick={() => setOpen((s) => !s)}
                >
                  {/* simple hamburger icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar (AnimatePresence handles mount/unmount animations) */}
        <AnimatePresence>
          {open && (
            // Overlay
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/40  md:hidden"
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            // Sidebar panel sliding in from right to left
            <motion.aside
              key="sidebar"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-[60%] max-w-[90%] bg-card shadow-lg md:hidden"
            >
              <div className="flex items-center justify-end px-4 py-3">
                <CTAButton
                  aria-label="Close sidebar"
                  className="p-2 text-[#F3F4F6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6862E]"
                  onClick={() => setOpen(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </CTAButton>
              </div>

              <nav className="p-4">
                <ul className="flex text-[#F3F4F6] text-sm flex-col gap-4">
                  <a href="#movies"><li className="hover:text-primary">Movies</li></a>
                  <a href="#scenes"><li className="hover:text-primary">Scenes</li></a>
                  <a href="#casts"><li className="hover:text-primary">Casts</li></a>
                  <a href="#pricing"><li className="hover:text-primary">Pricing</li></a>
                </ul>

                <div className="mt-6 flex flex-col gap-3">
                  <CTAButton href="/login" variant="white" className="w-full border border-white">Login</CTAButton>
                  
                  <CTAButton variant="primary" className="w-full">SignUp</CTAButton>
                </div>

                {/* Optional small footer */}
                <div className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} SPACES</div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      </header>
  );
}
