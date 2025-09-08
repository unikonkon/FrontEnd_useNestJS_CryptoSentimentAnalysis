# API Services - Crypto Sentiment Analysis

This directory contains API service files for interacting with the Crypto Sentiment Analysis Backend.

## Files Structure

```
api/
├── index.ts              # Main exports file
├── types.ts              # TypeScript interfaces and types
├── config.ts             # API configuration and utilities
├── aiAnalysisService.ts  # AI Analysis API service
├── articlesService.ts    # Articles Management API service
└── README.md            # This documentation file
```

ไฟล์ types.ts 
- ประกาศ TypeScript interfaces และ types สำหรับ API responses

ไฟล์ config.ts 
- การตั้งค่า API configuration และ utility functions

ไฟล์ aiAnalysisService.ts 
- Service สำหรับ AI Analysis APIs:
analyzeSentiment() - วิเคราะห์ sentiment
analyzeEvents() - จำแนกประเภทเหตุการณ์
generateTradingSignals() - สร้างสัญญาณการเทรด
getArticle() - ดึงข้อมูลบทความ
analyzeAll() - วิเคราะห์ทั้งหมดพร้อมกัน

ไฟล์ articlesService.ts 
- Service สำหรับ Articles Management APIs:
ingestCoinDeskArticles() - นำเข้าบทความจาก CoinDesk
getFilteredArticles() - ดึงบทความที่กรองแล้ว
getSources() - ดึงรายการแหล่งข้อมูล
getStats() - ดึงสถิติ
getArticleById() - ดึงบทความตาม ID
getArticlesBySource() - ดึงบทความตามแหล่งข้อมูล
getRecentArticles() - ดึงบทความล่าสุด
getDashboardData() - ดึงข้อมูล dashboard
searchArticles() - ค้นหาบทความ


## Usage

### Import Services

```typescript
// Import individual services
import { aiAnalysisService, articlesService } from './components/api';

// Or import everything
import * as api from './components/api';
```

### AI Analysis Service

```typescript
import { aiAnalysisService } from './components/api';

// Analyze sentiment
const sentiment = await aiAnalysisService.analyzeSentiment(123);

// Analyze events
const events = await aiAnalysisService.analyzeEvents(123);

// Generate trading signals
const signals = await aiAnalysisService.generateTradingSignals(123);

// Get article data
const article = await aiAnalysisService.getArticle(123);

// Analyze everything at once
const fullAnalysis = await aiAnalysisService.analyzeAll(123);
```

### Articles Service

```typescript
import { articlesService } from './components/api';

// Get recent articles
const recent = await articlesService.getRecentArticles({ limit: '10' });

// Get filtered articles
const filtered = await articlesService.getFilteredArticles({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  sourceName: 'CoinDesk',
  limit: '20'
});

// Get article by ID
const article = await articlesService.getArticleById(123);

// Get articles by source
const sourceArticles = await articlesService.getArticlesBySource('CoinDesk');

// Get all sources
const sources = await articlesService.getSources();

// Get statistics
const stats = await articlesService.getStats({
  startDate: '2024-01-01',
  endDate: '2024-01-31'
});

// Get dashboard data (articles, sources, stats)
const dashboard = await articlesService.getDashboardData();

// Ingest new articles from CoinDesk
await articlesService.ingestCoinDeskArticles();
```

## Configuration

Set the API base URL in your environment variables:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Or modify the default in `config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  // ...
};
```

## Error Handling

All services include error handling and will throw descriptive errors:

```typescript
try {
  const result = await aiAnalysisService.analyzeSentiment(123);
  console.log(result);
} catch (error) {
  console.error('Analysis failed:', error.message);
}
```

## Types

All API responses are fully typed. Import types as needed:

```typescript
import { 
  SentimentAnalysisResponse, 
  FilteredArticlesResponse,
  Article,
  Source 
} from './components/api';
```

## React Usage Example

```typescript
import { useEffect, useState } from 'react';
import { aiAnalysisService, articlesService } from './components/api';
import type { Article, SentimentAnalysisResponse } from './components/api';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articlesService.getRecentArticles({ limit: '10' });
        setArticles(response.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const analyzeSentiment = async (articleId: number) => {
    try {
      const analysis = await aiAnalysisService.analyzeSentiment(articleId);
      console.log('Sentiment analysis:', analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <button onClick={() => analyzeSentiment(article.id)}>
            Analyze Sentiment
          </button>
        </div>
      ))}
    </div>
  );
}
```
