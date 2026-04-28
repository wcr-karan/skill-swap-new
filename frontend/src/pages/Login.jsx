import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight, Zap } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    const fillTestAccount = () => {
        setEmail('test@example.com');
        setPassword('test123');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-400">Email address</label>
                <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="input-base input-icon"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-slate-400">Password</label>
                    <button type="button" className="text-[12px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                        Forgot password?
                    </button>
                </div>
                <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="input-base input-icon"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
                    <p className="text-red-400 text-[13px] text-center font-medium">{error}</p>
                </div>
            )}

            {/* Submit */}
            <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 mt-1"
            >
                {loading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                    <>
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center">
                    <span className="px-3 bg-[#161B27] text-[11px] text-slate-600 uppercase tracking-widest font-semibold">
                        or
                    </span>
                </div>
            </div>

            {/* Quick fill */}
            <button
                type="button"
                onClick={fillTestAccount}
                className="w-full btn-secondary py-3 text-[13px]"
            >
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                Use Demo Account
            </button>

            {/* Sign up link */}
            <p className="text-center text-[13px] text-slate-500 pt-1">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                    Create one free →
                </Link>
            </p>
        </form>
    );
}
