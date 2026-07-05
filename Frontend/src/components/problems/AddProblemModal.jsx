import { useState } from "react";
import { addProblem, updateProblem } from "../../services/problemService";

const AddProblemModal = ({refreshProblems, editProblem = null, trigger = null}) => {

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: editProblem?.title || "",
        platform: editProblem?.platform || "",
        difficulty: editProblem?.difficulty || "Easy",
        topic: editProblem?.topic || "",
        status: editProblem?.status || "Todo",
        link: editProblem?.link || "",
        notes: editProblem?.notes || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try{
            if (editProblem) {
                await updateProblem(
                    editProblem._id,
                    formData
                );

            } else {

                await addProblem(formData);

            }

            refreshProblems();

            setOpen(false);

        }

        catch (err) {

            console.error(err);

            alert("Operation failed.");

        }

    };

    return (
        <>

            {trigger ? (
                <span onClick={() => setOpen(true)}>
                    {trigger}
                </span>
            ) : (
                <button className="btn btn-primary" onClick={() => setOpen(true)}>
                    {editProblem ? "Edit Problem" : "Add Problem"}
                </button>
            )}

            {
                open && (

                    <dialog
                        open
                        className="modal modal-open"
                    >

                        <div className="modal-box">

                            <h3 className="font-bold text-2xl mb-5">
                                Add Problem
                            </h3>

                            <div className="space-y-4">

                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Problem Name"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    placeholder="LeetCode / Codeforces"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    placeholder="Topic"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    placeholder="Problem Link"
                                    className="input input-bordered w-full"
                                />

                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="select select-bordered w-full"
                                >
                                    <option>Todo</option>
                                    <option>Attempted</option>
                                    <option>Solved</option>
                                </select>

                            </div>

                            <div className="modal-action">

                                <button
                                    className="btn"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </dialog>

                )
            }

        </>
    );
};

export default AddProblemModal;