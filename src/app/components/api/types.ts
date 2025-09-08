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
  sentiment_score: number;
  sentiment_label: string;
  confidence: number;
  key_reasons: string[];
  keywords: string[];
  used_fields: string[];
}

export interface SentimentAnalysisResponse {
  article_id: number;
  analysis: SentimentAnalysis;
  created_at: string;
}

export interface EventAnalysis {
  events: string[];
  event_summary: string;
  severity: string;
  primary_event: string;
  used_fields: string[];
}

export interface EventAnalysisResponse {
  article_id: number;
  analysis: EventAnalysis;
  created_at: string;
}

export interface TradingSignalAnalysis {
  signals: string[];
  action: string;
  time_horizon: string;
  risk_level: string;
  rationale: string;
  checklist: string[];
  priority_score: number;
  used_fields: string[];
}

export interface TradingSignalResponse {
  article_id: number;
  analysis: TradingSignalAnalysis;
  created_at: string;
}

export interface ArticleResponse {
  id: number;
  title: string;
  description: string;
  content_text: string;
  published_at: string;
  sources: Source;
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
