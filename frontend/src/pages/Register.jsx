import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, ArrowRight, Check } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        if (!password) return { level: 0, label: '', color: '' };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-500' };
        if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-amber-500' };
        if (score <= 3) return { level: 3, label: 'Good', color: 'bg-indigo-500' };
        return { level: 4, label: 'Strong', color: 'bg-emerald-500' };
    };

    const strength = getPasswordStrength();
    const passwordsMatch = confirmPassword && password === confirmPassword;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Full Name</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4.5 w-4.5 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.07] outline-none transition-all duration-300 text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4.5 w-4.5 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="register-email"
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
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.07] outline-none transition-all duration-300 text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* Password strength bar */}
                {password && (
                    <div className="flex items-center gap-3 pt-1">
                        <div className="flex gap-1 flex-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                                        i <= strength.level ? strength.color : 'bg-white/[0.06]'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className={`text-xs font-medium ${
                            strength.level <= 1 ? 'text-red-400' :
                            strength.level <= 2 ? 'text-amber-400' :
                            strength.level <= 3 ? 'text-indigo-400' :
                            'text-emerald-400'
                        }`}>
                            {strength.label}
                        </span>
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Confirm Password</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-4.5 w-4.5 group-focus-within:text-indigo-400 transition-colors duration-200" />
                    <input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className={`w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder:text-slate-600 focus:ring-2 focus:bg-white/[0.07] outline-none transition-all duration-300 text-sm ${
                            confirmPassword
                                ? passwordsMatch
                                    ? 'border-emerald-500/40 focus:border-emerald-500/50 focus:ring-emerald-500/20'
                                    : 'border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20'
                                : 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20'
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {/* Match indicator */}
                    {confirmPassword && passwordsMatch && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                    )}
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
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full relative group bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:from-indigo-500 hover:to-purple-500 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex justify-center items-center gap-2 text-sm mt-2"
            >
                {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <>
                        Create Account
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                )}
                {/* Button glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </button>

            {/* Divider */}
            <div className="relative pt-1">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]" />
                </div>
            </div>

            {/* Sign in link */}
            <p className="text-center text-slate-500 text-sm pt-2">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}
