// API Configuration for Crypto Sentiment Analysis Backend

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  ENDPOINTS: {
    // AI Analysis endpoints
    AI_ANALYSIS: {
      SENTIMENT: '/ai-analysis/sentiment',
      EVENTS: '/ai-analysis/events',
      TRADING_SIGNALS: '/ai-analysis/trading-signals',
      ARTICLE: '/ai-analysis/articles'
    },
    // Articles Management endpoints
    ARTICLES: {
      INGEST_COINDESK: '/articles/ingest/coindesk',
      FILTERED: '/articles/supabase/filtered',
      SOURCES: '/articles/supabase/sources',
      STATS: '/articles/supabase/stats',
      BY_ID: '/articles/supabase',
      BY_SOURCE: '/articles/supabase/source',
      RECENT: '/articles/supabase/recent'
    }
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  TIMEOUT: 10000 // 10 seconds
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlParams.append(key, String(value));
      }
    });
    const queryString = urlParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
};

// Helper function for API requests
export const createApiRequest = (
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: API_CONFIG.DEFAULT_HEADERS,
    ...options
  };

  return fetch(url, defaultOptions);
};
