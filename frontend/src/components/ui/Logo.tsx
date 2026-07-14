// src/components/ui/Logo.tsx
export const Logo = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 800 650" 
    className={className}
    fill="none"
  >
    {/* Scaled down to just the bag icon and typography for UI usage */}
    <g transform="translate(0, 30)">
      <path d="M 460 280 C 460 180, 380 220, 350 160 C 330 120, 310 150, 330 190 C 345 220, 360 240, 360 280" fill="none" stroke="#D1B06B" strokeWidth="14" strokeLinecap="round" />
      <path d="M 340 280 C 340 180, 420 220, 450 160 C 470 120, 490 150, 470 190 C 455 220, 440 240, 440 280" fill="none" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" />
      <path d="M 340 280 C 340 180, 420 220, 450 160 C 470 120, 490 150, 470 190 C 455 220, 440 240, 440 280" fill="none" stroke="#D1B06B" strokeWidth="14" strokeLinecap="round" />
      <path d="M 320 280 L 480 280 L 530 460 A 12 12 0 0 1 518 472 L 282 472 A 12 12 0 0 1 270 460 Z" fill="#1A1B1E" />
      <path d="M 320 280 L 480 280 L 410 400 Q 400 415 390 400 Z" fill="#282A2E" />
      <rect x="393" y="402" width="14" height="22" rx="3" fill="#D1B06B" />
      <circle cx="400" cy="416" r="2.5" fill="#1A1B1E" />
    </g>
  </svg>
);