import { GoogleGenAI, Modality } from "@google/genai";

const fileToGenerativePart = (base64Data: string) => {
  const match = base64Data.match(/data:(.*);base64,(.*)/);
  if (!match || match.length < 3) {
    throw new Error("Invalid base64 string format");
  }
  const mimeType = match[1];
  const data = match[2];
  
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
};

export const generateFittingImage = async (personImageBase64: string, clothingImageBase64: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const personImagePart = fileToGenerativePart(personImageBase64);
  const clothingImagePart = fileToGenerativePart(clothingImageBase64);

  const textPart = {
    text: "당신은 가상 스타일리스트입니다. 당신의 임무는 두 번째 이미지의 의류 아이템을 가져와 첫 번째 이미지의 사람에게 사실적으로 입히는 것입니다. 사람의 포즈, 배경 및 전반적인 이미지 품질을 보존하세요. 옷은 실제 사진처럼 자연스럽게 맞아야 합니다."
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [personImagePart, clothingImagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  if (response.candidates && response.candidates.length > 0) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }
  }

  throw new Error("API에서 이미지를 생성하지 못했습니다.");
};