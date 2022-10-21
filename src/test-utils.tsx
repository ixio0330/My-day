import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import DaysContextProvider from "./context/days";

const wrapper: FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <DaysContextProvider>
          { children }
        </DaysContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };