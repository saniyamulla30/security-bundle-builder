import React from "react";

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  variant = "default", // "default" for ProductCard, "boxed" for ReviewPanel
}) {
  if (variant === "boxed") {
    return (
      <div className="inline-flex items-center border border-gray-200 rounded-lg px-1.5 py-0.5 bg-white shadow-2xs select-none">
        <button
          type="button"
          onClick={onDecrement}
          disabled={quantity <= 0}
          aria-label="Decrease quantity"
          className="w-4 h-4 flex items-center justify-center text-xs text-gray-500 hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          −
        </button>

        <span className="w-4 text-center text-xs font-bold text-gray-900 tabular-nums">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrement}
          aria-label="Increase quantity"
          className="w-4 h-4 flex items-center justify-center text-xs text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
    );
  }

  // Card Stepper: Compact gap, taller natural font height matching Figma
  return (
    <div className="inline-flex items-center gap-1 select-none">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className={`w-5 h-5 flex items-center justify-center text-sm font-normal leading-none transition-colors cursor-pointer ${
          quantity <= 0
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 rounded"
        }`}
      >
        −
      </button>

      <span className="w-4 text-center text-sm font-normal text-gray-800 leading-none tabular-nums">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="w-5 h-5 flex items-center justify-center text-sm font-normal leading-none text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
}