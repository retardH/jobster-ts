import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/assets/css/index.css";
import "normalize.css";
import { Provider } from "react-redux";
import store from "./features/store.ts";
import { injectStore } from "./utils/axios.ts";

injectStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);