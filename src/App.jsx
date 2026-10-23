import React, { useState } from "react";
import { BuilderProvider, useBuilder } from "./context/BuilderContext";
import productsData from "./data/products.json";
import ProductCard from "./components/ProductCard";
import ReviewPanel from "./components/reviewpanel";

function AccordionBuilder() {
  const [activeStep, setActiveStep] = useState("cameras");
  const { cart } = useBuilder();

  const stepsList = productsData?.steps || [];

  const getStepSelectedCount = (stepId) => {
    const categoryMap = {
      cameras: "CAMERAS",
      plan: "PLAN",
      sensors: "SENSORS",
      "extra-protection": "ACCESSORIES",
    };

    const targetCategory = categoryMap[stepId];
    if (!targetCategory) return 0;

    return Object.values(cart || {}).filter(
      (item) => item.category === targetCategory && item.quantity > 0
    ).length;
  };

  const stepsConfig = [
    {
      id: "cameras",
      number: "STEP 1 OF 4",
      title: "Choose your cameras",
      icon: "/assets/icons/icon-camera.svg",
      nextStepId: "plan",
      nextLabel: "Next: Choose your plan",
    },
    {
      id: "plan",
      number: "STEP 2 OF 4",
      title: "Choose your plan",
      icon: "/assets/icons/icon-plan.svg",
      nextStepId: "sensors",
      nextLabel: "Next: Choose your sensors",
    },
    {
      id: "sensors",
      number: "STEP 3 OF 4",
      title: "Choose your sensors",
      icon: "/assets/icons/icon-sensor.svg",
      nextStepId: "extra-protection",
      nextLabel: "Next: Add extra protection",
    },
    {
      id: "extra-protection",
      number: "STEP 4 OF 4",
      title: "Add extra protection",
      icon: "/assets/icons/icon-shipping.svg",
      nextStepId: null,
      nextLabel: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[960px] mx-auto flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Left Side: Accordion Steps Container */}
        <div className="w-full lg:w-[600px] shrink-0 space-y-4">
          {stepsConfig.map((step) => {
            const isOpen = activeStep === step.id;
            const selectedCount = getStepSelectedCount(step.id);

            const matchedStepData = stepsList.find((s) => s.id === step.id);
            const stepProducts =
              matchedStepData?.products ||
              productsData.products?.filter(
                (p) =>
                  p.category ===
                  (step.id === "cameras"
                    ? "CAMERAS"
                    : step.id === "plan"
                    ? "PLAN"
                    : step.id === "sensors"
                    ? "SENSORS"
                    : "ACCESSORIES")
              ) ||
              [];

            return (
              <div
                key={step.id}
                className={`transition-all duration-200 ${
                  isOpen
                    ? "bg-[#F4F8FF] rounded-2xl p-4 sm:p-5 border border-blue-100/60 shadow-xs"
                    : "border-b border-gray-200 pb-3"
                }`}
              >
                {/* 1. Step Subtitle Bar */}
                <div
                  className={`flex items-center justify-between pb-1.5 ${
                    isOpen ? "border-none" : "border-b border-gray-200"
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    {step.number}
                  </span>
                  {selectedCount > 0 && (
                    <span className="text-[11px] font-semibold text-[#2A5CE6] bg-blue-100/60 px-2 py-0.5 rounded-full select-none">
                      {selectedCount} selected
                    </span>
                  )}
                </div>

                {/* 2. Step Title + Accordion Toggle */}
                <button
                  type="button"
                  onClick={() => setActiveStep(isOpen ? null : step.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none pt-1 pb-2 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    {step.icon && (
                      <img
                        src={step.icon}
                        alt=""
                        className="w-4.5 h-4.5 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <h2 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                      {step.title}
                    </h2>
                  </div>

                  <span className="text-[#2A5CE6] text-xs font-bold">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>

                {/* 3. Products Container (Tight flex wrap keeping 265px cards neatly placed) */}
                {isOpen && (
                  <div className="pt-2">
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {stepProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Next Action Button */}
                    {step.nextStepId && (
                      <div className="mt-6 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveStep(step.nextStepId)}
                          className="px-6 py-2 rounded-xl border border-[#7C79ED] bg-white text-[#554EE4] font-medium text-xs hover:bg-[#F4F3FF] transition-all shadow-2xs cursor-pointer tracking-tight"
                        >
                          {step.nextLabel}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Sticky Review Panel */}
        <div className="w-full lg:w-[350px] shrink-0">
          <ReviewPanel />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BuilderProvider>
      <AccordionBuilder />
    </BuilderProvider>
  );
}