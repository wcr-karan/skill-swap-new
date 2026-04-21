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
            setError(err.response?.data?.error || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const fillTestAccount = () => {
        setEmail('test@example.com');
        setPassword('test123');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4.5 w-4.5 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.07] outline-none transition-all duration-300 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Password</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4.5 w-4.5 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.07] outline-none transition-all duration-300 text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
            )}

            {/* Submit */}
            <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full relative group bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:from-indigo-500 hover:to-purple-500 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex justify-center items-center gap-2 text-sm"
            >
                {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <>
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                )}
                {/* Button glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </button>

            {/* Use Test Account */}
            <button
                type="button"
                onClick={fillTestAccount}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.08] text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/[0.05] transition-all duration-300 text-sm font-medium"
            >
                <Zap className="w-4 h-4" />
                Use Test Account
            </button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]" />
                </div>
            </div>

            {/* Sign up link */}
            <p className="text-center text-slate-500 text-sm pt-2">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
}
