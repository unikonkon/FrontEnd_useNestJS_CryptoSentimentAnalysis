// Articles Management Service - Crypto Sentiment Analysis Backend

import { API_CONFIG, buildApiUrl } from './config';
import {
  FilteredArticlesResponse,
  SourcesResponse,
  StatsResponse,
  SingleArticleResponse,
  SourceArticlesResponse,
  RecentArticlesResponse,
  FilteredArticlesParams,
  StatsParams,
  SourceArticlesParams,
  RecentArticlesParams,
  ErrorResponse
} from './types';

class ArticlesService {

  /**
   * นำเข้าข้อมูลบทความจาก CoinDesk RSS
   * @returns Promise<{ success: boolean; message: string; count?: number }>
   */
  async ingestCoinDeskArticles(): Promise<{ success: boolean; message: string; count?: number }> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ARTICLES.INGEST_COINDESK);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error ingesting CoinDesk articles:', error);
      throw error;
    }
  }

  /**
   * ดึงบทความที่ผ่านการกรองตามเงื่อนไข
   * @param params Query parameters for filtering
   * @returns Promise<FilteredArticlesResponse>
   */
  async getFilteredArticles(params?: FilteredArticlesParams): Promise<FilteredArticlesResponse> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ARTICLES.FILTERED, params as Record<string, string>);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching filtered articles:', error);
      throw error;
    }
  }

  /**
   * ดึงรายการแหล่งข้อมูลทั้งหมด
   * @returns Promise<SourcesResponse>
   */
  async getSources(): Promise<SourcesResponse> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ARTICLES.SOURCES);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching sources:', error);
      throw error;
    }
  }

  /**
   * ดึงสถิติของบทความ
   * @param params Query parameters for date range
   * @returns Promise<StatsResponse>
   */
  async getStats(params?: StatsParams): Promise<StatsResponse> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ARTICLES.STATS, params as Record<string, string>);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }

  /**
   * ดึงบทความตาม ID
   * @param id ID ของบทความ
   * @returns Promise<SingleArticleResponse>
   */
  async getArticleById(id: string | number): Promise<SingleArticleResponse> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.ARTICLES.BY_ID}/${id}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      throw error;
    }
  }

  /**
   * ดึงบทความตามชื่อแหล่งข้อมูล
   * @param sourceName ชื่อแหล่งข้อมูล
   * @param params Query parameters for pagination
   * @returns Promise<SourceArticlesResponse>
   */
  async getArticlesBySource(
    sourceName: string, 
    params?: SourceArticlesParams
  ): Promise<SourceArticlesResponse> {
    try {
      const url = buildApiUrl(
        `${API_CONFIG.ENDPOINTS.ARTICLES.BY_SOURCE}/${sourceName}`, 
        params as Record<string, string>
      );
      
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching articles by source:', error);
      throw error;
    }
  }

  /**
   * ดึงบทความล่าสุด
   * @param params Query parameters for limit
   * @returns Promise<RecentArticlesResponse>
   */
  async getRecentArticles(params?: RecentArticlesParams): Promise<RecentArticlesResponse> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.ARTICLES.RECENT, params as Record<string, string>);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recent articles:', error);
      throw error;
    }
  }

  /**
   * ดึงบทความพร้อมสถิติและแหล่งข้อมูล
   * @returns Promise<{articles: FilteredArticlesResponse, sources: SourcesResponse, stats: StatsResponse}>
   */
  async getDashboardData(): Promise<{
    articles: FilteredArticlesResponse;
    sources: SourcesResponse;
    stats: StatsResponse;
  }> {
    try {
      const [articles, sources, stats] = await Promise.all([
        this.getFilteredArticles({ limit: '20' }),
        this.getSources(),
        this.getStats()
      ]);

      return { articles, sources, stats };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  /**
   * ค้นหาบทความด้วยหลายเงื่อนไข
   * @param searchParams Parameters for advanced search
   * @returns Promise<FilteredArticlesResponse>
   */
  async searchArticles(searchParams: {
    startDate?: string;
    endDate?: string;
    sourceName?: string;
    limit?: number;
    offset?: number;
  }): Promise<FilteredArticlesResponse> {
    try {
      const params: FilteredArticlesParams = {
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
        sourceName: searchParams.sourceName,
        limit: searchParams.limit?.toString(),
        offset: searchParams.offset?.toString()
      };

      return await this.getFilteredArticles(params);
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const articlesService = new ArticlesService();
export default articlesService;
