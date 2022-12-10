import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useLogin } from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DatabaseService } from "../../services/database.service";
import { useIonAlert } from "@ionic/react";
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
type FormInputs = {
    email: string;
    password: string;
};
const database = new DatabaseService()
const Login: React.FC = () => {
    const history = useHistory()
    const [presentAlert] = useIonAlert();
    const onSuccess = (data: any) => {
        database.setUser(data.data.user)
        history.push('/home');
    }
    const onError = (error: any) => {
        let temp = error?.response?.data?.message
        if (temp)
            setError('email', { message: temp })
        else
            presentAlert('Silahkan Cek Koneksi Anda !')
    }
    const { mutate } = useLogin(onSuccess, onError);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm<FormInputs>({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleLogin = (data: any) => {

        mutate(data)
    }

    return (
        <div className="h-screen w-full items-center flex bg-gray-50 ">
            <div className="card w-full md:w-1/3  mx-auto ">

                <div className="card-body gap-6">
                    <form
                        className="validate-form"
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <h2 className="card-title">Login</h2>
                        {/* USERNAME */}
                        <div className="form-control">
                            <label className="label">
                                Username
                            </label>
                            <div className="input-group">
                                <input type="text" className="input input-primary  w-full" {...register("email")} />
                                <span className="btn btn-circle btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span>
                            </div>
                            {errors.email && (
                                <div className="text-red-400 font-semibold capitalize mt-2">
                                    {errors?.email?.message}
                                </div>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="form-control">
                            <label className="label">
                                Password
                            </label>
                            <div className="input-group">
                                <input type="password" className="input input-primary  w-full" {...register("password")} />
                                <span className="btn btn-circle btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                            </div>
                            {errors.password && (
                                <div className="text-red-400 font-semibold capitalize mt-2">
                                    {errors?.password?.message}
                                </div>
                            )}
                        </div>

                        {/* BUTTON LOGIN */}
                        <div className="card-actions justify-end mt-4">
                            <button type="submit" className="btn btn-primary rounded-xl w-full">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
