// GridPulse Mobile Commander — Events Service
import { api } from './api';

export const eventsService = {
  async getEvents(status = null) {
    const params = {};
    if (status) params.status = status;
    return await api.get('/api/events', params);
  },

  async getActiveEvents() {
    const events = await this.getEvents();
    return events.filter(e => e.status?.toLowerCase() === 'active');
  },

  async getHotspots() {
    return await api.get('/api/hotspots');
  },

  async getClusters(epsKm = 0.5, minSamples = 2) {
    return await api.get('/api/cluster', { eps_km: epsKm, min_samples: minSamples });
  },

  async simulateEvent(payload) {
    return await api.post('/api/simulate', payload);
  },

  async spawnMock() {
    return await api.post('/api/spawn_mock');
  },

  async clearMock() {
    return await api.post('/api/clear_mock');
  },

  async getPlannedEvents() {
    return await api.get('/api/planned-events');
  },

  async createPlannedEvent(payload) {
    return await api.post('/api/planned-events', payload);
  },

  async deletePlannedEvent(eventId) {
    return await api.delete(`/api/planned-events/${eventId}`);
  },

  async getForecastPropagation(params) {
    return await api.get('/api/forecast-propagation', params);
  },

  async getEventOutcomes() {
    return await api.get('/api/event-outcomes');
  },

  async createEventOutcome(payload) {
    return await api.post('/api/event-outcomes', payload);
  },

  async getLearningAnalytics() {
    return await api.get('/api/learning-analytics');
  },

  async getRoutingSplit(payload) {
    return await api.post('/api/routing/split', payload);
  },
};
