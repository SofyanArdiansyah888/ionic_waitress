
const Login: React.FC = () => {
    return (
        <div className="h-screen w-full items-center flex ">
            <div className="card w-full md:w-1/3  mx-auto bg-base-100 ">

                <div className="card-body gap-6">
                    <h2 className="card-title">Login</h2>
                    {/* USERNAME */}
                    <div className="form-control">
                        <label className="label">
                            Username
                        </label>
                        <div className="input-group">
                            <input type="text" className="input input-primary  w-full" />
                            <button className="btn btn-circle btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </button>
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="form-control">
                        <label className="label">
                            Password
                        </label>
                        <div className="input-group">
                            <input type="text" className="input input-primary  w-full" />
                            <button className="btn btn-circle btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </button>
                        </div>
                        {/* <label className="label">
                            <span className="label-text-alt">Alt label</span>
                        </label> */}
                    </div>

                    {/* BUTTON LOGIN */}
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary rounded-xl w-full">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
