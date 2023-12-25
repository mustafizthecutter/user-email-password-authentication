import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checked = e.target.terms.checked;
        console.log(name, email, password, checked);
        // reset error and success

        setRegisterError('');
        setSuccess('');

        // add validation

        if (password.length < 6) {
            setRegisterError('Password should be 6 character or long');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('You Password should have at least one Uppercase letters!!!!!!');
            return;
        }
        else if (!checked) {
            setRegisterError('Please Check Our terms & conditions');
            return;
        }

        // add new user

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                setSuccess('Successfully Updated!!');

                // update profile

                updateProfile(userCredential.user, { displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg" })
                .then(()=>{
                    console.log('profile updated');
                })
                .catch()

                // send verify email address

                sendEmailVerification(userCredential.user)
                    .then(() => {
                        alert('please verify your email address!!')
                    })
            })
            .catch(error => {
                setRegisterError(error.message)
            })
    }

    return (

        <div className="mx-auto md:w-1/2">
            <h2 className="text-3xl mb-8">This is Register!!</h2>
            <form className="" onSubmit={handleRegister}>
                <input className="px-4 py-2 mb-4 w-full" type="text" name="name" id="" placeholder="Your Name Here" required />
                <input className="px-4 py-2 mb-4 w-full" type="email" name="email" id="" placeholder="Your Email Address Here" required />
                <br />
                <div className="relative">
                    <input className=" px-4 py-2 mb-4 w-full" type={showPassword ? 'text' : 'password'} name="password" id="" placeholder="Password Here" required />

                    <span className="absolute right-2 top-2 " onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeOff className="text-3xl" /> : <IoEye className="text-3xl" />}</span>
                </div>
                <br />
                <div className="mb-4">
                    <input type="checkbox" name="terms" id="" />
                    <label className="ml-2" htmlFor="terms">Apply our <a href="">terms & conditions</a></label>
                </div>
                <input className="btn btn-secondary px-4 py-2 mb-4 w-full" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-3xl text-red-600">{registerError}</p>
            }
            {
                success && <p className="text-3xl text-green-600">{success}</p>
            }
            <p>Already have an account?? Please <Link to={'/login'}>Login</Link></p>
        </div>


    );
};

export default Register;