import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!state) {
            navigate("/");
            return;
        }

        const fetchInfo = async () => {
            const url = `http://numbersapi.com/${state.number}/${state.type}`;
            try {
                const { data } = await axios.get(url);
                setInfo(data);
            } catch (err) {
                setError("Ошибка при получении данных");
            }
        };

        fetchInfo();
    }, [state, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-4">Результат</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <p className="mb-2">
                        <strong>Тип:</strong> {state?.type}
                    </p>
                    <p className="mb-2">
                        <strong>Число:</strong> {state?.number}
                    </p>
                    <p className="mt-4 p-4 border rounded bg-gray-100">{info}</p>
                </>
            )}
            <button
                onClick={() => navigate("/")}
                className="mt-6 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
                Назад
            </button>
        </div>
    );
};

export default Result;
