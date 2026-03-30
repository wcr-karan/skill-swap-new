import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, ChevronDown, CheckCircle2, Star, Quote } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left group"
            >
                <span className="font-bold text-slate-800 group-hover:text-emerald transition-colors">{question}</span>
                <ChevronDown className={clsx("h-5 w-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-emerald")} />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <p className="pb-5 text-slate-600 leading-relaxed">{answer}</p>
            </motion.div>
        </div>
    );
}

export default function About() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const steps = [
        { title: "Create Profile", desc: "List the skills you have and those you're eager to learn.", icon: "01" },
        { title: "Match & Connect", desc: "Our algorithm finds mentors and partners tailored to your goals.", icon: "02" },
        { title: "Exchange Value", desc: "Propose a swap and start learning through direct interaction.", icon: "03" },
        { title: "Master Skills", desc: "Complete swaps, earn reputation, and grow your expertise.", icon: "04" }
    ];

    const faqs = [
        { question: "Is SkillTrade free to use?", answer: "Yes, the core experience is completely free. We believe knowledge should be accessible. You exchange your time and expertise instead of money." },
        { question: "How do I ensure a safe swap?", answer: "We have a robust review system and verification process. You can check a user's reputation and past swap history before connecting." },
        { question: "Can I learn multiple skills at once?", answer: "Absolutely! You can have multiple active swap requests and participate in various community groups simultaneously." },
        { question: "What if I'm a beginner with no skills to teach?", answer: "Everyone has a unique perspective. You might be surprised—your hobbies, language skills, or even organizational tips are valuable to others!" }
    ];

    const testimonials = [
        { name: "Sarah J.", role: "UX Designer", text: "I taught Figma to a developer and in return, they helped me build my portfolio in React. It was a win-win!", rating: 5 },
        { name: "David K.", role: "Founder", text: "The community here is incredible. I've found mentors for everything from SEO to Public Speaking.", rating: 5 }
    ];

    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/register');
        }
    };

    const handleBrowseSkills = () => {
        navigate('/explore');
    };

    return (
        <div className="space-y-24 py-12 px-4 max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-4 py-1.5 bg-emerald/10 text-emerald rounded-full text-sm font-bold tracking-wide uppercase mb-4"
                >
                    Knowledge is Currency
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-black text-slate-900 leading-tight"
                >
                    Redefining How the <br /><span className="text-emerald">World Learns</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto text-xl text-slate-600 font-medium"
                >
                    SkillTrade is more than a platform—it's a movement toward decentralized, human-centric education.
                </motion.p>
            </section>

            {/* How It Works */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
                    <div className="w-20 h-1.5 bg-emerald mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                        >
                            <span className="absolute -top-4 -left-4 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl italic">
                                {step.icon}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="grid lg:grid-cols-2 gap-16 items-center bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/20 blur-[100px] rounded-full"></div>
                <div className="space-y-8 relative z-10">
                    <h2 className="text-4xl font-bold leading-tight">Built on Trust and <br />Mutual Growth</h2>
                    <div className="space-y-6">
                        {[
                            { title: "Direct Human Connection", icon: Users },
                            { title: "Zero Barrier to Entry", icon: Zap },
                            { title: "Verified Skill Swaps", icon: Shield }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald/20 rounded-xl flex items-center justify-center text-emerald">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <span className="text-lg font-medium text-slate-300">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl space-y-6 relative z-10">
                    <Quote className="h-10 w-10 text-emerald" />
                    <p className="text-xl italic text-slate-200 leading-relaxed">
                        "SkillTrade changed how I see learning. It's no longer just about taking courses; it's about building relationships and sharing what I love."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-emerald rounded-2xl flex items-center justify-center font-bold text-slate-900">M</div>
                        <div>
                            <p className="font-bold">Maria Garcia</p>
                            <p className="text-sm text-slate-400">Lifelong Learner</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">Questions?</h2>
                    <p className="text-slate-500">Everything you need to know about getting started.</p>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} {...faq} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-emerald rounded-[3rem] p-12 text-center text-white space-y-8 shadow-2xl shadow-emerald/20">
                <h2 className="text-4xl font-black">Ready to swap skills?</h2>
                <p className="text-emerald-50 text-xl font-medium max-w-xl mx-auto">
                    Join thousands of experts and learners today. Start your first exchange in minutes.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={handleGetStarted}
                        className="bg-white text-emerald px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-colors"
                    >
                        Get Started Now
                    </button>
                    <button
                        onClick={handleBrowseSkills}
                        className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors border border-emerald-400/30"
                    >
                        Browse Skills
                    </button>
                </div>
            </section>
        </div>
    );
}
