import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useLoginHook from "./useLoginHook";
import Chessplay from "../../assets/img/chessplay.svg"
import { HiMiniArrowLongLeft } from "react-icons/hi2";

export default function Login() {

    const { loginUser, isLoading, isError, navigate } = useLoginHook()

    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        loginUser({ email, password })
    };

    if (isLoading) {
        <h1>Loading...</h1>
    }

    if (isError) {
        <h1>{isError}</h1>
    }

    return (
        <div className="login-container show-top">
            <div className="form-container">
                <div className="flex justify-start items-center gap-2 cursor-pointer" style={{ color: "#0d6efd" }}>
                    <span onClick={() => navigate('/')} className="flex gap-2 items-center">
                        <span className="text-2xl">
                            <HiMiniArrowLongLeft />
                        </span>
                        <span> Back home </span>
                    </span>
                </div>
                <form className="form" onSubmit={handleLogin}>
                    <div className="flex gap-5">
                        <h3>Login</h3><img className="h-12" src={Chessplay} alt="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            ref={emailRef}
                            value={emailRef.current?.value}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            ref={passwordRef}
                            value={passwordRef.current?.value}
                            required
                        />
                    </div>
                    <button className="form-submit-btn text-white" type="submit">Login</button>
                    <p>{`Don't have an account yet?`}{<Link to='/signup'> Sign up</Link>} </p>
                </form>
            </div>
        </div>
    )
}
