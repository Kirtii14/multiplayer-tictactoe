interface CharacterProps {
  expression: "normal" | "win" | "loss";
}

export default function CatCharacter({ expression }: CharacterProps) {
  const eyes = {
    normal: (
      <>
        <ellipse cx="70" cy="85" rx="8" ry="12" fill="#111" />
        <ellipse cx="130" cy="85" rx="8" ry="12" fill="#111" />
      </>
    ),
    win: (
      <>
        <ellipse cx="70" cy="90" rx="12" ry="6" fill="#111" />
        <ellipse cx="130" cy="90" rx="12" ry="6" fill="#111" />
      </>
    ),
    loss: (
      <>
        <line x1="60" y1="85" x2="80" y2="85" stroke="#111" strokeWidth="3" />
        <line x1="120" y1="85" x2="140" y2="85" stroke="#111" strokeWidth="3" />
      </>
    ),
  };

  const mouth = {
    normal: (
      <path
        d="M75 120 Q100 135 125 120"
        stroke="#111"
        strokeWidth="3"
        fill="none"
      />
    ),
    win: (
      <path
        d="M75 110 Q120 145 135 105"
        stroke="#111"
        strokeWidth="3"
        fill="none"
      />
    ),
    loss: (
      <line
        x1="75"
        y1="125"
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
      <polygon
        points="40,60 70,20 85,70"
        fill="#f4a261"
        stroke="#111"
        strokeWidth="3"
      />
      <polygon
        points="160,60 130,20 115,70"
        fill="#f4a261"
        stroke="#111"
        strokeWidth="3"
      />

      {/* Head */}
      <ellipse
        cx="100"
        cy="110"
        rx="65"
        ry="65"
        fill="#f4a261"
        stroke="#111"
        strokeWidth="3"
      />

      {/* Nose */}
      <polygon
        points="100,105 92,115 108,115"
        fill="#111"
      />

      {/* Whiskers */}
      <line x1="60" y1="115" x2="30" y2="110" stroke="#111" strokeWidth="2" />
      <line x1="60" y1="120" x2="30" y2="125" stroke="#111" strokeWidth="2" />
      <line x1="140" y1="115" x2="170" y2="110" stroke="#111" strokeWidth="2" />
      <line x1="140" y1="120" x2="170" y2="125" stroke="#111" strokeWidth="2" />

      {eyes[expression]}
      {mouth[expression]}
    </svg>
  );
}

