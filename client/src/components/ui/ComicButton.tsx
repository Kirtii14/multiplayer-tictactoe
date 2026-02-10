import { ButtonHTMLAttributes } from "react";

export default function ComicButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className="
        border-4 border-ink rounded-comic
        bg-accent-yellow px-6 py-3
        font-comic text-lg
        shadow-comic
        transition
        hover:scale-105 hover:-rotate-tiny
        active:scale-95
      "
    />
  );
}
