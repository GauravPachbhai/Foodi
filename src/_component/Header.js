import Link from "next/link";

const Header = () => {
    return (
        <header className=" bg-white p-3 fixed w-full">
            <div className="flex justify-between items-center">
                <img 
                    src="https://i.ibb.co/vLjmbqq/logo.jpg" 
                    alt="Company Logo" 
                    className="w-44 h-14 object-contain" 
                />
                <nav>
                    <ul className="flex space-x-8 text-black">
                        <li className="hover:text-white hover:bg-orange-500 p-2 rounded-full cursor-pointer">Home</li>
                        <li className="hover:text-white hover:bg-orange-500 p-2 rounded-full cursor-pointer">About</li>
                        <li className="hover:text-white hover:bg-orange-500 p-2 rounded-full cursor-pointer">Contact</li>
                        <li className="hover:text-white hover:bg-orange-500 p-2 rounded-full cursor-pointer">
                           <Link href="/sign-in">Login/Signup</Link> </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
