import './App.css';
//import UseInterceptors from './hooks/UseInterceptor';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Teachers from './pages/Teachers';
import ErrorPage from './pages/404';
import Checkpoints from './pages/Сheckpoints';
import OlimpioadApplication from './pages/olimpiad_application/OlimpiadApplication';
import Admins from './pages/Admins';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    // errorElement: <ErrorPage/>
  },
  {
    path: "/error_page",
    element: <ErrorPage/>,
  },
  {
    path: "/teacher/:id",
    element: <Teachers/>,
  },
  {
    path: "/teacher/checkpoints/:id",
    element: <Checkpoints/>,
  },
  {
    path: "/teacher/aplication_for_olimpiad/:id",
    element: <OlimpioadApplication/>,
  },
  {
    path: "/admin/:id",
    element: <Admins/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
