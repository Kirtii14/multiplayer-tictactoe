import { ReactNode } from "react";

export default function ComicCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* shadow layer */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-ink rounded-comic"></div>

      {/* main panel */}
    <div className=" relative bg-paper border-[5px] border-ink rounded-comic px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10 w-full
     max-w-[95%] sm:max-w-md md:max-w-lg flex flex-col justify-between comic-wobble animate-[fadeIn_0.5s_ease-out] ">


        {children}
      </div>
    </div>
  );
}
