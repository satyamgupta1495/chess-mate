import React, { useRef } from "react"

export default function Login() {

    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        console.log(email, password, "")
        // Do something with email and password
    };

    return (
        <div className="login-container show-top">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h3>Login 123</h3>
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
                    <button className="form-submit-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
