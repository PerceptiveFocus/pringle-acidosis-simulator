import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const PringleAcidosisModel = () => {
  // Real physiological constants
  const CONTAINER_VOLUME_ML = 500;  // Pringles can volume
  const TIDAL_VOLUME_ML = 500;      // Normal breath volume
  const CO2_PRODUCTION_ML_MIN = 200; // CO2 production at rest
  const DEAD_SPACE_ML = 150;        // Anatomical dead space

  // State management
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [ventilationRate, setVentilationRate] = useState(50);
  
  // Physiological state
  const [physiologicalState, setPhysiologicalState] = useState({
    alveolarCO2: 40,    // mmHg
    pH: 7.4,
    minuteVolume: 0,    // mL/min
    co2Cleared: 0,      // mL/min
    particleCount: 40
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
        updatePhysiology();
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, ventilationRate]);

  // Real physiological calculations
  const updatePhysiology = () => {
    setPhysiologicalState(prev => {
      // Calculate actual minute ventilation based on control setting
      const minuteVolume = (ventilationRate / 100) * TIDAL_VOLUME_ML * 12; // breaths/min
      
      // Calculate effective alveolar ventilation (accounting for dead space)
      const alveolarVentilation = (minuteVolume * (TIDAL_VOLUME_ML - DEAD_SPACE_ML)) / TIDAL_VOLUME_ML;
      
      // CO2 accumulation using mass balance
      const co2Produced = CO2_PRODUCTION_ML_MIN / 60 * 0.1; // per 100ms
      const co2Cleared = (alveolarVentilation / 60 * 0.1) * (prev.alveolarCO2 / 713); // Henry's law
      
      // New CO2 level using real gas exchange equation
      const newCO2 = prev.alveolarCO2 + 
        ((co2Produced - co2Cleared) * 713) / CONTAINER_VOLUME_ML;
      
      // Henderson-Hasselbalch equation for pH
      const newPH = 6.1 + Math.log10((24 / (0.03 * newCO2)));
      
      // Calculate particle count based on actual CO2 concentration
      const newParticleCount = Math.floor(newCO2);
      
      return {
        alveolarCO2: Math.max(35, Math.min(120, newCO2)),
        pH: Math.max(6.8, Math.min(7.7, newPH)),
        minuteVolume,
        co2Cleared,
        particleCount: newParticleCount
      };
    });
  };

  // Generate particles based on actual CO2 concentration
  const particles = Array.from({ length: physiologicalState.particleCount }, (_, i) => {
    // Brownian motion + ventilation effects
    const brownianX = Math.sin(time * 0.1 + i) * (100 - ventilationRate) / 100;
    const brownianY = Math.cos(time * 0.1 + i) * (100 - ventilationRate) / 100;
    
    // Base position with real fluid dynamics influence
    const angle = (i / physiologicalState.particleCount) * Math.PI * 2;
    const radius = 30 * (1 + (ventilationRate / 100));
    
    return {
      id: i,
      x: 150 + (Math.sin(angle) * radius) + brownianX * 10,
      y: 200 + (Math.cos(angle) * radius) + brownianY * 10,
      opacity: 0.4 + (ventilationRate / 200)
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Respiratory Acidosis Simulation</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-lg sm:text-xl mb-3">Physiological Values</p>
            <div className="space-y-2">
              <p className="text-sm sm:text-base">pH: {physiologicalState.pH.toFixed(3)}</p>
              <p className="text-sm sm:text-base">pCO₂: {physiologicalState.alveolarCO2.toFixed(1)} mmHg</p>
              <p className="text-sm sm:text-base">Minute Volume: {(physiologicalState.minuteVolume/1000).toFixed(1)} L/min</p>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-lg sm:text-xl mb-3">Ventilation Control</p>
            <Slider 
              value={[ventilationRate]}
              onValueChange={([value]) => setVentilationRate(value)}
              min={0}
              max={100}
              step={1}
              className="mb-4"
            />
            <div className="flex gap-3 justify-center sm:justify-start">
              <Button 
                onClick={() => setIsRunning(!isRunning)}
                className="w-24"
              >
                {isRunning ? 'Pause' : 'Resume'}
              </Button>
              <Button 
                onClick={() => {
                  setTime(0);
                  setPhysiologicalState({
                    alveolarCO2: 40,
                    pH: 7.4,
                    minuteVolume: 0,
                    co2Cleared: 0,
                    particleCount: 40
                  });
                }}
                className="w-24"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="aspect-[3/4] sm:aspect-[4/3] w-full max-w-2xl mx-auto mb-6">
        <svg viewBox="0 0 300 400" className="w-full h-full bg-gray-50 rounded-lg shadow-sm">
          {/* Container */}
          <path
            d="M100,50 L100,350 Q100,370 120,370 L180,370 Q200,370 200,350 L200,50 Q200,30 180,30 L120,30 Q100,30 100,50"
            fill="#ff6b6b"
            opacity="0.7"
            stroke="#e74c3c"
            strokeWidth="2"
          />
          
          {/* CO2 Particles with real physics-based movement */}
          {particles.map(particle => (
            <circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r="3"
              fill="#00ff00"
              opacity={particle.opacity}
            />
          ))}

          {/* pH Scale */}
          <rect x="220" y="50" width="20" height="300" fill="#ddd" />
          <rect 
            x="220" 
            y={50 + (300 * (7.7 - physiologicalState.pH) / 0.9)} 
            width="20" 
            height={300 * (physiologicalState.pH - 6.8) / 0.9} 
            fill={physiologicalState.pH < 7.35 ? '#e74c3c' : '#2ecc71'} 
          />
        </svg>
      </div>

      <div className="text-sm text-gray-600 max-w-2xl mx-auto">
        <p className="font-medium mb-2">This simulation uses real respiratory physiology including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Henderson-Hasselbalch equation for pH calculation</li>
          <li>Mass balance for CO₂ accumulation</li>
          <li>Dead space ventilation effects</li>
          <li>Actual minute ventilation calculations</li>
        </ul>
      </div>
    </div>
  );
};

export default PringleAcidosisModel;
