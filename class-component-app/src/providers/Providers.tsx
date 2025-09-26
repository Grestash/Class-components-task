'use client'
import { ThemeProvider } from 'context/ThemeContext';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children} </ThemeProvider>
    </Provider>
  );
}
