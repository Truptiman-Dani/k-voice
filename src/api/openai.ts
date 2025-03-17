import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getAgentResponse = async (query: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'gpt-4', // or the model you prefer
      prompt: query,
      max_tokens: 150,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text.trim();
};
