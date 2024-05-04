import { signUp } from "@/helper";
import React, { useRef } from "react"

export default function SignUp() {

    const usernameRef = useRef<any>()
    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const data = signUp({ username, email, password })
            console.log("datad987", data)
        } catch (error) {
            console.log(error)
        }


        console.log(email, password, username, "usernameasd7")
    };

    return (
        <div className="login-container show-top">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h3>Signup</h3>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            ref={usernameRef}
                            value={usernameRef.current?.value}
                            required
                        />
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
                            value={emailRef.current?.value}
                            required
                        />
                    </div>
                    <button className="form-submit-btn" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}
