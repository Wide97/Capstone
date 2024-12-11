import { useState, useEffect } from "react";

const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY <= lastScrollY);
        lastScrollY = window.scrollY;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isVisible, isToggled, setIsToggled };
};

export default useNavbarVisibility;
