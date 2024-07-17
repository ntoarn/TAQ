import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../apis';
import { User } from '../../interfaces/User';
import { loginSchema } from '../../schemas/authSchema';
import styles from './AuthForm.module.scss';
import { toast } from 'react-toastify';
const Login = () => {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<User>({
        resolver: zodResolver(loginSchema)
    })
    const onSubmit = async (data: User) => {
        try {
            const res = await instance.post("/login", data);
                    if (res.data) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        localStorage.setItem("accessToken", res.data.accessToken);
                        toast.success("Đăng nhập thành công");
                        setTimeout(() => {
                            nav("/");
                        }, 2000);
                    } else {
                        throw new Error("Đăng nhập thất bại");
                    }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
            <label htmlFor="email" className={styles.formLabel}>
                Email
            </label>
            <input type="email" className={`form-control ${styles.formControl}`} id="email"
                {...register("email", { required: true })}
            />
            {errors.email?.message && <p className={styles.textDanger}>{errors.email?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
            <label htmlFor="password" className={styles.formLabel}>
                Password
            </label>
            <input type="password" className={`form-control ${styles.formControl}`} id="password"
                {...register("password", { required: true })}
            />
            {errors.password?.message && <p className={styles.textDanger}>{errors.password?.message}</p>}
        </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
            <button className={`btn btn-primary ${styles.btnPrimary}`} type='submit'>
                Login
            </button>
        </div>
    </form>
</div>
  )
}

export default Login