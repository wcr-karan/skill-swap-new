import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function LandingPage() {
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (authMode === 'login') {
                await login(email, password);
                navigate('/dashboard');
            } else {
                await register(name, email, password);
                navigate('/dashboard'); // Or login then dashboard
            }
        } catch (err) {
            setError(err.response?.data?.error || `Failed to ${authMode}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login');
        setError('');
        // Optional: clear fields or keep them? Keeping email is nice.
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans">

            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] animate-bounce" style={{ animationDuration: '10s' }}></div>
            </div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">

                    {/* Header */}
                    <div className="p-8 text-center border-b border-white/10">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="inline-block mb-2"
                        >
                            <span className="text-3xl font-bold text-white tracking-tight">
                                Skill<span className="text-emerald">Trade</span>
                            </span>
                        </motion.div>
                        <p className="text-slate-400 text-sm">
                            {authMode === 'login' ? 'Welcome back! Ready to learn?' : 'Join the community & start swapping.'}
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="p-8 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {authMode === 'register' && (
                                    <motion.div
                                        key="name-field"
                                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald transition-colors h-5 w-5" />
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full bg-slate-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/20 outline-none transition-all placeholder:text-slate-500"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={authMode === 'register'}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald transition-colors h-5 w-5" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-slate-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/20 outline-none transition-all placeholder:text-slate-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald transition-colors h-5 w-5" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-slate-800/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/20 outline-none transition-all placeholder:text-slate-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={clsx(
                                    "w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex justify-center items-center transition-all",
                                    authMode === 'login'
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald/20 hover:shadow-emerald/40"
                                        : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-indigo/20 hover:shadow-indigo/40"
                                )}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-6 w-6" />
                                ) : (
                                    <span className="flex items-center">
                                        {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="ml-2 h-5 w-5 opacity-80" />
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Footer / Toggle */}
                    <div className="p-6 bg-slate-900/50 border-t border-white/5 text-center">
                        <p className="text-slate-400 text-sm">
                            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="ml-2 text-white font-semibold hover:text-emerald transition-colors underline decoration-emerald/50 hover:decoration-emerald"
                            >
                                {authMode === 'login' ? 'Sign up for free' : 'Log in here'}
                            </button>
                        </p>
                    </div>

                </div>
            </motion.div>

        </div>
    );
}
