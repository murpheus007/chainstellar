import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // nice icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-1 bg-background">
        {/* Logo */}
        <h1 className="text-md font-bold text-white">chainstellar</h1>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md cursor-pointer"
        >
          <Menu className="text-white hover:text-gray-50 transition" size={20} />
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in board */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md cursor-pointer"
          >
            <X className="text-white font-bold hover:text-gray-50 transition" size={20} />
          </button>
        </div>

        {/* Board content */}
        <div className="flex flex-col items-center gap-2 px-4 ">
          <a
            href="https://medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-neutral-400 text-white text-[12px] text-center font-bold rounded-sm hover:bg-neutral-500 transition"
          >
            Medium
          </a>
          <a
            href="/resume.pdf"
            className="w-full py-2 bg-primary text-white text-[12px] text-center font-bold rounded-sm hover:bg-blue-600 transition"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
