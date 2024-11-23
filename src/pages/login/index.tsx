import Image from "next/image";
import "../../styles/globals.scss";
import Navbar from "@/src/components/Navbar/Navbar";
import LoginForm from "@/src/components/LoginForm/LoginForm";

const Auth = () => {
    return(
      <div>
        <Navbar/>
        <LoginForm />
      </div>
      
    )
}

export default Auth;