import Card from "../common/Card";

const DailyGoal = () => {
    return (
        <Card>

            <h2 className="text-xl font-semibold text-white mb-6">
                Daily Goal
            </h2>

            <p className="text-gray-400 mb-4">
                Upload 5 resumes today.
            </p>

            <div className="w-full bg-gray-700 rounded-full h-3">

                <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                    style={{ width: "60%" }}
                />

            </div>

            <p className="mt-4 text-blue-400 font-medium">
                3 / 5 Completed
            </p>

        </Card>
    );
};

export default DailyGoal;