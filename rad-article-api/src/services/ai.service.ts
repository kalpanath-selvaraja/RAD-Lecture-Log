import { GoogleGenAI } from "@google/genai";


const apiKey = process.env.GEMINI_API_KEY

const ai = new GoogleGenAI({ apiKey });

export const generateArticelDescription = async (promtText :string) => {

   
        const res = await ai.models.generateContent({
            model:"gemini-3.8-flash-lite",
            contents: `what is ${promtText}`,
            config: {
                maxOutputTokens: 500
            }
        })

        const description = res.text
        return description
    

}