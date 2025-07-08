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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input {...register('user', { required: true })} placeholder="Username" className="w-full p-2 border rounded" />
        <select {...register('role', { required: true })} className="w-full p-2 border rounded">
          <option value="">Select Role</option>
          <option value="analyst">Analyst</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
} 