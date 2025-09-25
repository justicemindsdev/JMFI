import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
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
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CHARACTER AND INTEGRITY: DIRECT TESTIMONIALS</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Professional endorsements and character references demonstrating exceptional integrity, 
            legal expertise, and dedication to public service.
          </p>
        </div>

        {/* Testimonials Grid - Ordered by Authority */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          
          {/* OBE Honours Consultant & BBC Specialist */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-purple-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-purple-600" />
                Innovation Worthy of Honour
              </CardTitle>
              <CardDescription className="font-semibold text-purple-700">
                OBE Honours Consultant & BBC Specialist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-purple-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "Do you know what? That in itself qualifies you for an honor, because that's what people want. There's so much noise at the moment about people's data being misused... The database that we've done, Justice Minds, that's to give people ownership of their data. That's based and built on the logics of an old fashioned phone book. Find the name, you're done. That's it."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Janet Kelly OBE (Writer, Scriptwriter, BBC Obituary Specialist, Honours Consultant)<br />
                <span className="text-xs">Zoom consultation, 21 March 2024, 11:56 AM–12:04 PM</span>
              </p>
            </CardContent>
          </Card>

          {/* Senior Detective */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Legal Ingenuity and Resilience
              </CardTitle>
              <CardDescription className="font-semibold text-blue-700">
                Senior Detective (Retired, Northumbria Police)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-blue-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "Despite [his] difficulties his enthusiasm and stoic approach have in no way diminished his spirit. He is highly intelligent and motivated in everything he tackles... He showed his ingenuity and knowledge of the law regarding a serious case... I was extremely impressed by his grasp of the complexities of the relevant law and his eloquence in breaking it down into simple layman's terms."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Arthur McKenzie, Senior Detective (retired), Northumbria Police<br />
                <span className="text-xs">25th January 2023</span>
              </p>
            </CardContent>
          </Card>

          {/* Chartered Accountant & Legal Professional */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-green-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-green-600" />
                Beyond Qualified Lawyers
              </CardTitle>
              <CardDescription className="font-semibold text-green-700">
                Chartered Accountant & Legal Professional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-green-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "The advice he has proffered to myself and my company are better than any qualified lawyer and his assistance invaluable. His grasp of the pertinent points, application of the case law and acts in question are astonishing and his attention to detail and rational argument shining. This individual needs a chance... He thinks out of the box and deserves this."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Kirsty Bell, Chartered Accountant and Legal Professional<br />
                <span className="text-xs">22 January 2023</span>
              </p>
            </CardContent>
          </Card>

          {/* Adult Social Worker */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-orange-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-orange-600" />
                Lifelong Integrity and Optimism
              </CardTitle>
              <CardDescription className="font-semibold text-orange-700">
                Adult Social Worker (30-Year Knowledge)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-orange-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "Ben is a kind, trustworthy and generous individual. He puts the needs of others before his own and is forever finding ways to improve lives in new and creative ways. He works very hard and applies himself 100% to all his endeavours but can always make time for anyone in need who comes across his path, whether he knows them or not. Ben is open and approachable and will always find a solution to a problem, even if it is a cost to him personally. He has always been an optimist who speaks positivity and I value our friendship immensely."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Holly Barton, Adult Social Worker, 6 years' experience, known Ben for 30 years<br />
                <span className="text-xs">21st February 2022</span>
              </p>
            </CardContent>
          </Card>

          {/* Former Early Years SEN Worker */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-pink-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-600" />
                Family Sacrifice and Dedication
              </CardTitle>
              <CardDescription className="font-semibold text-pink-700">
                Former Early Years SEN Worker (20-Year Knowledge)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-pink-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "Ben is a dear friend and support to me for over 20 years. It's been a pleasure to watch Ben have incredible success within the industry which we share a great passion. Ben has been a positive, compassionate, and consistent influence on his family... He has shown great passion and dedication to support his sister and nephew sacrificing his own commitments and life in London. Ben has been a positive, compassionate, and consistent influence on his family. I trust the information provided will be of assistance in reference to Ben's character and mindset around his family."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Natalie Parr, Former Early Years SEN Worker (14 years), known Ben for 20 years<br />
                <span className="text-xs">20th February 2022</span>
              </p>
            </CardContent>
          </Card>

          {/* Children's Social Worker */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-teal-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-teal-600" />
                Tireless Caregiver and Generous Friend
              </CardTitle>
              <CardDescription className="font-semibold text-teal-700">
                Children's Social Worker (10-Year Knowledge)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-teal-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "Ben is a kind and generous person who is dedicated to his family and friends. Ben works really hard and he always does his very best for people. I understand Ben has been out of his normal working and day to day living to be able to provide care for his nephew and sister starting in March 2020. I trust the information provided will be of assistance in reference to Ben's character and mindset around his family."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Luciana Amorim, Children's Social Worker (6 years), known Ben for 10 years<br />
                <span className="text-xs">28th February 2022</span>
              </p>
            </CardContent>
          </Card>

          {/* International Public Figure */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-indigo-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6 text-indigo-600" />
                Extraordinary Generosity Recognised
              </CardTitle>
              <CardDescription className="font-semibold text-indigo-700">
                International Public Figure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-indigo-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "I wanted to write to you personally for your incredible generosity and kindness. I am so impressed you would go out of your way to help us just out of concern and it shows a lot about your character. It certainly is appreciated by me, John and my entire team. Thank you so much for being extraordinary."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Marisa Peer (public figure, testimonial regarding character and generosity)<br />
                <span className="text-xs">Wed, 11 Nov 2020, 20:30</span>
              </p>
            </CardContent>
          </Card>

          {/* Westminster Mental Health Outreach - Speaking */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-cyan-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-cyan-600" />
                Inspiring Public Speaker and Mentor
              </CardTitle>
              <CardDescription className="font-semibold text-cyan-700">
                Westminster Mental Health Outreach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-cyan-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "I think you would be great [at public speaking and mentoring]... When we achieve all your goals and things like that, you may be able to, you know, then when you've moved on to come and speak to our clients as well and inspire them to achieve their goals and things, definitely. I think you would be great."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Atiah, Westminster Mental Health Outreach Service<br />
                <span className="text-xs">Client induction, 2 September 2024, 3:34–4:44 PM</span>
              </p>
            </CardContent>
          </Card>

          {/* Westminster Mental Health Outreach - Aspirational */}
          <Card className="hover:shadow-xl transition-shadow border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-emerald-600" />
                Aspirational Visionary
              </CardTitle>
              <CardDescription className="font-semibold text-emerald-700">
                Westminster Mental Health Outreach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-emerald-200 mb-4" />
              <p className="text-gray-700 italic leading-relaxed mb-4">
                "The fact that you've put so much thought into it [Justice Minds/Advocacy on Demand] is very, very aspirational, I think."
              </p>
              <p className="text-sm text-gray-600 font-medium">
                — Atiah, Westminster Mental Health Outreach Service<br />
                <span className="text-xs">2 September 2024, 4:14 PM</span>
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default About;
