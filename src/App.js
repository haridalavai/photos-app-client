import React from 'react';
import ThemeSwitch from './components/ThemeSwitch';
import Router from './routes';

function App() {
  console.log('App.js');
  return (
    <>
      <ThemeSwitch />
      <Router />
    </>
  );
}

export default App;
