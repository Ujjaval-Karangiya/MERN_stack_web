import { useEffect, useState } from "react";

const lightThemes = ["peach", "paper", "almond", "lemon", "mint", "sky"];
const darkThemes  = ["slate", "crimson", "forest", "indigo", "charcoal", "purple"];

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "peach");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex ">
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <optgroup label="Light Themes">
          {lightThemes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </optgroup>
        <optgroup label="Dark Themes">
          {darkThemes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default ThemeToggle;
