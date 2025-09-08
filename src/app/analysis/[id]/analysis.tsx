'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { aiAnalysisService } from '../../components/api';
import type {
    ArticleResponse,
    SentimentAnalysisResponse,
    EventAnalysisResponse,
    TradingSignalResponse
} from '../../components/api';

interface AnalysisPageProps {
    articleId: number;
}

export default function AnalysisPage({ articleId }: AnalysisPageProps) {
    const router = useRouter();

    // Article state
    const [article, setArticle] = useState<ArticleResponse | null>(null);
    const [articleLoading, setArticleLoading] = useState(true);

    // Analysis states
    const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysisResponse | null>(null);
    const [eventAnalysis, setEventAnalysis] = useState<EventAnalysisResponse | null>(null);
    const [tradingSignals, setTradingSignals] = useState<TradingSignalResponse | null>(null);

    // Loading states
    const [sentimentLoading, setSentimentLoading] = useState(false);
    const [eventLoading, setEventLoading] = useState(false);
    const [tradingLoading, setTradingLoading] = useState(false);

    // Error states
    const [error, setError] = useState<string | null>(null);

    const loadArticle = useCallback(async () => {
        try {
            setArticleLoading(true);
            setError(null);

            const response = await aiAnalysisService.getArticle(articleId);
            console.log('responsegetArticle -->', response);

            if (response.analysis?.sentiment) {
                setSentimentAnalysis(response.analysis.sentiment as SentimentAnalysisResponse);
            }
            if (response.analysis?.events) {
                setEventAnalysis(response.analysis.events as EventAnalysisResponse);
            }
            if (response.analysis?.strategy) {
                setTradingSignals(response.analysis.strategy as TradingSignalResponse);
            }

            //  responsegetArticle -->  {
            //     "id": 51,
            //     "source_id": 1,
            //     "guid": "6a4b2baa-8b44-487c-9dbb-baccffc5f41e",
            //     "link": "https://www.coindesk.com/markets/2025/09/05/mara-mines-705-btc-in-august-as-treasury-holdings-top-52-000",
            //     "title": "MARA Mines 705 BTC in August as Treasury Holdings Top 52,000",
            //     "description": "Company holds 52,477 BTC, advances Texas wind farm and European growth while shares face year-to-date decline.",
            //     "content_html": "<p>MARA Holdings (MARA) <a href=\"https://www.globenewswire.com/news-release/2025/09/04/3144965/0/en/MARA-Announces-Bitcoin-Production-and-Mining-Operation-Updates-for-August-2025.html\">reported</a> that its bitcoin (BTC) holdings climbed to 52,477 BTC as of Aug. 31, after the crypto mining company produced 705 BTC during the month. </p><p>The company mined 208 blocks, maintaining a 4.9% share of network rewards. Energized hashrate rose 1% month-over-month to 59.4 exahashes per second (EH/s). MARA opted not to sell any BTC in August, with management noting that the price decline provided an opportunity to grow reserves.</p><p>The largest cryptocurrency fell more than 6% in August, the worst performance since February.</p><p>"Given the decline in bitcoin price during the month, we took the opportunity to strategically add to our treasury and currently hold over 52,000 BTC," said CEO Fred Thiel.</p><p>MARA remains on track to complete its Texas wind farm buildout by the fourth quarter, with all miners on-site and connected. Internationally, the company signed an agreement to buy a 64% stake in Exaion, a subsidiary of EDF, with the option to increase to 75% by 2027. The deal aims to integrate MARA's infrastructure with AI and edge solutions.</p><p>MARA also opened its European headquarters in Paris, reinforcing its focus on sustainability, grid partnerships and the repurposing of unused energy. </p><p>MARA shares fell 5% on Thursday and are down 14% year to date.</p>",
            //     "content_text": "MARA Holdings (MARA) reported that its bitcoin (BTC) holdings climbed to 52,477 BTC as of Aug. 31, after the crypto mining company produced 705 BTC during the month. \nThe company mined 208 blocks, maintaining a 4.9% share of network rewards. Energized hashrate rose 1% month-over-month to 59.4 exahashes per second (EH/s). MARA opted not to sell any BTC in August, with management noting that the price decline provided an opportunity to grow reserves.\nThe largest cryptocurrency fell more than 6% in August, the worst performance since February.\n"Given the decline in bitcoin price during the month, we took the opportunity to strategically add to our treasury and currently hold over 52,000 BTC," said CEO Fred Thiel.\nMARA remains on track to complete its Texas wind farm buildout by the fourth quarter, with all miners on-site and connected. Internationally, the company signed an agreement to buy a 64% stake in Exaion, a subsidiary of EDF, with the option to increase to 75% by 2027. The deal aims to integrate MARA's infrastructure with AI and edge solutions.\nMARA also opened its European headquarters in Paris, reinforcing its focus on sustainability, grid partnerships and the repurposing of unused energy. \nMARA shares fell 5% on Thursday and are down 14% year to date.",
            //     "content_html": "<p>MARA Holdings (MARA) <a href=\"https://www.globenewswire.com/news-release/2025/09/04/3144965/0/en/MARA-Announces-Bitcoin-Production-and-Mining-Operation-Updates-for-August-2025.html\">reported</a> that its bitcoin (BTC) holdings climbed to 52,477 BTC as of Aug. 31, after the crypto mining company produced 705 BTC during the month. </p><p>The company mined 208 blocks, maintaining a 4.9% share of network rewards. Energized hashrate rose 1% month-over-month to 59.4 exahashes per second (EH/s). MARA opted not to sell any BTC in August, with management noting that the price decline provided an opportunity to grow reserves.</p><p>The largest cryptocurrency fell more than 6% in August, the worst performance since February.</p><p>“Given the decline in bitcoin price during the month, we took the opportunity to strategically add to our treasury and currently hold over 52,000 BTC,” said CEO Fred Thiel.</p><p>MARA remains on track to complete its Texas wind farm buildout by the fourth quarter, with all miners on-site and connected. Internationally, the company signed an agreement to buy a 64% stake in Exaion, a subsidiary of EDF, with the option to increase to 75% by 2027. The deal aims to integrate MARA’s infrastructure with AI and edge solutions.</p><p>MARA also opened its European headquarters in Paris, reinforcing its focus on sustainability, grid partnerships and the repurposing of unused energy. </p><p>MARA shares fell 5% on Thursday and are down 14% year to date.</p>",
            //     "content_text": "MARA Holdings (MARA) reported that its bitcoin (BTC) holdings climbed to 52,477 BTC as of Aug. 31, after the crypto mining company produced 705 BTC during the month. \nThe company mined 208 blocks, maintaining a 4.9% share of network rewards. Energized hashrate rose 1% month-over-month to 59.4 exahashes per second (EH/s). MARA opted not to sell any BTC in August, with management noting that the price decline provided an opportunity to grow reserves.\nThe largest cryptocurrency fell more than 6% in August, the worst performance since February.\n“Given the decline in bitcoin price during the month, we took the opportunity to strategically add to our treasury and currently hold over 52,000 BTC,” said CEO Fred Thiel.\nMARA remains on track to complete its Texas wind farm buildout by the fourth quarter, with all miners on-site and connected. Internationally, the company signed an agreement to buy a 64% stake in Exaion, a subsidiary of EDF, with the option to increase to 75% by 2027. The deal aims to integrate MARA’s infrastructure with AI and edge solutions.\nMARA also opened its European headquarters in Paris, reinforcing its focus on sustainability, grid partnerships and the repurposing of unused energy. \nMARA shares fell 5% on Thursday and are down 14% year to date.",
            //     "author": "[\"James Van Straten\",\"AI Boost\"]",
            //     "categories": [
            //         "Markets",
            //         "marathon digital holdings",
            //         "Bitcoin",
            //         "Crypto Mining",
            //         "Mining",
            //         "News"
            //     ],
            //     "pub_date": "2025-09-05T09:57:44+00:00",
            //     "feed_language": "en-US",
            //     "hash": "20c29c41c3bc53aee94cbc7acda07cc34171e0635cf77a3020f088e17fcbdbe0",
            //     "first_seen_at": "2025-09-05T11:03:45.292+00:00",
            //     "sources": {
            //         "id": 1,
            //         "url": "https://www.coindesk.com",
            //         "name": "CoinDesk",
            //         "weight": 1
            //     },
            //     "analysis": {
            //         "sentiment": {
            //             "article_id": 51,
            //             "sentiment_score": 0.3,
            //             "sentiment_label": "positive",
            //             "confidence": 0.85,
            //             "key_reasons": [
            //                 "MARA mined 705 BTC in August, indicating operational success.",
            //                 "Treasury holdings increased to over 52,000 BTC, suggesting a strong financial position.",
            //                 "Advancements in Texas wind farm project show commitment to sustainable energy.",
            //                 "European expansion through Exaion acquisition and new headquarters in Paris signals growth and strategic partnerships."
            //             ],
            //             "keywords": {
            //                 "negative": [
            //                     "Year-to-date decline",
            //                     "Price decline",
            //                     "Shares fell"
            //                 ],
            //                 "positive": [
            //                     "Mines",
            //                     "BTC",
            //                     "Treasury Holdings",
            //                     "Advances",
            //                     "Growth",
            //                     "Strategic",
            //                     "Sustainability",
            //                     "Partnerships"
            //                 ]
            //             },
            //             "used_fields": [
            //                 "title",
            //                 "description",
            //                 "content"
            //             ],
            //             "model_version": "gemini-2.0-flash",
            //             "created_at": "2025-09-08T10:31:51.524504+00:00",
            //             "updated_at": "2025-09-08T10:40:19.061+00:00"
            //         },
            //         "events": {
            //             "article_id": 51,
            //             "events": [
            //                 {
            //                     "label": "partnership_adoption",
            //                     "confidence": 0.7
            //                 },
            //                 {
            //                     "label": "funding_investment",
            //                     "confidence": 0.3
            //                 },
            //                 {
            //                     "label": "technology_update",
            //                     "confidence": 0.6
            //                 }
            //             ],
            //             "event_summary": "MARA ขุด Bitcoin ได้ 705 BTC ในเดือนสิงหาคม ถือครองรวม 52,477 BTC ขยายฟาร์มพลังงานลมในเท็กซัส และขยายธุรกิจในยุโรป",
            //             "severity": 0.3,
            //             "primary_event_type": "partnership_adoption",
            //             "used_fields": [
            //                 "หัวข้อ",
            //                 "คำอธิบาย",
            //                 "เนื้อหา"
            //             ],
            //             "model_version": "gemini-2.0-flash",
            //             "created_at": "2025-09-05T11:05:25.361183+00:00",
            //             "updated_at": "2025-09-08T10:40:54.236+00:00"
            //         },
            //         "strategy": {
            //             "article_id": 51,
            //             "signals": {
            //                 "news_breakout": false,
            //                 "risk_catalyst": false,
            //                 "event_momentum": true,
            //                 "sentiment_divergence": true
            //             },
            //             "action": "watch",
            //             "time_horizon": "swing",
            //             "risk_level": 3,
            //             "rationale": "MARA เพิ่ม BTC สำรองแม้ราคาจะลดลง และยังคงขยายธุรกิจ (พลังงานลม, AI, ยุโรป) แต่ราคาหุ้นกลับลดลง year-to-date บ่งบอกถึง sentiment ที่อาจจะสวนทางกับพื้นฐานบริษัท อาจมีโอกาส mean reversion ในระยะกลาง แต่ต้องระวังความผันผวนของราคา BTC",
            //             "checklist": [
            //                 "ติดตามราคา BTC และ MARA อย่างใกล้ชิด",
            //                 "ประเมิน sentiment ตลาดโดยรวมต่อหุ้น mining",
            //                 "ตรวจสอบความคืบหน้าของโครงการพลังงานลมใน Texas",
            //                 "ติดตามผลกระทบของการลงทุนใน Exaion",
            //                 "พิจารณาปัจจัยทางเทคนิค เช่น แนวรับแนวต้าน"
            //             ],
            //             "priority_score": 0.6,
            //             "used_fields": [
            //                 "description",
            //                 "content"
            //             ],
            //             "model_version": "gemini-2.0-flash",
            //             "created_at": "2025-09-08T10:44:49.32731+00:00",
            //             "updated_at": "2025-09-08T10:45:11.579+00:00"
            //         }
            //     }
            // }

            setArticle(response);
        } catch (err) {
            console.error('Failed to load article:', err);
            setError('ไม่สามารถโหลดบทความได้');
        } finally {
            setArticleLoading(false);
        }
    }, [articleId]);

    useEffect(() => {
        loadArticle();
    }, [loadArticle]);

    const handleSentimentAnalysis = async () => {
        try {
            setSentimentLoading(true);
            setError(null);

            const response = await aiAnalysisService.analyzeSentiment(articleId);
            console.log('responseanalyzeSentiment -->', response);
            //  responseanalyzeSentiment --> {
            //     "article_id": 51,
            //     "analysis": {
            //         "task": "sentiment_analysis",
            //         "sentiment_score": 0.3,
            //         "sentiment_label": "positive",
            //         "confidence": 0.85,
            //         "key_reasons": [
            //             "MARA mined 705 BTC in August, indicating operational success.",
            //             "Treasury holdings increased to over 52,000 BTC, suggesting a strong financial position.",
            //             "Advancements in Texas wind farm project show commitment to sustainable energy.",
            //             "European expansion through Exaion acquisition and new headquarters in Paris signals growth and strategic partnerships."
            //         ],
            //         "keywords": {
            //             "positive": [
            //                 "Mines",
            //                 "BTC",
            //                 "Treasury Holdings",
            //                 "Advances",
            //                 "Growth",
            //                 "Strategic",
            //                 "Sustainability",
            //                 "Partnerships"
            //             ],
            //             "negative": [
            //                 "Year-to-date decline",
            //                 "Price decline",
            //                 "Shares fell"
            //             ]
            //         },
            //         "used_fields": [
            //             "title",
            //             "description",
            //             "content"
            //         ]
            //     },
            //     "created_at": "2025-09-08T10:40:19.287Z"
            // }

            setSentimentAnalysis(response);
        } catch (err) {
            console.error('Failed to analyze sentiment:', err);
            setError('ไม่สามารถวิเคราะห์ sentiment ได้');
        } finally {
            setSentimentLoading(false);
        }
    };

    const handleEventAnalysis = async () => {
        try {
            setEventLoading(true);
            setError(null);

            const response = await aiAnalysisService.analyzeEvents(articleId);
            console.log('responseanalyzeEvents -->', response);
            //   responseanalyzeEvents --> {
            //     "article_id": 51,
            //     "analysis": {
            //         "task": "event_classification",
            //         "events": [
            //             {
            //                 "label": "partnership_adoption",
            //                 "confidence": 0.7
            //             },
            //             {
            //                 "label": "funding_investment",
            //                 "confidence": 0.3
            //             },
            //             {
            //                 "label": "technology_update",
            //                 "confidence": 0.6
            //             }
            //         ],
            //         "primary_event": "partnership_adoption",
            //         "event_summary": "MARA ขุด Bitcoin ได้ 705 BTC ในเดือนสิงหาคม ถือครองรวม 52,477 BTC ขยายฟาร์มพลังงานลมในเท็กซัส และขยายธุรกิจในยุโรป",
            //         "severity": 0.3,
            //         "market_impact_timeframe": "medium_term",
            //         "used_fields": [
            //             "หัวข้อ",
            //             "คำอธิบาย",
            //             "เนื้อหา"
            //         ]
            //     },
            //     "created_at": "2025-09-08T10:40:54.337Z"
            // }

            setEventAnalysis(response);
        } catch (err) {
            console.error('Failed to analyze events:', err);
            setError('ไม่สามารถวิเคราะห์เหตุการณ์ได้');
        } finally {
            setEventLoading(false);
        }
    };

    const handleTradingSignals = async () => {
        try {
            setTradingLoading(true);
            setError(null);

            const response = await aiAnalysisService.generateTradingSignals(articleId);
            console.log('responsegenerateTradingSignals -->', response);
            // responsegenerateTradingSignals --> {
            //     "article_id": 51,
            //     "analysis": {
            //         "task": "trading_strategy",
            //         "signals": {
            //             "news_breakout": false,
            //             "sentiment_divergence": true,
            //             "event_momentum": true,
            //             "risk_catalyst": false
            //         },
            //         "action": "watch",
            //         "time_horizon": "swing",
            //         "risk_level": 3,
            //         "priority_score": 0.6,
            //         "rationale": "MARA เพิ่ม BTC สำรองแม้ราคาจะลดลง และยังคงขยายธุรกิจ (พลังงานลม, AI, ยุโรป) แต่ราคาหุ้นกลับลดลง year-to-date บ่งบอกถึง sentiment ที่อาจจะสวนทางกับพื้นฐานบริษัท อาจมีโอกาส mean reversion ในระยะกลาง แต่ต้องระวังความผันผวนของราคา BTC",
            //         "checklist": [
            //             "ติดตามราคา BTC และ MARA อย่างใกล้ชิด",
            //             "ประเมิน sentiment ตลาดโดยรวมต่อหุ้น mining",
            //             "ตรวจสอบความคืบหน้าของโครงการพลังงานลมใน Texas",
            //             "ติดตามผลกระทบของการลงทุนใน Exaion",
            //             "พิจารณาปัจจัยทางเทคนิค เช่น แนวรับแนวต้าน"
            //         ],
            //         "stop_loss_suggestion": "พิจารณา stop loss หากราคา MARA ต่ำกว่าแนวรับสำคัญ หรือหากราคา BTC ร่วงลงอย่างรุนแรง",
            //         "take_profit_suggestion": "พิจารณา take profit หากราคา MARA กลับขึ้นไปใกล้เคียงราคาเป้าหมาย หรือหาก sentiment ตลาดดีขึ้น",
            //         "used_fields": [
            //             "description",
            //             "content"
            //         ]
            //     },
            //     "created_at": "2025-09-08T10:45:11.715Z"
            // }
            setTradingSignals(response);
        } catch (err) {
            console.error('Failed to generate trading signals:', err);
            setError('ไม่สามารถสร้างสัญญาณการเทรดได้');
        } finally {
            setTradingLoading(false);
        }
    };

    const handleAnalyzeAll = async () => {
        try {
            setSentimentLoading(true);
            setEventLoading(true);
            setTradingLoading(true);
            setError(null);

            const response = await aiAnalysisService.analyzeAll(articleId);
            setSentimentAnalysis(response.sentiment);
            setEventAnalysis(response.events);
            setTradingSignals(response.tradingSignals);
        } catch (err) {
            console.error('Failed to analyze all:', err);
            setError('ไม่สามารถวิเคราะห์ทั้งหมดได้');
        } finally {
            setSentimentLoading(false);
            setEventLoading(false);
            setTradingLoading(false);
        }
    };

    if (articleLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center crt">
                <div className="text-center">
                    <div className="loading-spinner mx-auto mb-4"></div>
                    <p className="text-foreground font-pixel-body text-pixel-lg animate-pixel-blink">กำลังโหลดบทความ...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center crt">
                <div className="text-center">
                    <div className="card-pixel max-w-md">
                        <h2 className="font-pixel-title text-pixel-lg text-p8-8 mb-4">ไม่พบบทความ</h2>
                        <button
                            onClick={() => router.push('/')}
                            className="btn-pixel"
                        >
                            กลับหน้าหลัก
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const getSentimentColor = (label: string) => {
        switch (label) {
            case 'positive': return 'sentiment-positive';
            case 'negative': return 'sentiment-negative';
            case 'neutral': return 'sentiment-neutral';
            default: return 'bg-p8-12 text-p8-7 border-2 border-p8-6';
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground crt">
            {/* Header */}
            <header className="bg-p8-1 border-b-4 border-p8-6 pixel-corners" style={{"--pc": "12px"} as React.CSSProperties}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/')}
                                className="text-p8-10 hover:text-p8-12 transition-colors font-pixel-title text-pixel-lg hover:scale-110"
                            >
                                ←
                            </button>
                            <h1 className="font-pixel-title text-pixel-lg text-p8-10 pt-4">
                                AI ANALYSIS #{articleId}
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Error Message */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="toast-pixel error mb-4 flex justify-between items-center">
                        <span className="font-pixel-body text-pixel-sm">{error}</span>
                        <button 
                            onClick={() => setError(null)} 
                            className="text-p8-8 hover:text-p8-9 font-pixel-title text-pixel-xs ml-4"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Article Information */}
                <div className="card-pixel mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="badge-pixel bg-p8-12">
                            {article.sources.name}
                        </span>
                        <span className="font-pixel-body text-pixel-xs text-p8-6">
                            {new Date(article.pub_date).toLocaleDateString('th-TH')}
                        </span>
                    </div>

                    <h2 className="font-pixel-title text-pixel-lg text-p8-7 mb-4">
                        {article.title}
                    </h2>

                    <p className="font-pixel-body text-pixel-base text-p8-6 mb-4">
                        {article.description}
                    </p>

                    {/* Article metadata */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.author && (
                            <span className="badge-pixel bg-p8-5 text-p8-7">
                                👤 {article.author}
                            </span>
                        )}
                        {article.categories && article.categories.map((category, index) => (
                            <span key={index} className="badge-pixel bg-p8-13 text-p8-7">
                                {category}
                            </span>
                        ))}
                    </div>

                    <div className="panel-pixel">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-pixel-title text-pixel-sm text-p8-7">เนื้อหาบทความ</h3>
                            {article.link && (
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-pixel-body text-pixel-xs text-p8-12 hover:text-p8-10"
                                >
                                    อ่านบทความต้นฉบับ →
                                </a>
                            )}
                        </div>
                        <div className="prose max-w-none">
                            <p className="font-pixel-body text-pixel-sm text-p8-6 whitespace-pre-wrap">
                                {article.content_text}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Analysis Controls */}
                <div className="card-pixel mb-8">
                    <h3 className="font-pixel-title text-pixel-lg text-p8-10 mb-6">
                        วิเคราะห์ด้วย AI
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button
                            onClick={handleSentimentAnalysis}
                            disabled={sentimentLoading}
                            className="btn-pixel-success flex items-center justify-center"
                        >
                            {sentimentLoading ? (
                                <div className="loading-spinner w-14 h-14"></div>
                            ) : (
                                <span className="text-3xl w-12 h-12">☺</span>
                            )}
                            SENTIMENT
                        </button>

                        <button
                            onClick={handleEventAnalysis}
                            disabled={eventLoading}
                            className="btn-pixel-secondary flex items-center justify-center"
                        >
                            {eventLoading ? (
                                <div className="loading-spinner w-14 h-14"></div>
                            ) : (
                                <span className="text-3xl w-12 h-12">⚙ </span>
                            )}
                            EVENT
                        </button>

                        <button
                            onClick={handleTradingSignals}
                            disabled={tradingLoading}
                            className="btn-pixel-event flex items-center justify-center gap-2"
                        >
                            {tradingLoading ? (
                                <div className="loading-spinner w-4 h-4"></div>
                            ) : (
                                <span>↑</span>
                            )}
                            TRADING
                        </button>

                        <button
                            onClick={handleAnalyzeAll}
                            disabled={sentimentLoading || eventLoading || tradingLoading}
                            className="btn-pixel flex items-center justify-center"
                        >
                            {(sentimentLoading || eventLoading || tradingLoading) ? (
                                <div className="loading-spinner w-14 h-14"></div>
                            ) : (
                                <span className="text-3xl w-12 h-12">✓</span>
                            )}
                            วิเคราะห์ทั้งหมด
                        </button>
                    </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-8">
                    {/* Sentiment Analysis Results */}
                    {sentimentAnalysis && (
                        <div className="card-pixel border-b-4 border-p8-6 pixel-corners pb-4">
                            <h3 className="font-pixel-title text-pixel-lg text-p8-11 mb-4 flex items-center gap-2">
                                <span>☺</span>
                                SENTIMENT ANALYSIS
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">SENTIMENT SCORE</div>
                                    <div className="font-pixel-title text-pixel-lg text-p8-10">
                                        {sentimentAnalysis.sentiment_score}
                                    </div>
                                </div>

                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">SENTIMENT LABEL</div>
                                    <div className={`inline-block px-3 py-1 font-pixel-title text-pixel-xs ${getSentimentColor(sentimentAnalysis.sentiment_label)}`}>
                                        {sentimentAnalysis.sentiment_label}
                                    </div>
                                </div>

                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">CONFIDENCE</div>
                                    <div className="font-pixel-title text-pixel-lg text-p8-10">
                                        {(sentimentAnalysis.confidence * 100)}%
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-2">KEY REASONS</h4>
                                    <ul className="space-y-1">
                                        {Array.isArray(sentimentAnalysis.key_reasons) && sentimentAnalysis.key_reasons.length > 0 ? (
                                            sentimentAnalysis.key_reasons.map((reason, index) => (
                                                <li key={index} className="font-pixel-body text-pixel-sm text-p8-6 flex items-start gap-2">
                                                    <span className="text-p8-11 mt-1">•</span>
                                                    {reason}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="font-pixel-body text-pixel-sm text-p8-6">No key reasons available.</li>
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-2">KEYWORDS</h4>
                                    <div className="space-y-3">
                                        {Array.isArray(sentimentAnalysis.keywords?.positive) && sentimentAnalysis.keywords.positive.length > 0 && (
                                            <div>
                                                <h5 className="font-pixel-body text-pixel-xs text-p8-11 mb-1">POSITIVE KEYWORDS</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {sentimentAnalysis.keywords.positive.map((keyword, index) => (
                                                        <span key={index} className="badge-pixel bg-p8-11 text-p8-0">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {Array.isArray(sentimentAnalysis.keywords?.negative) && sentimentAnalysis.keywords.negative.length > 0 && (
                                            <div>
                                                <h5 className="font-pixel-body text-pixel-xs text-p8-8 mb-1">NEGATIVE KEYWORDS</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {sentimentAnalysis.keywords.negative.map((keyword, index) => (
                                                        <span key={index} className="badge-pixel bg-p8-8 text-p8-7">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Event Analysis Results */}
                    {eventAnalysis && (
                        <div className="card-pixel border-b-4 border-p8-6 pixel-corners pb-4">
                            <h3 className="font-pixel-title text-pixel-lg text-p8-14 mb-4 flex items-center gap-2">
                                <span>⚙</span>
                                EVENT ANALYSIS
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">PRIMARY EVENT</div>
                                    <div className="font-pixel-title text-pixel-sm text-p8-10">
                                        {eventAnalysis.primary_event_type}
                                    </div>
                                </div>

                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">SEVERITY</div>
                                    <div className="font-pixel-title text-pixel-sm text-p8-10">
                                        {eventAnalysis.severity}/1.0
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-2">EVENT SUMMARY</h4>
                                <p className="font-pixel-body text-pixel-sm text-p8-6">
                                    {eventAnalysis.event_summary}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-2">DETECTED EVENTS</h4>
                                <div className="space-y-2">
                                    {Array.isArray(eventAnalysis.events) && eventAnalysis.events.length > 0 ? (
                                        eventAnalysis.events.map((event, index) => (
                                            <div key={index} className="panel-pixel flex justify-between items-center">
                                                <span className="font-pixel-body text-pixel-sm text-p8-14">
                                                    {event.label}
                                                </span>
                                                <span className="font-pixel-body text-pixel-xs text-p8-6">
                                                    {(event.confidence * 100)}% CONFIDENCE
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="font-pixel-body text-pixel-xs text-p8-6">
                                            No events detected.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Trading Signals Results */}
                    {tradingSignals && (
                        <div className="card-pixel">
                            <h3 className="font-pixel-title text-pixel-lg text-p8-9 mb-4 flex items-center gap-2">
                                <span>↑</span>
                                TRADING SIGNALS
                            </h3>

                            <div className="grid md:grid-cols-4 gap-4 mb-4">
                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">ACTION</div>
                                    <div className="font-pixel-title text-pixel-sm text-p8-10">
                                        {tradingSignals.action}
                                    </div>
                                </div>

                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">TIME HORIZON</div>
                                    <div className="font-pixel-title text-pixel-sm text-p8-10">
                                        {tradingSignals.time_horizon}
                                    </div>
                                </div>

                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">RISK LEVEL</div>
                                    <div className="font-pixel-title text-pixel-sm text-p8-10">
                                        {tradingSignals.risk_level}/5
                                    </div>
                                </div>

                                <div className="panel-pixel">
                                    <div className="font-pixel-body text-pixel-xs text-p8-6">PRIORITY SCORE</div>
                                    <div className="font-pixel-title text-pixel-lg text-p8-10">
                                        {tradingSignals.priority_score}/1.0
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-2">RATIONALE</h4>
                                <p className="font-pixel-body text-pixel-sm text-p8-6">
                                    {tradingSignals.rationale}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-3">TRADING SIGNALS</h4>
                                    <div className="space-y-2">
                                        {tradingSignals.signals && typeof tradingSignals.signals === 'object'
                                            ? Object.entries(tradingSignals.signals).map(([key, value]) => (
                                                <div key={key} className="panel-pixel flex justify-between items-center">
                                                    <span className="font-pixel-body text-pixel-sm text-p8-6">
                                                        {key.replace('_', ' ')}
                                                    </span>
                                                    <span className={`badge-pixel ${value ? 'bg-p8-11 text-p8-0' : 'bg-p8-8 text-p8-7'
                                                        }`}>
                                                        {value ? 'ACTIVE' : 'INACTIVE'}
                                                    </span>
                                                </div>
                                            ))
                                            : <div className="font-pixel-body text-pixel-sm text-p8-6">No trading signals available.</div>
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-pixel-title text-pixel-sm text-p8-7 mb-2">ACTION CHECKLIST</h4>
                                    <ul className="space-y-1">
                                        {Array.isArray(tradingSignals.checklist) && tradingSignals.checklist.map((item, index) => (
                                            <li key={index} className="font-pixel-body text-pixel-sm text-p8-6 flex items-start gap-2">
                                                <span className="text-p8-11 mt-1">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
