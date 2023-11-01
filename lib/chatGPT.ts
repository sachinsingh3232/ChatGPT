// import {Configuration,OpenAIApi} from "openai"

// // const configuration = new Configuration({
// //     apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY
// // })


// const openai = new OpenAIApi({ apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY });

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});
export default openai