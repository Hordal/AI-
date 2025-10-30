import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { generateFittingImage } from './services/geminiService';

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!personImage || !clothingImage) {
      setError('인물과 의상 사진을 모두 업로드해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateFittingImage(personImage, clothingImage);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError('이미지 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);

  const canGenerate = personImage && clothingImage && !isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="py-6 px-4 sm:px-8 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
            AI 패션 피팅
          </h1>
          <p className="hidden md:block text-gray-400">Gemini로 가상 피팅</p>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ImageUploader
            title="인물"
            description="전신 사진을 업로드하세요."
            onImageSelect={setPersonImage}
            id="person-uploader"
          />
          <ImageUploader
            title="의상"
            description="의상 사진을 업로드하세요."
            onImageSelect={setClothingImage}
            id="clothing-uploader"
          />
          <ResultDisplay
            generatedImage={generatedImage}
            isLoading={isLoading}
            error={error}
          />
        </div>
        
        <div className="mt-8 text-center">
            <button
                onClick={handleGenerateClick}
                disabled={!canGenerate}
                className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? '생성 중...' : '입어보기!'}
            </button>
        </div>
      </main>
    </div>
  );
};

export default App;