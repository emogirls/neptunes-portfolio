import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Cookie, Eye, Database, Mail } from "lucide-react";

const sections = [
  {
    icon: Cookie,
    title: "Cookie Policy",
    content: `<p>We use a few cookies to make this site work smoothly and to remember your preferences. The types we use are:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Essential cookies – keep the site functional (like remembering you accepted the banner).</li>
  <li>Analytics cookies – help us see which pages are most helpful, without tracking you personally.</li>
  <li>Preference cookies – remember things like your chosen theme.</li>
</ul>
<p>You can change your mind anytime by clearing your browser cookies. If you choose to decline, we’ll redirect you to Google as requested.</p>`,
  },
  {
    icon: Eye,
    title: "Data We Collect",
    content: `<p>When you browse here we automatically gather some basic, non‑personal info to improve the experience:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Your browser and version</li>
  <li>Operating system</li>
  <li>The page you came from (referrer)</li>
  <li>Date, time and which pages you view</li>
</ul>
<p>We never ask for your name, email, or any other personal identifiers unless you reach out to us directly.</p>`,
  },
  {
    icon: Database,
    title: "How We Use Your Data",
    content: `<p>The data we collect helps us:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Keep the site fast and reliable.</li>
  <li>Understand overall traffic patterns so we can focus on what matters.</li>
  <li>Protect the site from abuse and technical issues.</li>
</ul>
<p>We never sell or share your data with third‑party marketers.</p>`,
  },
  {
    icon: Shield,
    title: "Your GDPR Rights",
    content: `Under GDPR you have several rights, and we respect them fully:

<ul class="list-disc pl-5 space-y-1">
  <li><strong>Access</strong> – ask for a copy of any data we hold about you.</li>
  <li><strong>Rectify</strong> – request corrections to any inaccurate info.</li>
  <li><strong>Erase</strong> – ask us to delete your data (the “right to be forgotten”).</li>
  <li><strong>Restrict</strong> – limit how we process your information.</li>
  <li><strong>Portability</strong> – receive your data in a common, machine‑readable format.</li>
  <li><strong>Object</strong> – object to any processing of your personal data.</li>
</ul>

If you’d like to exercise any of these rights, just drop us an email (see below).`,
  },
  {
    icon: Mail,
    title: "Contact",
    content: `<p>Got questions about this policy, our cookies, or your data? Reach out at:</p>
<p><a href="mailto:neptune@muslim.com" class="text-indigo-300 hover:text-indigo-200 transition-colors underline">neptune@muslim.com</a></p>
<p class="text-white/60">We aim to respond within 30 days.</p>`,
  },
];

export function Privacy() {
  return (
    <div className="min-h-screen text-white px-6 md:px-12 py-16 max-w-4xl mx-auto">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm font-medium mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to site
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-16"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">Our Commitment</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">
          Privacy &amp; Cookies
        </h1>
        <p className="text-white/40 text-base leading-relaxed max-w-xl">
          A quick rundown of how we handle your data, the cookies we use, and the rights you have.
        </p>
        <div className="mt-6 flex items-center gap-3 text-white/25 text-xs font-medium tracking-wide">
          <span>Last updated: May 2025</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>GDPR Compliant</span>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              className="glass-panel p-7 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Icon className="w-4 h-4 text-white/60" />
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">{section.title}</h2>
              </div>
              <div className="text-white/50 text-sm leading-7" dangerouslySetInnerHTML={{ __html: section.content }} />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 text-center text-[11px] font-medium tracking-widest uppercase text-white/20"
      >
        <p>&copy; {new Date().getFullYear()} Neptune. All rights reserved.</p>
      </motion.div>
    </div>
  );
}

