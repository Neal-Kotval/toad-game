import Image from "next/image";
import "../../styles/globals.scss";

const Auth = () => {
    return (
    <div className="bg-gray-100">
        <div 
        className="
          flex 
          min-h-full 
          flex-col 
          justify-center 
          py-12 
          sm:px-6 
          lg:px-8 
        "
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            height="80"
            width="80"
            className="mx-auto w-auto"
            src="/tode_head.png"
            alt="Logo"
          />
          <h2 
            className="
              mt-6 
              text-center 
              text-3xl 
              font-bold 
              tracking-tight 
              text-gray-900
            "
            >
              Sign in to your account
          </h2>
        </div>
        </div>
    </div>
      
  )
}

export default Auth;