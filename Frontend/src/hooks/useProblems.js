import { useEffect, useState } from "react";
import { getProblems } from "../services/problemService";

const useProblems = () => {

    const [problems, setProblems] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("newest");

    const fetchProblems = async () => {
        try{
            const data = await getProblems({
                search, difficulty, status, sort, page, limit: 10
            });
            setProblems(data.problems);
            setTotalPages(data.totalPages);
            setStats({
                total: data.total,
                solved: data.solved,
                attempted: data.attempted,
                todo: data.todo,
                easy: data.easy,
                medium: data.medium,
                hard: data.hard,
            });
        }
        catch (err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, [search, difficulty, status, sort, page]);

    return {
        problems, stats, loading,
        refreshProblems: fetchProblems,
        search, setSearch, difficulty, setDifficulty,
        status, setStatus, page, setPage, totalPages,
        sort, setSort
    };

};

export default useProblems;