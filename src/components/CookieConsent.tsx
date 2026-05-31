import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-[9999] max-w-sm w-full"
        >
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              borderRadius: "24px",
            }}
            className="p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold tracking-tight">Cookie Preferences</p>
                  <p className="text-white/40 text-[10px] font-medium tracking-wide uppercase mt-0.5">GDPR Compliance</p>
                </div>
              </div>
            </div>

            <p className="text-white/50 text-xs leading-relaxed">
              This site uses cookies to improve your experience. By continuing, you agree to our{" "}
              <Link
                to="/privacy"
                className="text-white/80 underline underline-offset-2 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              {" "}&amp; cookie usage.
            </p>

            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-white hover:bg-white/90 transition-all tracking-wide"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-all tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
