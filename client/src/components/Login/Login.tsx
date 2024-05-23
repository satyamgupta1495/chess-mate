import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLoginHook from "./useLoginHook";
import toast from "react-hot-toast";
import Chessplay from "../../assets/img/chessplay.svg"
export default function Login() {

    const { isValidUser, isLoading, isError, user, navigate } = useLoginHook()

    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()

    const [isRedirected, setIsRedirected] = useState<boolean>(true)

    useEffect(() => {
        console.log(user, isRedirected, user && isRedirected)
        if (user && isRedirected) {
            setIsRedirected(false)
            navigate('/')
            toast.success("Logged in successfully ✔️")
        } else {
            setIsRedirected(true)
            toast.error('User not found or wrong credentials!')
        }
    }, [user, navigate, isRedirected])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        isValidUser({ email, password })
        console.log("dasd987", user)
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
                <form className="form" onSubmit={handleSubmit}>
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
                    <button className="form-submit-btn" type="submit">Login</button>
                    <p>{`Don't have an account yet?`} {<Link to='/signup'> Sign up</Link>} </p>
                </form>
            </div>
        </div>
    )
}
