import type { FastifyRequest, FastifyReply } from 'fastify';

export class QuoteController {
  async getQuote(request: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json() as { slip: { advice: string } };
      const englishQuote = data.slip.advice;

      const translateUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishQuote)}&langpair=en|pt`;
      
      const translationResponse = await fetch(translateUrl);
      const translationData = await translationResponse.json() as { responseData: { translatedText: string } };
      const portugueseQuote = translationData.responseData.translatedText;

      return reply.send({
        original: englishQuote,
        translated: portugueseQuote
      });
    } catch (err) {
      return reply.status(500).send({ error: "Falha ao obter frase do dia" });
    }
  }
}