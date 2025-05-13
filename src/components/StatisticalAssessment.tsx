import React from 'react';

export function StatisticalAssessment() {
  return (
    <div className="relative bg-blue-900 overflow-hidden">
      {/* Background with moving light effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/70"></div>
        <div className="absolute -inset-1/4 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-light-move-reverse"></div>
        <div className="absolute -inset-1/4 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-light-move-slow transform -rotate-12"></div>
      </div>
      
      <div className="relative z-10 py-14 px-6 md:py-20 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Statistical Assessment
          </h2>
          
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Ben Mak's achievement in securing Member of Parliament support and 
            formal intervention represents an extraordinarily rare outcome that defies 
            typical constituent advocacy patterns in the UK parliamentary system.
          </p>
          
          {/* Stat cards */}
          <div className="space-y-4">
            {/* Stat 1 */}
            <div className="bg-blue-800/60 border border-blue-700/50 rounded-lg p-6 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col">
                <span className="text-6xl font-bold text-white mb-2">0.1%</span>
                <span className="text-blue-200 text-sm">
                  Probability of achieving formal parliamentary intervention
                </span>
              </div>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-blue-800/60 border border-blue-700/50 rounded-lg p-6 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col">
                <span className="text-6xl font-bold text-white mb-2">1 in 1,000</span>
                <span className="text-blue-200 text-sm">
                  Odds of achieving similar MP support for individual case
                </span>
              </div>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-blue-800/60 border border-blue-700/50 rounded-lg p-6 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col">
                <span className="text-6xl font-bold text-white mb-2">650</span>
                <span className="text-blue-200 text-sm">
                  MPs competing for limited parliamentary time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}