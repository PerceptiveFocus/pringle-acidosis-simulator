import { motion, AnimatePresence } from 'framer-motion';
import { articleSlides } from '../data/articleSlides';
import { useSlideContext } from '../context/SlideContext';

export default function ArticleSlides() {
  const { currentSlide, setCurrentSlide } = useSlideContext();

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % articleSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + articleSlides.length) % articleSlides.length);
  };

  return (
    <div className="w-full max-w-3xl bg-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / articleSlides.length) * 100}%` }}
        />
      </div>

      <div className="p-8">
        {/* Navigation header */}
        <div className="flex justify-between items-center mb-8 text-gray-400 text-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="hover:text-white transition-colors p-2"
              disabled={currentSlide === 0}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="hover:text-white transition-colors p-2"
              disabled={currentSlide === articleSlides.length - 1}
            >
              →
            </button>
          </div>
          <div className="font-mono">
            {String(currentSlide + 1).padStart(2, '0')} / {String(articleSlides.length).padStart(2, '0')}
          </div>
        </div>

        {/* Main content */}
        <div className="min-h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl font-light text-white tracking-wide">
                  {articleSlides[currentSlide].title}
                </h2>
                <div className="w-16 h-0.5 bg-blue-600" />
              </div>

              {/* Content */}
              <div className="space-y-6 text-gray-300">
                {articleSlides[currentSlide].content.map((point, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="leading-relaxed text-base"
                  >
                    {point}
                  </motion.p>
                ))}
              </div>

              {/* Citations */}
              {articleSlides[currentSlide].citations && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8 mt-8 border-t border-gray-800"
                >
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">References</h3>
                  <ul className="space-y-3">
                    {articleSlides[currentSlide].citations.map((citation, index) => (
                      <li 
                        key={index} 
                        className="text-xs text-gray-400 leading-relaxed pl-4 border-l border-gray-700"
                      >
                        {citation}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <div className="px-8 py-4 border-t border-gray-800">
        <div className="flex items-center justify-end space-x-4 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">←</kbd>
            <span>Previous</span>
          </span>
          <span className="flex items-center space-x-1">
            <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400">→</kbd>
            <span>Next</span>
          </span>
        </div>
      </div>
    </div>
  );
}
