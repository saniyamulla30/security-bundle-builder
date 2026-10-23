import React from "react";
import { useBuilder } from "../context/BuilderContext";
import QuantityStepper from "./QuantityStepper";

export default function ReviewPanel() {
  const { cart, updateQuantity } = useBuilder();

  // Extract active items and preserve their cartKey
  const cartItems = Object.entries(cart || {})
    .filter(([_, item]) => item && item.quantity > 0)
    .map(([key, item]) => ({ ...item, cartKey: key }));

  // Fixed display order to mirror Figma Frame 1735
  const categories = ["CAMERAS", "SENSORS", "ACCESSORIES", "PLAN"];

  // Pricing calculations
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const compareTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.compareAtPrice !== undefined
        ? item.compareAtPrice
        : item.price || 0) *
        item.quantity,
    0
  );

  const totalSavings = compareTotal - totalPrice;
  const hasSavings = totalSavings > 0.01;

  return (
    <aside className="bg-[#F4F8FF] border border-blue-100/80 rounded-2xl p-5 shadow-xs sticky top-6">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          REVIEW
        </span>
        <h2 className="text-xl font-bold text-gray-900 mt-0.5 tracking-tight">
          Your security system
        </h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Cart Items Grouped by Category with darker dividing lines */}
      <div className="mt-3">
        {categories.map((category) => {
          const itemsInCategory = cartItems.filter(
            (item) => item.category === category
          );

          if (itemsInCategory.length === 0) return null;

          return (
            <div
              key={category}
              className="border-t border-gray-200 pt-3 pb-3 space-y-2.5"
            >
              {/* Category Header */}
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                {category}
              </h4>

              <div className="space-y-3">
                {itemsInCategory.map((item) => {
                  const isPlan = item.category === "PLAN";

                  return (
                    <div
                      key={item.cartKey}
                      className="flex items-center justify-between gap-2.5 text-xs"
                    >
                      {/* Product Thumbnail & Name */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-7 h-7 object-contain shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-xs truncate">
                            {item.name}
                          </p>
                          {item.variantLabel && (
                            <p className="text-[10px] text-gray-400">
                              Color: {item.variantLabel}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stepper & Line Item Pricing (All persistent in Blue) */}
                      <div className="flex items-center gap-3 shrink-0">
                        {isPlan ? (
                          <span className="text-[11px] font-medium text-gray-500">
                            Qty: {item.quantity}
                          </span>
                        ) : (
                          <QuantityStepper
                            variant="boxed"
                            quantity={item.quantity}
                            onIncrement={() =>
                              updateQuantity(item.cartKey, 1, item)
                            }
                            onDecrement={() =>
                              updateQuantity(item.cartKey, -1, item)
                            }
                          />
                        )}

                        <div className="text-right w-14">
                          {item.isFree ? (
                            <div>
                              <span className="block text-[10px] text-gray-400 line-through">
                                ${(item.compareAtPrice || 29.92).toFixed(2)}
                              </span>
                              <span className="font-bold text-[#2A5CE6] text-xs">
                                FREE
                              </span>
                            </div>
                          ) : (
                            <div>
                              {item.compareAtPrice &&
                                item.compareAtPrice > item.price && (
                                  <span className="block text-[10px] text-gray-400 line-through">
                                    ${(item.compareAtPrice * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              <span className="text-xs font-bold leading-none text-[#2A5CE6]">
                                ${(item.price * item.quantity).toFixed(2)}
                                {isPlan && (
                                  <span className="text-[9px] text-gray-500 font-normal">
                                    /mo
                                  </span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {cartItems.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4 border-t border-gray-200">
            No items selected yet. Choose cameras to get started.
          </p>
        )}
      </div>

      {/* Fast Shipping Row with darker top/bottom divider */}
      <div className="flex items-center justify-between py-3 border-t border-b border-gray-200 text-xs">
        <div className="flex items-center gap-2 text-gray-700">
          <img
            src="/assets/icons/carbon_delivery.svg"
            alt="Fast Shipping"
            className="w-5 h-5 object-contain shrink-0"
          />
          <span className="font-medium text-gray-700">Fast Shipping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400 line-through">$5.99</span>
          <span className="font-bold text-[#2A5CE6] text-xs">FREE</span>
        </div>
      </div>

      {/* Guarantee Badge & Pricing Summary Row */}
      <div className="pt-4 space-y-4">
        <div className="flex items-end justify-between">
          <img
            src="/assets/icons/badge-guarantee.svg"
            alt="100% Wyze Satisfaction Guarantee"
            className="w-14 h-14 object-contain shrink-0 select-none -mb-1"
          />

          <div className="text-right">
            <span className="inline-block text-[10px] font-semibold text-white bg-[#5046E5] px-2 py-0.5 rounded mb-1">
              as low as $19.19/mo
            </span>
            <div className="flex items-baseline justify-end gap-1.5">
              {hasSavings && (
                <span className="text-xs text-gray-400 line-through">
                  ${compareTotal.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900 leading-none">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Savings Ribbon */}
        {hasSavings && (
          <div className="bg-emerald-100/70 text-emerald-800 text-center py-1.5 px-3 rounded-lg text-xs font-semibold">
            Congrats! You're saving ${totalSavings.toFixed(2)} on your security bundle!
          </div>
        )}

        {/* Checkout Button */}
        <button
          type="button"
          disabled={cartItems.length === 0}
          className="w-full bg-[#5046E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Checkout
        </button>

        {/* Save for Later Link */}
        <div className="text-center">
          <button
            type="button"
            className="text-xs text-gray-500 hover:text-gray-700 underline font-normal transition-colors cursor-pointer"
          >
            Save my system for later
          </button>
        </div>
      </div>
    </aside>
  );
}