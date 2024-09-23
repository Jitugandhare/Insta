import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './components/ProtectedRoutes';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Chatpage from './components/Chatpage';
import Login from './components/Login';
import Signup from './components/Signup';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <ProtectedRoutes><Home /></ProtectedRoutes>,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile />,
      },
      {
        path: "/chat",
        element: <ProtectedRoutes><Chatpage /></ProtectedRoutes>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    let socketio;

    if (user) {
      socketio = io("https://intsa-backend-1.onrender.com", {
        query: { userId: user._id },
        transports: ["websocket"],
        reconnection: true, // Automatically reconnect
      });

      dispatch(setSocket(socketio));

      // Listen for online users event
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Listen for like notifications
      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });
    }

    return () => {
      if (socketio) {
        socketio.off('getOnlineUsers');
        socketio.off('notification');
        socketio.disconnect();
      }
      dispatch(setSocket(null));
    };
  }, [user, dispatch]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
