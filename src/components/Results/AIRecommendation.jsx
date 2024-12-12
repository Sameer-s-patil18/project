import React from 'react';

const AIRecommendation = ({ recommendation }) => {
  if (!recommendation) return null;

  const formatSection = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.includes(':') && !line.startsWith('-')) {
        const [heading, content] = line.split(':');
        return (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-bold text-gray-900">{heading.trim()}:</h4>
            {content && <p className="text-gray-700 ml-2">{content.trim()}</p>}
          </div>
        );
      }
      if (line.startsWith('-')) {
        return (
          <li key={index} className="text-gray-700 ml-6">
            {line.substring(1).trim()}
          </li>
        );
      }
      if (line.trim()) {
        return (
          <p key={index} className="text-gray-700 ml-2">
            {line.trim()}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="mt-6 p-6 bg-green-50 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendation </h3>
      <div className="space-y-2">
        {formatSection(recommendation)}
      </div>
    </div>
  );
};

export default AIRecommendation;