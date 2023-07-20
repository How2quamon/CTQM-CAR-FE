import React from "react"
import useTitle from "src/hooks/useTitle";
import Footer from "src/layout/Footer";
import NavBar from "src/layout/navigationBar";
import EditInfo from "./EditInfo";
import SideMenu from "./SideMenu";

  const UserPage: React.FC = () => {
    useTitle("Hồ sơ người dùng");
  
    return (
        <React.Fragment>
            <NavBar/>
            <div className="min-h-screen bg-slate-700 leading-normal overflow-x-hidden lg:overflow-auto">
            <div className='flex flex-col flex-1 md:p-0 md:mx-32 '>
                <section className="mx-15 grid grid-cols-4 gap-6 bg-white">
                    <div className="">
                        <SideMenu/>
                    </div>
                    <div className="col-span-3">
                        <EditInfo/>
                    </div>
                </section>
            </div>
            </div> 
            <Footer/>   
        </React.Fragment>
    );
  };
  
  export default UserPage;