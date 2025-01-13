import { Geist, Geist_Mono } from "next/font/google";
import PringleAcidosisModel from '@/components/PringleAcidosisModel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full flex items-center justify-center bg-gray-50 font-[family-name:var(--font-geist-sans)]`}>
      <PringleAcidosisModel />
    </div>
  );
}
