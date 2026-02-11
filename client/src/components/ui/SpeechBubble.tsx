import { ReactNode } from "react";

export default function SpeechBubble({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="
  relative
  bg-paper
  border-4 border-ink
  rounded-comic
  px-4 py-2
  font-comic text-base sm:text-lg
  shadow-comic
  transition-transform duration-200
  hover:-rotate-1
">

      {children}
      <span className="absolute -bottom-3 left-6 w-4 h-4 bg-paper border-l-4 border-b-4 border-ink rotate-45" />
    </div>
  );
}
