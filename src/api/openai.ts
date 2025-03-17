import axios from 'axios';

const OPENAI_API_KEY = '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';

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
