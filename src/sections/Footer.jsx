import React from "react";
import { Twitter, Linkedin, MessageCircle, Send, PenTool } from "lucide-react";

function Footer() {
  return (
    <footer className="py-8 bg-neutral-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-3 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand + Resume */}
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-md font-bold text-white">chainstellar</h2>
          <a
            href="https://drive.google.com/file/d/1BfB-Z968JH3V_nFaR_MwrW2A0xJI9nAk/view"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-neutral-400 text-white text-[12px] text-center font-bold rounded-sm hover:bg-neutral-500 transition"
          >
            View Resume
          </a>
        </div>

        {/* Right: Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/chainstellar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-800 rounded-full hover:bg-primary transition"
          >
            <Twitter size={20} className="text-white" />
          </a>
          <a
            href="https://ng.linkedin.com/in/damian-david-chidera-39b18b214"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-800 rounded-full hover:bg-primary transition"
          >
            <Linkedin size={20} className="text-white" />
          </a>
          <a
            href="https://wa.me/2347040160134"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-800 rounded-full hover:bg-primary transition"
          >
            <MessageCircle size={20} className="text-white" />
          </a>
          <a
            href="https://t.me/chainstellar1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-800 rounded-full hover:bg-primary transition"
          >
            <Send size={20} className="text-white" />
          </a>
          <a
            href="https://medium.com/@linchpinremainstheboss/about"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-800 rounded-full hover:bg-primary transition"
          >
            <PenTool size={20} className="text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
