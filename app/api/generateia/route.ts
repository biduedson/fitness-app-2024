import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const data = await req.json();
    const prompt =
      data.body +
      ". Write jsx code and use tailwindcss for modern UI. Don't make any imports. Only output code. only portuguese brazil";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const code = await response.text();

    return NextResponse.json({ code: code });
  } catch (error) {
    console.error(error);
  }
}
