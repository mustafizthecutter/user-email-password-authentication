

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);
    }
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">This is Register!!</h2>
                <form onSubmit={handleRegister}>
                    <input className="px-4 py-2 mb-4 w-full" type="email" name="email" id="" placeholder="Your Email Address Here" />
                    <br />
                    <input className="px-4 py-2 mb-4 w-full" type="password" name="password" id="" placeholder="Password Here" />
                    <br />
                    <input className="btn btn-secondary px-4 py-2 mb-4 w-full" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;