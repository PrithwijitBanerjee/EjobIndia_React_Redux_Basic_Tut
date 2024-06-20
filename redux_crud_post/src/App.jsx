import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/commons/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Students from './pages/Students';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { check_token } from './redux/reducers/loginSlice';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';


const PublicRoutesNames = [
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const PrivateRoutesNames = [
  {
    path: '',
    element: <Home />
  },
  {
    path: 'blog',
    element: <Blog />
  },
  {
    path: 'students',
    element: <Students />
  },
  {
    path: 'addStudent',
    element: <AddStudent />
  },
  {
    path: 'editStudent/:id',
    element: <EditStudent />
  }
];

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...PublicRoutesNames.map(route => (
        {
          path: route.path,
          element: route.element
        }
      )),
      ...PrivateRoutesNames.map(route => (
        {
          path: route.path,
          element: <ProtectedRoute>{route.element}</ProtectedRoute>
        }
      ))
    ]
  }
]);


function App() {
  const { redirectTo } = useSelector(state => state?.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check_token());
  }, [redirectTo]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  )
}

export default App
