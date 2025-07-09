import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
    // 1️⃣ 자동 설정 (시간 기준)
    const getAutoTheme = () => {
      const hour = new Date().getHours();
      return hour >= 7 && hour < 18 ? "light" : "dark";
    };
  // 2️⃣ 초기 테마 설정: localStorage에 값이 있으면 그걸 쓰고, 없으면 자동
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || getAutoTheme();
  });
  // 3️⃣ 사용자가 수동으로 바꿨는지 여부 추적
  const [manual, setManual] = useState(() => {
    return !!localStorage.getItem("theme");
  });


  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
       setManual(true); // 수동 전환 발생!
  };


  useEffect(()=>{
    document.body.setAttribute('data-theme',theme)

    if(manual){

      localStorage.setItem("theme",theme)
    }
  },[theme,manual])

  // 6️⃣ 수동 설정 안 한 경우 → 1시간마다 시간 기반 자동 전환
  useEffect(() => {
    if (manual) return;

    const interval = setInterval(() => {
      setTheme(getAutoTheme());
    }, 60 * 60 * 1000); // 1시간마다 체크

    return () => clearInterval(interval);
  }, [manual]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
