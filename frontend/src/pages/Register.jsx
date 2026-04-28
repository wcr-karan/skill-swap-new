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
            <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-400 block">Full Name</label>
                <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        className="input-base input-icon"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-400 block">Email address</label>
                <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        id="register-email"
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
                <label className="text-[13px] font-medium text-slate-400 block">Password</label>
                <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        id="register-password"
                        type="password"
                        placeholder="Min. 6 characters"
                        className="input-base input-icon"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                {/* Password strength bar */}
                {password && (
                    <div className="flex items-center gap-3 pt-0.5">
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
                        <span className={`text-[11px] font-semibold ${
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
            <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-slate-400 block">Confirm Password</label>
                <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4 w-4 group-focus-within:text-indigo-400 transition-colors" />
                    <input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className={`input-base input-icon pr-10 ${
                            confirmPassword
                                ? passwordsMatch
                                    ? 'border-emerald-500/40 focus:border-emerald-500/50 focus:ring-emerald-500/15'
                                    : 'border-red-500/40 focus:border-red-500/50 focus:ring-red-500/15'
                                : ''
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    {confirmPassword && passwordsMatch && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                    )}
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
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 mt-1"
            >
                {loading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
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
