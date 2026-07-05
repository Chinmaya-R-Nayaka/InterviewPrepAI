import { Trash2, Pencil } from "lucide-react";
import { deleteProblem } from "../../services/problemService";
import AddProblemModal from "./AddProblemModal";

const ProblemTable = ({ problems, refreshProblems }) => {

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this problem?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProblem(id);

            refreshProblems();

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete problem.");

        }

    };

    if (problems.length === 0) {

        return (

            <div className="text-center py-12">

                No problems added yet.

            </div>

        );

    }

    return (

        <div className="overflow-x-auto rounded-2xl border border-base-300">

            <table className="table">

                <thead>

                    <tr>

                        <th>Problem</th>
                        <th>Platform</th>
                        <th>Difficulty</th>
                        <th>Status</th>
                        <th>Topic</th>
                        <th>Revision</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        problems.map((problem) => (

                            <tr key={problem._id}>

                                <td>

                                    <a
                                        href={problem.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="link link-primary font-medium"
                                    >
                                        {problem.title}
                                    </a>

                                </td>

                                <td>

                                    {problem.platform}

                                </td>

                                <td>

                                    <div
                                        className={`badge
                                            ${
                                                problem.difficulty === "Easy"
                                                    ? "badge-success"
                                                    : problem.difficulty === "Medium"
                                                    ? "badge-warning"
                                                    : "badge-error"
                                            }
                                        `}
                                    >
                                        {problem.difficulty}
                                    </div>

                                </td>

                                <td>

                                    <div
                                        className={`badge
                                            ${
                                                problem.status === "Solved"
                                                    ? "badge-success"
                                                    : problem.status === "Attempted"
                                                    ? "badge-warning"
                                                    : "badge-neutral"
                                            }
                                        `}
                                    >
                                        {problem.status}
                                    </div>

                                </td>

                                <td>

                                    {problem.topic}

                                </td>

                                <td>

                                    {

                                        problem.revisionDate

                                            ?

                                            new Date(
                                                problem.revisionDate
                                            ).toLocaleDateString()

                                            : "-"
                                    }

                                </td>

                                <td>

                                    <div className="flex gap-2">

                                        <AddProblemModal
                                        editProblem={problem}
                                        refreshProblems={refreshProblems}
                                        trigger={
                                            <button className="btn btn-sm btn-warning">
                                                <Pencil size={16} />
                                            </button>
                                        }
                                    />

                                        <button

                                            onClick={() =>
                                                handleDelete(problem._id)
                                            }

                                            className="btn btn-sm btn-error"

                                        >

                                            <Trash2 size={16} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ProblemTable;