import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navber/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const Root = () => {
    return (
        <div className="flex max-w-screen-2xl mx-auto flex-col min-h-screen">
            <Navbar></Navbar>
            <div className="flex-grow   w-full mx-auto"><Outlet></Outlet></div>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;