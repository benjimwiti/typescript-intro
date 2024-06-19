// context provider exports a State - value = {useState functionality}
import { createContext, useState, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

//create context
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

//provide value for context
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

//consume context 
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  // { theme , setTheme } = useContext (ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
