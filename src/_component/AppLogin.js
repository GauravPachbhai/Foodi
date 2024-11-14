import { useRouter } from "next/navigation";
import { useState } from "react";

const AppLogin = ({login}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: 'POST',
            body: JSON.stringify({ email, password, login: true })
        });

        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        } else {
            alert("Login failed")
        }


    }

    return <>

        <div className="flex-col p-7 rounded-xl shadow-2xl justify-center items-center " >
            {/* title */}
            <div className="text-left">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-gray-400 text-sm">
                    Doesn't have an account yet?
                    <a href="#" className="font-bold text-blue-500 hover:underline" onClick={()=> login(false)}> Sign Up</a>
                </p>
            </div>
            {/* user Details */}
            <div className="p-2 mt-3">
                <div className="mt-1">
                    <p>Username</p>
                    <input className='p-2 w-60 mt-1 outline-none border-2 rounded-lg' type='email' placeholder="e.g: kgglfkdg.@gmail.com" />
                </div >
                <div className="mt-3">
                    <p>Password</p>
                    <input className='p-2 w-60 mt-1 outline-none border-2 rounded-lg' type="password" placeholder="Enter 6 character or more" />
                </div>
            </div>
            {/* remember me */}
            <div className="mt-5 flex ">
                <input type="checkbox" className="mr-2" />
                <p className="text-gray-400 text-sm">Remember me</p>
            </div>
            {/* login button */}
            <div className="flex justify-center mt-4">
                <button className="bg-blue-500 w-40 h-10 text-white font-semibold rounded-md hover:bg-blue-700">Login</button>
            </div>
            {/* login option  */}
            <div className="flex items-center my-4">
                <hr className="flex-grow border-t-2 border-gray-400" />
                <p className="mx-4 text-gray-400">or login with</p>
                <hr className="flex-grow border-t-2 border-gray-400" />
            </div>
            <div className=" flex justify-center items-center border-2 h-14 rounded-3xl hover:shadow-inner cursor-pointer">
                <img className='h-4 mr-3' src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"alt="Google" />
                <p>  Sign in with Google</p>
            </div>


        </div>
    </>
}

export default AppLogin;