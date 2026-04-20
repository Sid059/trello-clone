import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return (
        <div className="min-h-screen bg-gray-100">
            <Outlet />  {/* This is where Dashboard or BoardPage will render */}
        </div>
    )
}