import React from "react";
import { useEffect } from "react";
import axios from "axios";


const AuthRedirect = () => {
    const getUser = async () => {
        try {
            // "http://localhost:5000/auth/login/success",
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/login/success`,
                {
                    withCredentials: true,
                }
            );
            // console.log(res.data);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            window.location.href = "/select-reg-type";
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return <></>;
};

export default AuthRedirect;
