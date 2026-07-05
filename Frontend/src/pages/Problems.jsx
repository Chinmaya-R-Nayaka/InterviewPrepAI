import AddProblemModal from "../components/problems/AddProblemModal";
import ProblemTable from "../components/problems/ProblemTable";
import useProblems from "../hooks/useProblems";
import ProblemsStats from "../components/problems/ProblemsStats";
import { Search } from "lucide-react";

const Problems = () => {

    const { problems, stats, loading, refreshProblems, search, setSearch, difficulty, 
        setDifficulty, status, setStatus, page, setPage, totalPages, sort, setSort } = useProblems();

    if(loading){
        return (
            <div className="text-center mt-10">Loading...</div>
        );
    }

    return (

        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div>
                    <h1 className="text-5xl font-bold">Problems</h1>
                    <p className="opacity-70 text-lg mt-2">Manage your DSA journey</p>

                </div>
                <AddProblemModal refreshProblems={refreshProblems}/>
            </div>

            {/* Statistics */}
            <ProblemsStats stats={stats} />

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                <div className="relative">
                    <Search size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                    />

                    <input type="text"
                        placeholder="Search by title, topic or platform..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full pl-12"
                    />
                </div>

                <select
                    className="select select-bordered w-full"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="">All Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <select
                    className="select select-bordered w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Todo">Todo</option>
                    <option value="Attempted">Attempted</option>
                    <option value="Solved">Solved</option>
                </select>

                <select className="select select-bordered w-full" value={sort}
                    onChange={(e) => setSort(e.target.value)}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="title">Title A-Z</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="status">Status</option>
                </select>
            </div>

            <ProblemTable
                problems={problems}
                refreshProblems={refreshProblems}
            />

            <div className="flex justify-center mt-8">

                <div className="join">
                    <button
                        className="join-item btn"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >Previous</button>

                    <button className="join-item btn btn-active">
                        {page}
                    </button>

                    <button
                        className="join-item btn"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Problems;