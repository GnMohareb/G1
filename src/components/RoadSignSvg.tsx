import React from 'react';
import { RoadSignType } from '../types';

interface RoadSignSvgProps {
  type: RoadSignType;
  size?: number | string;
  className?: string;
  altText?: string;
}

/*
 * Road sign graphics strictly complying with the Ontario Ministry of Transportation (MTO)
 * Driver's Handbook and Canadian MUTCDC (Manual of Uniform Traffic Control Devices for Canada).
 *
 * Official Ontario Standard Specs:
 * - Regulatory (Rb): White background, black border and symbols; red circle + 45° slash for prohibitions;
 *   green circle for permissive mandatory movements.
 * - Warning (Wa): High-visibility Highway Yellow diamond (#FFC20E), black border and symbols.
 * - School / Crossing (Wa-101): High-visibility Fluorescent Yellow-Green pentagon (#C8E600) with student silhouettes.
 * - Temporary Conditions / Construction (TC): Safety Orange diamond (#FF5F00) with black symbols.
 * - Information / Services: Sky Blue (#0055A5) for emergency/hospital, Emerald Green for guides.
 */

const YELLOW = '#FFC20E';
const FLUO = '#C8E600';
const ORANGE = '#FF5F00';
const BLACK = '#111111';
const RED = '#D21F26';
const WHITE = '#FFFFFF';
const GREEN = '#009E49';
const BLUE = '#0055A5';

const SVG_CLASS = 'w-full h-full drop-shadow-sm select-none';

/* ---------- Shared Ontario Standard Geometry Components ---------- */

const WarningDiamond: React.FC<{ fill?: string; children?: React.ReactNode }> = ({ fill = YELLOW, children }) => (
  <>
    <polygon points="50,2 98,50 50,98 2,50" fill={fill} stroke={BLACK} strokeWidth="1.5" strokeLinejoin="round" />
    <polygon points="50,7 93,50 50,93 7,50" fill="none" stroke={BLACK} strokeWidth="2.5" strokeLinejoin="round" />
    {children}
  </>
);

const RegulatorySquare: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <rect x="3" y="3" width="94" height="94" rx="6" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
    <rect x="6.5" y="6.5" width="87" height="87" rx="4" fill="none" stroke={BLACK} strokeWidth="2.5" />
    {children}
  </>
);

/* Ontario standard red prohibition circle with top-left to bottom-right slash (drawn over the symbol) */
const Prohibition: React.FC = () => (
  <>
    <circle cx="50" cy="50" r="37" fill="none" stroke={RED} strokeWidth="7" />
    <line x1="24" y1="24" x2="76" y2="76" stroke={RED} strokeWidth="7" strokeLinecap="round" />
  </>
);

/* Ontario walking child/pedestrian silhouettes */
const Walker: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = BLACK }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeLinecap="round" fill="none">
    <circle cx="0" cy="0" r="6" fill={color} stroke="none" />
    <line x1="0" y1="9" x2="-3" y2="27" strokeWidth="8" />
    <line x1="-1" y1="12" x2="-10" y2="22" strokeWidth="4.5" />
    <line x1="-1" y1="12" x2="9" y2="20" strokeWidth="4.5" />
    <line x1="-3" y1="27" x2="-11" y2="43" strokeWidth="5.5" />
    <line x1="-3" y1="27" x2="7" y2="42" strokeWidth="5.5" />
  </g>
);

