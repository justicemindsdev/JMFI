import React, { useEffect, useState } from 'react';

type CSVViewerProps = {
  fileContent: string;
};

type RecordType = { [key: string]: string };

const CSVViewer: React.FC<CSVViewerProps> = ({ fileContent }) => {
  const [data, setData] = useState<RecordType[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (fileContent) {
      try {
        const parsed = parseCSV(fileContent);
        if (parsed.length > 0) {
          setHeaders(Object.keys(parsed[0]));
          setData(parsed);
        }
      } catch (err) {
        console.error('Failed to parse CSV:', err);
      }
    }
  }, [fileContent]);

  const parseCSV = (csv: string): RecordType[] => {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const records: RecordType[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values: string[] = [];
      let value = '', insideQuotes = false;

      for (let char of line) {
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(value);
          value = '';
        } else {
          value += char;
        }
      }
      values.push(value);

      const record: RecordType = {};
      headers.forEach((header, idx) => {
        record[header] = (values[idx] || '').trim().replace(/^"|"$/g, '');
      });

      records.push(record);
    }

    return records;
  };

  const getPageData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  };

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="min-h-screen bg-white dark:bg-dark p-4 text-sm sm:text-base">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-black">CSV Viewer</h1>
        {/* <p className="text-gray-600 dark:text-gray-400">Showing {headers.length} columns and {data.length} records</p> */}
      </header>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No data found in CSV.</p>
      ) : (
        <>
          <div className="overflow-auto bg-gray-50 dark:bg-gray-800 rounded shadow">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="px-2 py-2 text-left text-gray-700 dark:text-gray-200 uppercase text-xs">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white text-black dark:bg-gray-900">
                {getPageData().map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header) => (
                      <td key={header} className="px-2 py-2 whitespace-nowrap">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-black dark:text-gray-400">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, data.length)} of {data.length}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CSVViewer;
