import { useState, useEffect } from 'react';
import { matchesAPI } from '../api/endpoints';
import UserCard from '../components/UserCard';
import { Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Explore() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const res = await matchesAPI.getAllUsers();
            setUsers(res.data);
            setFilteredUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">Explore the Community</h1>
                <p className="text-gray-500 text-lg">Detailed search to find your perfect knowledge exchange partner.</p>

                <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all shadow-sm"
                        placeholder="Search by name or skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin h-10 w-10 text-brand" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <UserCard key={user.id} user={user} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-500">No users found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
