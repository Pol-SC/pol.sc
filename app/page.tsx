"use client"

import Background from "./components/Background";
import { BackgroundContext } from "./providers"; 
import { useContext } from "react";

export default function Home() {
  const { isLoaded } = useContext(BackgroundContext);
  return (
    <Background>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-lg text-white text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Pol Selles Climent</h1>
          <div className="flex justify-center gap-2 mt-2">
            <a href="mailto:me@pol.sc" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
          {!isLoaded && (
            <div className="mt-4">
              <p className="text-sm">Loading awesome cubes...</p>
            </div>
          )}
        </div>
      </main>
    </Background>
  );
}
