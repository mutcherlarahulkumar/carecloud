const PlayHT = require('playht');
const fs = require('fs');
const path = require('path');

PlayHT.init({
  userId: 's3N40oCjxbYWbYjH3q5ZdfbGzMC3',
  apiKey: '97d19c8e731d4e72aa7dc043b8868ad2',
});

async function streamAudio(text) {
  const stream = await PlayHT.stream(text, { voiceEngine: 'PlayDialog' });
  stream.on('data', (chunk) => {
    fs.appendFileSync('output.mp3', chunk);
  });
  return stream;
}

module.exports =  { streamAudio };