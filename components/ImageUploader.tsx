import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  id: string;
  title: string;
  description: string;
  onImageSelect: (base64Image: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, description, onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    } else {
        setPreview(null);
        onImageSelect(null);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg h-full flex flex-col aspect-square lg:aspect-auto">
      <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div
        onClick={handleAreaClick}
        className="relative flex-grow flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-brand-primary transition-colors duration-300 bg-gray-900/50"
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt={`${title} 미리보기`} className="max-h-full max-w-full object-contain rounded-md p-2" />
        ) : (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">클릭하여 업로드</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;