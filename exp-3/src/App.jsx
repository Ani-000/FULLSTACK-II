import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import Analytics from "./pages/Analytics/Analytics";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="colored"
            />

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Home />}
                    />

                    <Route
                        path="posts"
                        element={<Posts />}
                    />

                    <Route
                        path="analytics"
                        element={
                            <RoleGuard
                                allowedRoles={["Admin", "Editor"]}
                            >
                                <Analytics />
                            </RoleGuard>
                        }
                    />

                    <Route
                        path="admin"
                        element={
                            <RoleGuard
                                allowedRoles={["Admin"]}
                            >
                                <AdminPanel />
                            </RoleGuard>
                        }
                    />
                </Route>

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </>
    );
}

export default App;