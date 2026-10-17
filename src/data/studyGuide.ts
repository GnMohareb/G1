import { StudyGuideSection } from '../types';

export const STUDY_GUIDE_SECTIONS: StudyGuideSection[] = [
  {
    id: 'sg-signs-signals',
    title: 'Traffic Signs and Signals',
    category: 'signs',
    summary: 'Ontario traffic signs fall into three main categories: Regulatory (usually rectangular or square with white or black background, with black, white or coloured letters), Warning (usually diamond-shaped with a yellow background and black letters or symbols), and Information (usually rectangular with a green background and white letters).',
    officialReference: 'MTO Driver\'s Handbook, "Signs"',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/signs',
    keyRules: [
      'Stop sign: It means you must come to a complete stop before the stop line, crosswalk, or intersection.',
      'Yield sign: It means you must let traffic in the intersection or close to it go first; stop if necessary.',
      'Do Not Enter sign: It means do not enter this road from this direction.',
      'Keep Right / Traffic Island sign: Keep to the right of the traffic island or upcoming roadway obstruction.',
      'School zone sign: Five-sided and has a fluorescent yellow/green background with black symbols.',
      'HOV lane sign: Designated with a white diamond symbol; only public vehicles such as buses, or passenger vehicles carrying a specified minimum number of passengers.',
      'Speed signs: Obey the posted maximum speed limit. Where no limit is posted, the maximum speed is 50 km/h in cities, towns and villages, and 80 km/h elsewhere.',
      'Transit priority signals display a vertical white bar on a dark disc, permitting buses or streetcars to proceed first.'
    ],
    penaltiesOrFines: [
      'Failing to obey a stop sign: 3 demerit points under Ontario law.',
      'Disobeying signs in designated zones carries statutory fines and provincial demerit penalties.'
    ],
    proTips: [
      'School zones and construction zones often have lower speed limits.',
      'Signs with fluorescent yellow-green color are reserved exclusively for school areas.'
    ],
    relatedQuestionIds: ['sign-01', 'sign-02', 'sign-03', 'sign-09', 'sign-10', 'sign-11', 'sign-23', 'sign-58']
  },
  {
    id: 'sg-intersections',
    title: 'Intersections and Right-of-Way',
    category: 'rules',
    summary: 'Mastering right-of-way at all-way stops, uncontrolled intersections, and modern multi-lane roundabouts is essential for safe driving and passing the G1 test.',
    officialReference: 'Official MTO Driver\'s Handbook: Driving Through Intersections',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections',
    keyRules: [
      'At an all-way stop, the first vehicle to come to a complete stop has priority.',
      'If two vehicles arrive and stop at an all-way stop at the same time, the driver on the right has the right-of-way.',
      'At an uncontrolled intersection (no signs or traffic lights), yield to the vehicle approaching from your right.',
      'When making a left turn, you must yield to oncoming traffic and pedestrians crossing.',
      'In a roundabout, traffic already circulating inside has right-of-way over vehicles entering. All traffic moves counter-clockwise.'
    ],
    penaltiesOrFines: [
      'Careless driving: 6 demerit points under Ontario law.',
      'Failing to yield right-of-way carries statutory fines and provincial demerit points.'
    ],
    proTips: [
      'Keep your front wheels straight when waiting in an intersection to make a left turn. If struck from behind, you will not be pushed into oncoming traffic.',
      'Never change lanes inside an intersection or roundabout.'
    ],
    relatedQuestionIds: ['rule-08', 'rule-09', 'rule-10', 'rule-28', 'sign-19']
  },
  {
    id: 'sg-speed-distance',
    title: 'Speed and Following Distances',
    category: 'rules',
    summary: 'Ontario speed limits require obeying posted maximums under ideal conditions. Where unposted, statutory limits apply, and drivers must maintain a safe following distance.',
    officialReference: 'MTO Driver\'s Handbook, "Driving along"',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving',
    keyRules: [
      'Where no limit is posted, the maximum speed is 50 km/h in cities, towns and villages.',
      'Where no limit is posted, the maximum speed is 80 km/h elsewhere.',
      'A safe following distance is at least two seconds behind the vehicle in front of you.',
      'School zones and construction zones often have lower speed limits.',
      'The handbook does not state a single blanket highway maximum; drivers must obey the posted limit.'
    ],
    penaltiesOrFines: [
      'Following too closely: 4 demerit points under Ontario law.',
      'Speeding 16 to 29 km/h over the posted limit: 3 demerit points.',
      'Speeding 30 to 49 km/h over the posted limit: 4 demerit points.',
      'Speeding 50 km/h or more over the posted limit: 6 demerit points.'
    ],
    proTips: [
      'Use the two-second rule: Pick a stationary marker ahead. When the vehicle ahead passes it, count "one thousand and one, one thousand and two". If you reach the marker before finishing, you are following too closely.'
    ],
    relatedQuestionIds: ['sign-09', 'rule-14', 'rule-15', 'rule-16', 'rule-20']
  },
  {
    id: 'sg-lane-changes-turning',
    title: 'Lane Changes and Turning',
    category: 'rules',
    summary: 'Proper signal timing, mirror checks, and shoulder blind-spot checks prevent collisions during lane changes and turns.',
    officialReference: 'Official MTO Driver\'s Handbook: Changing Positions & Turns',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/changing-positions',
    keyRules: [
      'Always signal your intention well before braking or initiating a lane change.',
      'Execute mirror checks, signal, and head shoulder checks into your blind spot every time you change lanes.',
      'Right turns on red are permitted in Ontario after coming to a complete stop and yielding to pedestrians and oncoming traffic, unless prohibited by a posted sign.',
      'Solid single or double yellow lines indicate no passing zones.',
      'Broken white lines divide lanes travelling in the same direction.'
    ],
    penaltiesOrFines: [
      'Failing to signal: 2 demerit points under Ontario law.',
      'Improper passing: 3 demerit points under Ontario law.'
    ],
    proTips: [
      'Rearview and side mirrors leave blind spots beside your vehicle. Always turn your head to check your blind spot through the side window.'
    ],
    relatedQuestionIds: ['sign-04', 'sign-05', 'sign-06', 'sign-32', 'sign-33', 'rule-26', 'rule-27', 'rule-28']
  },
  {
    id: 'sg-parking-stopping',
    title: 'Parking and Stopping',
    category: 'rules',
    summary: 'Rules for hill parking, curb angles, and stopping distances from fire hydrants, crosswalks, and emergency routes.',
    officialReference: 'Official MTO Driver\'s Handbook: Parking',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/parking',
    keyRules: [
      'Downhill with a curb: Turn your front wheels to the right (toward the curb).',
      'Uphill with a curb: Turn your front wheels to the left (away from the curb) and let vehicle roll back gently until the tire touches the curb.',
      'Uphill or downhill without a curb: Always turn front wheels to the right (toward the shoulder).',
      'Minimum legal distance to park from a fire hydrant: 3 metres.',
      'Never stop in a designated No Stopping zone, even briefly to drop off passengers.'
    ],
    penaltiesOrFines: [
      'Parking illegally near hydrants or fire routes carries municipal fines and potential vehicle towing.',
      'Parking in accessible spaces without a valid permit carries severe statutory fines.'
    ],
    proTips: [
      'Always engage your parking brake firmly whenever parking on any incline or decline.'
    ],
    relatedQuestionIds: ['sign-07', 'sign-08', 'rule-11', 'rule-12', 'rule-13']
  },
  {
    id: 'sg-school-buses-emergency',
    title: 'School Buses and Emergency Vehicles',
    category: 'rules',
    summary: 'Ontario enforces strict laws regarding stopped school buses and approaching emergency vehicles, tow trucks, and work vehicles.',
    officialReference: 'ontario.ca, "Driving near emergency vehicles, tow trucks and work vehicles"',
    officialUrl: 'https://www.ontario.ca/page/driving-near-emergency-vehicles-tow-trucks-and-work-vehicles',
    keyRules: [
      'Flashing amber lights on school bus: The bus is about to stop; slow down and prepare to stop, whether behind or approaching.',
      'Red lights flashing or stop arm out: You must stop whether you are behind or approaching the bus.',
      'Divided road: If on a roadway with a median strip, only vehicles approaching from the rear of the bus must stop.',
      'Stopping distance behind school bus: Stop at least 20 metres away. Resume only when the bus moves, red lights stop flashing, and stop arm is retracted.',
      'Approaching emergency vehicle: Slow down, signal, move to the right side of the road, clear of any intersection, then stop.',
      'Passing stopped emergency vehicle or tow truck (Move Over): Slow down and pass with caution; on roads with two or more lanes, leave a lane of space if you can do so safely.',
      'Move Over coverage: Covers emergency vehicles and tow trucks. Starting January 1, 2027, the rules also cover stopped work vehicles with flashing amber lights.'
    ],
    penaltiesOrFines: [
      'Failing to stop for a school bus: 6 demerit points and statutory fines under Ontario law.',
      'Move Over first offence: Fines ranging from $400 to $2,000, 3 demerit points if convicted, and possible suspension of driver\'s licence for up to 2 years.'
    ],
    proTips: [
      'Never pass a school bus with red lights flashing or stop arm extended under any circumstances.'
    ],
    relatedQuestionIds: ['rule-01', 'rule-02', 'rule-03', 'rule-29', 'rule-59']
  },
  {
    id: 'sg-pedestrians-cyclists',
    title: 'Pedestrians and Cyclists',
    category: 'rules',
    summary: 'Protecting vulnerable road users is a legal requirement in Ontario. Pedestrian crossovers and passing cyclists carry specific statutory duties.',
    officialReference: 'MTO Driver\'s Handbook, "Sharing the road with other road users"',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/sharing-the-road-other-road-users',
    keyRules: [
      'At pedestrian crossovers, drivers must yield to pedestrians and wait until pedestrians have completely crossed.',
      'Passing a cyclist: Drivers of motor vehicles must maintain a minimum distance of one metre, where practical.',
      'Check your blind spot for cyclists before turning right across a bicycle lane or opening vehicle doors.',
      'Yield to pedestrians crossing on green lights before executing turns.'
    ],
    penaltiesOrFines: [
      'Failing to stop at a pedestrian crossover: 4 demerit points under Ontario law.',
      'Passing a cyclist without maintaining one metre distance: Failing to do so may bring a fine and 2 additional demerit points.'
    ],
    proTips: [
      'Cyclists may legally occupy the full travel lane when required for their safety to navigate road hazards.'
    ],
    relatedQuestionIds: ['sign-11', 'sign-21', 'sign-27', 'rule-23', 'rule-24']
  },
  {
    id: 'sg-highway-driving',
    title: 'Highway and Freeway Driving',
    category: 'rules',
    summary: 'Mastering acceleration lanes, deceleration ramps, HOV lanes, and multi-lane flow on Ontario expressways.',
    officialReference: 'Official MTO Driver\'s Handbook: Freeway Driving',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving',
    keyRules: [
      'Use the acceleration lane on freeway on-ramps to build speed to match the prevailing traffic before merging.',
      'HOV lanes are reserved for: Only public vehicles such as buses, or passenger vehicles carrying a specified minimum number of passengers.',
      'Keep right except to pass on multi-lane highways; do not stay continuously in the leftmost passing lane.',
      'If you miss your highway exit, continue to the next exit; never reverse or make a U-turn across median dividers.'
    ],
    penaltiesOrFines: [
      'Improper passing: 3 demerit points under Ontario law.',
      'Reversing or making illegal turns on controlled highways carries statutory fines and demerits.'
    ],
    proTips: [
      'By law, an Ontario G1 driver must not drive on 400-series highways or high-speed expressways, unless accompanied by an Ontario-certified driving instructor.'
    ],
    relatedQuestionIds: ['sign-10', 'sign-17', 'sign-18', 'sign-23', 'rule-06', 'rule-30']
  },
  {
    id: 'sg-sharing-the-road',
    title: 'Sharing the Road with Large Commercial Vehicles and Transit',
    category: 'rules',
    summary: 'Large transport trucks and public transit vehicles have wide turning radii, extensive blind spots, and longer stopping distances.',
    officialReference: 'Official MTO Driver\'s Handbook: Sharing the Road',
    officialUrl: 'https://www.ontario.ca/document/official-mto-drivers-handbook/sharing-the-road-other-road-users',
    keyRules: [
      'Transport trucks have large blind spots directly in front, behind, and along both sides. If you cannot see the driver\'s side mirrors, they cannot see you.',
      'When stopped behind a streetcar without a safety island, stop behind the rearmost open door until passengers have safely boarded or reached the curb.',
      'Never cut in closely ahead of a large truck; commercial trucks require much longer stopping distances than passenger cars.',
      'Yield to municipal buses signaling to leave a bus bay and re-enter traffic.'
    ],
    penaltiesOrFines: [
      'Careless driving around transit or commercial vehicles: 6 demerit points under Ontario law.',
      'Improper passing around streetcars and buses carries statutory fines and demerits.'
    ],
    proTips: [
      'Commercial trucks make wide turns and may swing wide before turning. Never attempt to pass on the curb side of a turning truck.'
    ],
    relatedQuestionIds: ['sign-25', 'rule-34']
  },
  {
    id: 'sg-impaired-distracted',
    title: 'Impaired, Distracted, and Unsafe Driving',
    category: 'rules',
    summary: 'Ontario enforces strict zero-tolerance rules for novice drivers, criminal penalties for impaired driving, and distracted driving sanctions.',
    officialReference: 'ontario.ca, "Get a G driver\'s licence: new drivers"',
    officialUrl: 'https://www.ontario.ca/page/get-g-drivers-licence-new-drivers',
    keyRules: [
      'By law, a G1 driver must: maintain a zero blood alcohol level (no alcohol in your blood).',
      'The accompanying driver must have a blood alcohol level of less than .05 (if 21 and under, zero blood alcohol).',
      'Using handheld phones or devices while driving is illegal in Ontario, even while stopped at red traffic lights.',
      'Failing to remain at the scene of a collision carries 7 demerit points under Ontario law.',
      'Failing to stop when signalled or asked by a police officer carries 7 demerit points.'
    ],
    penaltiesOrFines: [
      'Failing to remain at the scene of a collision: 7 demerit points.',
      'Failing to stop when signalled by a police officer: 7 demerit points.',
      'Novice driver alcohol breach results in immediate roadside suspension and licence sanctions.'
    ],
    proTips: [
      'Keep your mobile phone on Do Not Disturb or out of reach while driving to avoid cognitive distraction.'
    ],
    relatedQuestionIds: ['rule-04', 'rule-21', 'rule-22', 'rule-31', 'rule-32', 'rule-35']
  },
  {
    id: 'sg-g1-rules-demerits',
    title: 'G1 Licensing Conditions & Demerit Points',
    category: 'rules',
    summary: 'Full statutory requirements for Ontario Class G1 drivers, accompanying driver rules, curfew, and demerit point accumulation thresholds.',
    officialReference: 'ontario.ca, "Understanding demerit points" & "Get a G driver\'s licence"',
    officialUrl: 'https://www.ontario.ca/page/understanding-demerit-points',
    keyRules: [
      'Maintain a zero blood alcohol level (no alcohol in your blood).',
      'Make sure every passenger with you wears a properly working seatbelt.',
      'Not drive between midnight and 5 a.m.',
      'Not drive on 400-series highways or high-speed expressways (exception: with an Ontario-certified driving instructor, you may drive on any road).',
      'Drive with a fully licensed driver who has at least four years of driving experience and a blood alcohol level of less than .05 (zero if 21 and under).',
      'The driver accompanying you must be the only other person in the front seat.',
      'In most cases, you practice with your G1 licence for 12 months (first road test after 8 months with an approved driver education course; up to five years to finish whole process).'
    ],
    penaltiesOrFines: [
      'Novice driver (G1, G2, M1, M2) thresholds: 2 to 5 points = warning letter; 6 to 8 points = second warning letter; 9 or more points = licence suspended for 60 days.',
      'Points remain on the record for two years from the offence date.',
      '7 points: failing to remain at the scene of a collision; failing to stop when signalled or asked by a police officer.',
      '6 points: careless driving; racing; failing to stop for a school bus.',
      '4 points: following too closely; failing to stop at a pedestrian crossover.',
      '3 points: failing to obey a stop sign; improper passing.',
      '2 points: failing to signal; driver failing to wear a seat belt.'
    ],
    proTips: [
      'Remember: Demerit points are added to your record upon conviction and remain for exactly two years from the offence date.'
    ],
    relatedQuestionIds: ['rule-04', 'rule-05', 'rule-06', 'rule-07', 'rule-14', 'rule-15', 'rule-20', 'rule-21', 'rule-25', 'rule-31', 'rule-51', 'rule-52', 'rule-53']
  }
];
