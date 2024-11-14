'use client';

import { useState } from "react";
import AppLogin from "@/_component/AppLogin";
import Header from "@/_component/Header";
import AppSignUp from "@/_component/AppSignUp";
import Footer from "@/_component/Footer";

const Restaurant = () => {
    const [login, setLogin] = useState(true);

    return (
        <>
            <div className="container mx-auto">
                <Header />
                <h1 className="text-3xl font-bold mb-8 ">Restaurant Login/Signup Page</h1>

                <main className="flex flex-col justify-center items-center min-h-96 space-y-4">
                    {login ? <AppLogin login={setLogin} /> : <AppSignUp login={setLogin} />}
                </main>

            </div>

            <Footer />
        </>
    );
};

export default Restaurant;
