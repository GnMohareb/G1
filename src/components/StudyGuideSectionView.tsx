import React, { useState } from 'react';
import { STUDY_GUIDE_SECTIONS } from '../data/studyGuide';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Lightbulb,
  Play
} from 'lucide-react';
import { AdSlot } from './AdSlot';
import { AD_SLOTS } from '../config/ads';

interface StudyGuideSectionViewProps {
  onStartTopicTest?: (questionIds: string[]) => void;
  initialTopicId?: string;
}

export const StudyGuideSectionView: React.FC<StudyGuideSectionViewProps> = ({
  onStartTopicTest,
  initialTopicId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'signs' | 'rules'>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(initialTopicId || 'sg-signs-signals');

  const filteredSections = STUDY_GUIDE_SECTIONS.filter(sec => {
    const matchesCategory = categoryFilter === 'all' || sec.category === categoryFilter;
    const matchesSearch = 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.keyRules.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sec.proTips && sec.proTips.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTopicId(prev => (prev === id ? null : id));
  };

  // Splitting topics to place the inline ad slot between groups (after index 4)
  const firstGroup = filteredSections.slice(0, 5);
  const secondGroup = filteredSections.slice(5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Driver&apos;s Handbook Reference Notes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Ontario G1 Study Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Concise study notes organized into 11 driving knowledge topics with citations to the Driver&apos;s Handbook and Highway Traffic Act.
        </p>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-4 border-b border-slate-200/80 dark:border-slate-800/80 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Filter */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg" role="tablist" aria-label="Study guide category filter">
          <button
            role="tab"
            aria-selected={categoryFilter === 'all'}
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              categoryFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All 11 Topics
          </button>
          <button
            role="tab"
            aria-selected={categoryFilter === 'signs'}
            onClick={() => setCategoryFilter('signs')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              categoryFilter === 'signs'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Signs &amp; Signals
          </button>
          <button
            role="tab"
            aria-selected={categoryFilter === 'rules'}
            onClick={() => setCategoryFilter('rules')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              categoryFilter === 'rules'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Rules of the Road
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, rules, or keywords..."
            aria-label="Search study guide"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Topics Accordion List - First Group */}
      <div className="mt-6 space-y-4">
        {firstGroup.map((sec, idx) => {
          const isExpanded = expandedTopicId === sec.id;

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-150 overflow-hidden bg-white dark:bg-slate-900 ${
                isExpanded
                  ? 'border-red-300 dark:border-red-900/60 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleExpand(sec.id)}
                aria-expanded={isExpanded}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-numbers">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="capitalize">{sec.category === 'signs' ? 'Road Signs' : 'Rules of the Road'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{sec.relatedQuestionIds.length} Practice Questions</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {sec.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn space-y-6">
                  
                  {/* Key Rules */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5">
                      Statutory Rules &amp; Principles
                    </h3>
                    <ul className="space-y-2">
                      {sec.keyRules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-red-600 dark:text-red-400 font-black shrink-0 mt-0.5">·</span>
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fines & Penalties */}
                  {sec.penaltiesOrFines && sec.penaltiesOrFines.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Fines &amp; Demerit Points</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {sec.penaltiesOrFines.map((pen, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {pen}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pro Tips */}
                  {sec.proTips && sec.proTips.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Study Tip</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {sec.proTips.map((tip, tIdx) => (
                          <li key={tIdx} className="leading-relaxed">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bottom Footer Actions & Official Links */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-slate-500 dark:text-slate-400">
                      <span>Source: {sec.officialReference}</span>
                      {sec.officialUrl && (
                        <a
                          href={sec.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 font-medium text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                        >
                          <span>Handbook Source Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {onStartTopicTest && sec.relatedQuestionIds.length > 0 && (
                      <button
                        onClick={() => onStartTopicTest(sec.relatedQuestionIds)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Practice {sec.relatedQuestionIds.length} Questions on this Topic</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real AdSlot Location 2: Between Study Guide Topic Groups */}
      <AdSlot slotId={AD_SLOTS.studyGuideInline} className="my-8" />

      {/* Topics Accordion List - Second Group */}
      <div className="space-y-4">
        {secondGroup.map((sec, idx) => {
          const actualIndex = idx + 5;
          const isExpanded = expandedTopicId === sec.id;

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-150 overflow-hidden bg-white dark:bg-slate-900 ${
                isExpanded
                  ? 'border-red-300 dark:border-red-900/60 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleExpand(sec.id)}
                aria-expanded={isExpanded}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono-numbers">
                    {actualIndex + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="capitalize">{sec.category === 'signs' ? 'Road Signs' : 'Rules of the Road'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{sec.relatedQuestionIds.length} Practice Questions</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {sec.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5">
                      Statutory Rules &amp; Principles
                    </h3>
                    <ul className="space-y-2">
                      {sec.keyRules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-red-600 dark:text-red-400 font-black shrink-0 mt-0.5">·</span>
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {sec.penaltiesOrFines && sec.penaltiesOrFines.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Fines &amp; Demerit Points</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {sec.penaltiesOrFines.map((pen, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {pen}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sec.proTips && sec.proTips.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Study Tip</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {sec.proTips.map((tip, tIdx) => (
                          <li key={tIdx} className="leading-relaxed">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-slate-500 dark:text-slate-400">
                      <span>Source: {sec.officialReference}</span>
                      {sec.officialUrl && (
                        <a
                          href={sec.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 font-medium text-red-600 dark:text-red-400 hover:underline inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                        >
                          <span>Handbook Source Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {onStartTopicTest && sec.relatedQuestionIds.length > 0 && (
                      <button
                        onClick={() => onStartTopicTest(sec.relatedQuestionIds)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Practice {sec.relatedQuestionIds.length} Questions on this Topic</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
