import { Geist, Geist_Mono } from "next/font/google";
import ArticleSlides from '../components/ArticleSlides';
import PringleAcidosisModel from '../components/PringleAcidosisModel';
import { SlideProvider } from '../context/SlideContext';

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
    <SlideProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full bg-black font-[family-name:var(--font-geist-sans)]`}>
        <div className="max-w-[1800px] mx-auto px-8 py-12">
          <header className="mb-12">
            <h1 className="text-gray-200 text-xl font-light tracking-wider mb-2">
              Pringle Maneuver: Impact on Acid-Base Homeostasis
            </h1>
            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent" />
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-[#1a1a1a] rounded-lg p-8">
              <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-6">Interactive Model</h2>
              <PringleAcidosisModel />
            </div>
            
            <div>
              <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-6">Literature Review</h2>
              <ArticleSlides />
            </div>
          </div>
        </div>
      </div>
    </SlideProvider>
  );
}
