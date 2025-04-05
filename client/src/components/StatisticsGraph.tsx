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
    <div className="my-12 bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg shadow-xl border border-gray-800 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-blue-900/10 blur-xl"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent opacity-20 blur-3xl transform rotate-12"></div>
      
      <div className="relative z-10">
        <h4 className="text-xl font-semibold mb-6 text-white">Parliamentary Question Success Rate</h4>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 15,
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e40af" stopOpacity={0.9}/>
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
            <Bar dataKey="value" fill="url(#barGradient)" name="Number of Cases" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-300 mt-6">
          Of approximately 77,255 written parliamentary questions in a typical long session, 
          only 4,710 received an oral answer in the House (6.1%). Ben's success falls within the 
          estimated 0.1% of cases that achieve individual advocacy success.
        </p>
      </div>
    </div>
  );
}

export function PetitionSuccessGraph() {
  const data = [
    { name: 'Debated', value: 350 },
    { name: 'Not Debated', value: 29650 },
  ];
  
  const COLORS = ['#0d6efd', '#1e293b'];
  
  return (
    <div className="my-12 bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg shadow-xl border border-gray-800 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-blue-900/10 blur-xl"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent opacity-20 blur-3xl transform -rotate-12"></div>
      
      <div className="relative z-10">
        <h4 className="text-xl font-semibold mb-6 text-white">Parliamentary Petition Success Rate</h4>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <defs>
              <linearGradient id="pieGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e40af" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
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
              outerRadius={130}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              <Cell fill="url(#pieGradient)" stroke="#1f2937" strokeWidth={1} />
              <Cell fill="url(#pieGradient2)" stroke="#1f2937" strokeWidth={1} />
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
        <p className="text-sm text-gray-300 mt-6">
          Of over 30,000 petitions created since the e-petition system launched, 
          only 350 (1.2%) have been debated by MPs. This illustrates the extraordinary 
          threshold of public and parliamentary interest required for formal consideration.
        </p>
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
    <div className="my-12 bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg shadow-xl border border-gray-800 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-blue-900/10 blur-xl"></div>
      <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent opacity-20 blur-3xl transform rotate-12"></div>
      
      <div className="relative z-10">
        <h4 className="text-xl font-semibold mb-6 text-white">Annual MP & Peer Correspondence Volume</h4>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 15,
            }}
          >
            <defs>
              <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e40af" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
              </linearGradient>
              <linearGradient id="respondedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e7490" stopOpacity={0.9}/>
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
        <p className="text-sm text-gray-300 mt-6">
          UK government departments received over 200,000 pieces of correspondence from MPs and Peers 
          annually, representing constituent concerns. Ben's case was among the minuscule fraction that 
          progressed to formal parliamentary action.
        </p>
      </div>
    </div>
  );
}