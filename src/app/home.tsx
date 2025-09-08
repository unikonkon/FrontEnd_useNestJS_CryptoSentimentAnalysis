'use client';

import { useState, useEffect } from 'react';
import { articlesService } from './components/api';
import type { Article } from './components/api';
import WalletBG from './components/treeJS/walletBG';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingestLoading, setIngestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  // Load articles on component mount
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await articlesService.getFilteredArticles({
        limit: '5',
        offset: '0'
      });
      setArticles(response.data);
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError('ไม่สามารถโหลดบทความได้ ต่อ api ไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleIngestArticles = async () => {
    try {
      setIngestLoading(true);
      setError(null);
      setSuccessMessage(null);

      await articlesService.ingestCoinDeskArticles();
      setSuccessMessage('นำเข้าบทความจาก CoinDesk สำเร็จแล้ว');

      // Reload articles after successful ingest
      await loadArticles();
    } catch (err) {
      console.error('Failed to ingest articles:', err);
      setError('ไม่สามารถนำเข้าบทความได้ ต่อ api ไม่สำเร็จ');
    } finally {
      setIngestLoading(false);
    }
  };

  const handleViewArticle = (articleId: number) => {
    // Navigate to analysis page with article ID
    router.push(`/analysis/${articleId}`);
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-foreground">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              Crypto Sentiment Analysis
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Model */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                วิเคราะห์ Sentiment
                <br />
                <span className="text-yellow-400">Crypto</span> ด้วย AI
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                ติดตามและวิเคราะห์ข่าวสาร Cryptocurrency ด้วยเทคโนโลยี AI
                เพื่อการตัดสินใจลงทุนที่ดีขึ้น
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-2">
                  <div className="text-2xl font-bold text-yellow-400">{articles.length}</div>
                  <div className="text-sm text-gray-300">บทความทั้งหมด</div>
                </div>
                <div className="p-4">
                  <button
                    onClick={handleIngestArticles}
                    disabled={ingestLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    {ingestLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        กำลังนำเข้า...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        นำเข้าบทความจาก CoinDesk
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3D Bitcoin Model */}
            <div className="flex justify-center">
              <WalletBG
                height="300px"
                className="w-full max-w-md rounded-xl shadow-2xl bg-gradient-to-br from-black/20 to-transparent backdrop-blur-sm"
                showControls={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      {(error || successMessage) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <span>{error}</span>
              <button onClick={clearMessages} className="text-red-500 hover:text-red-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <span>{successMessage}</span>
              <button onClick={clearMessages} className="text-green-500 hover:text-green-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีบทความ</h3>
            <p className="text-gray-500 mb-4">เริ่มต้นด้วยการนำเข้าบทความจาก CoinDesk</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {article.sources.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(article.pub_date).toLocaleDateString('th-TH')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleViewArticle(article.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                    >
                      ดูข้อมูลวิเคราะห์
                    </button>

                    {article.link && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        แหล่งที่มา →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
