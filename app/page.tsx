"use client";

import { useState } from "react";

export default function Home() {
  const [htmlCode, setHtmlCode] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const prompt = formData.get("prompt") as string;

    const result = await fetch("/api/openai_consumer", { method: "POST", body: JSON.stringify({ prompt }) });

    const json = await result.json();

    setHtmlCode(json.code);
  };

  return (
    <main className="h-full relative">
      <div className="absolute top-4 left-0 right-0 flex items-center justify-center">
        <p className="text-gray-300">Chargement...</p>
      </div>

      <pre>{htmlCode}</pre>

      <div dangerouslySetInnerHTML={{ __html: htmlCode }} />

      <div className="fixed bottom-4 left-0 right-0 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="p-4 text-gray-300 bg-gray-950 h-fit max-w-lg w-full">
          <fieldset className="flex items-start gap-4">
            <textarea name="prompt" className="bg-gray-800 resize-none rounded-md w-full"></textarea>
            <button className="bg-gray-800 px-4 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
