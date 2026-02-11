interface CharacterProps {
  expression: "normal" | "win" | "loss";
}

export default function RatCharacter({ expression }: CharacterProps) {
  const eyes = {
    normal: (
      <>
        <ellipse cx="70" cy="80" rx="6" ry="8" fill="#111" />
        <ellipse cx="130" cy="80" rx="6" ry="8" fill="#111" />
      </>
    ),
    win: (
      <>
        <ellipse cx="70" cy="85" rx="8" ry="4" fill="#111" />
        <ellipse cx="130" cy="85" rx="8" ry="4" fill="#111" />
      </>
    ),
    loss: (
      <>
        <line x1="60" y1="80" x2="80" y2="80" stroke="#111" strokeWidth="3" />
        <line x1="120" y1="80" x2="140" y2="80" stroke="#111" strokeWidth="3" />
      </>
    ),
  };

  const mouth = {
    normal: (
      <path
        d="M75 115 Q100 130 125 115"
        stroke="#111"
        strokeWidth="3"
        fill="none"
      />
    ),
    win: (
      <path
        d="M75 110 Q115 140 135 105"
        stroke="#111"
        strokeWidth="3"
        fill="none"
      />
    ),
    loss: (
      <line
        x1="75"
        y1="120"
        x2="125"
        y2="120"
        stroke="#111"
        strokeWidth="3"
      />
    ),
  };

  return (
    <svg viewBox="0 0 200 200" className="
  w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36
  transition-transform duration-300
  hover:scale-105
  active:scale-95
"
>
      {/* Ears */}
      <circle cx="55" cy="45" r="25" fill="#bbb" stroke="#111" strokeWidth="3" />
      <circle cx="145" cy="45" r="25" fill="#bbb" stroke="#111" strokeWidth="3" />
      <circle cx="55" cy="45" r="15" fill="#ddd" />
      <circle cx="145" cy="45" r="15" fill="#ddd" />

      {/* Head */}
      <ellipse
        cx="100"
        cy="105"
        rx="65"
        ry="60"
        fill="#ccc"
        stroke="#111"
        strokeWidth="3"
      />

      {/* Snout (important for rat identity) */}
      <ellipse
        cx="100"
        cy="115"
        rx="35"
        ry="25"
        fill="#ddd"
        stroke="#111"
        strokeWidth="2"
      />

      {/* Nose */}
      <circle cx="100" cy="110" r="6" fill="#444" />

      {/* Teeth */}
      <rect x="92" y="120" width="6" height="12" fill="#fff" stroke="#111" strokeWidth="1"/>
      <rect x="102" y="120" width="6" height="12" fill="#fff" stroke="#111" strokeWidth="1"/>

      {/* Whiskers */}
      <line x1="65" y1="115" x2="30" y2="105" stroke="#111" strokeWidth="2" />
      <line x1="65" y1="120" x2="30" y2="120" stroke="#111" strokeWidth="2" />
      <line x1="135" y1="115" x2="170" y2="105" stroke="#111" strokeWidth="2" />
      <line x1="135" y1="120" x2="170" y2="120" stroke="#111" strokeWidth="2" />

      {/* Expression */}
      {eyes[expression]}
      {mouth[expression]}
    </svg>
  );
}

