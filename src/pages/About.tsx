import { Quote, Award, Shield, Heart, Users, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with Judicial Benchmark image blurred */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/caseworks/JUDICIAL%20BENCHMARK.png')`,
          filter: 'blur(8px) brightness(0.3)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-24 pb-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-wide">
              CHARACTER AND INTEGRITY
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <h2 className="text-3xl text-gray-300 font-light mb-8">
              DIRECT TESTIMONIALS
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Professional endorsements and character references demonstrating exceptional integrity, 
              legal expertise, and dedication to public service from government officials, law enforcement, 
              and public sector professionals.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            {/* Janet Kelly OBE */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-purple-500 mb-6"></div>
                  <Award className="h-16 w-16 text-purple-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Janet Kelly OBE</h3>
                  <div className="text-purple-300 text-center font-semibold">BBC OBITUARY SPECIALIST</div>
                  <div className="text-purple-200 text-center text-sm mt-1">HONOURS CONSULTANT</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Innovation Worthy of Honour</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-purple-900 to-purple-800 border border-purple-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-purple-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "That in itself qualifies you for an honor, because that's what people want... The database that we've done, Justice Minds, that's to give people ownership of their data."
                  </p>
                  <div className="text-purple-200 text-xs">21 MARCH 2024, 11:56 AM</div>
                </div>
              </div>
            </div>

            {/* Arthur McKenzie */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-blue-500 mb-6"></div>
                  <Shield className="h-16 w-16 text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Arthur McKenzie</h3>
                  <div className="text-blue-300 text-center font-semibold">SENIOR DETECTIVE</div>
                  <div className="text-blue-200 text-center text-sm mt-1">NORTHUMBRIA POLICE (RETIRED)</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Legal Ingenuity & Resilience</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-blue-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "I was extremely impressed by his grasp of the complexities of the relevant law and his eloquence in breaking it down into simple layman's terms."
                  </p>
                  <div className="text-blue-200 text-xs">25TH JANUARY 2023</div>
                </div>
              </div>
            </div>

            {/* Kirsty Bell */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-green-500 mb-6"></div>
                  <Star className="h-16 w-16 text-green-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Kirsty Bell</h3>
                  <div className="text-green-300 text-center font-semibold">CHARTERED ACCOUNTANT</div>
                  <div className="text-green-200 text-center text-sm mt-1">LEGAL PROFESSIONAL</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Beyond Qualified Lawyers</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-green-900 to-green-800 border border-green-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-green-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "The advice he has proffered are better than any qualified lawyer... His attention to detail and rational argument shining."
                  </p>
                  <div className="text-green-200 text-xs">22 JANUARY 2023</div>
                </div>
              </div>
            </div>

            {/* Holly Barton */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-orange-500 mb-6"></div>
                  <Heart className="h-16 w-16 text-orange-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Holly Barton</h3>
                  <div className="text-orange-300 text-center font-semibold">ADULT SOCIAL WORKER</div>
                  <div className="text-orange-200 text-center text-sm mt-1">30 YEARS KNOWLEDGE</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Lifelong Integrity & Optimism</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-orange-900 to-orange-800 border border-orange-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-orange-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "Ben is a kind, trustworthy and generous individual. He puts the needs of others before his own and is forever finding ways to improve lives."
                  </p>
                  <div className="text-orange-200 text-xs">21ST FEBRUARY 2022</div>
                </div>
              </div>
            </div>

            {/* Natalie Parr */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-pink-500 mb-6"></div>
                  <Heart className="h-16 w-16 text-pink-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Natalie Parr</h3>
                  <div className="text-pink-300 text-center font-semibold">EARLY YEARS SEN WORKER</div>
                  <div className="text-pink-200 text-center text-sm mt-1">20 YEARS KNOWLEDGE</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Family Sacrifice & Dedication</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-pink-900 to-pink-800 border border-pink-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-pink-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "Ben has shown great passion and dedication to support his sister and nephew sacrificing his own commitments and life in London."
                  </p>
                  <div className="text-pink-200 text-xs">20TH FEBRUARY 2022</div>
                </div>
              </div>
            </div>

            {/* Luciana Amorim */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-teal-500 mb-6"></div>
                  <Users className="h-16 w-16 text-teal-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Luciana Amorim</h3>
                  <div className="text-teal-300 text-center font-semibold">CHILDREN'S SOCIAL WORKER</div>
                  <div className="text-teal-200 text-center text-sm mt-1">10 YEARS KNOWLEDGE</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Tireless Caregiver & Friend</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-teal-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "Ben is a kind and generous person who is dedicated to his family and friends. Ben works really hard and he always does his very best for people."
                  </p>
                  <div className="text-teal-200 text-xs">28TH FEBRUARY 2022</div>
                </div>
              </div>
            </div>

            {/* Marisa Peer */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-indigo-500 mb-6"></div>
                  <Star className="h-16 w-16 text-indigo-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Marisa Peer</h3>
                  <div className="text-indigo-300 text-center font-semibold">INTERNATIONAL PUBLIC FIGURE</div>
                  <div className="text-indigo-200 text-center text-sm mt-1">CHARACTER REFERENCE</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Extraordinary Generosity</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-800 border border-indigo-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-indigo-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "I am so impressed you would go out of your way to help us just out of concern and it shows a lot about your character."
                  </p>
                  <div className="text-indigo-200 text-xs">WED, 11 NOV 2020, 20:30</div>
                </div>
              </div>
            </div>

            {/* Atiah (Speaker) */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-cyan-500 mb-6"></div>
                  <Users className="h-16 w-16 text-cyan-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Atiah</h3>
                  <div className="text-cyan-300 text-center font-semibold">WESTMINSTER MENTAL HEALTH</div>
                  <div className="text-cyan-200 text-center text-sm mt-1">OUTREACH SERVICE</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Public Speaker & Mentor</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-cyan-900 to-cyan-800 border border-cyan-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-cyan-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "I think you would be great [at public speaking and mentoring]... you may be able to come and speak to our clients as well and inspire them."
                  </p>
                  <div className="text-cyan-200 text-xs">2 SEPTEMBER 2024, 3:34 PM</div>
                </div>
              </div>
            </div>

            {/* Atiah (Aspirational) */}
            <div className="group [perspective:1000px] h-96">
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl [backface-visibility:hidden] flex flex-col justify-center items-center p-8">
                  <div className="w-20 h-1 bg-emerald-500 mb-6"></div>
                  <Award className="h-16 w-16 text-emerald-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Atiah</h3>
                  <div className="text-emerald-300 text-center font-semibold">WESTMINSTER MENTAL HEALTH</div>
                  <div className="text-emerald-200 text-center text-sm mt-1">ASPIRATIONAL ASSESSMENT</div>
                  <div className="text-gray-400 text-center text-xs mt-6 uppercase tracking-wider">Aspirational Visionary</div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-emerald-900 to-emerald-800 border border-emerald-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-8">
                  <Quote className="h-10 w-10 text-emerald-300 mb-6" />
                  <p className="text-white italic text-sm leading-relaxed mb-6">
                    "The fact that you've put so much thought into it [Justice Minds/Advocacy on Demand] is very, very aspirational, I think."
                  </p>
                  <div className="text-emerald-200 text-xs">2 SEPTEMBER 2024, 4:14 PM</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
