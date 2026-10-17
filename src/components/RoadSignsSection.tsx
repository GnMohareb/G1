import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { OFFICIAL_ONTARIO_SIGNS } from '../data/officialOntarioSigns';
import { RoadSignSvg } from './RoadSignSvg';
import { RoadSignType, RoadSignCatalogItem } from '../types';
import { 
  Search, 
  ShieldAlert, 
  ArrowRight, 
  Play, 
  Info, 
  X, 
  AlertTriangle, 
  Lightbulb, 
  Scale, 
  Eye,
  Octagon,
  HardHat,
  Compass,
  LayoutGrid,
  Layers,
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Check
} from 'lucide-react';
import { AdSlot } from './AdSlot';
import { AD_SLOTS } from '../config/ads';
import { loadReviewedSignIds, markSignAsReviewed, resetReviewedSigns } from '../utils/storage';

interface RoadSignsSectionProps {
  onStartSignsTest: () => void;
  onPracticeSpecificSign?: (signType: RoadSignType) => void;
}

type SignCategoryFilter = 'all' | 'regulatory' | 'warning' | 'temporary' | 'information';
type ViewMode = 'grid' | 'flashcards';

export const RoadSignsSection: React.FC<RoadSignsSectionProps> = ({
  onStartSignsTest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SignCategoryFilter>('all');
  const [activeSignModal, setActiveSignModal] = useState<RoadSignCatalogItem | null>(null);

  // Persistent Reviewed Signs State
  const [reviewedSignIds, setReviewedSignIds] = useState<string[]>(() => loadReviewedSignIds());

  // Flashcard Mode State
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<RoadSignCatalogItem[] | null>(null);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [needsReviewIds, setNeedsReviewIds] = useState<Set<string>>(new Set());

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Mark a sign as reviewed in state and localStorage
  const handleRecordReview = useCallback((signId: string) => {
    setReviewedSignIds(prev => {
      if (prev.includes(signId)) return prev;
      return markSignAsReviewed(signId);
    });
  }, []);

  // Compute category counts for tab badges
  const categoryCounts = useMemo(() => ({
    all: OFFICIAL_ONTARIO_SIGNS.length,
    regulatory: OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'regulatory').length,
    warning: OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'warning').length,
    temporary: OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'temporary').length,
    information: OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'information').length,
  }), []);

  // Compute percentage completed (reviewed / total) for each category
  const categoryProgress = useMemo(() => {
    const reviewedSet = new Set(reviewedSignIds);
    
    const calcCategory = (signs: RoadSignCatalogItem[]) => {
      if (signs.length === 0) return { reviewed: 0, total: 0, percentage: 0 };
      const reviewedCount = signs.filter(s => reviewedSet.has(s.id)).length;
      const percentage = Math.round((reviewedCount / signs.length) * 100);
      return { reviewed: reviewedCount, total: signs.length, percentage };
    };

    return {
      all: calcCategory(OFFICIAL_ONTARIO_SIGNS),
      regulatory: calcCategory(OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'regulatory')),
      warning: calcCategory(OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'warning')),
      temporary: calcCategory(OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'temporary')),
      information: calcCategory(OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'information')),
    };
  }, [reviewedSignIds]);

  // Filtered signs based on selectedCategory and searchQuery
  const filteredSigns = useMemo(() => {
    return OFFICIAL_ONTARIO_SIGNS.filter(sign => {
      const matchesCategory = selectedCategory === 'all' || sign.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        sign.name.toLowerCase().includes(query) ||
        sign.code.toLowerCase().includes(query) ||
        sign.meaning.toLowerCase().includes(query) ||
        sign.driverAction.toLowerCase().includes(query) ||
        sign.shapeAndColor.toLowerCase().includes(query) ||
        sign.officialMtoRef.toLowerCase().includes(query) ||
        (sign.g1TestTip && sign.g1TestTip.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Flashcard Deck: uses shuffledOrder if active, otherwise filteredSigns
  const activeDeck = useMemo(() => {
    if (isShuffled && shuffledOrder && shuffledOrder.length > 0) {
      return shuffledOrder;
    }
    return filteredSigns;
  }, [isShuffled, shuffledOrder, filteredSigns]);

  const currentCard = activeDeck[currentCardIndex];
  const isCurrentMastered = currentCard ? masteredIds.has(currentCard.id) : false;
  const isCurrentNeedsReview = currentCard ? needsReviewIds.has(currentCard.id) : false;

  // Auto-record sign as reviewed when viewing in flashcard mode
  useEffect(() => {
    if (viewMode === 'flashcards' && currentCard) {
      handleRecordReview(currentCard.id);
    }
  }, [viewMode, currentCard, handleRecordReview]);

  // Reset card index when category or deck size changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
    setShuffledOrder(null);
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation for Flashcard Mode and Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeSignModal) {
          setActiveSignModal(null);
          return;
        }
        if (viewMode === 'flashcards') {
          setViewMode('grid');
          return;
        }
      }

      if (viewMode === 'flashcards' && !activeSignModal && activeDeck.length > 0) {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped(prev => !prev);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextCard();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevCard();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, activeSignModal, activeDeck.length, currentCardIndex]);

  // Handle Modal focus trap
  useEffect(() => {
    if (activeSignModal) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
  }, [activeSignModal]);

  const handleNextCard = () => {
    if (activeDeck.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev + 1 < activeDeck.length ? prev + 1 : 0));
  };

  const handlePrevCard = () => {
    if (activeDeck.length === 0) return;
    setIsFlipped(false);
    setCurrentCardIndex(prev => (prev - 1 >= 0 ? prev - 1 : activeDeck.length - 1));
  };

  const handleShuffleDeck = () => {
    const shuffled = [...filteredSigns].sort(() => Math.random() - 0.5);
    setShuffledOrder(shuffled);
    setIsShuffled(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleResetProgress = () => {
    setMasteredIds(new Set());
    setNeedsReviewIds(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
    setShuffledOrder(null);
  };

  const handleResetAllReviewedProgress = () => {
    resetReviewedSigns();
    setReviewedSignIds([]);
    handleResetProgress();
  };

  const handleMarkMastered = (signId: string) => {
    handleRecordReview(signId);
    setMasteredIds(prev => new Set(prev).add(signId));
    setNeedsReviewIds(prev => {
      const next = new Set(prev);
      next.delete(signId);
      return next;
    });
    handleNextCard();
  };

  const handleMarkNeedsReview = (signId: string) => {
    handleRecordReview(signId);
    setNeedsReviewIds(prev => new Set(prev).add(signId));
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.delete(signId);
      return next;
    });
    handleNextCard();
  };

  const getCategoryTheme = (category: RoadSignCatalogItem['category']) => {
    switch (category) {
      case 'regulatory':
        return {
          pill: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/60',
          badgeText: 'Regulatory (HTA)',
          accentBorder: 'hover:border-red-500/70',
          accentColor: 'text-red-600 dark:text-red-400',
          progressBar: 'bg-red-600 dark:bg-red-500'
        };
      case 'warning':
        return {
          pill: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
          badgeText: 'Warning Sign',
          accentBorder: 'hover:border-amber-500/70',
          accentColor: 'text-amber-600 dark:text-amber-400',
          progressBar: 'bg-amber-500 dark:bg-amber-400'
        };
      case 'temporary':
        return {
          pill: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/60',
          badgeText: 'Construction (TC)',
          accentBorder: 'hover:border-orange-500/70',
          accentColor: 'text-orange-600 dark:text-orange-400',
          progressBar: 'bg-orange-600 dark:bg-orange-500'
        };
      case 'information':
        return {
          pill: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/60',
          badgeText: 'Info & Guide',
          accentBorder: 'hover:border-blue-500/70',
          accentColor: 'text-blue-600 dark:text-blue-400',
          progressBar: 'bg-blue-600 dark:bg-blue-500'
        };
    }
  };

  const reviewedSet = useMemo(() => new Set(reviewedSignIds), [reviewedSignIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Official Ministry of Transportation (MTO) Database</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Official Ontario Road Signs &amp; Signals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Standardized traffic signs catalogued per the Ontario Traffic Manual (OTM Books 5, 6, 7 &amp; 8) and the Highway Traffic Act (HTA). Track your review progress across each category and practice flashcards to prepare for the G1 exam.
          </p>
        </div>

        <button
          onClick={onStartSignsTest}
          className="px-5 py-3 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 active:bg-red-800 transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 self-start md:self-auto focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Signs Practice Test (20 Qs)</span>
        </button>
      </div>

      {/* MTO Category Filter Tabs & Search Bar */}
      <div className="mt-8 space-y-4">
        {/* Main Tab Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Prominent MTO Category Tabs with Progress Percentage Indicators */}
          <div 
            className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl overflow-x-auto border border-slate-200/80 dark:border-slate-700/60 shadow-xs"
            role="tablist" 
            aria-label="Ontario Ministry of Transportation Signage Categories"
          >
            {/* All Signs Tab */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              title={`All Signs: ${categoryProgress.all.reviewed} of ${categoryProgress.all.total} reviewed (${categoryProgress.all.percentage}%)`}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex flex-col min-w-[130px] ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/40'
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>All Signs</span>
                </div>
                <div className="flex items-center gap-1">
                  {categoryProgress.all.percentage === 100 && (
                    <Check className="w-3 h-3 text-emerald-500" />
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === 'all'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {categoryProgress.all.percentage}%
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mt-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 dark:bg-slate-100'
                      : 'bg-slate-500 dark:bg-slate-400'
                  }`}
                  style={{ width: `${categoryProgress.all.percentage}%` }}
                />
              </div>
            </button>

            {/* Regulatory Tab (MTO Book 5) */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'regulatory'}
              onClick={() => setSelectedCategory('regulatory')}
              title={`Regulatory Signs: ${categoryProgress.regulatory.reviewed} of ${categoryProgress.regulatory.total} reviewed (${categoryProgress.regulatory.percentage}%)`}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex flex-col min-w-[140px] ${
                selectedCategory === 'regulatory'
                  ? 'bg-red-600 text-white shadow-sm shadow-red-500/20 ring-1 ring-red-700'
                  : 'text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-950/30'
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1.5">
                  <Octagon className={`w-3.5 h-3.5 ${selectedCategory === 'regulatory' ? 'text-white' : 'text-red-600 dark:text-red-400'}`} />
                  <span>Regulatory</span>
                </div>
                <div className="flex items-center gap-1">
                  {categoryProgress.regulatory.percentage === 100 && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === 'regulatory'
                      ? 'bg-red-700 text-white'
                      : 'bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300'
                  }`}>
                    {categoryProgress.regulatory.percentage}%
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-1 bg-black/15 dark:bg-white/15 rounded-full overflow-hidden mt-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedCategory === 'regulatory'
                      ? 'bg-white'
                      : 'bg-red-600 dark:bg-red-500'
                  }`}
                  style={{ width: `${categoryProgress.regulatory.percentage}%` }}
                />
              </div>
            </button>

            {/* Warning Tab (MTO Book 6) */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'warning'}
              onClick={() => setSelectedCategory('warning')}
              title={`Warning Signs: ${categoryProgress.warning.reviewed} of ${categoryProgress.warning.total} reviewed (${categoryProgress.warning.percentage}%)`}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex flex-col min-w-[135px] ${
                selectedCategory === 'warning'
                  ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20 ring-1 ring-amber-600 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/60 dark:hover:bg-amber-950/30'
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className={`w-3.5 h-3.5 ${selectedCategory === 'warning' ? 'text-slate-950 fill-current' : 'text-amber-600 dark:text-amber-400'}`} />
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-1">
                  {categoryProgress.warning.percentage === 100 && (
                    <Check className="w-3 h-3 text-slate-950" />
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === 'warning'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                  }`}>
                    {categoryProgress.warning.percentage}%
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-1 bg-black/15 dark:bg-white/15 rounded-full overflow-hidden mt-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedCategory === 'warning'
                      ? 'bg-slate-950'
                      : 'bg-amber-500 dark:bg-amber-400'
                  }`}
                  style={{ width: `${categoryProgress.warning.percentage}%` }}
                />
              </div>
            </button>

            {/* Construction Tab (MTO Book 7) */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'temporary'}
              onClick={() => setSelectedCategory('temporary')}
              title={`Construction Signs: ${categoryProgress.temporary.reviewed} of ${categoryProgress.temporary.total} reviewed (${categoryProgress.temporary.percentage}%)`}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex flex-col min-w-[145px] ${
                selectedCategory === 'temporary'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-500/20 ring-1 ring-orange-700'
                  : 'text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50/60 dark:hover:bg-orange-950/30'
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1.5">
                  <HardHat className={`w-3.5 h-3.5 ${selectedCategory === 'temporary' ? 'text-white' : 'text-orange-600 dark:text-orange-400'}`} />
                  <span>Construction</span>
                </div>
                <div className="flex items-center gap-1">
                  {categoryProgress.temporary.percentage === 100 && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === 'temporary'
                      ? 'bg-orange-700 text-white'
                      : 'bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300'
                  }`}>
                    {categoryProgress.temporary.percentage}%
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-1 bg-black/15 dark:bg-white/15 rounded-full overflow-hidden mt-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedCategory === 'temporary'
                      ? 'bg-white'
                      : 'bg-orange-600 dark:bg-orange-500'
                  }`}
                  style={{ width: `${categoryProgress.temporary.percentage}%` }}
                />
              </div>
            </button>

            {/* Information Tab (MTO Book 8) */}
            <button
              role="tab"
              aria-selected={selectedCategory === 'information'}
              onClick={() => setSelectedCategory('information')}
              title={`Information Signs: ${categoryProgress.information.reviewed} of ${categoryProgress.information.total} reviewed (${categoryProgress.information.percentage}%)`}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex flex-col min-w-[140px] ${
                selectedCategory === 'information'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 ring-1 ring-blue-700'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/30'
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1.5">
                  <Compass className={`w-3.5 h-3.5 ${selectedCategory === 'information' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  <span>Information</span>
                </div>
                <div className="flex items-center gap-1">
                  {categoryProgress.information.percentage === 100 && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    selectedCategory === 'information'
                      ? 'bg-blue-700 text-white'
                      : 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300'
                  }`}>
                    {categoryProgress.information.percentage}%
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-1 bg-black/15 dark:bg-white/15 rounded-full overflow-hidden mt-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedCategory === 'information'
                      ? 'bg-white'
                      : 'bg-blue-600 dark:bg-blue-500'
                  }`}
                  style={{ width: `${categoryProgress.information.percentage}%` }}
                />
              </div>
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter signs by code (R-1, Wa-34), name, or rule..."
              aria-label="Filter official signs"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Briefing Bar with Real-Time Progress Tracker */}
        <div className={`p-3.5 rounded-xl border text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${
          selectedCategory === 'regulatory'
            ? 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-900 dark:text-red-200'
            : selectedCategory === 'warning'
            ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'
            : selectedCategory === 'temporary'
            ? 'bg-orange-50/70 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/50 text-orange-900 dark:text-orange-200'
            : selectedCategory === 'information'
            ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200'
            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
        }`}>
          <div className="flex items-start sm:items-center gap-2">
            {selectedCategory === 'regulatory' && <Octagon className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5 sm:mt-0" />}
            {selectedCategory === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />}
            {selectedCategory === 'temporary' && <HardHat className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5 sm:mt-0" />}
            {selectedCategory === 'information' && <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />}
            {selectedCategory === 'all' && <LayoutGrid className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />}
            
            <p className="leading-relaxed">
              {selectedCategory === 'regulatory' && (
                <>
                  <strong className="font-semibold">Regulatory Signs (OTM Book 5 / HTA):</strong> Mandatory traffic laws, right-of-way, turn restrictions, and speed limits. Failure to obey results in demerit points and fines.
                </>
              )}
              {selectedCategory === 'warning' && (
                <>
                  <strong className="font-semibold">Warning Signs (OTM Book 6):</strong> High-visibility yellow diamond signs alerting motorists in advance to road hazards, curves, lane merges, and pedestrian crossings.
                </>
              )}
              {selectedCategory === 'temporary' && (
                <>
                  <strong className="font-semibold">Construction &amp; Work Zone Signs (OTM Book 7):</strong> Safety orange signs for road work, flagpersons, and detours. Statutory fines are doubled when workers are present.
                </>
              )}
              {selectedCategory === 'information' && (
                <>
                  <strong className="font-semibold">Information &amp; Guide Signs (OTM Book 8):</strong> Route markers, High Occupancy Vehicle (HOV) lane rules, hospital emergency care, and Emergency Detour Routes (EDR).
                </>
              )}
              {selectedCategory === 'all' && (
                <>
                  <strong className="font-semibold">Complete Official MTO Library:</strong> Browse all standard Ontario traffic signs categorized by the Ministry of Transportation.
                </>
              )}
            </p>
          </div>

          {/* Category Progress Stats Chip */}
          <div className="shrink-0 flex items-center gap-3 self-end md:self-auto">
            <div className="text-right">
              <div className="font-mono text-xs font-bold">
                {categoryProgress[selectedCategory].reviewed} / {categoryProgress[selectedCategory].total} Reviewed
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {categoryProgress[selectedCategory].percentage}% Category Mastery
              </div>
            </div>

            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shrink-0">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  selectedCategory === 'regulatory'
                    ? 'bg-red-600'
                    : selectedCategory === 'warning'
                    ? 'bg-amber-500'
                    : selectedCategory === 'temporary'
                    ? 'bg-orange-500'
                    : selectedCategory === 'information'
                    ? 'bg-blue-600'
                    : 'bg-emerald-600'
                }`}
                style={{ width: `${categoryProgress[selectedCategory].percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Practice These Signs View Toolbar & Flashcard Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented View Mode Switcher */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
            <button
              onClick={() => {
                setViewMode('grid');
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>

            <button
              onClick={() => {
                setViewMode('flashcards');
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === 'flashcards'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={viewMode === 'flashcards'}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcard Mode</span>
            </button>
          </div>

          {/* Quick Practice Toggle Button (when in Grid view) */}
          {viewMode === 'grid' && (
            <button
              onClick={() => {
                setViewMode('flashcards');
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 border border-red-200 dark:border-red-900/60 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
              title="Practice this category in flashcard mode"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span>Practice These Signs ({filteredSigns.length})</span>
            </button>
          )}

          {/* Flashcard Mastery Status Pills */}
          {viewMode === 'flashcards' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{masteredIds.size} Mastered</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 font-medium">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{needsReviewIds.size} Review</span>
              </span>
            </div>
          )}
        </div>

        {/* Flashcard Deck Controls (only visible in flashcard mode) */}
        {viewMode === 'flashcards' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffleDeck}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
                isShuffled
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title="Shuffle card order"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>{isShuffled ? 'Shuffled' : 'Shuffle'}</span>
            </button>

            <button
              onClick={handleResetProgress}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1.5 transition-colors"
              title="Reset session card status"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Session</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit Practice</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FLASHCARD MODE VIEW                                                       */}
      {/* ========================================================================= */}
      {viewMode === 'flashcards' && (
        <div className="mt-6 max-w-2xl mx-auto">
          {activeDeck.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
              <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No signs match your filter.
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try selecting &quot;All Signs&quot; or clearing your search query to practice flashcards.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                Reset Filters &amp; Practice All
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Progress & Deck Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1">
                <span className="font-medium">
                  Card {currentCardIndex + 1} of {activeDeck.length} ({selectedCategory === 'all' ? 'All Signs' : `${selectedCategory} Signs`})
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  {Math.round(((currentCardIndex + 1) / activeDeck.length) * 100)}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 dark:bg-red-500 transition-all duration-300 ease-out"
                  style={{ width: `${((currentCardIndex + 1) / activeDeck.length) * 100}%` }}
                />
              </div>

              {/* Interactive Flashcard with Flip Animation */}
              <div 
                tabIndex={0}
                role="button"
                aria-label={`Flashcard for ${isFlipped ? currentCard.name : 'hidden sign'}. Click or press space to flip.`}
                onClick={() => setIsFlipped(prev => !prev)}
                className={`relative min-h-[440px] p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-md select-none flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isFlipped 
                    ? 'border-red-400 dark:border-red-500/70 bg-gradient-to-b from-white to-red-50/20 dark:from-slate-900 dark:to-red-950/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Status Badges Header on Card */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                      {isFlipped ? currentCard.code : 'MTO Official Sign'}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">
                      {currentCard.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {reviewedSet.has(currentCard.id) && (
                      <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>Reviewed</span>
                      </span>
                    )}
                    {isCurrentMastered && (
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        Mastered
                      </span>
                    )}
                    {isCurrentNeedsReview && (
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        Needs Review
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Face Content */}
                {!isFlipped ? (
                  /* FRONT: Visual Sign Graphic & Recognition Prompt */
                  <div className="my-auto py-6 flex flex-col items-center text-center">
                    <div className="h-44 flex items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 mb-6 drop-shadow-sm">
                      <RoadSignSvg type={currentCard.signType} size={135} />
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      What does this Ontario road sign mean?
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                      Think of the official MTO meaning and what action you must take when approaching this sign.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1.5 rounded-full border border-red-200 dark:border-red-900/60 animate-pulse">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Tap card or press Space to reveal answer</span>
                    </div>
                  </div>
                ) : (
                  /* BACK: Official MTO Answer, Driver Action, Penalties & Tips */
                  <div className="my-auto py-2 space-y-3.5 text-xs animate-fadeIn">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {currentCard.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {currentCard.officialMtoRef}
                      </p>
                    </div>

                    <div>
                      <strong className="block font-semibold text-slate-900 dark:text-white mb-0.5">
                        Official Legal Meaning:
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {currentCard.meaning}
                      </p>
                    </div>

                    <div>
                      <strong className="block font-semibold text-slate-900 dark:text-white mb-0.5">
                        Required Driver Action:
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {currentCard.driverAction}
                      </p>
                    </div>

                    {currentCard.legalConsequence && (
                      <div className="p-2.5 rounded-xl bg-red-50/70 dark:bg-red-950/40 border border-red-200/70 dark:border-red-900/60">
                        <strong className="block font-semibold text-red-900 dark:text-red-200 mb-0.5 flex items-center gap-1">
                          <Scale className="w-3 h-3 text-red-600 dark:text-red-400" />
                          <span>Ontario Penalties &amp; Demerits:</span>
                        </strong>
                        <p className="text-red-800 dark:text-red-300 text-[11px] leading-relaxed">
                          {currentCard.legalConsequence}
                        </p>
                      </div>
                    )}

                    {currentCard.g1TestTip && (
                      <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/60">
                        <strong className="block font-semibold text-amber-900 dark:text-amber-200 mb-0.5 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>G1 Exam Tip:</span>
                        </strong>
                        <p className="text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
                          {currentCard.g1TestTip}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Footer Hint */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{isFlipped ? 'Tap to see sign image again' : currentCard.shapeAndColor}</span>
                  <span className="hidden sm:inline font-mono">Press Space to flip · ← / → to step</span>
                </div>
              </div>

              {/* Navigation & Self-Grading Action Bar */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Self-Rating Buttons (Mastered vs Needs Review) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkNeedsReview(currentCard.id)}
                    className="px-3.5 py-2.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-950/80 border border-amber-200 dark:border-amber-900/60 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Mark this sign as needing further review"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Need Review</span>
                  </button>

                  <button
                    onClick={() => handleMarkMastered(currentCard.id)}
                    className="px-3.5 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-900/60 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                    title="Mark this sign as mastered"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>I Know This</span>
                  </button>
                </div>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl transition-colors flex items-center gap-1 shadow-xs"
                  aria-label="Next card"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* GRID VIEW                                                                 */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSigns.map((sign) => {
            const theme = getCategoryTheme(sign.category);
            const isReviewed = reviewedSet.has(sign.id);

            return (
              <div
                key={sign.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSignModal(sign);
                    handleRecordReview(sign.id);
                  }
                }}
                onClick={() => {
                  setActiveSignModal(sign);
                  handleRecordReview(sign.id);
                }}
                className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group focus-visible:ring-2 focus-visible:ring-red-500 ${theme.accentBorder}`}
              >
                <div>
                  {/* SVG Visual Presentation */}
                  <div className="h-32 flex items-center justify-center p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 mb-4 group-hover:scale-103 transition-transform duration-150 relative">
                    <RoadSignSvg type={sign.signType} size={90} />
                    {isReviewed && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" />
                        <span>Reviewed</span>
                      </span>
                    )}
                  </div>

                  {/* Code and Category Header */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${theme.pill}`}>
                      {sign.code}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px] text-right">
                      {sign.officialMtoRef.split('&')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {sign.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {sign.meaning}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-red-600 dark:text-red-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>MTO Regulations</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'grid' && filteredSigns.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No official Ontario signs matched your search query.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-xs text-red-600 dark:text-red-400 font-semibold hover:underline"
          >
            Clear filters and search
          </button>
        </div>
      )}

      {/* Real AdSlot Location: Bottom of Road Signs Catalog */}
      <AdSlot slotId={AD_SLOTS.catalogFooter} className="mt-12" />

      {/* Modal for Detailed Official MTO Sign Meaning */}
      {activeSignModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sign-dialog-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
          onClick={() => setActiveSignModal(null)}
        >
          <div
            ref={modalRef}
            className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={() => setActiveSignModal(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-5 border border-slate-100 dark:border-slate-800">
              <div className="shrink-0 flex items-center justify-center">
                <RoadSignSvg type={activeSignModal.signType} size={110} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                    {activeSignModal.code}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">
                    {activeSignModal.category} Sign
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <Check className="w-2.5 h-2.5" />
                    <span>Reviewed</span>
                  </span>
                </div>
                <h2 id="sign-dialog-title" className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeSignModal.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeSignModal.officialMtoRef}
                </p>
              </div>
            </div>

            {/* Information Sections */}
            <div className="space-y-4 text-xs">
              
              {/* Shape and Appearance */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <strong className="block font-semibold text-slate-900 dark:text-white mb-0.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Standard Shape &amp; Specification:</span>
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeSignModal.shapeAndColor}
                </p>
              </div>

              {/* Legal Meaning */}
              <div>
                <strong className="block font-semibold text-slate-900 dark:text-white mb-1">
                  Official Legal Meaning:
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeSignModal.meaning}
                </p>
              </div>

              {/* Driver Action */}
              <div>
                <strong className="block font-semibold text-slate-900 dark:text-white mb-1">
                  Required Defensive Driver Action:
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeSignModal.driverAction}
                </p>
              </div>

              {/* Legal Consequences */}
              {activeSignModal.legalConsequence && (
                <div className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
                  <strong className="block font-semibold text-red-900 dark:text-red-200 mb-0.5 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    <span>Ontario Highway Traffic Act Penalties:</span>
                  </strong>
                  <p className="text-red-800 dark:text-red-300 leading-relaxed">
                    {activeSignModal.legalConsequence}
                  </p>
                </div>
              )}

              {/* High-Yield G1 Test Tip */}
              {activeSignModal.g1TestTip && (
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50">
                  <strong className="block font-semibold text-amber-900 dark:text-amber-200 mb-0.5 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>High-Yield G1 Knowledge Test Tip:</span>
                  </strong>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                    {activeSignModal.g1TestTip}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveSignModal(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadSignsSection;
