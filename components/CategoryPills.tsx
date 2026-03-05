"use client";

import { useState } from "react";
import { categories } from "@/data/professionals";

interface CategoryPillsProps {
  onSelect: (category: string) => void;
}

export default function CategoryPills({ onSelect }: CategoryPillsProps) {
  const [active, setActive] = useState("Alle");

  function handleClick(cat: string) {
    setActive(cat);
    onSelect(cat);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-4 border-t border-black/8">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`shrink-0 px-4 py-1.5 text-sm font-medium border transition-colors ${
              active === cat
                ? "bg-petroleum text-white border-petroleum"
                : "bg-white text-petroleum border-black/20 hover:border-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
