import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpClients from "./HttpClients";
import NotAdmin from "./pages/NotAdmin";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await HttpClients.get("/api/@me");
                setIsAuthenticated(true);
                setIsAdmin(response.data.is_admin || false);
            } catch (error) {
                console.log(error);
                navigate("/login");
            }
        })();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-200">Loading...</p>
        </div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (requireAdmin && !isAdmin) {
        return <NotAdmin />;
    }

    return children;
};

export default ProtectedRoute;
