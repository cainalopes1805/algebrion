import React from 'react';
import { motion } from 'framer-motion';

export default function MatrixDisplay({
  data, // 2D array of numbers/strings: [[1, 2], [3, 4]]
  label = null, // e.g. "A =" or "k · A ="
  highlightRow = null, // 0-indexed row to highlight
  highlightCol = null, // 0-indexed column to highlight
  highlightCell = null, // { r, c }
  selectedCell = null, // { r, c } for interactive picker
  onCellClick = null, // function(r, c, value)
  size = 'md', // 'sm', 'md', 'lg'
  showDimensions = true,
  className = '',
}) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  const rows = data.length;
  const cols = Array.isArray(data[0]) ? data[0].length : 1;

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-11 h-11 text-base md:w-12 md:h-12 md:text-lg',
    lg: 'w-14 h-14 text-xl',
  };

  const bracketWidth = {
    sm: 'w-1.5',
    md: 'w-2',
    lg: 'w-2.5',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Optional Equation Label, e.g., "A =" */}
      {label && (
        <span className="font-serif italic font-bold text-amber-400 text-lg md:text-xl drop-shadow">
          {label}
        </span>
      )}

      {/* Matrix with brackets */}
      <div className="relative inline-flex items-stretch px-1">
        {/* Left Bracket [ */}
        <div className="flex flex-col justify-between py-0.5">
          <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/90 rounded-tl-sm"></div>
          <div className="flex-1 border-l-2 border-amber-400/90"></div>
          <div className="w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400/90 rounded-bl-sm"></div>
        </div>

        {/* Matrix Grid */}
        <div
          className="grid gap-1.5 p-2 bg-slate-900/60 rounded-xl border border-slate-800/80 backdrop-blur-sm shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {data.map((row, rIdx) =>
            row.map((val, cIdx) => {
              const isSelected = selectedCell && selectedCell.r === rIdx && selectedCell.c === cIdx;
              const isHighlighted =
                (highlightCell && highlightCell.r === rIdx && highlightCell.c === cIdx) ||
                highlightRow === rIdx ||
                highlightCol === cIdx;
              const isClickable = Boolean(onCellClick);

              return (
                <motion.button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  whileHover={isClickable ? { scale: 1.08 } : {}}
                  whileTap={isClickable ? { scale: 0.94 } : {}}
                  onClick={() => onCellClick && onCellClick(rIdx, cIdx, val)}
                  disabled={!isClickable}
                  className={`
                    ${sizeClasses[size] || sizeClasses.md}
                    rounded-lg font-mono font-bold flex items-center justify-center transition-all relative
                    ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-lg shadow-amber-500/30 font-black'
                        : isHighlighted
                        ? 'bg-amber-950/70 border border-amber-500/60 text-amber-200'
                        : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 hover:border-slate-500'
                    }
                    ${isClickable ? 'cursor-pointer hover:bg-slate-700' : 'cursor-default'}
                  `}
                >
                  <span>{val}</span>
                  {/* Coordinate Subscript in Tiny font */}
                  <span className="absolute bottom-0.5 right-1 text-[8px] opacity-40 font-sans pointer-events-none">
                    {rIdx + 1},{cIdx + 1}
                  </span>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Right Bracket ] */}
        <div className="flex flex-col justify-between py-0.5">
          <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400/90 rounded-tr-sm"></div>
          <div className="flex-1 border-r-2 border-amber-400/90"></div>
          <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/90 rounded-br-sm"></div>
        </div>

        {/* Dimensions badge at bottom right, e.g. "2×3" */}
        {showDimensions && (
          <div className="absolute -bottom-2 -right-3 px-1.5 py-0.5 bg-slate-950 border border-amber-600/40 rounded text-[10px] font-mono text-amber-400 font-bold shadow-md">
            {rows}×{cols}
          </div>
        )}
      </div>
    </div>
  );
}
