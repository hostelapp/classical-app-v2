import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  title: string;
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const Slider: React.FC<SliderProps> = ({ title, items, selectedIndex, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrows = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateArrows();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrows);
      return () => container.removeEventListener('scroll', updateArrows);
    }
  }, [items]);

  useEffect(() => {
    if (containerRef.current) {
      const selectedElement = containerRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedIndex]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}
        
        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 px-12 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                selectedIndex === index
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:scale-102 shadow-md'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Slider;
