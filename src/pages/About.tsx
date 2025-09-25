import { Quote, Award, Shield, Heart, Users, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Judicial Benchmark Image */}
      <div className="w-full">
        <img
          src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/caseworks/JUDICIAL%20BENCHMARK.png"
          alt="Justice Minds Judicial Benchmark Analysis"
          className="w-full h-auto max-h-[600px] object-contain bg-white shadow-lg"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CHARACTER AND INTEGRITY: DIRECT TESTIMONIALS</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Professional endorsements and character references demonstrating exceptional integrity, 
            legal expertise, and dedication to public service.
          </p>
        </div>

        {/* Testimonials Grid - Flip Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Janet Kelly OBE */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-purple-200 bg-gradient-to-br from-white to-purple-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Award className="h-16 w-16 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-purple-900 text-center">Janet Kelly OBE</h3>
                <p className="text-purple-700 font-semibold text-center mt-2">BBC Obituary Specialist</p>
                <p className="text-purple-600 text-center mt-1">Honours Consultant</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-purple-200 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-purple-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "That in itself qualifies you for an honor, because that's what people want... The database that we've done, Justice Minds, that's to give people ownership of their data."
                </p>
                <p className="text-purple-200 text-xs">21 March 2024, 11:56 AM</p>
              </div>
            </div>
          </div>

          {/* Arthur McKenzie */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Shield className="h-16 w-16 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 text-center">Arthur McKenzie</h3>
                <p className="text-blue-700 font-semibold text-center mt-2">Senior Detective</p>
                <p className="text-blue-600 text-center mt-1">Northumbria Police (Retired)</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-blue-200 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "I was extremely impressed by his grasp of the complexities of the relevant law and his eloquence in breaking it down into simple layman's terms."
                </p>
                <p className="text-blue-200 text-xs">25th January 2023</p>
              </div>
            </div>
          </div>

          {/* Kirsty Bell */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-green-200 bg-gradient-to-br from-white to-green-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Star className="h-16 w-16 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-green-900 text-center">Kirsty Bell</h3>
                <p className="text-green-700 font-semibold text-center mt-2">Chartered Accountant</p>
                <p className="text-green-600 text-center mt-1">Legal Professional</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-green-200 bg-gradient-to-br from-green-600 to-green-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-green-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "The advice he has proffered are better than any qualified lawyer... His attention to detail and rational argument shining."
                </p>
                <p className="text-green-200 text-xs">22 January 2023</p>
              </div>
            </div>
          </div>

          {/* Holly Barton */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-orange-200 bg-gradient-to-br from-white to-orange-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Heart className="h-16 w-16 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-orange-900 text-center">Holly Barton</h3>
                <p className="text-orange-700 font-semibold text-center mt-2">Adult Social Worker</p>
                <p className="text-orange-600 text-center mt-1">30 Years Knowledge</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-orange-200 bg-gradient-to-br from-orange-600 to-orange-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-orange-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "Ben is a kind, trustworthy and generous individual. He puts the needs of others before his own and is forever finding ways to improve lives."
                </p>
                <p className="text-orange-200 text-xs">21st February 2022</p>
              </div>
            </div>
          </div>

          {/* Natalie Parr */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-pink-200 bg-gradient-to-br from-white to-pink-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Heart className="h-16 w-16 text-pink-600 mb-4" />
                <h3 className="text-2xl font-bold text-pink-900 text-center">Natalie Parr</h3>
                <p className="text-pink-700 font-semibold text-center mt-2">Early Years SEN Worker</p>
                <p className="text-pink-600 text-center mt-1">20 Years Knowledge</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-pink-200 bg-gradient-to-br from-pink-600 to-pink-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-pink-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "Ben has shown great passion and dedication to support his sister and nephew sacrificing his own commitments and life in London."
                </p>
                <p className="text-pink-200 text-xs">20th February 2022</p>
              </div>
            </div>
          </div>

          {/* Luciana Amorim */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-teal-200 bg-gradient-to-br from-white to-teal-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Users className="h-16 w-16 text-teal-600 mb-4" />
                <h3 className="text-2xl font-bold text-teal-900 text-center">Luciana Amorim</h3>
                <p className="text-teal-700 font-semibold text-center mt-2">Children's Social Worker</p>
                <p className="text-teal-600 text-center mt-1">10 Years Knowledge</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-teal-200 bg-gradient-to-br from-teal-600 to-teal-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-teal-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "Ben is a kind and generous person who is dedicated to his family and friends. Ben works really hard and he always does his very best for people."
                </p>
                <p className="text-teal-200 text-xs">28th February 2022</p>
              </div>
            </div>
          </div>

          {/* Marisa Peer */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Star className="h-16 w-16 text-indigo-600 mb-4" />
                <h3 className="text-2xl font-bold text-indigo-900 text-center">Marisa Peer</h3>
                <p className="text-indigo-700 font-semibold text-center mt-2">International Public Figure</p>
                <p className="text-indigo-600 text-center mt-1">Character Reference</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-indigo-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "I am so impressed you would go out of your way to help us just out of concern and it shows a lot about your character."
                </p>
                <p className="text-indigo-200 text-xs">Wed, 11 Nov 2020, 20:30</p>
              </div>
            </div>
          </div>

          {/* Atiah (Speaker) */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-cyan-200 bg-gradient-to-br from-white to-cyan-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Users className="h-16 w-16 text-cyan-600 mb-4" />
                <h3 className="text-2xl font-bold text-cyan-900 text-center">Atiah</h3>
                <p className="text-cyan-700 font-semibold text-center mt-2">Westminster Mental Health</p>
                <p className="text-cyan-600 text-center mt-1">Outreach Service</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-600 to-cyan-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-cyan-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "I think you would be great [at public speaking and mentoring]... you may be able to come and speak to our clients as well and inspire them."
                </p>
                <p className="text-cyan-200 text-xs">2 September 2024, 3:34 PM</p>
              </div>
            </div>
          </div>

          {/* Atiah (Aspirational) */}
          <div className="group [perspective:1000px] h-80">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30 shadow-lg [backface-visibility:hidden] flex flex-col justify-center items-center p-6">
                <Award className="h-16 w-16 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 text-center">Atiah</h3>
                <p className="text-emerald-700 font-semibold text-center mt-2">Westminster Mental Health</p>
                <p className="text-emerald-600 text-center mt-1">Aspirational Assessment</p>
                <p className="text-sm text-gray-500 text-center mt-4">Hover to read testimonial</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full h-full rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center p-6">
                <Quote className="h-8 w-8 text-emerald-200 mb-4" />
                <p className="text-white italic text-sm leading-relaxed mb-4">
                  "The fact that you've put so much thought into it [Justice Minds/Advocacy on Demand] is very, very aspirational, I think."
                </p>
                <p className="text-emerald-200 text-xs">2 September 2024, 4:14 PM</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