const Bicycle: React.FC<{ x?: number; y?: number; s?: number }> = ({ x = 0, y = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={BLACK} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="-14" cy="6" r="10" strokeWidth="3.5" />
    <circle cx="14" cy="6" r="10" strokeWidth="3.5" />
    <path d="M-14 6 L-5 -10 L10 -10 L14 6 M-5 -10 L0 6 L10 -10 M0 6 L-14 6" strokeWidth="3" />
    <path d="M-8 -14 H-1 M8 -16 L10 -10 M5 -16 H12" strokeWidth="3" />
  </g>
);

const SmallOctagon: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = ((22.5 + i * 45) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  return <polygon points={pts} fill={RED} stroke={WHITE} strokeWidth="1.2" />;
};

export const RoadSignSvg: React.FC<RoadSignSvgProps> = ({
  type,
  size = 120,
  className = '',
  altText,
}) => {
  const width = typeof size === 'number' ? `${size}px` : size;
  const height = typeof size === 'number' ? `${size}px` : size;
  const label = altText || type.replace(/_/g, ' ');

  const renderSignGraphic = () => {
    switch (type) {
      /* ===================== REGULATORY SIGNS (Ontario Rb Series) ===================== */
      case 'stop':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <polygon points="29.3,4 70.7,4 96,29.3 96,70.7 70.7,96 29.3,96 4,70.7 4,29.3" fill={WHITE} stroke="#9CA3AF" strokeWidth="0.8" />
            <polygon points="30.5,7 69.5,7 93,30.5 93,69.5 69.5,93 30.5,93 7,69.5 7,30.5" fill={RED} />
            <polygon points="31.8,9.5 68.2,9.5 90.5,31.8 90.5,68.2 68.2,90.5 31.8,90.5 9.5,68.2 9.5,31.8" fill="none" stroke={WHITE} strokeWidth="1.5" />
            <text x="50" y="58.5" fill={WHITE} fontSize="22" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.8">
              STOP
            </text>
          </svg>
        );

      case 'all_way_stop':
        return (
          <svg viewBox="0 0 100 125" className={SVG_CLASS} aria-label={label} role="img">
            {/* Top Stop Sign */}
            <g transform="translate(0, 0)">
              <polygon points="29.3,4 70.7,4 96,29.3 96,70.7 70.7,96 29.3,96 4,70.7 4,29.3" fill={WHITE} stroke="#9CA3AF" strokeWidth="0.8" />
              <polygon points="30.5,7 69.5,7 93,30.5 93,69.5 69.5,93 30.5,93 7,69.5 7,30.5" fill={RED} />
              <polygon points="31.8,9.5 68.2,9.5 90.5,31.8 90.5,68.2 68.2,90.5 31.8,90.5 9.5,68.2 9.5,31.8" fill="none" stroke={WHITE} strokeWidth="1.5" />
              <text x="50" y="58.5" fill={WHITE} fontSize="22" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.8">
                STOP
              </text>
            </g>
            {/* Ontario Standard ALL WAY Plaque */}
            <rect x="18" y="101" width="64" height="20" rx="3" fill={RED} stroke={WHITE} strokeWidth="1.5" />
            <text x="50" y="115.5" fill={WHITE} fontSize="10.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.5">
              ALL WAY
            </text>
          </svg>
        );

      case 'yield':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <polygon points="4,10 96,10 50,92" fill={RED} stroke="#9CA3AF" strokeWidth="0.8" strokeLinejoin="round" />
            <polygon points="22,20.5 78,20.5 50,70" fill={WHITE} strokeLinejoin="round" />
          </svg>
        );

      case 'do_not_enter':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <circle cx="50" cy="50" r="38" fill={RED} />
              <rect x="20" y="43" width="60" height="14" rx="1.5" fill={WHITE} />
            </RegulatorySquare>
          </svg>
        );

      case 'no_left_turn':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <path d="M58 80 V52 Q58 39 46 39 H38" fill="none" stroke={BLACK} strokeWidth="9" strokeLinecap="square" />
              <polygon points="24,39 40,26 40,52" fill={BLACK} />
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'no_right_turn':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <path d="M42 80 V52 Q42 39 54 39 H62" fill="none" stroke={BLACK} strokeWidth="9" strokeLinecap="square" />
              <polygon points="76,39 60,26 60,52" fill={BLACK} />
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'no_u_turn':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <path d="M62 80 V44 A13 13 0 0 0 36 44 V58" fill="none" stroke={BLACK} strokeWidth="9" strokeLinecap="square" />
              <polygon points="24,56 48,56 36,73" fill={BLACK} />
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'no_parking':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <text x="50" y="69" fill={BLACK} fontSize="54" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
                P
              </text>
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'no_stopping':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              {/* Ontario MTO Rb-52: Red circle with X (two crossed diagonal red bars) */}
              <circle cx="50" cy="50" r="37" fill="none" stroke={RED} strokeWidth="7" />
              <line x1="24" y1="24" x2="76" y2="76" stroke={RED} strokeWidth="7" strokeLinecap="round" />
              <line x1="76" y1="24" x2="24" y2="76" stroke={RED} strokeWidth="7" strokeLinecap="round" />
            </RegulatorySquare>
          </svg>
        );

      case 'no_bicycles':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <Bicycle x={50} y={50} s={1.05} />
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'maximum_50':
      case 'maximum_80':
      case 'maximum_100': {
        const speed = type.replace('maximum_', '');
        return (
          <svg viewBox="0 0 80 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="76" height="96" rx="5" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
            <rect x="5.5" y="5.5" width="69" height="89" rx="3.5" fill="none" stroke={BLACK} strokeWidth="2.5" />
            <text x="40" y="24" fill={BLACK} fontSize="11" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.4">
              MAXIMUM
            </text>
            <text x="40" y="68" fill={BLACK} fontSize={speed.length > 2 ? 33 : 42} fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              {speed}
            </text>
            <text x="40" y="86" fill={BLACK} fontSize="10.5" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              km/h
            </text>
          </svg>
        );
      }

      case 'keep_right':
        return (
          <svg viewBox="0 0 80 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="76" height="96" rx="5" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
            <rect x="5.5" y="5.5" width="69" height="89" rx="3.5" fill="none" stroke={BLACK} strokeWidth="2.5" />
            {/* Ontario Rb-25: obstacle island at bottom */}
            <path d="M30 52 C30 44 38 44 38 52 V80 H22 V52 Z" fill={BLACK} />
            {/* Curved arrow passing to the right of the obstacle */}
            <path d="M22 26 C22 18 56 22 56 46 V62" fill="none" stroke={BLACK} strokeWidth="8" strokeLinecap="square" />
            <polygon points="44,60 68,60 56,82" fill={BLACK} />
          </svg>
        );

      case 'one_way_right':
        return (
          <svg viewBox="0 0 120 54" className={SVG_CLASS} aria-label={label} role="img">
            {/* Ontario Rb-21: Black horizontal rectangle with white arrow containing ONE WAY */}
            <rect x="2" y="2" width="116" height="50" rx="4" fill={BLACK} stroke="#4B5563" strokeWidth="1" />
            <polygon points="12,18 78,18 78,8 108,27 78,46 78,36 12,36" fill={WHITE} />
            <text x="45" y="32" fill={BLACK} fontSize="12" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.5">
              ONE WAY
            </text>
          </svg>
        );

      case 'green_arrow_turn':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              {/* Ontario MUTCDC Permissive Turn: Green Circle = compulsory / permitted movement */}
              <circle cx="50" cy="50" r="36" fill="none" stroke={GREEN} strokeWidth="7" />
              <path d="M56 76 V50 Q56 40 46 40 H38" fill="none" stroke={BLACK} strokeWidth="8" strokeLinecap="square" />
              <polygon points="26,40 40,28 40,52" fill={BLACK} />
            </RegulatorySquare>
          </svg>
        );

      case 'transit_priority_signal':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="24" y="4" width="52" height="92" rx="8" fill="#1F2937" stroke={BLACK} strokeWidth="2" />
            <circle cx="50" cy="28" r="18" fill={BLACK} stroke="#4B5563" strokeWidth="2" />
            <rect x="47" y="14" width="6" height="28" rx="1.5" fill={WHITE} />
            <circle cx="50" cy="70" r="18" fill={BLACK} stroke="#4B5563" strokeWidth="2" />
          </svg>
        );

      case 'pass_with_care':
        return (
          <svg viewBox="0 0 80 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="76" height="96" rx="5" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
            <rect x="5.5" y="5.5" width="69" height="89" rx="3.5" fill="none" stroke={BLACK} strokeWidth="2.5" />
            {['PASS', 'WITH', 'CARE'].map((w, i) => (
              <text key={w} x="40" y={35 + i * 21} fill={BLACK} fontSize="14" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
                {w}
              </text>
            ))}
          </svg>
        );

      case 'do_not_pass':
        return (
          <svg viewBox="0 0 80 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="76" height="96" rx="5" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
            <rect x="5.5" y="5.5" width="69" height="89" rx="3.5" fill="none" stroke={BLACK} strokeWidth="2.5" />
            {['DO', 'NOT', 'PASS'].map((w, i) => (
              <text key={w} x="40" y={35 + i * 21} fill={BLACK} fontSize="14.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
                {w}
              </text>
            ))}
          </svg>
        );

      /* ===================== INFORMATION & SERVICES ===================== */
      case 'hov_lane':
        return (
          <svg viewBox="0 0 80 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="76" height="96" rx="5" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
            <rect x="5.5" y="5.5" width="69" height="89" rx="3.5" fill="none" stroke={BLACK} strokeWidth="2.5" />
            <rect x="8" y="8" width="64" height="32" rx="2" fill={BLACK} />
            <polygon points="40,12 52,24 40,36 28,24" fill={WHITE} />
            <text x="40" y="57" fill={BLACK} fontSize="13.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              HOV LANE
            </text>
            <text x="40" y="74" fill={BLACK} fontSize="10" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              2+ PERSONS
            </text>
          </svg>
        );

      case 'hospital':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="3" y="3" width="94" height="94" rx="6" fill={BLUE} stroke="#0A3C78" strokeWidth="1.5" />
            <rect x="7" y="7" width="86" height="86" rx="4" fill="none" stroke={WHITE} strokeWidth="2" />
            <text x="50" y="71" fill={WHITE} fontSize="62" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              H
            </text>
          </svg>
        );

      /* ===================== SCHOOL / PLAYGROUND ===================== */
      case 'school_zone':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            {/* Ontario Wa-101: Fluorescent yellow-green pentagon pointing up */}
            <polygon points="50,3 96,40 96,97 4,97 4,40" fill={FLUO} stroke={BLACK} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="50,8 91,41 91,92 9,92 9,41" fill="none" stroke={BLACK} strokeWidth="2.5" strokeLinejoin="round" />
            <Walker x={40} y={34} s={1.05} />
            <Walker x={63} y={44} s={0.82} />
          </svg>
        );

      case 'playground_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond fill={FLUO}>
              <Walker x={45} y={30} s={0.95} />
              <circle cx="67" cy="68" r="6" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      /* ===================== WARNING SIGNS (Ontario Wa Series) ===================== */
      case 'pedestrian_crossover':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <Walker x={52} y={24} s={0.95} />
              {[28, 37, 46, 55, 64].map((x) => (
                <rect key={x} x={x} y="70" width="5.5" height="9" fill={BLACK} />
              ))}
            </WarningDiamond>
          </svg>
        );

      case 'railway_crossing':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            {/* Canadian Crossbuck with white blades and bold red border */}
            <g transform="rotate(40 50 50)">
              <rect x="2" y="40" width="96" height="20" rx="2" fill={WHITE} stroke={RED} strokeWidth="3.5" />
            </g>
            <g transform="rotate(-40 50 50)">
              <rect x="2" y="40" width="96" height="20" rx="2" fill={WHITE} stroke={RED} strokeWidth="3.5" />
            </g>
            <circle cx="50" cy="50" r="3" fill="#374151" />
          </svg>
        );

      case 'railway_advance_warning':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            {/* Ontario Wa-18A: Yellow circle with bold X and letters R - R */}
            <circle cx="50" cy="50" r="47" fill={YELLOW} stroke={BLACK} strokeWidth="2.5" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={BLACK} strokeWidth="1.5" />
            <line x1="20" y1="20" x2="80" y2="80" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
            <line x1="80" y1="20" x2="20" y2="80" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
            <text x="21" y="56" fill={BLACK} fontSize="20" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              R
            </text>
            <text x="79" y="56" fill={BLACK} fontSize="20" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              R
            </text>
          </svg>
        );

      case 'traffic_signal_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <rect x="40" y="22" width="20" height="56" rx="4" fill={BLACK} />
              <circle cx="50" cy="32" r="6.5" fill={RED} />
              <circle cx="50" cy="50" r="6.5" fill={YELLOW} stroke="#FFFFFF" strokeWidth="0.5" />
              <circle cx="50" cy="68" r="6.5" fill={GREEN} />
            </WarningDiamond>
          </svg>
        );

      case 'stop_sign_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <SmallOctagon cx={50} cy={33} r={14} />
              <text x="50" y="36.5" fill={WHITE} fontSize="8" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
                STOP
              </text>
              <rect x="46" y="58" width="8" height="24" fill={BLACK} />
              <polygon points="50,47 61,60 39,60" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'yield_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <polygon points="35,20 65,20 50,45" fill={RED} />
              <polygon points="41,24 59,24 50,39" fill={WHITE} />
              <rect x="46" y="60" width="8" height="22" fill={BLACK} />
              <polygon points="50,49 61,62 39,62" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'slippery_when_wet':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Car viewed from rear */}
              <path d="M35 46 L39 34 Q40 31 44 31 H56 Q60 31 61 34 L65 46 Q68 47 68 50 V56 H32 V50 Q32 47 35 46 Z" fill={BLACK} />
              <rect x="34" y="55" width="7" height="6" rx="1" fill={BLACK} />
              <rect x="59" y="55" width="7" height="6" rx="1" fill={BLACK} />
              <path d="M41 36 H59 L62 45 H38 Z" fill={YELLOW} />
              {/* Ontario MTO wavy crossing skid marks */}
              <path d="M38 64 C32 70 44 74 37 82" fill="none" stroke={BLACK} strokeWidth="3.5" strokeLinecap="round" />
              <path d="M62 64 C56 70 68 74 61 82" fill="none" stroke={BLACK} strokeWidth="3.5" strokeLinecap="round" />
            </WarningDiamond>
          </svg>
        );

      case 'divided_highway_begins':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Ontario MTO Wa-34: Median barrier island at TOP */}
              <path d="M45 20 C45 14 55 14 55 20 V38 C55 44 45 44 45 38 Z" fill={BLACK} />
              {/* Left arrow points down */}
              <path d="M52 26 C52 38 36 44 36 64 V78" fill="none" stroke={BLACK} strokeWidth="6" strokeLinecap="square" />
              <polygon points="28,76 44,76 36,87" fill={BLACK} />
              {/* Right arrow points up */}
              <path d="M48 76 C48 64 64 58 64 38 V24" fill="none" stroke={BLACK} strokeWidth="6" strokeLinecap="square" />
              <polygon points="56,26 72,26 64,15" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'divided_highway_ends':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Ontario MTO Wa-35: Median barrier island at BOTTOM */}
              <path d="M45 62 C45 56 55 56 55 62 V80 C55 86 45 86 45 80 Z" fill={BLACK} />
              {/* Left arrow comes down into undivided section */}
              <path d="M36 22 V36 C36 56 52 62 52 74" fill="none" stroke={BLACK} strokeWidth="6" strokeLinecap="square" />
              <polygon points="44,72 60,72 52,83" fill={BLACK} />
              {/* Right arrow curves from right lane into undivided flow */}
              <path d="M64 78 V64 C64 44 48 38 48 24" fill="none" stroke={BLACK} strokeWidth="6" strokeLinecap="square" />
              <polygon points="40,26 56,26 48,15" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'two_way_traffic':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Ontario MTO Wa-27: Left arrow down, Right arrow up */}
              {/* Left arrow down */}
              <rect x="34" y="24" width="7" height="48" fill={BLACK} />
              <polygon points="26,70 49,70 37.5,84" fill={BLACK} />
              {/* Right arrow up */}
              <rect x="59" y="28" width="7" height="48" fill={BLACK} />
              <polygon points="51,30 74,30 62.5,16" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'merge':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Ontario Wa-33: Straight main arrow + angled merging arrow */}
              <path d="M56 82 V26" fill="none" stroke={BLACK} strokeWidth="8" strokeLinecap="square" />
              <polygon points="44,28 68,28 56,15" fill={BLACK} />
              <path d="M30 80 Q30 58 54 46" fill="none" stroke={BLACK} strokeWidth="8" strokeLinecap="square" />
            </WarningDiamond>
          </svg>
        );

      case 'lane_ends':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Ontario Wa-23: Right lane ends (tapers in) */}
              <path d="M38 86 V14" fill="none" stroke={BLACK} strokeWidth="6" strokeLinecap="square" />
              <path d="M66 86 V56 L52 40 V14" fill="none" stroke={BLACK} strokeWidth="6" strokeLinejoin="round" strokeLinecap="square" />
              <line x1="52" y1="84" x2="52" y2="72" stroke={BLACK} strokeWidth="3" />
              <line x1="52" y1="66" x2="52" y2="56" stroke={BLACK} strokeWidth="3" />
            </WarningDiamond>
          </svg>
        );

      case 'roundabout_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Ontario Wa-64: 3 circular counter-clockwise rotating arrows */}
              <g fill="none" stroke={BLACK} strokeWidth="5" strokeLinecap="round">
                <path d="M69 44 A20 20 0 0 0 49 30" />
                <path d="M35 37 A20 20 0 0 0 35 63" />
                <path d="M46 70 A20 20 0 0 0 69 56" />
              </g>
              <polygon points="50,25 50,35 40,30" fill={BLACK} />
              <polygon points="30,64 40,64 35,74" fill={BLACK} />
              <polygon points="70,54 70,44 80,49" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'winding_road':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <path d="M42 84 V72 C42 60 58 60 58 48 C58 36 42 38 42 26" fill="none" stroke={BLACK} strokeWidth="7" strokeLinecap="square" />
              <polygon points="32,28 52,28 42,16" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'sharp_curve_right':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <path d="M42 84 V46 Q42 34 54 34 H58" fill="none" stroke={BLACK} strokeWidth="8" strokeLinecap="square" />
              <polygon points="74,34 58,21 58,47" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'deer_crossing':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Leaping stag silhouette */}
              <g fill={BLACK} stroke={BLACK} strokeLinecap="round">
                <ellipse cx="47" cy="53" rx="16" ry="7" transform="rotate(-18 47 53)" stroke="none" />
                <polygon points="57,47 63,35 68,37 64,51" stroke="none" />
                <ellipse cx="68" cy="34" rx="6" ry="3.4" transform="rotate(-25 68 34)" stroke="none" />
                <path d="M64 32 L61 22 M62 26 L57 22 M67 31 L69 21 M68 25 L73 21" strokeWidth="2" fill="none" />
                <path d="M59 53 L69 62 M57 56 L63 70" strokeWidth="3.5" fill="none" />
                <path d="M35 58 L24 64 M37 59 L30 73" strokeWidth="3.5" fill="none" />
                <polygon points="32,51 26,47 31,56" stroke="none" />
              </g>
            </WarningDiamond>
          </svg>
        );

      case 'hidden_intersection':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <rect x="46" y="16" width="8" height="68" fill={BLACK} />
              <rect x="46" y="46" width="30" height="8" fill={BLACK} />
            </WarningDiamond>
          </svg>
        );

      case 'share_the_road':
        return (
          <svg viewBox="0 0 100 128" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <Bicycle x={50} y={50} s={1.05} />
            </WarningDiamond>
            <rect x="14" y="102" width="72" height="24" rx="3" fill={YELLOW} stroke={BLACK} strokeWidth="2" />
            <text x="50" y="113" fill={BLACK} fontSize="8" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              SHARE
            </text>
            <text x="50" y="122.5" fill={BLACK} fontSize="8" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              THE ROAD
            </text>
          </svg>
        );

      case 'no_standing':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              {/* Car silhouette */}
              <path d="M30 52 L36 40 H64 L70 52 H74 V62 H26 V52 Z" fill={BLACK} />
              <circle cx="37" cy="62" r="5" fill={BLACK} />
              <circle cx="63" cy="62" r="5" fill={BLACK} />
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'no_pedestrians':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <RegulatorySquare>
              <Walker x={50} y={26} s={1.1} />
              <Prohibition />
            </RegulatorySquare>
          </svg>
        );

      case 'slower_traffic_keep_right':
        return (
          <svg viewBox="0 0 80 100" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="76" height="96" rx="5" fill={WHITE} stroke={BLACK} strokeWidth="1.5" />
            <rect x="5.5" y="5.5" width="69" height="89" rx="3.5" fill="none" stroke={BLACK} strokeWidth="2.5" />
            {['SLOWER', 'TRAFFIC', 'KEEP', 'RIGHT'].map((w, i) => (
              <text key={w} x="40" y={28 + i * 18} fill={BLACK} fontSize="11" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
                {w}
              </text>
            ))}
          </svg>
        );

      /* ===================== INFORMATION & SERVICES ===================== */
      case 'emergency_detour_route':
        return (
          <svg viewBox="0 0 110 70" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="106" height="66" rx="5" fill={ORANGE} stroke={BLACK} strokeWidth="2" />
            <text x="55" y="32" fill={BLACK} fontSize="20" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="1">
              EDR
            </text>
            {/* Directional arrow */}
            <polygon points="36,46 70,46 70,40 84,51 70,62 70,56 36,56" fill={BLACK} />
          </svg>
        );

      case 'ontario_400_highway':
        return (
          <svg viewBox="0 0 90 95" className={SVG_CLASS} aria-label={label} role="img">
            {/* Ontario King's Highway Shield with Crown */}
            <path d="M12 28 C12 16 26 12 45 4 C64 12 78 16 78 28 C78 68 56 86 45 92 C34 86 12 68 12 28 Z" fill={BLUE} stroke={BLACK} strokeWidth="2" />
            <path d="M16 30 C16 19 28 15 45 8 C62 15 74 19 74 30 C74 65 54 82 45 87 C36 82 16 65 16 30 Z" fill={WHITE} />
            {/* Crown silhouette */}
            <path d="M30 32 L34 22 L45 27 L56 22 L60 32 Z" fill={BLUE} />
            <text x="45" y="60" fill={BLUE} fontSize="26" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="-0.5">
              401
            </text>
            <text x="45" y="74" fill={BLACK} fontSize="9" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
              ONTARIO
            </text>
          </svg>
        );

      /* ===================== ADDITIONAL WARNING SIGNS ===================== */
      case 'low_clearance':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <polygon points="50,22 42,32 58,32" fill={BLACK} />
              <polygon points="50,78 42,68 58,68" fill={BLACK} />
              <text x="50" y="56" fill={BLACK} fontSize="17" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle">
                3.8 m
              </text>
            </WarningDiamond>
          </svg>
        );

      case 'steep_hill_downward':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              {/* Incline triangle */}
              <polygon points="20,74 80,74 80,44" fill={BLACK} />
              {/* Truck silhouette on incline */}
              <g transform="translate(38 34) rotate(22)">
                <rect x="0" y="0" width="26" height="13" fill={BLACK} />
                <rect x="26" y="5" width="8" height="8" fill={BLACK} />
                <circle cx="6" cy="15" r="3.5" fill={BLACK} />
                <circle cx="28" cy="15" r="3.5" fill={BLACK} />
              </g>
            </WarningDiamond>
          </svg>
        );

      /* ===================== TEMPORARY CONDITIONS / CONSTRUCTION (Ontario TC) ===================== */
      case 'construction_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond fill={ORANGE}>
              {/* Ontario TC-2: Worker digging with shovel */}
              <g fill={BLACK} stroke={BLACK} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="56" cy="30" r="4.5" stroke="none" />
                <path d="M54 36 L44 48 L35 48" strokeWidth="4.5" fill="none" />
                <path d="M48 42 L60 52 L68 64" strokeWidth="3" fill="none" />
                <polygon points="66,62 72,70 65,73 60,65" stroke="none" />
                <path d="M44 48 L46 62 L40 76" strokeWidth="4" fill="none" />
                <path d="M44 48 L54 60 L58 76" strokeWidth="4" fill="none" />
                <path d="M62 76 Q70 70 78 76 Z" stroke="none" />
              </g>
            </WarningDiamond>
          </svg>
        );

      case 'flagperson_ahead':
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond fill={ORANGE}>
              {/* Ontario TC-21: Worker holding flag */}
              <g fill={BLACK} stroke={BLACK} strokeLinecap="round">
                <circle cx="50" cy="26" r="5" stroke="none" />
                {/* Body and hardhat */}
                <path d="M46 22 H54" strokeWidth="3" />
                <line x1="50" y1="31" x2="50" y2="56" strokeWidth="6" />
                {/* Arm holding flagstaff horizontally */}
                <line x1="50" y1="38" x2="68" y2="44" strokeWidth="4" />
                <line x1="68" y1="28" x2="68" y2="72" strokeWidth="3" />
                {/* Flag cloth */}
                <polygon points="68,28 84,36 68,44" stroke="none" fill={BLACK} />
                {/* Legs */}
                <line x1="50" y1="56" x2="42" y2="78" strokeWidth="5" />
                <line x1="50" y1="56" x2="58" y2="78" strokeWidth="5" />
              </g>
            </WarningDiamond>
          </svg>
        );

      case 'construction_fines_doubled':
        return (
          <svg viewBox="0 0 120 70" className={SVG_CLASS} aria-label={label} role="img">
            <rect x="2" y="2" width="116" height="66" rx="4" fill={ORANGE} stroke={BLACK} strokeWidth="2" />
            <rect x="5.5" y="5.5" width="109" height="59" rx="2.5" fill="none" stroke={BLACK} strokeWidth="1.5" />
            <text x="60" y="24" fill={BLACK} fontSize="9.5" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.4">
              CONSTRUCTION ZONE
            </text>
            <text x="60" y="44" fill={BLACK} fontSize="12" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.5">
              FINES
            </text>
            <text x="60" y="58" fill={BLACK} fontSize="12" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" letterSpacing="0.5">
              DOUBLED
            </text>
          </svg>
        );

      case 'narrow_structure_ahead':
      default:
        return (
          <svg viewBox="0 0 100 100" className={SVG_CLASS} aria-label={label} role="img">
            <WarningDiamond>
              <path d="M30 86 V66 L40 56 V44 L30 34 V14" fill="none" stroke={BLACK} strokeWidth="6" strokeLinejoin="round" />
              <path d="M70 86 V66 L60 56 V44 L70 34 V14" fill="none" stroke={BLACK} strokeWidth="6" strokeLinejoin="round" />
            </WarningDiamond>
          </svg>
        );
    }
  };

  return (
    <div
      style={{ width, height, minWidth: width, minHeight: height }}
      className={`inline-flex items-center justify-center ${className}`}
      title={label}
    >
      {renderSignGraphic()}
    </div>
  );
};

export default RoadSignSvg;
