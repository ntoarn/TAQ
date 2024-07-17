import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { instance } from '../../apis';
import { User } from '../../interfaces/User';
import { registerSchema } from '../../schemas/authSchema';
import styles from './AuthForm.module.scss';
const Register = () => {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<User>({
        resolver: zodResolver(registerSchema)
    })
    const onSubmit = async (data: User) => {
    console.log(data)
        try {
            await instance.post(`/register`, {email: data.email, password: data.password});
            if (confirm("Đăng ký thành công")) {
                nav("/login");
            console.log(data)
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className={styles.container}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
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
                <label htmlFor="confirmPass" className={styles.formLabel}>
                    Confirm Password
                </label>
                <input type="password" className={`form-control ${styles.formControl}`} id="confirmPass"
                    {...register("confirmPass", { required: true })}
                />
                {errors.confirmPass?.message && <p className={styles.textDanger}>{errors.confirmPass?.message}</p>}
            </div>
        <div className={`mb-3 form-group ${styles.formGroup}`}>
            <button className={`btn btn-primary ${styles.btnPrimary}`} type='submit'>
                Register
            </button> <br />
             <Link to="/users/login">Đăng nhập</Link>
        </div>
    </form>
</div>
  )
}

export default Register