const express = require('express');
const { getChatResponse } = require('./chatbot');
const router = express.Router();

router.post('/chat', async (req, res) => {
  console.log("into chat");
    const userMessage = req.body.message;
  
    if (!userMessage) {
      return res.status(400).send({ error: "Message is required." });
    }
  
    try {
      const botResponse = await getChatResponse(userMessage);
      res.send({ reply: botResponse });
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      res.status(500).send({ error: "Failed to fetch response from chatbot." });
    }
  });

module.exports = router;
