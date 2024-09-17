import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { BrowserRouter } from "react-router-dom";
import "./scss/styles.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { RecoilRoot } from "recoil";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RecoilRoot>
            <Root />
          </RecoilRoot>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
