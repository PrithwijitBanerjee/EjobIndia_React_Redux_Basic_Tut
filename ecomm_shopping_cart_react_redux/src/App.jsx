import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ErrorBoundary from './pages/ErrorBoundary';
import SignUp from './pages/authentication/SignUp';
import SignIn from './pages/authentication/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './auth/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check_token } from './reducers/loginSlice';

const PublicRoutesNames = [
  {
    path: 'signIn',
    element: <SignIn />
  },
  {
    path: 'signUp',
    element: <SignUp />
  }
];

const PrivateRoutesNames = [
  {
    path: '',
    element: <Home />
  },
  {
    path: 'cart',
    element: <Cart />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    // children: [
    //   {
    //     path: '',
    //     element: <ProtectedRoute><Home /></ProtectedRoute>
    //   },
    //   {
    //     path: 'cart',
    //     element: <ProtectedRoute><Cart /></ProtectedRoute>
    //   },
    //   {
    //     path: 'signUp',
    //     element: <SignUp />
    //   },
    //   {
    //     path: 'signIn',
    //     element: <SignIn />
    //   },
    //   {
    //     path: '*',
    //     element: <NotFound />
    //   }
    // ]
    children: [
      // Public routes
      ...PublicRoutesNames.map(route => ({
        path: route.path,
        element: route.element
      })),
      // Private routes with ProtectedRoute logic
      ...PrivateRoutesNames.map(route => ({
        path: route.path,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>
      }))
    ]
  }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(check_token());
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  )
}

export default App
