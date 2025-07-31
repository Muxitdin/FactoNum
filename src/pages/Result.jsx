import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from '@/components/theme-toggle';

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
        <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
            <Card className="relative w-full max-w-xl shadow-xl border">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Результат</CardTitle>
                </CardHeader>

                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>

                <CardContent className="space-y-4">
                    {error ? (
                        <p className="text-red-500 font-medium text-center">{error}</p>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Тип:</span>
                                <Badge variant="secondary" className="capitalize">
                                    {state?.type}
                                </Badge>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Значение:</span>
                                <Badge>{state?.number}</Badge>
                            </div>

                            <div className="mt-4 p-4 rounded-md bg-gray-100 text-sm text-black leading-relaxed border">{info}</div>
                        </>
                    )}

                    <Button onClick={() => navigate("/")} className="w-full mt-4">
                        Назад
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Result;
