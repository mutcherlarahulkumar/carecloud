const Groq = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config();
const groq = new Groq({apikey: process.env.GROQ_API_KEY});

async function getChatResponse(userMessage) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an story generator ai bot where u need to generate story when ever an user comes and gives an context and the story must be inspiring and be well related to the context given by the user"
      },
      { role: "user", content: userMessage }
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false, 
    stop: null
  });
  return chatCompletion.choices[0]?.message?.content || '';
}

module.exports = { getChatResponse };
