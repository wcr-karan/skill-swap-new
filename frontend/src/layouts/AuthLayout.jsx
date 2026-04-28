import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Users, Zap, Shield, Globe, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Zap,
        title: 'Smart Skill Matching',
        desc: 'AI-powered matching connects you with the perfect learning partners.',
        color: 'indigo',
    },
    {
        icon: Globe,
        title: 'Global Community',
        desc: 'Access a worldwide network of experts across every domain.',
        color: 'violet',
    },
    {
        icon: Shield,
        title: 'Trusted & Safe',
        desc: 'Verified members and secure exchanges every time.',
        color: 'cyan',
    },
];

const colorMap = {
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'text-indigo-400' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'text-violet-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400' },
};

const testimonials = [
    { name: 'Maya K.', role: 'UX Designer', text: 'Found an amazing Python tutor within 24 hours!', rating: 5 },
    { name: 'James R.', role: 'Software Engineer', text: 'Traded React knowledge for design skills — life changing.', rating: 5 },
];

export default function AuthLayout() {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="min-h-screen flex bg-[#0F1117] overflow-hidden relative">

            {/* Background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="glow-orb-1 top-[-200px] left-[-100px]" />
                <div className="glow-orb-2 bottom-[-100px] right-[-100px]" />
                <div className="glow-orb-3 top-[40%] left-[35%]" />
            </div>

            {/* ─── LEFT PANEL ─── */}
            <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-between p-12 xl:p-16 border-r border-white/[0.05]">
                {/* Dot pattern */}
                <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

                {/* Logo */}
                <div className="relative z-10">
                    <Link to="/" className="inline-flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Skill<span className="text-indigo-400">Swap</span>
                        </span>
                    </Link>
                </div>

                {/* Hero */}
                <div className="relative z-10 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            <span className="text-xs text-indigo-300 font-semibold tracking-wide">
                                10,000+ active learners
                            </span>
                        </div>

                        <h1 className="text-4xl xl:text-[2.75rem] font-extrabold text-white leading-[1.15] mb-5 tracking-tight">
                            Trade your skills,<br />
                            <span className="text-gradient">unlock new ones.</span>
                        </h1>

                        <p className="text-[15px] text-slate-400 leading-relaxed mb-10 max-w-sm">
                            SkillSwap connects you with peers who want to learn what you know — and teach what you want to master.
                        </p>

                        {/* Feature list */}
                        <div className="space-y-3 mb-10">
                            {features.map((f) => {
                                const c = colorMap[f.color];
                                return (
                                    <div key={f.title} className={`flex items-start gap-3.5 p-4 rounded-xl ${c.bg} border ${c.border}`}>
                                        <div className={`shrink-0 mt-0.5 ${c.icon}`}>
                                            <f.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{f.title}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium group transition-colors"
                        >
                            Learn how it works
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom stats */}
                <div className="relative z-10 flex items-center gap-8">
                    {[['10K+', 'Active Learners'], ['500+', 'Skills Listed'], ['2K+', 'Swaps Done']].map(([num, lbl], i) => (
                        <div key={i} className="flex items-center gap-4">
                            {i > 0 && <div className="w-px h-8 bg-white/[0.08]" />}
                            <div>
                                <p className="text-lg font-bold text-white">{num}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">{lbl}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── RIGHT PANEL ─── */}
            <div className="w-full lg:w-[48%] xl:w-[45%] flex items-center justify-center p-6 sm:p-10 relative z-10">
                <div className="w-full max-w-[400px]">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-glow-sm">
                            <Users className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Skill<span className="text-indigo-400">Swap</span>
                        </span>
                    </div>

                    {/* Form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="bg-[#161B27] border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/40"
                    >
                        <div className="mb-7">
                            <h2 className="text-[22px] font-bold text-white tracking-tight">
                                {isLogin ? 'Welcome back' : 'Create your account'}
                            </h2>
                            <p className="text-[13px] text-slate-500 mt-1.5">
                                {isLogin
                                    ? 'Sign in to continue your learning journey.'
                                    : 'Join thousands of learners and skill-sharers.'}
                            </p>
                        </div>

                        <Outlet />
                    </motion.div>

                    {/* Test account hint */}
                    {isLogin && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4"
                        >
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Demo Account</p>
                            <div className="space-y-0.5">
                                <p className="text-xs text-slate-400">
                                    Email: <span className="text-slate-300 font-medium">test@example.com</span>
                                </p>
                                <p className="text-xs text-slate-400">
                                    Password: <span className="text-slate-300 font-medium">test123</span>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Testimonial */}
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4"
                        >
                            {testimonials.map((t, i) => (
                                <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-white/[0.06]' : ''}>
                                    <div className="flex gap-0.5 mb-1.5">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 italic leading-relaxed">"{t.text}"</p>
                                    <p className="text-[11px] text-slate-600 mt-1.5 font-medium">{t.name} · {t.role}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
