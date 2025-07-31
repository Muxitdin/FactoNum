import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
    const [type, setType] = useState("trivia");
    const [number, setNumber] = useState("");
    const [useRandom, setUseRandom] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!useRandom) {
            if (type === "date") {
                const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/;
                if (!dateRegex.test(number)) {
                    setError("Дата должна быть в формате MM/DD (например: 2/29, 01/09)");
                    return;
                }
            } else {
                if (!/^\d+$/.test(number)) {
                    setError("Число должно быть в виде цифры");
                    return;
                }
            }
        }

        setError("");

        navigate("/result", {
            state: {
                type,
                number: useRandom ? "random" : number,
                isRandom: useRandom,
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
            <h1 className="text-2xl font-bold">Информация о числе</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                <label>
                    Тип информации:
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="trivia">Trivia</option>
                        <option value="math">Math</option>
                        <option value="date">Date</option>
                        <option value="year">year</option>
                    </select>
                </label>

                <label>
                    <input type="checkbox" checked={useRandom} onChange={() => setUseRandom(!useRandom)} />
                    <span className="ml-2">Использовать случайное число</span>
                </label>

                {!useRandom && (
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Введите число"
                        className="p-2 border rounded"
                    />
                )}

                {error && <p className="text-red-500">{error}</p>}

                <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Получить информацию
                </button>
            </form>
        </div>
    );
};

export default Home;
