import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Form from "./routes/Form";

import "./styles/index.scss";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Form />
    }
]);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
