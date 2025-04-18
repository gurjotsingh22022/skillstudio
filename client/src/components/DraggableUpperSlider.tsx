"use client"

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const keywords = [
  "Technology", "React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "Node.js",
  "Web Development", "Machine Learning", "AI", "Cloud Computing", "Cybersecurity", "UX/UI Design",
];

export default function DraggableSliderTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setCanScroll(containerRef.current.scrollWidth > containerRef.current.clientWidth);
      checkScrollPosition();
    }
  }, [keywords]);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const clientWidth = containerRef.current.clientWidth;
  
      console.log(scrollWidth);
      console.log(scrollLeft + clientWidth);
  
      setIsAtStart(scrollLeft <= 0); 
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 150.00;
      const newScrollPosition = Math.round(
        containerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      );
  
      containerRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canScroll) return;
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
    checkScrollPosition();
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className={`relative w-full mx-auto overflow-hidden py-4`}>
      {!isAtStart && canScroll && (
        <>
        <button 
          onClick={() => handleScroll("left")} 
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 bg-white-100 p-2 rounded-full hover:bg-white-50"
        >
          <ChevronLeft size={24} strokeWidth={1} />
        </button>
        <div className="before:absolute before:top-0 before:left-0 before:h-full before:w-[50px] before:bg-white-100 before:z-10"></div>
        <div className=" before:absolute before:top-0 before:left-10 before:h-full before:w-[50px] before:bg-[linear-gradient(to_right,#fff_20%,rgba(255,255,255,0)_80%);] before:z-10"></div>
        </>
      )}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={checkScrollPosition}
      >
        {keywords.map((keyword, index) => (
          <span key={index} className="px-3 py-2 bg-[rgba(0,0,0,0.05)] rounded-lg text-base font-medium">
            {keyword}
          </span>
        ))}
      </div>
      {!isAtEnd && canScroll && (
        <>
        <button 
          onClick={() => handleScroll("right")} 
          className="absolute right-0 z-20 top-1/2 -translate-y-1/2 bg-white-100 p-2 rounded-full hover:bg-white-50"
        >
          <ChevronRight size={24} strokeWidth={1} />
        </button>
        <div className="before:absolute before:top-0 before:right-0 before:h-full before:w-[50px] before:bg-white-100 before:z-10"></div>
        <div className="before:absolute before:top-0 before:right-10 before:h-full before:w-[50px] before:bg-[linear-gradient(to_left,#fff_20%,rgba(255,255,255,0)_80%);] before:z-10"></div>
        </>
      )}
    </div>
  );
}
