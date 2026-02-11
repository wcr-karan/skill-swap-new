import { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import AddSkill from '../components/AddSkill';
import MySkills from '../components/MySkills';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const [refreshSkills, setRefreshSkills] = useState(0);

    const handleSkillAdded = () => {
        setRefreshSkills(prev => prev + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <ProfileHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <MySkills refreshTrigger={refreshSkills} />
                </div>

                <div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
                        <h3 className="font-bold text-slate-900 text-lg mb-4">Add New Skill</h3>
                        <AddSkill onSkillAdded={handleSkillAdded} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
