import { Badge } from "./badge";
import { Card, CardContent } from "./card"

const DashboardProfile = () => {

    const user = {
        name: "Huynam Moinon",
        email: "huynammoinon@gmail.com",
        level: 3,
        progress: 75,
        streak: 24,
        ranking: 12,
        achievements: 9,
        badges: 5,
        profileImage: 'https://randomuser.me/api/portraits/men/75.jpg'

    };

    return (

        <Card className="w-full md:max-w-md bg-slate-50 ">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4 rounded-3xl gradientBg ">
                    <div className="flex items-center">
                        <div className="relative p-12 ">
                            <div className="absolute top-8 left-4 w-24 h-24 rounded-lg overflow-hidden">
                                <img
                                    src={user?.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover border p-1 bg-white rounded-3xl"
                                />
                            </div>
                            <div className="absolute -bottom-8 right-0 bg-yellow-300 rounded-full p-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <button className="text-sm text-blue-600 hover:underline">Edit Profile</button>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>


                <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex-1 bg-[#0000000D] rounded-full px-3 py-3 text-center flex justify-between items-center">
                        <span className="text-sm text-blue-600">Achievements</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-600 rounded-full px-3">
                            {user.achievements}
                        </Badge>
                    </div>

                    <div className="flex-1 bg-[#0000000D] rounded-full px-3 py-3 text-center flex justify-between items-center">
                        <span className="text-sm text-blue-600">Badges</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-600 rounded-full px-3">
                            {user.badges}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default DashboardProfile