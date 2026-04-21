import { Outlet, useLocation } from 'react-router-dom';
import { Users, Sparkles, BookOpen, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout() {
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (
        <div className="min-h-screen flex bg-slate-950 overflow-hidden relative">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            {/* Left Panel — Branding & Hero */}
            <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 xl:p-16">
                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Logo */}
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Skill<span className="text-indigo-400">Swap</span>
                        </span>
                    </Link>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300 font-medium">Community-driven learning</span>
                    </div>

                    <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
                        Exchange Skills,{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Build Connections,
                        </span>{' '}
                        Grow Together
                    </h1>

                    <p className="text-lg text-slate-400 leading-relaxed mb-12">
                        Connect with people who want to learn what you know, and learn
                        from those who have the skills you want to develop.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-4 mb-12">
                        <FeaturePill
                            icon={<BookOpen className="w-4 h-4" />}
                            title="Share Your Expertise"
                            desc="Teach others what you're passionate about"
                            color="indigo"
                        />
                        <FeaturePill
                            icon={<Sparkles className="w-4 h-4" />}
                            title="Learn New Skills"
                            desc="Discover and master new abilities"
                            color="purple"
                        />
                        <FeaturePill
                            icon={<Shield className="w-4 h-4" />}
                            title="Safe Community"
                            desc="Connect in a trusted environment"
                            color="cyan"
                        />
                    </div>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors group"
                    >
                        Ready to start your skill journey?
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Bottom stats */}
                <div className="relative z-10 flex items-center gap-8">
                    <StatBlock number="10K+" label="Active Learners" />
                    <div className="w-px h-10 bg-slate-700" />
                    <StatBlock number="500+" label="Skills Listed" />
                    <div className="w-px h-10 bg-slate-700" />
                    <StatBlock number="2K+" label="Swaps Completed" />
                </div>
            </div>

            {/* Right Panel — Auth Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-8 lg:p-12 relative z-10">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Skill<span className="text-indigo-400">Swap</span>
                        </span>
                    </div>

                    {/* Glass card */}
                    <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/20">
                        {/* Form header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-slate-400 text-sm">
                                {isLogin
                                    ? 'Sign in to continue your learning journey'
                                    : 'Join the community and start swapping skills'}
                            </p>
                        </div>

                        <Outlet />
                    </div>

                    {/* Test account info — only on login */}
                    {isLogin && (
                        <div className="mt-6 bg-indigo-500/[0.08] border border-indigo-500/20 rounded-2xl p-5">
                            <p className="text-indigo-300 text-sm font-semibold mb-2">Test Account</p>
                            <div className="space-y-1">
                                <p className="text-slate-400 text-sm">
                                    Email: <span className="text-slate-300">test@example.com</span>
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Password: <span className="text-slate-300">test123</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FeaturePill({ icon, title, desc, color }) {
    const colorMap = {
        indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
        purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
        cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    };
    return (
        <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl border ${colorMap[color]} backdrop-blur-sm`}>
            <div className="mt-0.5">{icon}</div>
            <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
        </div>
    );
}

function StatBlock({ number, label }) {
    return (
        <div>
            <p className="text-xl font-bold text-white">{number}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
        </div>
    );
}
