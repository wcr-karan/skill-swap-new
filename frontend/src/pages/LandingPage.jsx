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
                navigate('/dashboard');
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
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#1E1B4B] relative overflow-hidden font-sans text-white">

            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#4338ca] rounded-full blur-[100px] opacity-40"
                ></motion.div>
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#9333ea] rounded-full blur-[100px] opacity-40"
                ></motion.div>
                <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-[#10b981] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            </div>

            {/* Main Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px] mx-4"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl overflow-hidden ring-1 ring-white/10">

                    {/* Header */}
                    <div className="p-10 pb-2 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-4"
                        >
                            <div className="w-16 h-16 bg-gradient-to-tr from-[#10b981] to-[#3b82f6] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald/20 mb-4 transform rotate-3">
                                <span className="text-3xl font-bold text-white">S</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                                Skill<span className="text-[#10b981]">Trade</span>
                            </h1>
                        </motion.div>
                        <p className="text-gray-400 text-lg font-medium">
                            {authMode === 'login' ? 'Welcome back, explorer.' : 'Join the revolution.'}
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="p-10 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {authMode === 'register' && (
                                    <motion.div
                                        key="name-field"
                                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#10b981] transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full bg-[#0f172a]/50 text-white pl-11 pr-4 py-4 rounded-xl border border-white/10 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all placeholder:text-gray-500 hover:border-white/20"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={authMode === 'register'}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#10b981] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-[#0f172a]/50 text-white pl-11 pr-4 py-4 rounded-xl border border-white/10 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all placeholder:text-gray-500 hover:border-white/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#10b981] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-[#0f172a]/50 text-white pl-11 pr-4 py-4 rounded-xl border border-white/10 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all placeholder:text-gray-500 hover:border-white/20"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center flex items-center justify-center gap-2"
                                    >
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className={clsx(
                                    "w-full py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center transition-all duration-300 relative overflow-hidden group",
                                    authMode === 'login'
                                        ? "bg-gradient-to-r from-[#10b981] to-[#059669] text-white"
                                        : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
                                )}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                {loading ? (
                                    <Loader2 className="animate-spin h-6 w-6 relative z-10" />
                                ) : (
                                    <span className="flex items-center relative z-10">
                                        {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="ml-2 h-5 w-5 opacity-80 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Footer / Toggle */}
                    <div className="p-6 bg-[#0f172a]/30 border-t border-white/5 text-center backdrop-blur-sm">
                        <p className="text-gray-400 text-sm font-medium">
                            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="ml-2 text-white font-bold hover:text-[#10b981] transition-colors underline decoration-[#10b981]/50 hover:decoration-[#10b981] decoration-2 underline-offset-4"
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
