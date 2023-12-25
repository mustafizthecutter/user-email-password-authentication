import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(email, password);

        // reset error and success 

        setRegisterError('')
        setSuccess('')

        // add validation

        if (password.length < 6) {
            setRegisterError('Password should be 6 character or long');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('You Password should have at least one Uppercase letters!!!!!!');
            return;
        }

        // Log In User

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user);

                if (user.emailVerified) {
                    setSuccess('SuccessFully Updated')
                }
                else {
                    alert('please verify your email address!!!')
                }



            })
            .catch(error => {
                setRegisterError(error.message)
            })
    };
    const handleForgetPassword = e => {
        const email = emailRef.current.value;
        if (!email) {
            setRegisterError('Please provide a email');
            return;
        }
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setRegisterError('please provide a valid email')
            return;

        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email')
            })
            .catch(error => {
                setRegisterError(error.message)
            })
    }

    return (

        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            {
                                registerError && <p className="text-3xl text-red-600">{registerError}</p>
                            }
                            {
                                success && <p className="text-3xl text-green-600">{success}</p>
                            }
                        </form>
                        <p>New In The Website?? Please <Link to={'/register'}>Register</Link> Yourself!!!</p>
                    </div>


                </div>
            </div>

        </div>


    );
};

export default Login;