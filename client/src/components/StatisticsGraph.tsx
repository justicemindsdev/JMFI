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
      fill: '#3b82f6',
    },
    {
      name: 'Oral Answers',
      value: 4710,
      percentage: 6.1,
      fill: '#10b981',
    },
    {
      name: 'Successful Individual Case Advocacy (est.)',
      value: 77,
      percentage: 0.1,
      fill: '#f97316',
    }
  ];

  return (
    <div className="my-12 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
      <h4 className="text-lg font-semibold mb-6 text-white">Parliamentary Question Success Rate</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
          <YAxis 
            tickFormatter={(tick) => {
              if (tick >= 1000) return `${(tick/1000).toFixed(0)}k`;
              return tick;
            }}
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
            formatter={(value: number) => [`${value.toLocaleString()}`, 'Count']}
            labelStyle={{ color: '#f9fafb' }}
          />
          <Legend wrapperStyle={{ color: '#f9fafb' }} />
          <Bar dataKey="value" fill="#3b82f6" name="Number of Cases" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-400 mt-4">
        Of approximately 77,255 written parliamentary questions in a typical long session, 
        only 4,710 received an oral answer in the House (6.1%). Ben's success falls within the 
        estimated 0.1% of cases that achieve individual advocacy success.
      </p>
    </div>
  );
}

export function PetitionSuccessGraph() {
  const data = [
    { name: 'Debated', value: 350, color: '#10b981' },
    { name: 'Not Debated', value: 29650, color: '#6b7280' },
  ];
  
  const COLORS = ['#10b981', '#1e293b'];
  
  return (
    <div className="my-12 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
      <h4 className="text-lg font-semibold mb-6 text-white">Parliamentary Petition Success Rate</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
            formatter={(value: number) => [`${value.toLocaleString()}`, 'Petitions']}
            labelStyle={{ color: '#f9fafb' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-400 mt-4">
        Of over 30,000 petitions created since the e-petition system launched, 
        only 350 (1.2%) have been debated by MPs. This illustrates the extraordinary 
        threshold of public and parliamentary interest required for formal consideration.
      </p>
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
    <div className="my-12 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
      <h4 className="text-lg font-semibold mb-6 text-white">Annual MP & Peer Correspondence Volume</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
          <YAxis 
            tickFormatter={(tick) => {
              if (tick >= 1000) return `${(tick/1000).toFixed(0)}k`;
              return tick;
            }}
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
            formatter={(value: number) => [`${value.toLocaleString()}`, 'Pieces of Correspondence']}
            labelStyle={{ color: '#f9fafb' }}
          />
          <Legend wrapperStyle={{ color: '#f9fafb' }} />
          <Bar dataKey="total" name="Total Correspondence" fill="#3b82f6" />
          <Bar dataKey="responded" name="Timely Responses" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-400 mt-4">
        UK government departments received over 200,000 pieces of correspondence from MPs and Peers 
        annually, representing constituent concerns. Ben's case was among the minuscule fraction that 
        progressed to formal parliamentary action.
      </p>
    </div>
  );
}