import React from "react";
import { useBuilder } from "../context/BuilderContext";
import QuantityStepper from "./QuantityStepper";

export default function ReviewPanel() {
  const { cart, updateQuantity } = useBuilder();

  const cartItems = Object.values(cart).filter((item) => item.quantity > 0);

  // Group items by category in the specified order
  const categories = ["CAMERAS", "SENSORS", "ACCESSORIES", "PLAN"];

  // Calculations
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const compareTotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.compareAtPrice || item.price) * item.quantity,
    0
  );

  const totalSavings = compareTotal - totalPrice;
  const hasSavings = totalSavings > 0.01;

  // Monthly financing calculation (e.g. 12 months)
  const monthlyEstimate = (totalPrice / 12).toFixed(2);

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-6">
      {/* Header */}
      <div className="border-b border-gray-100 pb-4">
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          REVIEW
        </span>
        <h2 className="text-xl font-bold text-gray-900 mt-1">
          Your security system
        </h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Cart Items Grouped by Category */}
      <div className="py-4 space-y-5 border-b border-gray-100">
        {categories.map((category) => {
          const itemsInCategory = cartItems.filter(
            (item) => item.category === category
          );

          if (itemsInCategory.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              {/* Ultra-light, subtle category header */}
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-gray-300">
                {category}
              </h4>

              <div className="space-y-3">
                {itemsInCategory.map((item) => {
                  const itemKey = `${item.productId}-${item.variantLabel || "default"}`;
                  const isPlan = item.category === "PLAN";

                  return (
                    <div
                      key={itemKey}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 object-contain shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {item.name}
                          </p>
                          {item.variantLabel && (
                            <p className="text-[10px] text-gray-400">
                              Color: {item.variantLabel}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Controls & Price */}
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
                              updateQuantity(itemKey, 1, item)
                            }
                            onDecrement={() =>
                              updateQuantity(itemKey, -1, item)
                            }
                          />
                        )}

                        <div className="text-right w-14">
                          {item.isFree ? (
                            <div>
                              <span className="block text-[10px] text-gray-400 line-through">
                                ${(item.compareAtPrice || 29.98).toFixed(2)}
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
                              <span className="font-semibold text-gray-900 text-xs">
                                ${(item.price * item.quantity).toFixed(2)}
                                {isPlan && (
                                  <span className="text-[9px] text-gray-400 font-normal">
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
          <p className="text-xs text-gray-400 text-center py-4">
            No items selected yet. Choose cameras to get started.
          </p>
        )}
      </div>

      {/* Fast Shipping Row */}
      <div className="flex items-center justify-between py-3 border-b border-gray-100 text-xs">
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

      {/* Bottom Guarantee Badge & Price Summary */}
      <div className="pt-4 space-y-4">
        <div className="flex items-end justify-between">
          {/* Real Guarantee Badge Image */}
          <img
            src="/assets/icons/badge-guarantee.svg"
            alt="100% Wyze Satisfaction Guarantee"
            className="w-14 h-14 object-contain shrink-0 select-none -mb-1"
          />

          {/* Pricing Stack */}
          <div className="text-right">
            <span className="inline-block text-[10px] font-semibold text-[#2A5CE6] bg-blue-50 px-2 py-0.5 rounded mb-1">
              as low as ${monthlyEstimate}/mo
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
          <div className="bg-emerald-50 text-emerald-700 text-center py-1.5 px-3 rounded-lg text-xs font-medium">
            Congrats! You're saving ${totalSavings.toFixed(2)} on your security bundle!
          </div>
        )}

        {/* Checkout Button */}
        <button
          type="button"
          disabled={cartItems.length === 0}
          className="w-full bg-[#2A5CE6] hover:bg-[#1E4DC9] active:bg-[#173EA6] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Checkout
        </button>

        {/* Save for later link */}
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