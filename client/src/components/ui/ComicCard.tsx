import { ReactNode } from "react";

export default function ComicCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* shadow layer */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-ink rounded-comic"></div>

      {/* main panel */}
      <div
     className="
    relative
    bg-paper
    border-[5px] border-ink
    rounded-comic
    px-10 py-10
    w-full max-w-[520px]
    min-h-[440px]
    flex flex-col justify-between
    comic-wobble
  "
>

        {children}
      </div>
    </div>
  );
}
