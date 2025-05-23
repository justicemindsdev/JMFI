import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function ParliamentaryQuestionGraph() {
  const data = [
    {
      name: 'Written Questions',
      value: 77255,
      percentage: 100,
    },
    {
      name: 'Oral Answers',
      value: 4710,
      percentage: 6.1,
    },
    {
      name: 'Successful Individual Case Advocacy (est.)',
      value: 77,
      percentage: 0.1,
    }
  ];

  return (
    <div className="mt-32 mb-20 pt-12 bg-gradient-to-br from-gray-900 to-blue-950/40 p-10 rounded-xl shadow-2xl border border-blue-900/30 relative overflow-hidden">
      {/* Enhanced background glow */}
      <div className="absolute inset-0 bg-blue-900/15 blur-xl"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-900/15 to-transparent opacity-30 blur-3xl transform rotate-12"></div>
      
      <div className="relative z-10">
        <div className="flex justify-center items-center mb-8">
          <h4 className="text-xl font-semibold text-white text-center pt-4 border-b-2 border-blue-500 pb-2 inline-block">
            Parliamentary Question Success Rate
          </h4>
        </div>
        
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
            <XAxis dataKey="name" tick={{ fill: '#d1d5db' }} />
            <YAxis 
              tickFormatter={(tick) => {
                if (tick >= 1000) return `${(tick/1000).toFixed(0)}k`;
                return tick;
              }}
              tick={{ fill: '#d1d5db' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
              formatter={(value: number) => [`${value.toLocaleString()}`, 'Count']}
              labelStyle={{ color: '#f9fafb', fontWeight: '600' }}
            />
            <Legend wrapperStyle={{ color: '#f9fafb' }} />
            <Bar dataKey="value" fill="url(#barGradient)" name="Number of Cases" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-8 p-4 bg-blue-950/40 rounded-lg border border-blue-900/40">
          <p className="text-sm text-gray-300">
            Of approximately 77,255 written parliamentary questions in a typical long session, 
            only 4,710 received an oral answer in the House (6.1%). Ben's success falls within the 
            estimated 0.1% of cases that achieve individual advocacy success.
          </p>
        </div>
      </div>
    </div>
  );
}

export function PetitionSuccessGraph() {
  const data = [
    { name: 'Debated', value: 350 },
    { name: 'Not Debated', value: 29650 },
  ];
  
  const COLORS = ['#2563eb', '#1e293b'];
  
  return (
    <div className="mt-32 mb-20 pt-12 bg-gradient-to-br from-gray-900 to-blue-950/40 p-10 rounded-xl shadow-2xl border border-blue-900/30 relative overflow-hidden">
      {/* Enhanced background glow */}
      <div className="absolute inset-0 bg-blue-900/15 blur-xl"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-900/15 to-transparent opacity-30 blur-3xl transform -rotate-12"></div>
      
      
      <div className="relative z-10">
        <div className='relative z-0'>

        <div className="flex justify-center items-center mb-8">
          <h4 className="text-xl font-semibold text-white text-center pt-4 border-b-2 border-blue-500 pb-2 inline-block">
            Parliamentary Petition Success Rate
          </h4>
        </div>
        
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <defs>
              <linearGradient id="pieGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={1}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.9}/>
              </linearGradient>
              <linearGradient id="pieGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f2937" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#111827" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={140}
              innerRadius={70}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={3}
            >
              <Cell fill="url(#pieGradient)" stroke="#1f2937" strokeWidth={2} />
              <Cell fill="url(#pieGradient2)" stroke="#1f2937" strokeWidth={2} />
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                borderColor: '#374151', 
                color: '#f9fafb',
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
              }}
              formatter={(value: number) => [`${value.toLocaleString()}`, 'Petitions']}
              labelStyle={{ color: '#f9fafb', fontWeight: '600' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-8 p-4 bg-blue-950/40 rounded-lg border border-blue-900/40">
          <p className="text-sm text-gray-300">
            Of over 30,000 petitions created since the e-petition system launched, 
            only 350 (1.2%) have been debated by MPs. This illustrates the extraordinary 
            threshold of public and parliamentary interest required for formal consideration.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export function ConstituentCorrespondenceGraph() {
  const data = [
    {
      name: '2022',
      total: 286660,
      responded: 190000,
    },
    {
      name: '2023',
      total: 206515,
      responded: 153000,
    },
  ];

  return (
    <div className="mt-32 mb-20 pt-12 bg-gradient-to-br from-gray-900 to-blue-950/40 p-10 rounded-xl shadow-2xl border border-blue-900/30 relative overflow-hidden">
      {/* Enhanced background glow */}
      <div className="absolute inset-0 bg-blue-900/15 blur-xl"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-900/15 to-transparent opacity-30 blur-3xl transform rotate-12"></div>
      
      <div className="relative z-10">
        <div className="flex justify-center items-center mb-8">
          <h4 className="text-xl font-semibold text-white text-center pt-4 border-b-2 border-blue-500 pb-2 inline-block">
            Annual MP & Peer Correspondence Volume
          </h4>
        </div>
        
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
              </linearGradient>
              <linearGradient id="respondedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e7490" stopOpacity={1}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
            <XAxis dataKey="name" tick={{ fill: '#d1d5db' }} />
            <YAxis 
              tickFormatter={(tick) => {
                if (tick >= 1000) return `${(tick/1000).toFixed(0)}k`;
                return tick;
              }}
              tick={{ fill: '#d1d5db' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                borderColor: '#374151', 
                color: '#f9fafb',
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
              }}
              formatter={(value: number) => [`${value.toLocaleString()}`, 'Pieces of Correspondence']}
              labelStyle={{ color: '#f9fafb', fontWeight: '600' }}
            />
            <Legend wrapperStyle={{ color: '#f9fafb' }} />
            <Bar dataKey="total" name="Total Correspondence" fill="url(#totalGradient)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="responded" name="Timely Responses" fill="url(#respondedGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-8 p-4 bg-blue-950/40 rounded-lg border border-blue-900/40">
          <p className="text-sm text-gray-300">
            UK government departments received over 200,000 pieces of correspondence from MPs and Peers 
            annually, representing constituent concerns. Ben's case was among the minuscule fraction that 
            progressed to formal parliamentary action.
          </p>
        </div>
      </div>
    </div>
  );
}