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
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
                    <p className="text-foreground">กำลังโหลดบทความ...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">ไม่พบบทความ</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        กลับหน้าหลัก
                    </button>
                </div>
            </div>
        );
    }

    const getSentimentColor = (label: string) => {
        switch (label.toLowerCase()) {
            case 'positive': return 'text-green-600 bg-green-100';
            case 'negative': return 'text-red-600 bg-red-100';
            case 'neutral': return 'text-gray-600 bg-gray-100';
            default: return 'text-blue-600 bg-blue-100';
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="bg-gray-900 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/')}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-white">
                                AI Analysis - บทความ #{articleId}
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Error Message */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Article Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                            {article.sources.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {new Date(article.pub_date).toLocaleDateString('th-TH')}
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {article.title}
                    </h2>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {article.description}
                    </p>

                    {/* Article metadata */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.author && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                👤 {article.author}
                            </span>
                        )}
                        {article.categories && article.categories.map((category, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                                {category}
                            </span>
                        ))}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">เนื้อหาบทความ</h3>
                            {article.link && (
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                >
                                    อ่านบทความต้นฉบับ
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                                {article.content_text}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Analysis Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        วิเคราะห์ด้วย AI
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button
                            onClick={handleSentimentAnalysis}
                            disabled={sentimentLoading}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {sentimentLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            Sentiment Analysis
                        </button>

                        <button
                            onClick={handleEventAnalysis}
                            disabled={eventLoading}
                            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {eventLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            )}
                            Event Analysis
                        </button>

                        <button
                            onClick={handleTradingSignals}
                            disabled={tradingLoading}
                            className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {tradingLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            )}
                            Trading Signals
                        </button>

                        <button
                            onClick={handleAnalyzeAll}
                            disabled={sentimentLoading || eventLoading || tradingLoading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {(sentimentLoading || eventLoading || tradingLoading) ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            วิเคราะห์ทั้งหมด
                        </button>
                    </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-8">
                    {/* Sentiment Analysis Results */}
                    {sentimentAnalysis && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Sentiment Analysis
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Sentiment Score</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {sentimentAnalysis.sentiment_score.toFixed(2)}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Sentiment Label</div>
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(sentimentAnalysis.sentiment_label)}`}>
                                        {sentimentAnalysis.sentiment_label}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Confidence</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {(sentimentAnalysis.confidence * 100).toFixed(1)}%
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Reasons</h4>
                                    <ul className="space-y-1">
                                        {sentimentAnalysis.key_reasons.map((reason, index) => (
                                            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                {reason}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Keywords</h4>
                                    <div className="space-y-3">
                                        {sentimentAnalysis.keywords.positive.length > 0 && (
                                            <div>
                                                <h5 className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Positive Keywords</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {sentimentAnalysis.keywords.positive.map((keyword, index) => (
                                                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {sentimentAnalysis.keywords.negative.length > 0 && (
                                            <div>
                                                <h5 className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">Negative Keywords</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {sentimentAnalysis.keywords.negative.map((keyword, index) => (
                                                        <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
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
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Event Analysis
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Primary Event</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {eventAnalysis.primary_event_type}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Severity</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {eventAnalysis.severity.toFixed(1)}/1.0
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Event Summary</h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {eventAnalysis.event_summary}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Detected Events</h4>
                                <div className="space-y-2">
                                    {eventAnalysis.events.map((event, index) => (
                                        <div key={index} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 flex justify-between items-center">
                                            <span className="text-purple-800 dark:text-purple-200 font-medium">
                                                {event.label}
                                            </span>
                                            <span className="text-sm text-purple-600 dark:text-purple-400">
                                                {(event.confidence * 100).toFixed(0)}% confidence
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Trading Signals Results */}
                    {tradingSignals && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                Trading Signals
                            </h3>

                            <div className="grid md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Action</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {tradingSignals.action}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Time Horizon</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {tradingSignals.time_horizon}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Risk Level</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {tradingSignals.risk_level}/5
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Priority Score</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {tradingSignals.priority_score.toFixed(1)}/1.0
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rationale</h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {tradingSignals.rationale}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Trading Signals</h4>
                                    <div className="space-y-2">
                                        {Object.entries(tradingSignals.signals).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                                <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                                                    {key.replace('_', ' ')}
                                                </span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {value ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Action Checklist</h4>
                                    <ul className="space-y-1">
                                        {tradingSignals.checklist.map((item, index) => (
                                            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
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
