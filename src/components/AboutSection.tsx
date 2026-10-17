import React, { useMemo } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Calendar, 
  Info,
  DollarSign,
  Lock,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { QUESTIONS } from '../data/questions';

export const AboutSection: React.FC = () => {
  const statusCounts = useMemo(() => {
    let verified = 0;
    let sourceCited = 0;
    let needsReview = 0;
    for (const q of QUESTIONS) {
      if (q.verificationStatus === 'verified') verified++;
      else if (q.verificationStatus === 'source-cited') sourceCited++;
      else needsReview++;
    }
    return {
      verified,
      sourceCited,
      needsReview,
      total: QUESTIONS.length,
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-10">
      
      {/* Title */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Independent Educational Platform</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          About G1 Ready Ontario
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
          G1 Ready Ontario is an independent educational web application built to help Ontario residents prepare for the Ontario G1 driver&apos;s written knowledge test.
        </p>
      </div>

      {/* Mandatory Independence Statement */}
      <div role="note" className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
          <Info className="w-4 h-4 text-slate-500" />
          <span>Notice of Independence &amp; Non-Affiliation</span>
        </div>
        <p className="leading-relaxed">
          G1 Ready Ontario is an independent educational app. It is not affiliated with, endorsed by, or operated by the Government of Ontario, the Ministry of Transportation, ServiceOntario, or DriveTest. Practice questions are original study material created to assist learners and are not actual examination questions.
        </p>
      </div>

      {/* Official G1 Test Specifications vs Practice Targets */}
      <section aria-labelledby="specs-heading" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <h2 id="specs-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span>Ontario G1 Test Format &amp; App Practice Targets</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The Ontario Class G1 knowledge test is administered in person at DriveTest centres across Ontario.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Traffic Signs Practice Target
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              20 practice questions covering regulatory signs, warning signs, and pavement markings. Practice target: 16/20 (80%).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Rules of the Road Practice Target
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              20 practice questions covering right-of-way, school bus laws, speed, and demerits. Practice target: 16/20 (80%).
            </p>
          </div>
        </div>

        {/* Separating Confirmed Facts from Practice Conventions */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-2">
          <div className="font-bold text-sm text-amber-900 dark:text-amber-100 flex items-center gap-1.5">
            <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>Important Testing Notice: Confirmed Official Facts vs. Practice Conventions</span>
          </div>
          <div className="space-y-1.5 leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              <strong className="text-amber-950 dark:text-amber-200">Confirmed official facts:</strong> The Ontario G1 written test is multiple choice; consists of two or three sections (e.g., one section on signs and one section on rules of the road); requires earning a total score of at least 80% to pass; and typically takes 20 to 30 minutes to complete (source: DriveTest.ca Knowledge Tests).
            </p>
            <p>
              <strong className="text-amber-950 dark:text-amber-200">Unconfirmed / practice conventions:</strong> The exact total question count and per-section question split are not published by DriveTest or ontario.ca. The 40-question (20 signs + 20 rules) structure used throughout this app is an unofficial practice convention designed to target that official 80% pass threshold. Confirm current official testing procedures at <a href="https://drivetest.ca" target="_blank" rel="noreferrer" className="underline font-semibold text-amber-900 dark:text-amber-200">drivetest.ca</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Honest Content Verification System */}
      <section aria-labelledby="verification-heading" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <h2 id="verification-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Honest Content Verification Standards</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          To maintain transparency and prevent misinformation, questions in this app carry an explicit verification status:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shrink-0">
              Verified
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Reserved for questions that have been independently cross-checked directly against authoritative primary Ontario government sources.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
              Source Cited
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The question and explanation cite a named section or chapter of the <em>Official MTO Driver&apos;s Handbook</em> or a provision of the <em>Ontario Highway Traffic Act (HTA)</em>.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 shrink-0">
              Review Ongoing
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The question is undergoing secondary verification against recent legislative amendments and municipal traffic guidelines.
            </p>
          </div>
        </div>

        {/* LIVE Content Verification Status Panel */}
        <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Content Verification Status</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live status counts computed directly from the current question bank at runtime:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Tile 1: Verified */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono-numbers">
                {statusCounts.verified}
              </div>
              <div className="mt-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                Verified
              </div>
            </div>

            {/* Tile 2: Source Cited */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl font-black text-slate-800 dark:text-slate-200 font-mono-numbers">
                {statusCounts.sourceCited}
              </div>
              <div className="mt-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Source-Cited
              </div>
            </div>

            {/* Tile 3: Review Ongoing */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center">
              <div className="text-2xl font-black text-amber-700 dark:text-amber-400 font-mono-numbers">
                {statusCounts.needsReview}
              </div>
              <div className="mt-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Review Ongoing
              </div>
            </div>

            {/* Tile 4: Total Questions */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono-numbers">
                {statusCounts.total}
              </div>
              <div className="mt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Total Questions
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
            <strong>Sources used for the verified set:</strong> Official MTO Driver&apos;s Handbook (ontario.ca), DriveTest.ca Knowledge Tests, ontario.ca &ldquo;Get a G driver&apos;s licence: new drivers&rdquo;, ontario.ca &ldquo;Driving near emergency vehicles, tow trucks and work vehicles&rdquo;, and ontario.ca &ldquo;Understanding demerit points&rdquo;.
          </p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Content review is continuous. If you believe any rule or explanation differs from current provincial laws, please verify directly with the Official Handbook.
        </p>
      </section>

      {/* Advertising Readiness & Developer Setup */}
      <section aria-labelledby="ads-heading" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 id="ads-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Advertising &amp; Publisher Configuration</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          This application integrates standard Google AdSense display units in designated locations (bottom of Home, between study guide topics, on test results, and bottom of road signs catalog). By default, ads are completely disabled and render nothing.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-white block">
            How to Enable Google AdSense:
          </span>
          <ol className="list-decimal pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li>Obtain approval for your domain in your Google AdSense account.</li>
            <li>Add your authorized seller entry into <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded">public/ads.txt</code>.</li>
            <li>In <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded">src/config/ads.ts</code>, replace <code className="font-mono">ADSENSE_CLIENT_ID</code> with your real publisher ID (e.g., <code className="font-mono">ca-pub-1234567890123456</code>).</li>
            <li>Replace the slot IDs in <code className="font-mono">AD_SLOTS</code> with your active ad unit IDs.</li>
            <li>Set <code className="font-mono">ADS_ENABLED = true</code> in <code className="font-mono">src/config/ads.ts</code>.</li>
          </ol>
        </div>

        <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <Lock className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
          <p>
            <strong>Privacy Note: </strong> G1 Ready Ontario does not collect personal information, user accounts, or telemetry. When Google AdSense is enabled by the publisher, Google and third-party vendors may use cookies to serve ads based on prior visits to this or other websites.
          </p>
        </div>
      </section>

      {/* Official Links */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">
            Official Ontario Resources
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Always verify test requirements and handbook changes at official portals.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://www.ontario.ca/document/official-mto-drivers-handbook"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
          >
            <span>MTO Handbook Online</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://drivetest.ca"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
          >
            <span>DriveTest.ca</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
};
