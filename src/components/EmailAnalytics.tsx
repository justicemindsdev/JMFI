import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

type EmailAnalyticsProps = {
  fileContent: string; // CSV string content
};

type EmailRecord = {
  [key: string]: string | number | null | Date;
};

const EmailAnalytics: React.FC<EmailAnalyticsProps> = ({ fileContent }) => {
  const [emailData, setEmailData] = useState<EmailRecord[]>([]);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (fileContent) {
      try {
        const parsed = parseCSV(fileContent);
        processData(parsed);
        setEmailData(parsed);
        setDashboardVisible(true);
        setCurrentPage(1); // reset page on new data
      } catch (error) {
        console.error('Error processing CSV:', error);
      }
    }
  }, [fileContent]);

  const parseCSV = (csvText: string): EmailRecord[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const records: EmailRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values: string[] = [];
      let value = '', insideQuotes = false;

      for (let char of lines[i]) {
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(value.trim().replace(/^"|"$/g, ''));
          value = '';
        } else {
          value += char;
        }
      }

      values.push(value.trim().replace(/^"|"$/g, ''));

      const record: EmailRecord = {};
      headers.forEach((header, idx) => {
        record[header] = values[idx] || '';
      });

      records.push(record);
    }

    return records;
  };

  const processData = (data: EmailRecord[]) => {
    data.forEach((email: any) => {
      email.OpensCount = parseInt(email.Opens) || 0;
      email.SentDate = parseEmailDate(email.Sent);
      email.LastOpenedDate = email['Last Opened'] && email['Last Opened'] !== 'Not read yet'
        ? parseEmailDate(email['Last Opened'])
        : null;
    });
  };

  const parseEmailDate = (dateStr: string): Date | null => {
    try {
      const regex = /([A-Za-z]{3})\s+(\d+),\s+(\d{4}),\s+(\d+):(\d+):(\d+)\s+([AP]M)/;
      const match = dateStr.match(regex);
      if (match) {
        const months: Record<string, number> = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        let [_, m, d, y, hr, min, sec, ampm] = match;
        let hour = parseInt(hr);
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
        return new Date(parseInt(y), months[m], parseInt(d), hour, parseInt(min), parseInt(sec));
      }
      return new Date(dateStr);
    } catch {
      return null;
    }
  };

  const renderStats = () => {
    const totalEmails = emailData.length;
    const highSurveillance = emailData.filter(e => (e as any).OpensCount >= 10).length;
    const avgOpens = emailData.reduce((sum, e) => sum + ((e as any).OpensCount || 0), 0) / totalEmails;

    return (
      <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
          <h3 className="text-base sm:text-lg font-semibold mb-1 text-black">Total Emails</h3>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{totalEmails}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
          <h3 className="text-base sm:text-lg font-semibold mb-1 text-black">High Surveillance</h3>
          <p className="text-2xl sm:text-3xl font-bold text-red-500">{highSurveillance}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
          <h3 className="text-base sm:text-lg font-semibold mb-1 text-black">Avg. Opens</h3>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-500">{avgOpens.toFixed(1)}</p>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return (
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-md sm:rounded-lg shadow-md mt-6 p-2">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {['Recipient', 'Subject', 'Sent', 'Last Opened', 'Opens'].map((head) => (
                <th key={head} className="px-2 py-2 text-xs sm:text-sm md:text-base text-left text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {getPageData().map((email, idx) => (
              <tr key={idx}>
                <td className="px-2 py-2 text-xs sm:text-sm whitespace-nowrap">{email.Recipient as string}</td>
                <td className="px-2 py-2 text-xs sm:text-sm">{email.Subject as string}</td>
                <td className="px-2 py-2 text-xs sm:text-sm whitespace-nowrap">
                  {formatDate(email.SentDate instanceof Date ? email.SentDate : email.SentDate ? new Date(email.SentDate as any) : null)}
                </td>
                <td className="px-2 py-2 text-xs sm:text-sm whitespace-nowrap">
                  {email.LastOpenedDate
                    ? formatDate(
                        email.LastOpenedDate instanceof Date
                          ? email.LastOpenedDate
                          : new Date(email.LastOpenedDate as any)
                      )
                    : 'Not opened'}
                </td>
                <td className="px-2 py-2 text-xs sm:text-sm text-center font-semibold">{(email as any).OpensCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4 px-2 gap-2">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, emailData.length)} of {emailData.length}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPageData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return emailData.slice(start, end);
  };

  const totalPages = Math.ceil(emailData.length / pageSize);

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-gray-100 p-4">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">Email Surveillance Analytics</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Powered by Justice Minds Forensic Intelligence</p>
      </header>

      {!dashboardVisible ? (
        <p className="text-gray-500 text-center">Please Choose a CSV file</p>
      ) : (
        <>
          {renderStats()}
          {renderTable()}
        </>
      )}
    </div>
  );
};

export default EmailAnalytics;
