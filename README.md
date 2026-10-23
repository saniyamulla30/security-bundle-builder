# Wyze Security Bundle Builder

An interactive, responsive, pixel-perfect e-commerce bundle builder built with React, Vite, and Tailwind CSS, developed to replicate the provided Figma specifications.

---

## 🚀 Live Demo

- **Live URL**: [Add your live deployment link here once deployed]
- **Repository**: [https://github.com/saniyamulla30/security-bundle-builder](https://github.com/saniyamulla30/security-bundle-builder)

---

## ✨ Features & Functional Highlights

- **4-Step Accordion Flow**: Dynamic progression through Cameras, Plans, Sensors, and Extra Protection with state tracking across steps.
- **Dynamic Cart State Management**: Powered by React Context API (`BuilderContext`) managing variant selection, item quantities, category groupings, and real-time pricing calculations.
- **Dynamic Pricing & Discounts**:
  - Auto-calculated subtotal, strikethrough comparison prices, and total bundle savings.
  - Automatic complimentary items ("FREE" badge logic with strikethrough pricing for required hubs and shipping).
- **Pixel-Perfect Figma Parity**:
  - Matched card dimensions, borders, and light-blue tinted backgrounds (`#F4F8FF`) on active sections and the Review Panel.
  - Adaptive "Learn More" positioning (inline for multi-line copy, dedicated line for short descriptions).
  - Multi-variant selector pills (e.g., White, Grey, Black) with reactive thumbnail updates.
- **Sticky Review Panel**: Desktop-docked breakdown displaying category-sorted line items, individual steppers, satisfaction guarantee badge, and reactive checkout summary.

---

## 🛠️ Tech Stack

- **Framework**: React 18 / 19 (Vite template)
- **Styling**: Tailwind CSS
- **State Management**: React Context & Hooks (`useState`, `useContext`, `useEffect`)
- **Icons & Assets**: Custom SVG assets matching Figma specs

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/saniyamulla30/security-bundle-builder.git](https://github.com/saniyamulla30/security-bundle-builder.git)
   cd security-bundle-builder