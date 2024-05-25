import { signUp } from "@/helper";
import React, { useRef } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate()

    const usernameRef = useRef<any>()
    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()
    const fileInfoRef = useRef<any>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', usernameRef.current?.value);
        data.append('email', emailRef.current?.value);
        data.append('password', passwordRef.current?.value);
        data.append('avatar', fileInfoRef.current);


        try {
            const response = await signUp(data)
            if (response?.data?.success) {
                toast.success("Signedup successfully")
                navigate("/")
            }
        } catch (error) {
            toast.error("Wrong credentials!")
            console.error('Error creating user:', error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            fileInfoRef.current = (file);
            console.log("avatar", fileInfoRef.current)
        }
    }

    return (
        <div className="login-container show-top">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h3>Signup</h3>
                    <div className="mb-3">
                        <label className="form-label">Choose you avatar</label>
                        <input className="form-control" type="file" id="formFileMultiple" onChange={handleFileChange} />
                    </div>
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
                    <p>{`Already have an account?`} {<Link to='/login'> Login</Link>} </p>
                </form>
            </div>
        </div>
    )
}
