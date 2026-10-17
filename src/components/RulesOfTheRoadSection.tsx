import React, { useState } from 'react';
import { 
  Compass, 
  Play, 
  Search, 
  AlertTriangle, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface RulesOfTheRoadSectionProps {
  onStartRulesTest: () => void;
  onGoToStudyGuideTopic?: (topicId: string) => void;
}

interface RuleCardData {
  id: string;
  topic: string;
  title: string;
  summary: string;
  keyPoints: string[];
  penalty: string;
  studyGuideId: string;
}

export const RulesOfTheRoadSection: React.FC<RulesOfTheRoadSectionProps> = ({
  onStartRulesTest,
  onGoToStudyGuideTopic,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const rulesData: RuleCardData[] = [
    {
      id: 'rule-card-school-bus',
      topic: 'School Buses & Emergency',
      title: 'Stopping for School Buses (HTA s.175)',
      summary: 'When a school bus stops with overhead flashing red lights and stop arm extended, vehicles approaching from both directions on an undivided roadway must stop at least 20 metres away.',
      keyPoints: [
        'Undivided roadway: Traffic in both directions must come to a full stop at least 20 metres back.',
        'Divided road with median: Only traffic following directly behind the school bus must stop.',
        'Wait until flashing red lights stop and the stop arm has completely retracted before proceeding.',
      ],
      penalty: 'Statutory penalties include significant fines and demerit points under HTA s.175.',
      studyGuideId: 'sg-school-buses-emergency',
    },
    {
      id: 'rule-card-move-over',
      topic: 'School Buses & Emergency',
      title: 'Ontario "Move Over" Law (HTA s.159)',
      summary: 'Drivers approaching stopped emergency vehicles or tow trucks with flashing lights on the roadside must slow down with caution and move over into an adjacent lane if safe.',
      keyPoints: [
        'Applies to police vehicles, fire apparatus, ambulances, and tow trucks stopped with flashing lights.',
        'On roads with two or more lanes, change lanes to provide a buffer if traffic allows.',
        'On single-lane roads, reduce speed substantially and pass with heightened caution.',
      ],
      penalty: 'Statutory fines and 3 demerit points apply upon conviction under HTA s.159.',
      studyGuideId: 'sg-school-buses-emergency',
    },
    {
      id: 'rule-card-intersections',
      topic: 'Right-of-Way',
      title: 'Four-Way Stops and Uncontrolled Intersections',
      summary: 'Principles determining vehicle priority when multiple cars approach an intersection without traffic signals.',
      keyPoints: [
        'All-way stop priority: The first vehicle to reach a complete stop has the right-of-way.',
        'Simultaneous arrival: When two vehicles stop at the exact same moment, yield to the vehicle on your right.',
        'Uncontrolled intersection (no signs/lights): Always yield right-of-way to the vehicle approaching from your right.',
        'Left-turning drivers must yield to oncoming through-traffic and pedestrians.',
      ],
      penalty: 'Failing to yield right-of-way carries fines and demerit points under the Highway Traffic Act.',
      studyGuideId: 'sg-intersections',
    },
    {
      id: 'rule-card-roundabouts',
      topic: 'Right-of-Way',
      title: 'Roundabout Navigation',
      summary: 'Ontario roundabouts flow strictly counter-clockwise. Circulating traffic holds absolute right-of-way.',
      keyPoints: [
        'Vehicles already circulating inside the roundabout have the right-of-way.',
        'Entering vehicles must yield to all traffic approaching from their left.',
        'Never change lanes or stop inside a roundabout.',
        'Signal right prior to exiting.',
      ],
      penalty: 'Improper turn or lane change infractions carry demerit penalties.',
      studyGuideId: 'sg-intersections',
    },
    {
      id: 'rule-card-g1-restrictions',
      topic: 'G1 Licensing Rules',
      title: 'Level One (Class G1) Driving Conditions',
      summary: 'Mandatory conditions governing all novice drivers holding a Class G1 learner licence.',
      keyPoints: [
        'Zero Alcohol & Drugs: 0.00% blood alcohol concentration at all times when operating a vehicle.',
        'Accompanying Driver: Must be accompanied by a Class G driver with at least 4 years experience who meets legal BAC thresholds.',
        'Curfew: Prohibited from driving between midnight (12:00 a.m.) and 5:00 a.m.',
        'High-Speed Highways: No driving on 400-series highways or expressways unless accompanied by a certified driving instructor.',
        'Seatbelts: No more passengers than working seatbelts.',
      ],
      penalty: 'Breach of graduated licensing conditions results in immediate 30-day driver licence suspension.',
      studyGuideId: 'sg-g1-rules-demerits',
    },
    {
      id: 'rule-card-demerit-system',
      topic: 'G1 Licensing Rules',
      title: 'Demerit Points for Novice Drivers',
      summary: 'Ontario uses a progressive demerit point schedule for graduated licensing novice drivers.',
      keyPoints: [
        '2 to 5 Demerit Points: Warning letter issued to the driver.',
        '6 to 8 Demerit Points: Potential mandatory interview and re-examination.',
        '9 or More Demerit Points: Mandatory 60-day licence suspension.',
        'Demerit points remain on your driving record for 2 years from offence date.',
      ],
      penalty: 'Reinstating a suspended licence requires surrender of licence and payment of reinstatement fees.',
      studyGuideId: 'sg-g1-rules-demerits',
    },
    {
      id: 'rule-card-parking-hills',
      topic: 'Parking & Stopping',
      title: 'Parking on Gradients (With and Without Curbs)',
      summary: 'Proper wheel orientation to prevent rolling on sloped roadways.',
      keyPoints: [
        'Downhill with curb: Turn wheels toward the curb (to the right).',
        'Uphill with curb: Turn wheels away from the curb (to the left) and roll back gently until the tire touches the curb.',
        'Uphill or downhill without curb: Always turn wheels to the right (toward the shoulder).',
        'Always set the parking handbrake firmly.',
      ],
      penalty: 'Municipal bylaws govern improper parking and towing.',
      studyGuideId: 'sg-parking-stopping',
    },
    {
      id: 'rule-card-distracted-driving',
      topic: 'Safe Driving & Safety',
      title: 'Distracted Driving Laws in Ontario',
      summary: 'Using or holding handheld electronic devices while driving (even while stopped at red lights) is prohibited.',
      keyPoints: [
        'Novice drivers face substantial statutory fines, demerits, and immediate licence suspension upon conviction.',
        'Touching a handheld phone at a red light constitutes distracted driving under the HTA.',
        'Use hands-free voice technology or leave phones secured out of reach.',
      ],
      penalty: 'Conviction carries substantial statutory fines, 3 demerit points, and suspension for novice drivers.',
      studyGuideId: 'sg-impaired-distracted',
    },
  ];

  const topicsList = ['all', 'School Buses & Emergency', 'Right-of-Way', 'G1 Licensing Rules', 'Parking & Stopping', 'Safe Driving & Safety'];

  const filteredRules = rulesData.filter(item => {
    const matchesTopic = selectedTopic === 'all' || item.topic === selectedTopic;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyPoints.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Driver&apos;s Handbook Reference</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Ontario Rules of the Road
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Key rules regarding right-of-way, school buses, emergency vehicles, speed, and demerits.
          </p>
        </div>

        <button
          onClick={onStartRulesTest}
          className="px-5 py-3 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 active:bg-red-800 transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 self-start md:self-auto focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Rules Practice (20 Qs)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto" role="tablist" aria-label="Rules topic filter">
          {topicsList.map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={selectedTopic === t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTopic === t
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Rules' : t}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, penalties, demerits..."
            aria-label="Search rules"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Rules Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRules.map((rule) => {
          return (
            <div
              key={rule.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {rule.topic}
                </span>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {rule.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rule.summary}
                </p>

                {/* Key Points */}
                <div className="mt-4 space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Statutory Rules:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {rule.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400 font-bold">·</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Penalty & Demerit Warning */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-semibold">Penalties: </strong>
                    <span>{rule.penalty}</span>
                  </div>
                </div>
              </div>

              {onGoToStudyGuideTopic && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => onGoToStudyGuideTopic(rule.studyGuideId)}
                    className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                  >
                    <span>Read Study Guide Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
