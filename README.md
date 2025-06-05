<h1 align="center">🐾 Animal Web App</h1>

<p align="center">
  A visually engaging and responsive web application to explore <b>Dog</b> and <b>Cat</b> breeds with elegant UI, breed details, and product cards.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13+-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Made%20With-❤️-red" />
</p>

---

## ✨ Overview

This project is a modern pet breed explorer showcasing cats and dogs with dynamic cards, breed traits, origin, and more — all with smooth animations and responsive UI.

> Ideal for portfolios, ecommerce mockups, animal lovers, or pet startups.


## 🧰 Tech Stack

| Tech        | Description                         |
|-------------|-------------------------------------|
| **Next.js** | React Framework for SSR + Routing   |
| **TypeScript** | Static typing with rich IntelliSense |
| **Tailwind CSS** | Utility-first CSS for styling   |
| **ShadCN/UI** | Pre-built UI components (optional) |
| **TheCatAPI / TheDogAPI** | Breed data and images    |

---

## 🧠 Features

- ✅ Display dog & cat breeds with cards
- ✅ Dynamic routing for breed categories
- ✅ Breed info: name, group, weight, lifespan, origin
- ✅ Product card section with price, rating, badges
- ✅ Fully responsive (mobile-first)
- ✅ SEO-optimized Next.js architecture

---

<summary>📁 Folder Structure</summary>

```bash
src/
├── components/         # UI sections like Navbar, Hero, ProductUi
│   └── ui/             # Buttons, Badges, Cards, etc.
├── lib/                # Utility functions
├── app/              # Next.js routes (index.tsx, category.tsx, etc.)
├── public/             # Static assets (images)
├── types/              # All shared interfaces (Dog, CatBreed, etc.)



---

## 📦 Type Definitions (Simplified)

ts
**export interface Dog {
  id: string | number;
  name: string;
  image?: string;
  weight?: { imperial: string; metric: string };
  height?: { imperial: string; metric: string };
  breed_group?: string;
  origin?: string;
  life_span?: string;
  temperament?: string;
  price?: number;
  rating?: number;
  isBestSeller?: boolean;
  discountInfo?: string;
}

export interface CatBreed {
  id: string | number;
  name: string;
  image?: string;
  weight?: { imperial: string; metric: string };
  origin?: string;
  temperament?: string;
  description?: string;
}
