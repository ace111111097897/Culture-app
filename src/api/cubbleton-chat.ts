import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages format
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: `You are Cubbleton AI, a friendly and intelligent AI assistant for the Cubbles dating app. You help users with:
      1. Cultural insights and education
      2. Safety monitoring and advice  
      3. Dating profile optimization
      4. Match recommendations based on cultural compatibility
      5. Conversation starters and cultural icebreakers
      
      Always be helpful, culturally sensitive, and focused on creating meaningful connections. Keep responses concise and engaging.`,
      messages,
      maxTokens: 150,
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Cubbleton AI Error:', error);
    return new Response(JSON.stringify({ 
      error: 'AI service temporarily unavailable',
      message: 'Please try again later'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}