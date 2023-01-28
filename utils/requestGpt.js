const { Configuration, OpenAIApi } = require('openai');

export async function requestGpt() {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY
  });
  const open_ai = new OpenAIApi(configuration);
  return open_ai;
} 