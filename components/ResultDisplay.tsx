import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ResultDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, isLoading, error }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg h-full flex flex-col aspect-square lg:aspect-auto">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">결과</h3>
      <div className="relative flex-grow flex items-center justify-center border-2 border-gray-700 rounded-lg bg-gray-900/50 overflow-hidden">
        {isLoading && (
          <div className="flex flex-col items-center text-gray-400">
            <LoadingSpinner />
            <p className="mt-4 animate-pulse">AI가 마법을 부리는 중...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="p-4 text-center text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold mt-2">오류가 발생했습니다</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {generatedImage && !isLoading && (
          <img src={generatedImage} alt="생성된 패션 피팅 이미지" className="max-h-full max-w-full object-contain" />
        )}
        {!isLoading && !error && !generatedImage && (
          <div className="text-center text-gray-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="mt-2">생성된 이미지가 여기에 표시됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;