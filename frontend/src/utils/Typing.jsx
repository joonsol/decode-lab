// TypingText.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TypingText = ({ text = "Decoding Ideas,\nDesigning Experience", delay = 0.05 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll("span");
    gsap.set(chars, { opacity: 0 });

    gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: delay,
      ease: "power1.out",
    });
  }, [text, delay]);

  // 줄바꿈도 반영
  const renderText = () =>
    text.split("\n").map((line, i) => (
      <div key={i}>
        {line.split("").map((char, j) => (
          <span key={`${i}-${j}`}>{char}</span>
        ))}
      </div>
    ));

  return (
    <h1 className="typing-text" ref={containerRef}>
      {renderText()}
    </h1>
  );
};

export default TypingText;
