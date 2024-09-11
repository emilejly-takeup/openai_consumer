import { NextResponse } from "next/server";
import { openai } from "../../../src/lib/openai";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "write only tailwind code",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      code: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json({ error: "Failed to fetch OpenAI response" }, { status: 500 });
  }
};
