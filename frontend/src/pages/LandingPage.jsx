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
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] relative overflow-hidden font-sans text-white">

            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand/30 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            {/* Main Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[480px] mx-4"
            >
                <div className="glass-card rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-brand/10">

                    {/* Header */}
                    <div className="p-10 pb-2 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-brand rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-brand/30 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                <span className="text-3xl font-bold text-white">S</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                                Skill<span className="text-emerald-400">Trade</span>
                            </h1>
                        </motion.div>
                        <p className="text-gray-300 text-lg font-medium">
                            {authMode === 'login' ? 'Welcome back, explorer.' : 'Join the knowledge revolution.'}
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="p-10 pt-6">
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
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full glass-input text-slate-800 pl-11 pr-4 py-4 rounded-xl placeholder:text-gray-400"
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
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full glass-input text-slate-800 pl-11 pr-4 py-4 rounded-xl placeholder:text-gray-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full glass-input text-slate-800 pl-11 pr-4 py-4 rounded-xl placeholder:text-gray-400"
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
                                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 font-medium text-sm text-center flex items-center justify-center gap-2"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary flex justify-center items-center relative overflow-hidden group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-6 w-6" />
                                ) : (
                                    <span className="flex items-center">
                                        {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </div>

                    {/* Footer / Toggle */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 text-center backdrop-blur-sm">
                        <p className="text-gray-600 text-sm font-medium">
                            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="ml-2 text-brand font-bold hover:text-emerald-500 transition-colors"
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

// minor update code refactor: 4

// minor update code refactor: 8

// minor update code refactor: 9

// minor update code refactor: 5
