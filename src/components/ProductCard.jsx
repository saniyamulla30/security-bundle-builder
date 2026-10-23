import React, { useState } from "react";
import { useBuilder } from "../context/BuilderContext";
import QuantityStepper from "./QuantityStepper";

export default function ProductCard({ product }) {
  const { cart, updateQuantity } = useBuilder();

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  const cartKey = selectedVariant
    ? `${product.id}-${selectedVariant.id}`
    : product.id;

  const currentQuantity = cart[cartKey]?.quantity || 0;
  const isSelected = currentQuantity > 0;

  const displayImage = selectedVariant?.image || product.image;

  // Inline "Learn More" for Cam Unlimited, Wyze Battery Cam Pro, and longer copy
  const isInlineLearnMore =
    product.id === "cam-unlimited" ||
    product.id === "wyze-battery-cam-pro" ||
    (product.description && product.description.length > 60);

  const handleIncrement = () => {
    updateQuantity(cartKey, 1, {
      id: product.id,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: displayImage,
      variantLabel: selectedVariant?.label || null,
      isFree: product.isFree || false,
    });
  };

  const handleDecrement = () => {
    updateQuantity(cartKey, -1, {
      id: product.id,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: displayImage,
      variantLabel: selectedVariant?.label || null,
      isFree: product.isFree || false,
    });
  };

  return (
    <div
      className={`relative bg-white rounded-2xl p-3 transition-all duration-200 border flex flex-row items-center gap-2.5 min-h-[134px] w-[265px] shrink-0 ${
        isSelected
          ? "border-[#4F46E5] ring-1 ring-[#4F46E5] shadow-xs"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* 1. Left: Badge + Thumbnail */}
      <div className="relative w-16 h-full shrink-0 flex items-center justify-center">
        {product.badge && (
          <span className="absolute -top-1 -left-1 bg-[#4F46E5] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full z-10 select-none shadow-xs text-center leading-none">
            {product.badge}
          </span>
        )}
        <img
          src={displayImage}
          alt={product.name}
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* 2. Right: Content & Controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
        <div>
          {/* Title */}
          <h3 className="text-[12px] font-semibold text-gray-900 leading-tight">
            {product.name}
          </h3>

          {/* Description: Learn More sits inline on line 3 */}
          <div className="mt-0.5">
            {isInlineLearnMore ? (
              <p className="text-[9.5px] text-gray-500 leading-[1.28] font-normal">
                {product.description}{" "}
                <a
                  href={product.learnMoreUrl || "#"}
                  className="text-[9.5px] text-[#2A5CE6] underline hover:text-[#1d4ed8] transition-colors inline cursor-pointer font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More
                </a>
              </p>
            ) : (
              <>
                <p className="text-[9.5px] text-gray-500 leading-[1.28] font-normal">
                  {product.description}
                </p>
                <div>
                  <a
                    href={product.learnMoreUrl || "#"}
                    className="text-[9.5px] text-[#2A5CE6] underline hover:text-[#1d4ed8] transition-colors inline-block cursor-pointer font-medium leading-tight mt-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn More
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Only render variant pills container IF the product actually has variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mt-1.5">
              {product.variants.map((v) => {
                const isVariantActive =
                  isSelected && selectedVariant?.id === v.id;
                const variantImg = v.image || product.image;

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] font-normal border transition-all cursor-pointer leading-none ${
                      isVariantActive
                        ? "border-emerald-500 bg-emerald-50/50 text-gray-900 shadow-2xs"
                        : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={variantImg}
                      alt={v.label}
                      className="w-3 h-3 object-contain shrink-0"
                    />
                    <span>{v.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Bar: Button / Stepper & Price inside the card border */}
        <div className="flex items-center justify-between pt-1.5 mt-auto">
          {product.category === "PLAN" ? (
            <button
              type="button"
              onClick={isSelected ? handleDecrement : handleIncrement}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#4F46E5] text-[#4F46E5] bg-blue-50/60"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 bg-white"
              }`}
            >
              {isSelected ? "✓ Added" : "+ Add to plan"}
            </button>
          ) : (
            <QuantityStepper
              quantity={currentQuantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          )}

          {/* Price */}
          <div className="text-right">
            {product.compareAtPrice && (
              <span className="block text-[9.5px] text-[#EF4444] line-through leading-none mb-0.5 font-normal">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[12px] font-normal text-gray-900 leading-none block tabular-nums">
              ${product.price.toFixed(2)}
              {product.category === "PLAN" && (
                <span className="text-[9px] text-gray-500 font-normal">
                  /mo
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}