const ProfileStats=({stats})=>{

    const cards=[
        {
            title:"Problems Solved",
            value:stats.problems
        },
        {
            title:"Mock Interviews",
            value:stats.interviews
        },
        {
            title:"Resumes",
            value:stats.resumes
        },
        {
            title:"Resume Score",
            value:`${stats.latestResumeScore}/100`
        }

    ];

    return(

        <div className="grid grid-cols-4 gap-6 mb-8">

            {

                cards.map((card,index)=>(

                    <div
                        key={index}
                        className="bg-[#1E2530] rounded-xl p-6"
                    >

                        <p className="text-gray-400">

                            {card.title}

                        </p>

                        <h2 className="text-4xl font-bold text-indigo-400 mt-3">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

};

export default ProfileStats;