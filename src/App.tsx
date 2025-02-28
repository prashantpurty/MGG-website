import { useEffect, useRef, useState } from "react";
import MggIcon from "./assets/MGG-Icon-Dark_2.png";

function App() {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!starsContainerRef.current) return;

    const container = starsContainerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Clear any existing stars
    container.innerHTML = "";

    // Create stars
    const createStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");

      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Random position
      const left = Math.random() * containerWidth;
      const top = Math.random() * containerHeight;
      star.style.left = `${left}px`;
      star.style.top = `${top}px`;

      // Random opacity
      star.style.opacity = (Math.random() * 0.7 + 0.3).toString();

      // Random animation duration
      const twinkleDuration = Math.random() * 5 + 3;
      const moveDuration = Math.random() * 60 + 60;
      star.style.animation = `
        twinkle ${twinkleDuration}s infinite ease-in-out,
        moveStars ${moveDuration}s linear infinite
      `;

      // Random delay
      star.style.animationDelay = `-${Math.random() * moveDuration}s`;

      container.appendChild(star);
    };

    // Create stars based on screen size
    const starCount = isMobile ? 100 : 200;
    for (let i = 0; i < starCount; i++) {
      createStar();
    }

    // Recreate stars when window is resized
    const handleResize = () => {
      if (container) {
        container.innerHTML = "";
        const newStarCount = window.innerWidth < 768 ? 100 : 200;
        for (let i = 0; i < newStarCount; i++) {
          createStar();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background stars */}
      <div
        ref={starsContainerRef}
        className="absolute inset-0 z-0 overflow-hidden"
      ></div>

      {/* Mars planet in background - responsive positioning */}
      <div className="absolute top-1/2 -right-32 sm:-right-24 md:-right-16 lg:right-0 transform -translate-y-1/2 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 rounded-full bg-gradient-to-br from-red-600 to-red-900 opacity-30 blur-md"></div>

      {/* Content */}
      <div className="z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
          <div className="mb-2 sm:mb-0 sm:mr-3 flex-shrink-0">
            <img src={MggIcon} alt="" className="h-8 sm:h-10" />
          </div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold">
            Martians Gaming Guild
          </h1>
        </div>

        <div className="coming-soon-container my-6 sm:my-8">
          <h2 className="coming-soon-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-wider transition-all duration-500">
            COMING SOON
          </h2>
        </div>

        <p className="mt-6 sm:mt-8 text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          The first gaming community for the red planet. Join our interplanetary
          gaming revolution.
        </p>
      </div>

      <footer className="absolute bottom-2 sm:bottom-4 text-gray-500 text-xs sm:text-sm w-full text-center">
        © 2025 Martians Gaming Guild. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
