import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('app-theme');
        return savedTheme || THEMES.LIGHT;
    });

    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);

        // Update body class for global styling
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${theme}`);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    };

    const isDark = theme === THEMES.DARK;
    const isLight = theme === THEMES.LIGHT;

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark, isLight }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;
