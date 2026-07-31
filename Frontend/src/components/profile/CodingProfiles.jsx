// import {FaLinkedin} from "lucide-react";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {SiLeetcode,SiCodeforces} from "react-icons/si";

const CodingProfiles=({user})=>{

    const links=[

        {
            title:"GitHub",
            icon:<FaGithub size={24}/>,
            value:user.github
        },

        {
            title:"LinkedIn",
            icon:<FaLinkedin/>,
            value:user.linkedin
        },

        {
            title:"LeetCode",
            icon:<SiLeetcode/>,
            value:user.leetcode
        },

        {
            title:"Codeforces",
            icon:<SiCodeforces/>,
            value:user.codeforces
        }

    ];

    return(

        <div className="bg-[#1E2530] rounded-xl p-6 mb-8">

            <h2 className="text-2xl text-white font-semibold mb-6">

                Coding Profiles

            </h2>

            <div className="grid grid-cols-2 gap-6">

                {

                    links.map((item,index)=>(

                        <a
                            key={index}
                            href={item.value||"#"}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#252E3C] rounded-xl p-5 hover:bg-[#303A4A] transition-all"
                        >

                            <div className="flex items-center gap-4">

                                <div className="text-3xl">

                                    {item.icon}

                                </div>

                                <div>

                                    <p className="text-white font-semibold">

                                        {item.title}

                                    </p>

                                    <p className="text-gray-400 text-sm truncate">

                                        {item.value||"Not Added"}

                                    </p>

                                </div>

                            </div>

                        </a>

                    ))

                }

            </div>

        </div>

    );

};

export default CodingProfiles;