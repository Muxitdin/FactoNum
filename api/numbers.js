export default async function handler(req, res) {
    const { number = "random", type = "trivia" } = req.query;

    try {
        const response = await fetch(`http://numbersapi.com/${number}/${type}`);
        const text = await response.text();

        res.status(200).send(text);
    } catch (error) {
        res.status(500).json({ error: "Error fetching from Numbers API" });
    }
}
