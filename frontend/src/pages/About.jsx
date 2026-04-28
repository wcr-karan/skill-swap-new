import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, ChevronDown, Star, Quote } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/[0.06] last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left group"
            >
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors text-[15px]">{question}</span>
                <ChevronDown className={clsx("h-4 w-4 text-slate-500 transition-transform duration-300 shrink-0 ml-4", isOpen && "rotate-180 text-indigo-400")} />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <p className="pb-4 text-slate-400 leading-relaxed text-[14px]">{answer}</p>
            </motion.div>
        </div>
    );
}

export default function About() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const steps = [
        { title: 'Create Profile', desc: 'List the skills you have and those you\'re eager to learn.', num: '01' },
        { title: 'Match & Connect', desc: 'Our algorithm finds mentors and partners tailored to your goals.', num: '02' },
        { title: 'Exchange Value', desc: 'Propose a swap and start learning through direct interaction.', num: '03' },
        { title: 'Master Skills', desc: 'Complete swaps, earn reputation, and grow your expertise.', num: '04' },
    ];

    const faqs = [
        { question: 'Is SkillSwap free to use?', answer: 'Yes, the core experience is completely free. We believe knowledge should be accessible. You exchange your time and expertise instead of money.' },
        { question: 'How do I ensure a safe swap?', answer: 'We have a robust review system and verification process. You can check a user\'s reputation and past swap history before connecting.' },
        { question: 'Can I learn multiple skills at once?', answer: 'Absolutely! You can have multiple active swap requests and participate in various community groups simultaneously.' },
        { question: 'What if I\'m a beginner with no skills to teach?', answer: 'Everyone has something valuable to offer. Hobbies, language skills, or organizational tips are skills others want to learn!' },
    ];

    const values = [
        { title: 'Direct Human Connection', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
        { title: 'Zero Barrier to Entry', icon: Zap, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
        { title: 'Verified Skill Swaps', icon: Shield, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    ];

    const handleGetStarted = () => navigate(user ? '/dashboard' : '/register');

    return (
        <div className="space-y-20 py-8 max-w-7xl">

            {/* Hero */}
            <section className="text-center space-y-5 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">Knowledge is Currency</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
                >
                    Redefining How the<br />
                    <span className="text-gradient">World Learns</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto"
                >
                    SkillSwap is more than a platform — it's a movement toward human-centric, decentralized education.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-3 pt-2"
                >
                    <button onClick={handleGetStarted} className="btn-primary px-6 py-3">
                        Get Started Free
                    </button>
                    <button onClick={() => navigate('/explore')} className="btn-secondary px-6 py-3">
                        Browse Skills
                    </button>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="space-y-10">
                <div className="text-center">
                    <p className="eyebrow-accent mb-2">Process</p>
                    <h2 className="text-2xl font-bold text-white">How It Works</h2>
                </div>
                <div className="grid md:grid-cols-4 gap-5">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="card card-hover relative p-6"
                        >
                            <span className="inline-flex items-center justify-center w-9 h-9 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-sm rounded-xl mb-4">
                                {step.num}
                            </span>
                            <h3 className="text-[15px] font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-[13px] text-slate-500 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="card p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-6">
                        <div>
                            <p className="eyebrow-accent mb-2">Our Values</p>
                            <h2 className="text-2xl font-bold text-white">Built on Trust &amp;<br />Mutual Growth</h2>
                        </div>
                        <div className="space-y-3">
                            {values.map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-3 p-4 rounded-xl border ${item.bg}`}>
                                    <item.icon className={`h-5 w-5 ${item.color} shrink-0`} />
                                    <span className="text-[14px] font-semibold text-slate-200">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.07] p-7 rounded-2xl space-y-5">
                        <Quote className="h-8 w-8 text-indigo-400" />
                        <p className="text-[15px] italic text-slate-300 leading-relaxed">
                            "SkillSwap changed how I see learning. It's no longer just about taking courses — it's about building relationships and sharing what I love."
                        </p>
                        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                            <div className="avatar w-10 h-10 rounded-xl text-sm">M</div>
                            <div>
                                <p className="text-sm font-semibold text-white">Maria Garcia</p>
                                <p className="text-[12px] text-slate-500">Lifelong Learner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <p className="eyebrow-accent mb-2">Support</p>
                    <h2 className="text-2xl font-bold text-white">Common Questions</h2>
                </div>
                <div className="card p-6">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} {...faq} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent p-10 text-center space-y-6">
                <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-4">
                    <p className="eyebrow-accent">Join Today</p>
                    <h2 className="text-3xl font-extrabold text-white">Ready to swap skills?</h2>
                    <p className="text-slate-400 text-[15px] max-w-md mx-auto">
                        Join thousands of experts and learners. Start your first exchange in minutes.
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                        <button onClick={handleGetStarted} className="btn-primary px-7 py-3">
                            Get Started Free
                        </button>
                        <button onClick={() => navigate('/explore')} className="btn-secondary px-7 py-3">
                            Browse Skills
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
