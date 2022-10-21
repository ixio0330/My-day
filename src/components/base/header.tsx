import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function getTargetTheme() {
  return localStorage.getItem('TARGET_THEME') || '🌝';
}

function saveTargetTheme(theme: string) {
  localStorage.setItem('TARGET_THEME', theme);
}

export default function Header() {
  const [targetTheme, setTargetTheme] = useState(getTargetTheme());
  function toggleTheme() {
    if (targetTheme === '🌝') {
      document.documentElement.setAttribute('color-theme', 'dark');
      saveTargetTheme('🌞');
      setTargetTheme('🌞');
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
      saveTargetTheme('🌝');
      setTargetTheme('🌝');
    }
  }

  function initTheme() {
    if (targetTheme === '🌝') {
      document.documentElement.setAttribute('color-theme', 'light');
    } else {
      document.documentElement.setAttribute('color-theme', 'dark');
    }
  }

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <header>
      <div className="header_wrap">
        <Link to='/'><h1 className="logo">My_Day</h1></Link>
        <button onClick={toggleTheme}>{ targetTheme }</button>
      </div>
    </header>
  )
}