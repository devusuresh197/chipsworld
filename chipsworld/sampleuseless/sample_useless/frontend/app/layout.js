import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chip Population Counter - AI Powered Density Analyzer",
  description: "Automated chip population counting and density analysis powered by Grounding DINO object detection.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
