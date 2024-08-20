import {
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                loader: () => {
                    if (!localStorage.getItem('access_token')) {
                        return redirect('/login')
                    }
                    return null
                }
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            if (localStorage.getItem('access_token')) {
                return redirect('/')
            }
            return null
        }
    }
]);

export default router