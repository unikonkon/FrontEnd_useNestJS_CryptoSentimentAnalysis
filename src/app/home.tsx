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
  const [showModal, setShowModal] = useState(false);
  const [articleLimit, setArticleLimit] = useState(5);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const router = useRouter();

  // Load articles on component mount
  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadArticles = async (limit?: number, dateStart?: string, dateEnd?: string) => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, string> = {
        limit: String(limit ?? articleLimit),
        offset: '0'
      };

      if (dateStart) params.startDate = dateStart;
      if (dateEnd) params.endDate = dateEnd;

      const response = await articlesService.getFilteredArticles(params);
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
    router.push(`/analysis/${articleId}`);
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleShowLoadModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoadArticlesWithLimit = async () => {
    setShowModal(false);
    await loadArticles(articleLimit, startDate || undefined, endDate || undefined);
  };

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setArticleLimit(5);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center crt">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-foreground font-pixel-body text-pixel-lg animate-pixel-blink">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground crt">
      {/* Header */}
      <header className="bg-p8-1 border-b-4 border-p8-6 pixel-corners" style={{ "--pc": "12px" } as React.CSSProperties}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="font-pixel-title text-pixel-2xl text-p8-10 animate-pixel-pulse">
              CRYPTO SENTIMENT
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Model */}
      <section className="bg-gradient-to-br from-p8-1 via-p8-2 to-p8-5 border-b-4 border-p8-6">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-foreground">
              <h2 className="font-pixel-title text-pixel-xl md:text-pixel-2xl mb-6 text-p8-7">
                วิเคราะห์ SENTIMENT
                <br />
                <span className="text-p8-10">CRYPTO</span> ด้วย AI
              </h2>
              <p className="font-pixel-body text-pixel-base text-p8-6 mb-6">
                ติดตามและวิเคราะห์ข่าวสาร Cryptocurrency ด้วยเทคโนโลยี AI
                เพื่อการตัดสินใจลงทุนที่ดีขึ้น
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="panel-pixel flex items-center gap-3">
                  <div className="font-pixel-title text-pixel-lg text-p8-10">{articles.length}</div>
                  <div className="font-pixel-body text-pixel-sm text-p8-6">บทความทั้งหมด</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleShowLoadModal}
                    className="btn-pixel"
                  >
                    <span className="mr-2">📊</span>
                    โหลดบทความ
                  </button>
                  <button
                    onClick={handleIngestArticles}
                    disabled={ingestLoading}
                    className="btn-pixel"
                  >
                    {ingestLoading ? (
                      <>
                        <div className="loading-spinner inline-block w-4 h-4 mr-2"></div>
                        กำลังนำเข้า...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">+</span>
                        นำเข้าบทความ COINDESK
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3D Bitcoin Model */}
            <div className="flex justify-center">
              <div className="card-pixel w-full max-w-md pixelated">
                <WalletBG
                  height="300px"
                  className="w-full pixelated"
                  showControls={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      {(error || successMessage) && (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {error && (
            <div className="toast-pixel error mb-4 flex justify-between items-center">
              <span className="font-pixel-body text-pixel-sm">{error}</span>
              <button
                onClick={clearMessages}
                className="text-p8-8 hover:text-p8-9 font-pixel-title text-pixel-xs ml-4"
              >
                X
              </button>
            </div>
          )}
          {successMessage && (
            <div className="toast-pixel success mb-4 flex justify-between items-center">
              <span className="font-pixel-body text-pixel-sm">{successMessage}</span>
              <button
                onClick={clearMessages}
                className="text-p8-11 hover:text-p8-3 font-pixel-title text-pixel-xs ml-4"
              >
                X
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="card-pixel mx-auto max-w-md">
              <div className="w-16 h-16 bg-p8-5 border-2 border-p8-6 mx-auto mb-4 flex items-center justify-center">
                <span className="font-pixel-title text-pixel-lg text-p8-6">?</span>
              </div>
              <h3 className="font-pixel-title text-pixel-base text-p8-7 mb-2">ไม่มีบทความ</h3>
              <p className="font-pixel-body text-pixel-sm text-p8-6 mb-4">เริ่มต้นด้วยการนำเข้าบทความจาก COINDESK</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="card-pixel analysis-card hover:animate-pixel-pulse p-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-pixel bg-p8-12">
                    {article.sources.name}
                  </span>
                  <span className="font-pixel-body text-pixel-xs text-p8-6">
                    {new Date(article.pub_date).toLocaleDateString('th-TH')}
                  </span>
                </div>

                <h3 className="font-pixel-title text-pixel-sm text-p8-7 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="font-pixel-body text-pixel-sm text-p8-6 mb-4 line-clamp-3">
                  {article.description}
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleViewArticle(article.id)}
                    className="btn-pixel w-full"
                  >
                    ดูข้อมูลวิเคราะห์
                  </button>

                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-pixel-body text-pixel-xs text-p8-12 hover:text-p8-10 text-center"
                    >
                      แหล่งที่มา →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Load Articles Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#4d4343d3] flex items-center justify-center z-50">
          <div className="card-pixel w-full max-w-md mx-4 border-2 p-6 bg-[#312d2d]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-pixel-title text-pixel-lg text-p8-7">โหลดบทความ</h3>
              <button
                onClick={handleCloseModal}
                className="text-p8-8 hover:text-p8-9 font-pixel-title text-pixel-base"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              {/* Date Range Section */}
              <div className="mb-6">
                <label className="block font-pixel-body text-pixel-sm text-p8-6 mb-3">
                  เลือกช่วงวันที่ (ไม่บังคับ):
                </label>

                <div className="grid grid-cols-1 gap-3">
                  <div className="panel-pixel">
                    <label className="block font-pixel-body text-pixel-xs text-p8-6 mb-2">
                      วันที่เริ่มต้น:
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-transparent font-pixel-body text-pixel-sm text-p8-10 border-none outline-none hover:scale-105"
                    />
                  </div>

                  <div className="panel-pixel">
                    <label className="block font-pixel-body text-pixel-xs text-p8-6 mb-2 ">
                      วันที่สิ้นสุด:
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full bg-transparent font-pixel-body text-pixel-sm text-p8-10 border-none outline-none hover:scale-105"
                    />
                  </div>
                </div>

                {(startDate || endDate) && (
                  <button
                    onClick={handleClearFilters}
                    className="btn-pixel w-full mt-3 bg-p8-5 text-p8-7 hover:bg-p8-6"
                  >
                    ล้างตัวกรองวันที่
                  </button>
                )}
              </div>

              {/* Article Limit Section */}
              <div>
                <label className="block font-pixel-body text-pixel-sm text-p8-6 mb-3">
                  เลือกจำนวนบทความที่ต้องการแสดง:
                </label>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[5, 10, 15, 20, 30, 50].map((limit) => (
                    <button
                      key={limit}
                      onClick={() => setArticleLimit(limit)}
                      className={`btn-pixel ${articleLimit === limit
                          ? 'bg-p8-10 text-p8-1'
                          : 'bg-p8-3 text-p8-7 hover:bg-p8-4'
                        }`}
                    >
                      {limit}
                    </button>
                  ))}
                </div>

                <div className="panel-pixel flex items-center justify-between">
                  <span className="font-pixel-body text-pixel-sm text-p8-6">จำนวนที่เลือก:</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={articleLimit}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val > 0) setArticleLimit(val);
                    }}
                    className="font-pixel-title text-pixel-base text-p8-10 bg-transparent border-none outline-none w-20 text-right"
                    style={{ appearance: 'textfield' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="btn-pixel flex-1 bg-p8-5 text-p8-7 hover:bg-p8-6"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleLoadArticlesWithLimit}
                className="btn-pixel flex-1"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
