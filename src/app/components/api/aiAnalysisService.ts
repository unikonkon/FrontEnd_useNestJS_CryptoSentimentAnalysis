// AI Analysis Service - Crypto Sentiment Analysis Backend

import { API_CONFIG, buildApiUrl } from './config';
import {
  SentimentAnalysisResponse,
  EventAnalysisResponse,
  TradingSignalResponse,
  ArticleResponse,
  ErrorResponse
} from './types';

class AIAnalysisService {
  
  /**
   * วิเคราะห์ sentiment ของบทความโดยใช้ Gemini AI
   * @param articleId ID ของบทความที่ต้องการวิเคราะห์
   * @returns Promise<SentimentAnalysisResponse>
   */
  async analyzeSentiment(articleId: number): Promise<SentimentAnalysisResponse> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.AI_ANALYSIS.SENTIMENT}/${articleId}`);
      
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
      console.error('Error analyzing sentiment:', error);
      throw error;
    }
  }

  /**
   * จำแนกประเภทของเหตุการณ์ในบทความ
   * @param articleId ID ของบทความที่ต้องการจำแนก
   * @returns Promise<EventAnalysisResponse>
   */
  async analyzeEvents(articleId: number): Promise<EventAnalysisResponse> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.AI_ANALYSIS.EVENTS}/${articleId}`);
      
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
      console.error('Error analyzing events:', error);
      throw error;
    }
  }

  /**
   * สร้างสัญญาณการเทรดจากบทความ
   * @param articleId ID ของบทความที่ต้องการสร้างสัญญาณ
   * @returns Promise<TradingSignalResponse>
   */
  async generateTradingSignals(articleId: number): Promise<TradingSignalResponse> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.AI_ANALYSIS.TRADING_SIGNALS}/${articleId}`);
      
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
      console.error('Error generating trading signals:', error);
      throw error;
    }
  }

  /**
   * ดึงข้อมูลบทความตาม ID
   * @param articleId ID ของบทความ
   * @returns Promise<ArticleResponse>
   */
  async getArticle(articleId: number): Promise<ArticleResponse> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.AI_ANALYSIS.ARTICLE}/${articleId}`);
      
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
      console.error('Error fetching article:', error);
      throw error;
    }
  }

  /**
   * วิเคราะห์ทั้งหมด (sentiment, events, trading signals) ของบทความ
   * @param articleId ID ของบทความ
   * @returns Promise<{sentiment: SentimentAnalysisResponse, events: EventAnalysisResponse, tradingSignals: TradingSignalResponse}>
   */
  async analyzeAll(articleId: number): Promise<{
    sentiment: SentimentAnalysisResponse;
    events: EventAnalysisResponse;
    tradingSignals: TradingSignalResponse;
  }> {
    try {
      const [sentiment, events, tradingSignals] = await Promise.all([
        this.analyzeSentiment(articleId),
        this.analyzeEvents(articleId),
        this.generateTradingSignals(articleId)
      ]);

      return { sentiment, events, tradingSignals };
    } catch (error) {
      console.error('Error analyzing all aspects:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const aiAnalysisService = new AIAnalysisService();
export default aiAnalysisService;
