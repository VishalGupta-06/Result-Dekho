import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./utilities/ProviderContextApi.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utilities/ReactQuery.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </StrictMode>,
);
