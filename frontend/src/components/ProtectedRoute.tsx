import React from "react";
import { Outlet } from "react-router-dom";
import { useRequireAuth } from "../reduxApp/hooks";

const ProtectedRoute: React.FC = () => {
    useRequireAuth();
    return <Outlet />;
};

export default ProtectedRoute;
