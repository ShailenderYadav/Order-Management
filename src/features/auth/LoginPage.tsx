import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import type { UserRole } from './authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  user: string;
  role: UserRole;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
    navigate('/dashboard');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow w-100" style={{maxWidth: '20rem'}}>
        <h2 className="fs-4 fw-semibold text-center mb-4">Login</h2>
        <input {...register('user', { required: true })} placeholder="Username" className="form-control mb-3" />
        <select {...register('role', { required: true })} className="form-select mb-3">
          <option value="">Select Role</option>
          <option value="analyst">Analyst</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
} 