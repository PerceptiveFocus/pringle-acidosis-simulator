import { useEffect, useRef } from 'react';
import { useSlideContext } from '../context/SlideContext';
import { articleSlides } from '../data/articleSlides';
import { motion } from 'framer-motion';

export default function PringleAcidosisModel() {
  const { currentSlide, leverPosition, setLeverPosition } = useSlideContext();
  const isUserInteracting = useRef(false);

  useEffect(() => {
    if (!isUserInteracting.current && articleSlides[currentSlide].leverPosition !== undefined) {
      setLeverPosition(articleSlides[currentSlide].leverPosition!);
    }
  }, [currentSlide, setLeverPosition]);

  const handleLeverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserInteracting.current = true;
    setLeverPosition(Number(e.target.value));
  };

  const handleLeverEnd = () => {
    setTimeout(() => {
      isUserInteracting.current = false;
    }, 1000);
  };

  const occlusionPercentage = leverPosition;
  const bloodFlow = 100 - occlusionPercentage;
  const lactateLevel = Math.min(100, occlusionPercentage * 1.2);
  const pH = 7.4 - (occlusionPercentage * 0.004);

  const getPhase = () => {
    if (occlusionPercentage < 30) return 'normal';
    if (occlusionPercentage < 70) return 'moderate';
    return 'severe';
  };

  const phase = getPhase();

  return (
    <div className="space-y-8">
      {/* Enhanced Anatomical Visualization */}
      <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 300 240" className="w-full h-full">
            {/* Enhanced Liver Shape */}
            <path
              d="M60,120 
                 C60,80 90,40 150,40
                 C210,40 240,80 240,120
                 C240,160 210,200 150,200
                 C90,200 60,160 60,120
                 M150,40
                 C170,40 190,45 210,60
                 C220,68 225,80 225,90
                 C225,100 220,110 210,115
                 C200,120 190,118 185,115
                 C180,112 178,108 178,105
                 C178,102 180,100 182,99
                 C184,98 186,98 188,99"
              fill="#8b4513"
              stroke="#723a0c"
              strokeWidth="2"
              className="transition-all duration-500"
              style={{ opacity: bloodFlow / 100 }}
            />

            {/* Portal Vein System */}
            <g className="portal-system">
              {/* Main Portal Vein */}
              <motion.path
                d="M40,120 
                   C60,120 80,120 100,120
                   C120,120 130,118 140,115
                   C150,112 160,110 170,110"
                stroke="#0066cc"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                animate={{
                  strokeDasharray: [40, 40],
                  strokeDashoffset: bloodFlow > 50 ? [0, -80] : 0
                }}
                transition={{
                  duration: 2,
                  repeat: bloodFlow > 50 ? Infinity : 0,
                  ease: "linear"
                }}
              />
              
              {/* Portal Vein Branches */}
              <motion.path
                d="M140,115
                   C150,110 160,105 170,100
                   M140,115
                   C150,120 160,125 170,130"
                stroke="#0066cc"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                animate={{
                  strokeDasharray: [30, 30],
                  strokeDashoffset: bloodFlow > 50 ? [0, -60] : 0
                }}
                transition={{
                  duration: 1.8,
                  repeat: bloodFlow > 50 ? Infinity : 0,
                  ease: "linear"
                }}
              />
            </g>

            {/* Hepatic Artery System */}
            <g className="hepatic-system">
              {/* Main Hepatic Artery */}
              <motion.path
                d="M40,90
                   C60,90 80,90 100,90
                   C120,90 130,95 140,100
                   C150,105 160,110 170,110"
                stroke="#cc0000"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                animate={{
                  strokeDasharray: [30, 30],
                  strokeDashoffset: bloodFlow > 50 ? [0, -60] : 0
                }}
                transition={{
                  duration: 1.5,
                  repeat: bloodFlow > 50 ? Infinity : 0,
                  ease: "linear"
                }}
              />
              
              {/* Hepatic Artery Branches */}
              <motion.path
                d="M140,100
                   C150,95 160,90 170,85
                   M140,100
                   C150,105 160,110 170,115"
                stroke="#cc0000"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                animate={{
                  strokeDasharray: [20, 20],
                  strokeDashoffset: bloodFlow > 50 ? [0, -40] : 0
                }}
                transition={{
                  duration: 1.3,
                  repeat: bloodFlow > 50 ? Infinity : 0,
                  ease: "linear"
                }}
              />
            </g>

            {/* Enhanced Pringle Clamp */}
            <g className="pringle-clamp" transform="translate(135,85)">
              <rect
                x="-15"
                y="0"
                width="30"
                height="50"
                fill="#444"
                rx="2"
                className="transition-all duration-500"
                style={{
                  transform: `scaleY(${occlusionPercentage / 100})`,
                  transformOrigin: 'center'
                }}
              />
              {/* Clamp Details */}
              <rect
                x="-15"
                y="0"
                width="30"
                height="5"
                fill="#666"
                rx="1"
              />
              <rect
                x="-15"
                y="45"
                width="30"
                height="5"
                fill="#666"
                rx="1"
              />
            </g>

            {/* Blood Flow Particles */}
            {bloodFlow > 50 && Array.from({ length: 3 }).map((_, i) => (
              <g key={i}>
                <motion.circle
                  cx="0"
                  cy="0"
                  r="3"
                  fill="#ff000030"
                  animate={{
                    cx: [40, 170],
                    cy: [90, 110],
                    scale: [1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill="#0066cc30"
                  animate={{
                    cx: [40, 170],
                    cy: [120, 110],
                    scale: [1, 0.8]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Flow Information Overlay */}
        <div className="absolute top-2 left-2 right-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Portal Vein Flow: {(bloodFlow * 0.7).toFixed(1)}%</span>
            <span>Arterial Flow: {(bloodFlow * 0.3).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-400">Pringle Maneuver Control</label>
          <input
            type="range"
            min="0"
            max="100"
            value={leverPosition}
            onChange={handleLeverChange}
            onMouseUp={handleLeverEnd}
            onTouchEnd={handleLeverEnd}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>No Occlusion</span>
            <span>Full Occlusion</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-sm text-gray-400 mb-2">Current Phase</h3>
          <div className="flex space-x-2">
            <div className={`flex-1 h-2 rounded ${phase === 'normal' ? 'bg-green-500' : 'bg-gray-700'}`} />
            <div className={`flex-1 h-2 rounded ${phase === 'moderate' ? 'bg-yellow-500' : 'bg-gray-700'}`} />
            <div className={`flex-1 h-2 rounded ${phase === 'severe' ? 'bg-red-500' : 'bg-gray-700'}`} />
          </div>
          <div className="text-sm text-gray-300 mt-2">
            {phase === 'normal' ? 'Normal Hepatic Function' :
             phase === 'moderate' ? 'Compensatory Phase' :
             'Critical Ischemia Phase'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Blood Flow"
          value={`${bloodFlow.toFixed(1)}%`}
          color={bloodFlow > 70 ? 'text-green-400' : bloodFlow > 30 ? 'text-yellow-400' : 'text-red-400'}
          detail={`${(bloodFlow * 0.7).toFixed(1)}% portal, ${(bloodFlow * 0.3).toFixed(1)}% arterial`}
        />
        <MetricCard
          label="Lactate Level"
          value={`${lactateLevel.toFixed(1)}%`}
          color={lactateLevel < 30 ? 'text-green-400' : lactateLevel < 70 ? 'text-yellow-400' : 'text-red-400'}
          detail={`Baseline: 0.5-1.0 mmol/L`}
        />
        <MetricCard
          label="pH Level"
          value={pH.toFixed(2)}
          color={pH > 7.35 ? 'text-green-400' : pH > 7.2 ? 'text-yellow-400' : 'text-red-400'}
          detail={`Normal range: 7.35-7.45`}
        />
        <MetricCard
          label="Tissue Oxygenation"
          value={`${(bloodFlow * 0.8).toFixed(1)}%`}
          color={bloodFlow > 70 ? 'text-green-400' : bloodFlow > 30 ? 'text-yellow-400' : 'text-red-400'}
          detail="Relative to baseline"
        />
      </div>

      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Clinical Implications</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-300">
            {phase === 'normal' ? 
              'Adequate hepatic perfusion maintained. Normal metabolic function.' :
             phase === 'moderate' ? 
              'Compensatory mechanisms active. Monitor lactate and acid-base status.' :
              'Critical phase. Risk of ischemia-reperfusion injury. Consider intermittent clamping.'}
          </p>
          <p className="text-gray-500 text-xs">
            Current Context: {articleSlides[currentSlide].title}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color, detail }: { label: string; value: string; color: string; detail?: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className={`text-xl font-light ${color}`}>{value}</div>
      {detail && <div className="text-xs text-gray-500 mt-1">{detail}</div>}
    </div>
  );
}
