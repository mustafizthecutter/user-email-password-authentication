import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const checked = e.target.terms.checked
        console.log(email, password);
        setRegisterError('');
        setSuccess('');
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

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                setSuccess('Successfully Updated!!')
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message)
            })
    }
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">This is Register!!</h2>
                <form className="" onSubmit={handleRegister}>
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
            </div>
        </div>
    );
};

export default Register;