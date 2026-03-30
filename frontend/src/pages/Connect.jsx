import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, MessageCircle, MapPin, Star, Search, Filter, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { useState, useMemo } from 'react';
import { clsx } from 'clsx';

export default function Connect() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(null);

    const people = [
        {
            id: 1,
            name: "Alex Rivera",
            role: "Product Designer",
            rating: 4.9,
            location: "San Francisco, CA",
            teaching: ["Figma", "Design Systems"],
            learning: ["React", "Typescript"],
            avatar: "A",
            verified: true,
            responseTime: "< 2h"
        },
        {
            id: 2,
            name: "Sarah Chen",
            role: "Software Engineer",
            rating: 4.8,
            location: "Berlin, DE",
            teaching: ["Python", "Django"],
            learning: ["Photography", "Spanish"],
            avatar: "S",
            verified: true,
            responseTime: "< 5h"
        },
        {
            id: 3,
            name: "Marcus Thorne",
            role: "Marketing Specialist",
            rating: 4.7,
            location: "London, UK",
            teaching: ["SEO", "Copywriting"],
            learning: ["Data Analysis", "Python"],
            avatar: "M",
            verified: false,
            responseTime: "< 24h"
        },
        {
            id: 4,
            name: "Elena Rodriguez",
            role: "Language Coach",
            rating: 5.0,
            location: "Madrid, ES",
            teaching: ["Spanish", "Public Speaking"],
            learning: ["Web Development", "UI Design"],
            avatar: "E",
            verified: true,
            responseTime: "< 1h"
        },
        {
            id: 5,
            name: "Jordan Lee",
            role: "Fullstack Dev",
            rating: 4.6,
            location: "Toronto, CA",
            teaching: ["React", "Node.js"],
            learning: ["Swift", "UI Design"],
            avatar: "J",
            verified: false,
            responseTime: "< 12h"
        }
    ];

    const filteredPeople = useMemo(() => {
        return people.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSkill = !selectedSkill ||
                p.teaching.includes(selectedSkill) ||
                p.learning.includes(selectedSkill);

            return matchesSearch && matchesSkill;
        });
    }, [searchTerm, selectedSkill]);

    const allSkills = useMemo(() => {
        const skills = new Set();
        people.forEach(p => {
            p.teaching.forEach(s => skills.add(s));
            p.learning.forEach(s => skills.add(s));
        });
        return Array.from(skills).sort();
    }, []);

    return (
        <div className="space-y-10 py-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Connect</h1>
                <p className="text-slate-500 text-lg font-medium">Find mentors and learning partners in your network.</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, role, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-emerald/10 focus:border-emerald/30 transition-all font-medium text-slate-800 shadow-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" className="px-6 border-slate-100 bg-white shadow-sm ring-1 ring-slate-200/60 font-bold">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedSkill(null)}
                        className={clsx(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                            !selectedSkill
                                ? "bg-slate-900 text-white shadow-lg"
                                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                        )}
                    >
                        All Skills
                    </button>
                    {allSkills.map(skill => (
                        <button
                            key={skill}
                            onClick={() => setSelectedSkill(skill)}
                            className={clsx(
                                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                                selectedSkill === skill
                                    ? "bg-emerald text-white shadow-lg shadow-emerald/20"
                                    : "bg-white text-slate-500 hover:border-emerald/30 border border-slate-100"
                            )}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                <AnimatePresence mode='popLayout'>
                    {filteredPeople.map((person, idx) => (
                        <motion.div
                            key={person.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-emerald/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <div className="h-24 w-24 rounded-[2rem] bg-emerald/10 flex items-center justify-center text-3xl font-black text-emerald group-hover:bg-emerald group-hover:text-white transition-all duration-500 shadow-inner">
                                    {person.avatar}
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald transition-colors">{person.name}</h3>
                                                {person.verified && <CheckCircle2 className="h-5 w-5 text-emerald fill-emerald/10" />}
                                            </div>
                                            <p className="text-slate-500 font-bold text-lg">{person.role}</p>
                                        </div>
                                        <div className="flex items-center text-amber-500 font-black bg-amber-50 px-3 py-1.5 rounded-xl text-sm border border-amber-100">
                                            <Star className="h-4 w-4 fill-current mr-1.5" />
                                            {person.rating}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm font-bold">
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1.5 text-slate-300" />
                                            {person.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1.5 text-slate-300" />
                                            Responds {person.responseTime}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 border-y border-slate-50">
                                        <div className="space-y-3">
                                            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Teaching</p>
                                            <div className="flex flex-wrap gap-2">
                                                {person.teaching.map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-emerald/5 text-emerald text-xs font-black rounded-lg border border-emerald/10">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Learning</p>
                                            <div className="flex flex-wrap gap-2">
                                                {person.learning.map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-brand/5 text-brand text-xs font-black rounded-lg border border-brand/10">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-emerald transition-all shadow-lg hover:shadow-emerald/20 flex items-center justify-center gap-2">
                                            <UserPlus className="h-5 w-5" />
                                            Send Connection
                                        </button>
                                        <button className="px-5 py-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald/30 hover:bg-emerald/5 transition-all group/btn">
                                            <MessageCircle className="h-5 w-5 text-slate-600 group-hover/btn:text-emerald transition-colors" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPeople.length === 0 && (
                <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 font-bold">No partners found matching your specific criteria.</p>
                </div>
            )}
        </div>
    );
}
