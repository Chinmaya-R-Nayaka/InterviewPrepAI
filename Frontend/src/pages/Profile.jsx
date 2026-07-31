import {useEffect,useState} from "react";
import toast from "react-hot-toast";
import {getProfile,updateProfile,getUserStats} from "../services/userService";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import CodingProfiles from "../components/profile/CodingProfiles";
import Skills from "../components/profile/Skills";
import ResumeHistory from "../components/profile/ResumeHistory";

const Profile=()=>{

    const[user,setUser]=useState(null);
    const[stats,setStats]=useState(null);

    const[form,setForm]=useState({
        name:"",
        bio:"",
        college:"",
        branch:"",
        graduationYear:"",
        github:"",
        linkedin:"",
        leetcode:"",
        codeforces:"",
        skills:""
    });

    useEffect(()=>{
        loadProfile();
    },[]);

    const loadProfile=async()=>{

        try{

            const profile=await getProfile();
            const userStats=await getUserStats();

            setUser(profile);
            setStats(userStats);

            setForm({
                name:profile.name||"",
                bio:profile.bio||"",
                college:profile.college||"",
                branch:profile.branch||"",
                graduationYear:profile.graduationYear||"",
                github:profile.github||"",
                linkedin:profile.linkedin||"",
                leetcode:profile.leetcode||"",
                codeforces:profile.codeforces||"",
                skills:profile.skills?.join(", ")||""
            });

        }

        catch{

            toast.error("Failed to load profile");

        }

    };

    const handleChange=(e)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            const updatedUser=await updateProfile({
                ...form,
                skills:form.skills
                    .split(",")
                    .map(skill=>skill.trim())
                    .filter(Boolean)
            });

            setUser(updatedUser);

            toast.success("Profile Updated");

        }

        catch{

            toast.error("Update Failed");

        }

    };

    if(!user){

        return(

            <div className="flex justify-center items-center h-[70vh]">

                <span className="loading loading-spinner loading-lg"></span>

            </div>

        );

    }

    return(

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <ProfileHeader user={user}/>

            {

                stats&&(

                    <ProfileStats
                        stats={{
                            resumes:stats.resumes,
                            interviews:stats.interviews,
                            problems:stats.problems,
                            latestResumeScore:stats.latestResumeScore
                        }}
                    />

                )

            }

            <CodingProfiles user={user}/>

            <Skills skills={user.skills}/>

            <ResumeHistory/>

            <div className="bg-[#1E2530] rounded-2xl p-8">

                <h2 className="text-2xl font-bold text-white mb-6">

                    Edit Profile

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-5"
                >

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="college"
                        value={form.college}
                        onChange={handleChange}
                        placeholder="College"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        placeholder="Branch"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="graduationYear"
                        value={form.graduationYear}
                        onChange={handleChange}
                        placeholder="Graduation Year"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="github"
                        value={form.github}
                        onChange={handleChange}
                        placeholder="GitHub"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        placeholder="LinkedIn"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="leetcode"
                        value={form.leetcode}
                        onChange={handleChange}
                        placeholder="LeetCode"
                        className="input input-bordered w-full"
                    />

                    <input
                        name="codeforces"
                        value={form.codeforces}
                        onChange={handleChange}
                        placeholder="Codeforces"
                        className="input input-bordered w-full"
                    />

                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Bio"
                        className="textarea textarea-bordered md:col-span-2 h-28"
                    />

                    <input
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="React, Node.js, MongoDB, C++"
                        className="input input-bordered md:col-span-2"
                    />

                    <button
                        className="btn btn-primary md:col-span-2"
                    >

                        Save Changes

                    </button>

                </form>

            </div>

        </div>

    );

};

export default Profile;