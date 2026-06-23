// GridPulse Mobile Commander — Chat (AI Copilot) Service
import { api } from './api';

export const chatService = {
  async sendMessage(message, lang = 'en') {
    return await api.post('/api/chat', { message, lang });
  },

  async resetChat() {
    return await api.post('/api/chat/reset');
  },
};
