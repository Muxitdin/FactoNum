import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
            <Card className="relative w-full max-w-md shadow-xl border">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Информация о числе</CardTitle>
                </CardHeader>
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Тип информации</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите тип" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="trivia">Trivia</SelectItem>
                                    <SelectItem value="math">Math</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="year">Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="random" checked={useRandom} onCheckedChange={(val) => setUseRandom(val)} />
                            <Label htmlFor="random">Использовать случайное число</Label>
                        </div>

                        {!useRandom && (
                            <div className="space-y-2">
                                <Label>{type === "date" ? "Дата (MM/DD)" : "Число"}</Label>
                                <Input
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    placeholder={type === "date" ? "Пример: 2/29 или 04/01" : "Введите число"}
                                />
                            </div>
                        )}

                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                        <Button type="submit" className="w-full">
                            Получить информацию
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
