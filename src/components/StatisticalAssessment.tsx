import React from 'react';

export function StatisticalAssessment() {
  return (
       <section
      className="text-white px-6 py-20"
      style={{
        background: 'linear-gradient(135deg, #0F1C4D 0%, #1657E7 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Statistical Assessment</h2>
        <p className="text-lg mb-10 max-w-3xl">
          Ben Mak's achievement in securing Member of Parliament support and formal intervention represents an extraordinarily rare outcome that defies typical constituent advocacy patterns in the UK parliamentary system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-blue-400 bg-blue-500/20 rounded-xl p-6">
            <p className="text-3xl font-bold mb-2">0.1%</p>
            <p className="text-white/80">Probability of achieving formal parliamentary intervention</p>
          </div>
          <div className="border border-blue-400 bg-blue-500/20 rounded-xl p-6">
            <p className="text-3xl font-bold mb-2">1 in 1,000</p>
            <p className="text-white/80">Odds of achieving similar MP support for individual case</p>
          </div>
          <div className="border border-blue-400 bg-blue-500/20 rounded-xl p-6">
            <p className="text-3xl font-bold mb-2">650</p>
            <p className="text-white/80">MPs competing for limited parliamentary time</p>
          </div>
        </div>
      </div>
    </section>
  );
}