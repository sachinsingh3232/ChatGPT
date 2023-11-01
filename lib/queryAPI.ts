import openai from "./chatGPT"
const query = async (prompt: string, model: string) => {
    const res = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: model,
    }).then(res => res.choices[0].message.content).catch(e =>
        `ChatGPT is unable to find the answer for that ${e.message}`
    )
    return res;
}
export default query;