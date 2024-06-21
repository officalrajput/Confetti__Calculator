import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Calculator from './Calculator';
import './styles/App.css';

const App = () => {
  const [themeMode, setThemeMode] = useState('light');

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff'
      }
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#333333'
      }
    },
  });

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <div className={`App ${themeMode}`}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleTheme}
          className="toggle-button"
        >
          {themeMode === 'light' ? 'Dark Theme' : 'Light Theme'}
        </Button>
        <Calculator thememode={themeMode} /> {/* Change themeMode to thememode */}
      </div>
    </ThemeProvider>
  );
};

export default App;
