const Skills=({skills=[]})=>{

    return(

        <div className="bg-[#1E2530] rounded-xl p-6 mb-8">

            <h2 className="text-2xl text-white font-semibold mb-6">

                Skills

            </h2>

            <div className="flex flex-wrap gap-3">

                {

                    skills.length?

                    skills.map((skill,index)=>(

                        <div
                            key={index}
                            className="px-4 py-2 rounded-full bg-indigo-600 text-white"
                        >

                            {skill}

                        </div>

                    ))

                    :

                    <p className="text-gray-400">

                        No skills added.

                    </p>

                }

            </div>

        </div>

    );

};

export default Skills;