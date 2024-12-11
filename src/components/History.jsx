import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/historyService';
import { handleError } from '../utils/errorHandling';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold mb-6">Scan History</h2>
        {history.length === 0 ? (
          <div className="text-center text-gray-500">
            No scans found. Try analyzing some food labels!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((scan) => (
              <div key={scan._id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={scan.imageUrl}
                      alt="Food Label"
                      className="h-48 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Scanned on {new Date(scan.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <h4 className="text-lg font-semibold">Analysis</h4>
                      <p className="mt-1 text-sm text-gray-600">{scan.analysis}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;