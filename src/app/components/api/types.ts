// API Response Types for Crypto Sentiment Analysis Backend

// Common types
export interface Source {
  id: number;
  name: string;
  url: string;
  weight: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// AI Analysis Types
export interface SentimentAnalysis {
  task: string;
  sentiment_score: number;
  sentiment_label: string;
  confidence: number;
  key_reasons: string[];
  keywords: {
    positive: string[];
    negative: string[];
  };
  used_fields: string[];
}

export interface SentimentAnalysisResponse {
  article_id: number;
  sentiment_score: number;
  sentiment_label: string;
  confidence: number;
  key_reasons: string[];
  keywords: {
    positive: string[];
    negative: string[];
  };
  used_fields: string[];
  model_version: string;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  label: string;
  confidence: number;
}

export interface EventAnalysis {
  task: string;
  events: EventItem[];
  primary_event: string;
  event_summary: string;
  severity: number;
  market_impact_timeframe: string;
  used_fields: string[];
}

export interface EventAnalysisResponse {
  article_id: number;
  events: EventItem[];
  event_summary: string;
  severity: number;
  primary_event_type: string;
  used_fields: string[];
  model_version: string;
  created_at: string;
  updated_at: string;
}

export interface TradingSignals {
  news_breakout: boolean;
  sentiment_divergence: boolean;
  event_momentum: boolean;
  risk_catalyst: boolean;
}

export interface TradingSignalAnalysis {
  task: string;
  signals: TradingSignals;
  action: string;
  time_horizon: string;
  risk_level: number;
  priority_score: number;
  rationale: string;
  checklist: string[];
  stop_loss_suggestion: string;
  take_profit_suggestion: string;
  used_fields: string[];
}

export interface TradingSignalResponse {
  article_id: number;
  signals: TradingSignals;
  action: string;
  time_horizon: string;
  risk_level: number;
  rationale: string;
  checklist: string[];
  priority_score: number;
  used_fields: string[];
  model_version: string;
  created_at: string;
  updated_at: string;
}

// Extended Article Response (from getArticle API)
export interface ArticleResponse {
  id: number;
  source_id: number;
  guid: string;
  link: string;
  title: string;
  description: string;
  content_html: string;
  content_text: string;
  author: string;
  categories: string[];
  pub_date: string;
  feed_language: string;
  hash: string;
  first_seen_at: string;
  sources: Source;
  analysis?: {
    sentiment?: SentimentAnalysisResponse;
    events?: EventAnalysisResponse;
    strategy?: TradingSignalResponse;
  };
}

// Articles Management Types
export interface Article {
  id: number;
  source_id: number;
  guid: string;
  link: string;
  title: string;
  description: string;
  content_html: string;
  content_text: string;
  author: string;
  categories: string[];
  pub_date: string;
  feed_language: string;
  hash: string;
  first_seen_at: string;
  sources: Source;
}

export interface FilteredArticlesResponse {
  success: boolean;
  data: Article[];
  count: number;
  filters: {
    startDate?: string;
    endDate?: string;
    sourceId?: number;
    sourceName?: string;
    limit: number;
    offset: number;
  };
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface SourcesResponse {
  success: boolean;
  data: Source[];
  count: number;
}

export interface StatsResponse {
  success: boolean;
  data: {
    totalArticles: number;
    bySource: Record<string, number>;
    dateRange: {
      startDate: string;
      endDate: string;
    };
  };
}

export interface SingleArticleResponse {
  success: boolean;
  data: {
    id: number;
    title: string;
    description: string;
    content_text: string;
    pub_date: string;
    sources: Source;
  };
}

export interface SourceArticlesResponse {
  success: boolean;
  data: Article[];
  count: number;
  filters: {
    sourceName: string;
    limit: number;
    offset: number;
  };
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface RecentArticlesResponse {
  success: boolean;
  data: Article[];
  count: number;
  filters: {
    limit: number;
    offset: number;
  };
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Query Parameters Types
export interface FilteredArticlesParams {
  startDate?: string;
  endDate?: string;
  sourceId?: string;
  sourceName?: string;
  limit?: string;
  offset?: string;
}

export interface StatsParams {
  startDate?: string;
  endDate?: string;
}

export interface SourceArticlesParams {
  limit?: string;
  offset?: string;
}

export interface RecentArticlesParams {
  limit?: string;
}
