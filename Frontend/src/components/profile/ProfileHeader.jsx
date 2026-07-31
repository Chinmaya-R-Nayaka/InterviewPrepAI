import {UserCircle2,Mail,GraduationCap,Building2} from "lucide-react";

const ProfileHeader=({user})=>{

    return(

        <div className="bg-[#1E2530] rounded-2xl p-8 mb-8">

            <div className="flex items-center gap-8">

                <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center">

                    <UserCircle2 size={90} className="text-white"/>

                </div>

                <div className="flex-1 flex justify-between items-start">

                    <h1 className="text-4xl font-bold text-white">

                        {user.name}

                    </h1>

                    <div className="mt-4 space-y-2 text-gray-300">

                        <div className="flex items-center gap-2">

                            <Mail size={18}/>

                            {user.email}

                        </div>

                        <div className="flex items-center gap-2">

                            <Building2 size={18}/>

                            {user.college||"College not added"}

                        </div>

                        <div className="flex items-center gap-2">

                            <GraduationCap size={18}/>

                            {user.branch||"Branch"} {user.graduationYear&&`• ${user.graduationYear}`}

                        </div>

                    </div>

                    <p className="mt-5 text-gray-400">

                        {user.bio||"No bio added yet."}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default ProfileHeader;