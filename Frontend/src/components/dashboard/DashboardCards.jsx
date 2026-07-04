const DashboardCard = ({
    title,
    value,
    icon,
    color = "primary",
}) => {

    return (

        <div className="card bg-base-100 shadow-md">

            <div className="card-body">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-sm opacity-60">

                            {title}

                        </p>

                        <h2 className="text-3xl font-bold mt-2">

                            {value}

                        </h2>

                    </div>

                    <div className={color}>

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DashboardCard;