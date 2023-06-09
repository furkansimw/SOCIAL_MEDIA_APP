import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import MessagesContextProvider from "./context/MessagesContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <MessagesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MessagesContextProvider>
  </Provider>
);
