import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function MainLayout() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}