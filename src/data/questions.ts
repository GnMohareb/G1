import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // =========================================================================
  // SECTION 1: ONTARIO ROAD SIGNS & PAVEMENT MARKINGS (60 QUESTIONS)
  // =========================================================================
  {
    id: 'sign-01',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'When approaching this red octagonal sign at an intersection, what is required by Ontario law?',
    options: [
      'Slow down and proceed if no other vehicles are approaching.',
      'Come to a complete stop before the stop line or crosswalk, and yield right-of-way before proceeding.',
      'Stop only if cross-traffic or pedestrians are visible.',
      'Slow to 10 km/h and proceed if clear.'
    ],
    correctAnswer: 1,
    explanation: 'A stop sign is a regulatory sign requiring vehicles to come to a complete stop. You must come to a complete stop and yield right-of-way to traffic and pedestrians before proceeding.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'stop'
  },
  {
    id: 'sign-02',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What action does this downward-pointing triangular sign require?',
    options: [
      'Stop completely in all situations.',
      'Slow down and let traffic in the intersection or close to it go first; stop if necessary.',
      'Speed up to merge before other cars reach the merge point.',
      'Maintain cruising speed because your lane has priority.'
    ],
    correctAnswer: 1,
    explanation: 'A yield sign means you must let traffic in the intersection or close to it go first. Slow down and stop if necessary to give way.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'yield'
  },
  {
    id: 'sign-03',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does this red circle with a horizontal white bar signify?',
    options: [
      'Authorized vehicles only.',
      'Do not enter this road, ramp, or lane.',
      'Dead end street ahead.',
      'Yield to oncoming vehicles.'
    ],
    correctAnswer: 1,
    explanation: 'The Do Not Enter sign means: "Do not enter this road." It forbids vehicles from entering from that direction because traffic flows toward you.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'do_not_enter'
  },
  {
    id: 'sign-04',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does an arrow with a red circle and diagonal slash indicate?',
    options: [
      'The indicated movement is permitted.',
      'The action or turn shown by the symbol is prohibited.',
      'Caution is advised when turning.',
      'The turn is permitted only during off-peak hours.'
    ],
    correctAnswer: 1,
    explanation: 'In Ontario traffic signage, a red circle with a diagonal slash always signifies prohibition — the movement depicted by the underlying arrow or symbol is not permitted.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'no_left_turn'
  },
  {
    id: 'sign-05',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does this sign prohibiting right turns mean?',
    options: [
      'Right turn permitted after stopping.',
      'You are not permitted to make a right turn at this location.',
      'Right lane must turn right.',
      'Right turn permitted on green light only.'
    ],
    correctAnswer: 1,
    explanation: 'A right-pointing arrow crossed by a red prohibition circle forbids drivers from executing a right turn at that intersection or driveway.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'no_right_turn'
  },
  {
    id: 'sign-06',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does this sign showing a curved U-arrow with a red slash indicate?',
    options: [
      'No curve in the road ahead.',
      'No U-turns are permitted in this intersection or roadway section.',
      'No reversing on the shoulder.',
      'No parking permitted.'
    ],
    correctAnswer: 1,
    explanation: 'The U-turn prohibition sign forbids making a 180-degree turn to reverse your direction of travel.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'no_u_turn'
  },
  {
    id: 'sign-07',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a sign showing a red circle with a slash through the letter "P" mean?',
    options: [
      'Paid parking zone.',
      'No parking in the designated area.',
      'Pedestrians not allowed.',
      'Police station ahead.'
    ],
    correctAnswer: 1,
    explanation: 'A red circle and diagonal slash across the letter "P" means No Parking. You may temporarily pause to load or unload passengers or goods quickly, but you cannot park unattended.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Parking Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'no_parking'
  },
  {
    id: 'sign-08',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a sign with a red "X" across a red circle signify on Ontario roadways?',
    options: [
      'Intersection ahead.',
      'No stopping at any time, even momentarily to pick up or drop off passengers.',
      'Level railway crossing.',
      'Dead end street.'
    ],
    correctAnswer: 1,
    explanation: 'The red "X" in a red circle indicates a No Stopping zone. Drivers must not stop their vehicle for any reason, except when complying with traffic signals or police officers.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'no_stopping'
  },
  {
    id: 'sign-09',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does the "MAXIMUM 50" sign mean on an Ontario street?',
    options: [
      'Minimum driving speed is 50 km/h.',
      'The maximum legal speed under ideal conditions is 50 km/h.',
      'Recommended speed during bad weather.',
      'Speed limit applies only on school days.'
    ],
    correctAnswer: 1,
    explanation: 'The MAXIMUM 50 sign designates the legal maximum speed of 50 km/h. Where no speed limit is posted in cities, towns and villages, 50 km/h is the statutory maximum.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Driving along"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'maximum_50'
  },
  {
    id: 'sign-10',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a white rectangular sign showing a roadway obstruction and a right-curving arrow mean?',
    options: [
      'Right lane must turn right.',
      'Keep to the right of the traffic island or obstruction.',
      'Passing on the right is mandatory.',
      'Divided highway ends ahead.'
    ],
    correctAnswer: 1,
    explanation: 'The Keep Right sign means: "Keep to the right of the traffic island." Drivers must navigate to the right of the upcoming median or island.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'keep_right'
  },
  {
    id: 'sign-11',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a fluorescent yellow-green five-sided (pentagon) sign indicate?',
    options: [
      'Pedestrian crossing on rural highway.',
      'School zone sign: five-sided with fluorescent yellow/green background; slow down and watch for children.',
      'Park entrance ahead.',
      'Daycare bus stop.'
    ],
    correctAnswer: 1,
    explanation: 'A school zone sign is five-sided and has a fluorescent yellow/green background with black symbols. School zones often have lower posted speed limits.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'school_zone'
  },
  {
    id: 'sign-12',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a vertical traffic signal box (red, amber, green) mean?',
    options: [
      'Traffic light signals are broken.',
      'Traffic control signals ahead; be prepared to slow down or stop.',
      'Fire station emergency exit.',
      'Railway crossing ahead.'
    ],
    correctAnswer: 1,
    explanation: 'This advance warning sign alerts motorists that traffic control lights are situated ahead, providing advance notice where signals may not be immediately visible.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'traffic_signal_ahead'
  },
  {
    id: 'sign-13',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign showing a red octagon with an arrow above it indicate?',
    options: [
      'Red light camera ahead.',
      'Stop sign ahead; be prepared to stop your vehicle.',
      'Heavy construction zone.',
      'Toll station ahead.'
    ],
    correctAnswer: 1,
    explanation: 'This sign warns drivers that a stop sign is located ahead, allowing drivers time to reduce speed before reaching the intersection.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'stop_sign_ahead'
  },
  {
    id: 'sign-14',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign showing a car and skid tracks underneath represent?',
    options: [
      'Racing circuit area.',
      'Roadway surface is slippery when wet; reduce speed and avoid sudden maneuvers.',
      'Brake test area ahead.',
      'Curved hill ahead.'
    ],
    correctAnswer: 1,
    explanation: 'The "Slippery When Wet" warning indicates that traction on this section of pavement drops substantially during rain, snow, or ice.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'slippery_when_wet'
  },
  {
    id: 'sign-15',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a median barrier at the top and diverging arrows indicate?',
    options: [
      'Two-way traffic ahead.',
      'Divided highway begins ahead; keep to the right of the median divider.',
      'Divided highway ends ahead.',
      'Narrow bridge ahead.'
    ],
    correctAnswer: 1,
    explanation: 'When the solid barrier symbol appears at the top between diverging arrows, it indicates a divided highway begins ahead. Keep right.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'divided_highway_begins'
  },
  {
    id: 'sign-16',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a median barrier at the bottom and converging arrows mean?',
    options: [
      'Divided highway begins.',
      'Divided highway ends ahead; road resumes as two-way undivided traffic.',
      'Highway exit ahead.',
      'Express and collector merge.'
    ],
    correctAnswer: 1,
    explanation: 'When the barrier symbol is at the bottom with converging arrows, the divided highway ends and two-way opposing traffic resumes on an undivided road.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'divided_highway_ends'
  },
  {
    id: 'sign-17',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a sign showing a vertical arrow with another arrow entering from the right indicate?',
    options: [
      'Two lanes are turning right.',
      'Traffic from another road or ramp is merging into your roadway; adjust spacing.',
      'Sharp right turn ahead.',
      'Exit ramp on the right.'
    ],
    correctAnswer: 1,
    explanation: 'The merge warning sign indicates incoming traffic from an on-ramp or another road will be merging with through-traffic.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'merge'
  },
  {
    id: 'sign-18',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a straight line on the left and a line curving inward on the right mean?',
    options: [
      'Left lane ends.',
      'Right lane ends ahead; drivers in the right lane must merge safely to the left.',
      'Narrow shoulders on both sides.',
      'Passing lane ahead.'
    ],
    correctAnswer: 1,
    explanation: 'The "Lane Ends" sign warns motorists that the right lane is ending and vehicles in that lane must safely merge left.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'lane_ends'
  },
  {
    id: 'sign-19',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign displaying counter-clockwise circular arrows indicate?',
    options: [
      'Hairpin turn ahead.',
      'Roundabout ahead; slow down and prepare to yield to circulating traffic.',
      'No turning back.',
      'Cul-de-sac ahead.'
    ],
    correctAnswer: 1,
    explanation: 'This sign warns of an upcoming roundabout. In Ontario roundabouts, all traffic moves counter-clockwise and entering drivers must yield.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Intersections: Roundabouts",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'roundabout_ahead'
  },
  {
    id: 'sign-20',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow warning sign showing a leaping deer silhouette mean?',
    options: [
      'Horseback trail ahead.',
      'Deer crossing area; scan road edges, particularly at dusk and dawn.',
      'Provincial park entrance.',
      'Hunting area.'
    ],
    correctAnswer: 1,
    explanation: 'This sign marks an area where deer frequently cross the roadway. Deer often move at dusk and dawn and travel in groups.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'deer_crossing'
  },
  {
    id: 'sign-21',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a sign showing a child playing with a ball indicate?',
    options: [
      'Sports stadium ahead.',
      'Playground area ahead; drive with extra caution and watch for children entering the roadway.',
      'Bicycle path crossing.',
      'Pedestrian walkway closed.'
    ],
    correctAnswer: 1,
    explanation: 'The playground warning sign alerts drivers that an outdoor recreational playground is nearby and young children may run into the road.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'playground_ahead'
  },
  {
    id: 'sign-22',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow warning diamond with a bold black plus sign (+) mean?',
    options: [
      'Hospital ahead.',
      'Crossroad intersection ahead; watch for vehicles entering or crossing.',
      'First aid post.',
      'Divided highway interchange.'
    ],
    correctAnswer: 1,
    explanation: 'A bold plus symbol (+) on a warning sign indicates a crossroad ahead where cross-traffic intersects your route.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'hidden_intersection'
  },
  {
    id: 'sign-23',
    category: 'signs',
    topic: 'Information & HOV Signs',
    question: 'What vehicles are permitted to use High Occupancy Vehicle (HOV) lanes marked by signs with a white diamond?',
    options: [
      'Any vehicle during weekend hours.',
      'Only public vehicles such as buses, or passenger vehicles carrying a specified minimum number of passengers.',
      'Commercial transport trucks with heavy cargo.',
      'Any vehicle travelling faster than 100 km/h.'
    ],
    correctAnswer: 1,
    explanation: 'Under the MTO Driver\x27s Handbook, an HOV lane is reserved for: "Only public vehicles such as buses, or passenger vehicles carrying a specified minimum number of passengers."',
    difficulty: 'medium',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15',
    signType: 'hov_lane'
  },
  {
    id: 'sign-24',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a white sign showing an arrow inside a green circle indicate?',
    options: [
      'Movement is mandatory.',
      'The movement shown by the arrow is permitted.',
      'Speed up through intersection.',
      'Right of way for pedestrians only.'
    ],
    correctAnswer: 1,
    explanation: 'A green circle indicates permission: you are allowed to make the turn or movement indicated by the symbol inside the circle.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'green_arrow_turn'
  },
  {
    id: 'sign-25',
    category: 'signs',
    topic: 'Traffic Signals',
    question: 'What does a traffic light showing an illuminated vertical white bar on a dark background mean?',
    options: [
      'All traffic may proceed straight.',
      'Transit priority signal allowing public transit vehicles (buses/streetcars) to proceed first.',
      'Pedestrian crosswalk active.',
      'Ramp meter signal.'
    ],
    correctAnswer: 1,
    explanation: 'A vertical white bar on a circular traffic signal head is a transit priority signal allowing public buses and streetcars to proceed before regular traffic.',
    difficulty: 'hard',
    sourceReference: "Official MTO Driver's Handbook - Traffic Lights: Transit Signals",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'transit_priority_signal'
  },
  {
    id: 'sign-26',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does the Canadian railway crossing crossbuck sign mean?',
    options: [
      'Overhead bridge ahead.',
      'Railway tracks cross the roadway at this location; yield to trains and stop if signals activate.',
      'No pedestrian crossing.',
      'Inactive rail line.'
    ],
    correctAnswer: 1,
    explanation: 'The X-shaped crossbuck with "RAILWAY CROSSING" indicates an at-grade rail crossing where trains cross the roadway.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Railway Crossings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'railway_crossing'
  },
  {
    id: 'sign-27',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a warning sign showing a bicycle on a yellow diamond indicate?',
    options: [
      'Bicycles prohibited on this roadway.',
      'Share the road with cyclists; maintain a safe distance when passing.',
      'Bicycle repair station ahead.',
      'Electric bicycles only.'
    ],
    correctAnswer: 1,
    explanation: 'This sign reminds motorists that bicycles frequently use the road and drivers must share the road safely.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Sharing the Road: Cyclists",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'share_the_road'
  },
  {
    id: 'sign-28',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a serpentine wavy arrow mean?',
    options: [
      'Roundabout ahead.',
      'Winding road ahead with a series of continuous sharp curves; reduce speed.',
      'Road closed ahead.',
      'Wet road conditions.'
    ],
    correctAnswer: 1,
    explanation: 'The winding road sign alerts drivers to a sequence of consecutive curves ahead. Drivers should moderate their speed.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'winding_road'
  },
  {
    id: 'sign-29',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a 90-degree sharp right angled arrow indicate?',
    options: [
      'Right turn only.',
      'Sharp curve or bend to the right ahead; reduce speed before entering the turn.',
      'Detour route.',
      'Passing lane ahead.'
    ],
    correctAnswer: 1,
    explanation: 'A 90-degree arrow on a warning sign indicates a sharp bend in the road ahead requiring significant speed reduction before entering.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'sharp_curve_right'
  },
  {
    id: 'sign-30',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a white rectangular sign with a black arrow pointing in one direction signify?',
    options: [
      'Only one passenger allowed.',
      'Traffic moves only in the direction of the arrow; do not drive against it.',
      'One lane bridge ahead.',
      'Mandatory detour.'
    ],
    correctAnswer: 1,
    explanation: 'The one-way sign directs that vehicular traffic flows solely in the direction indicated by the arrow.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'one_way_right'
  },
  {
    id: 'sign-31',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a white rectangular sign reading "PASS WITH CARE" mean on a two-lane road?',
    options: [
      'Passing allowed on shoulder.',
      'You are entering a section where passing is legally permitted if oncoming traffic is clear.',
      'Must pass immediately.',
      'Passing strictly prohibited.'
    ],
    correctAnswer: 1,
    explanation: 'The "Pass With Care" sign marks the end of a no-passing zone, indicating drivers may pass slower vehicles when oncoming lanes are clear and safe.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'pass_with_care'
  },
  {
    id: 'sign-32',
    category: 'signs',
    topic: 'Pavement Markings',
    question: 'What does a solid yellow line on your side of the centre broken yellow line mean?',
    options: [
      'Passing is permitted at any time.',
      'Passing is unsafe and prohibited from your lane of travel.',
      'Turn right at next driveway.',
      'Speed limit increases.'
    ],
    correctAnswer: 1,
    explanation: 'A solid yellow line on your side of the centre line means it is unsafe and illegal to pass from your direction because sight distance is limited.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Pavement Markings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-33',
    category: 'signs',
    topic: 'Pavement Markings',
    question: 'What does a broken white line between travel lanes indicate?',
    options: [
      'Traffic travelling in opposite directions.',
      'Lanes travelling in the same direction; you may change lanes when safe to do so.',
      'Lane changes are prohibited.',
      'Lane is reserved for transit only.'
    ],
    correctAnswer: 1,
    explanation: 'Broken white lines separate traffic lanes moving in the same direction. Lane changes are allowed after checking mirrors and signaling.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Pavement Markings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-34',
    category: 'signs',
    topic: 'Traffic Signals',
    question: 'When approaching an intersection with a flashing red traffic light, what must you do?',
    options: [
      'Slow down and proceed through without stopping.',
      'Come to a complete stop, yield right-of-way, and proceed when clear (treat as a stop sign).',
      'Turn around; street is closed.',
      'Wait for a solid green light.'
    ],
    correctAnswer: 1,
    explanation: 'A flashing red light has the exact legal effect of a stop sign: you must come to a full stop before entering the crosswalk or intersection.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Traffic Lights: Flashing Lights",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-35',
    category: 'signs',
    topic: 'Traffic Signals',
    question: 'When approaching an intersection with a flashing amber light, what is required?',
    options: [
      'Come to a full stop.',
      'Slow down and proceed through with caution.',
      'Speed up to beat cross traffic.',
      'Yield to oncoming left turns only.'
    ],
    correctAnswer: 1,
    explanation: 'A flashing amber (yellow) light warns drivers to slow down and proceed through the intersection with caution.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Traffic Lights: Flashing Lights",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-36',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a "DO NOT PASS" sign mean on a two-lane highway?',
    options: [
      'Passing allowed if the vehicle ahead is travelling under the speed limit.',
      'Passing any vehicle travelling in your direction is prohibited.',
      'Passing is prohibited only for trucks.',
      'Passing is allowed only on curves.'
    ],
    correctAnswer: 1,
    explanation: 'A regulatory "DO NOT PASS" sign marks the beginning of a zone where passing other vehicles travelling in your direction is strictly prohibited.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-37',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with two black vertical lines that narrow inward in the middle indicate?',
    options: [
      'Wider pavement ahead.',
      'Narrow structure or narrow bridge ahead; road width is reduced.',
      'Railway crossing ahead.',
      'Divided highway starts.'
    ],
    correctAnswer: 1,
    explanation: 'This sign warns drivers that an upcoming bridge, culvert, or underpass is narrower than the regular roadway surface.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'narrow_structure_ahead'
  },
  {
    id: 'sign-38',
    category: 'signs',
    topic: 'Pavement Markings',
    question: 'What does a solid double yellow line down the centre of a roadway indicate?',
    options: [
      'Passing allowed from both directions.',
      'Passing is prohibited from both directions.',
      'Passing allowed during daylight only.',
      'Center lane is reserved for bicycles.'
    ],
    correctAnswer: 1,
    explanation: 'Double solid yellow lines mean that passing is unsafe and prohibited for traffic in both directions.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Pavement Markings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-39',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a diamond warning sign showing a T-junction indicate?',
    options: [
      'Through road continues straight.',
      'The road ahead ends at a cross street; you must turn left or right.',
      'Dead end street with no exit.',
      'Merge ahead from both sides.'
    ],
    correctAnswer: 1,
    explanation: 'A T-intersection warning sign shows that the road you are travelling on does not continue straight through; it terminates at an intersection where you must turn.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-40',
    category: 'signs',
    topic: 'Construction Signs',
    question: 'What is the background colour used for temporary construction and maintenance signs in Ontario?',
    options: [
      'Bright yellow.',
      'Orange with black lettering or symbols.',
      'Green with white lettering.',
      'Blue with white symbols.'
    ],
    correctAnswer: 1,
    explanation: 'Orange signs with black symbols and lettering are used exclusively for temporary condition and construction work zones in Ontario.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Temporary Condition Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-41',
    category: 'signs',
    topic: 'Construction Signs',
    question: 'What does an orange diamond sign with a person holding a flag or paddle indicate?',
    options: [
      'Sports event ahead.',
      'Traffic control person (flagger) ahead; follow their hand or sign directions.',
      'Parade route ahead.',
      'Pedestrian walkway closed.'
    ],
    correctAnswer: 1,
    explanation: 'An orange sign with a traffic control person indicates road work ahead where traffic is being directed by a certified flagger. You must obey their signals.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Temporary Condition Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-42',
    category: 'signs',
    topic: 'Traffic Signals',
    question: 'What does a green arrow displayed together with a red circular light mean?',
    options: [
      'You may proceed straight only.',
      'You may make the turn indicated by the arrow; opposing traffic faces a red light.',
      'You must wait for the red light to turn green.',
      'Pedestrians have right-of-way in that turn.'
    ],
    correctAnswer: 1,
    explanation: 'An advanced green arrow displayed with a red light allows you to turn in the direction of the arrow. Oncoming traffic is stopped by a red light.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Traffic Lights",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-43',
    category: 'signs',
    topic: 'Traffic Signals',
    question: 'What must you do if a traffic light at an intersection is dark (out of order due to power failure)?',
    options: [
      'Treat the intersection as an uncontrolled intersection and speed up.',
      'Treat the intersection as an all-way (four-way) stop.',
      'Yield to traffic on the wider road.',
      'Proceed through if no police officer is present.'
    ],
    correctAnswer: 1,
    explanation: 'Under Ontario law, when traffic lights are not functioning (completely dark), the intersection must be treated as an all-way stop by all approaching vehicles.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Traffic Lights",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-44',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a steep hill and a truck pointing downhill signify?',
    options: [
      'Truck parking area ahead.',
      'Steep downgrade (steep hill) ahead; slow down and consider shifting into a lower gear.',
      'Commercial vehicles prohibited.',
      'Runaway truck ramp.'
    ],
    correctAnswer: 1,
    explanation: 'This sign warns of a steep downhill grade ahead. Drivers, particularly of heavy vehicles, should moderate their speed to prevent brake overheating.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-45',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a sign reading "SLOWER TRAFFIC KEEP RIGHT" instruct drivers to do?',
    options: [
      'Only trucks must use the right lane.',
      'Vehicles travelling slower than the prevailing traffic speed must keep in the rightmost lane.',
      'Speed limit is reduced in the left lane.',
      'Right lane ends ahead.'
    ],
    correctAnswer: 1,
    explanation: 'This sign reminds drivers that slower-moving vehicles belong in the right lane, leaving left lanes open for passing and faster-moving traffic.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-46',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a white rectangular sign displaying two opposing arrows with a divider between them mean?',
    options: [
      'One way street.',
      'Two-way traffic roadway; opposing traffic travels on the other side of the centre line.',
      'Divided highway ends in 1 km.',
      'Passing lane begins.'
    ],
    correctAnswer: 1,
    explanation: 'A two-way traffic regulatory sign reminds drivers that the road carries traffic in opposing directions.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-47',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign showing a side-road intersecting at an angle indicate?',
    options: [
      'Divided highway ahead.',
      'An intersecting side road joins at an acute angle; be alert for vehicles entering.',
      'Road curves sharply right.',
      'Merge lane on freeway.'
    ],
    correctAnswer: 1,
    explanation: 'An angled side road sign warns that another roadway enters your route at an angle, where sight lines may require extra vigilance.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-48',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow warning sign showing a tractor or farm machine indicate?',
    options: [
      'Farm equipment prohibited on this road.',
      'Slow-moving agricultural equipment frequently travels on or crosses this roadway.',
      'Farm produce stand ahead.',
      'Unpaved gravel road.'
    ],
    correctAnswer: 1,
    explanation: 'This warning sign highlights rural sections where slow-moving farm vehicles enter or travel on the road. Slow down and pass with caution.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-49',
    category: 'signs',
    topic: 'Pavement Markings',
    question: 'What do painted white arrows on the pavement in an intersection approach lane mean?',
    options: [
      'Suggestions for optional routes.',
      'Mandatory travel directions; you must follow the arrow direction indicated in that lane.',
      'Speed increase zones.',
      'Parking alignment marks.'
    ],
    correctAnswer: 1,
    explanation: 'Lane-use pavement arrows are regulatory markings: drivers travelling in that lane must turn or proceed straight as directed by the arrow.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Pavement Markings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-50',
    category: 'signs',
    topic: 'Pavement Markings',
    question: 'What does a solid white line between lanes travelling in the same direction signify?',
    options: [
      'Lane changes are recommended.',
      'Lane changing is discouraged or hazardous; stay in your lane.',
      'Opposing traffic lane.',
      'Shoulder marker only.'
    ],
    correctAnswer: 1,
    explanation: 'Solid white lines between travel lanes indicate that lane changes are hazardous and discouraged, such as inside tunnels or nearing intersections.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Pavement Markings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-51',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a pedestrian symbol inside indicate?',
    options: [
      'Jogging track ahead.',
      'Pedestrian crosswalk or pedestrian crossing area ahead; be prepared to yield.',
      'Sidewalk ends.',
      'School bus stop.'
    ],
    correctAnswer: 1,
    explanation: 'A yellow diamond with a walking pedestrian figure alerts drivers that pedestrians frequently cross or a designated crosswalk is located ahead.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'pedestrian_crossover'
  },
  {
    id: 'sign-52',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a sign with a red circle and slash across a bicycle indicate?',
    options: [
      'Bicycle lane ahead.',
      'Bicycles are prohibited on this roadway or bridge.',
      'Bicycle crossing zone.',
      'Bicycle parking only.'
    ],
    correctAnswer: 1,
    explanation: 'A bicycle symbol inside a red prohibition circle and slash signifies that bicycles are not permitted on that highway, expressway, or facility.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-53',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign showing a low clearance height (e.g., "3.8 m") warn of?',
    options: [
      'Road width is 3.8 metres.',
      'Overhead bridge or underpass has low clearance; vehicles higher than the posted height must not enter.',
      'Minimum distance between vehicles is 3.8 metres.',
      'Speed limit is 38 km/h.'
    ],
    correctAnswer: 1,
    explanation: 'Clearance warning signs show the maximum overhead clearance under an overpass, bridge, or structure.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-54',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow warning sign showing a pavement transition from smooth to bumpy lines mean?',
    options: [
      'Car wash ahead.',
      'Pavement ends ahead; rough gravel road surface begins.',
      'Railway tracks ahead.',
      'Speed bump ahead.'
    ],
    correctAnswer: 1,
    explanation: 'The "Pavement Ends" sign warns drivers that the paved asphalt road is terminating and will continue as a gravel or dirt surface.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-55',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign with a bump or rise in the road profile indicate?',
    options: [
      'Bridge ahead.',
      'Bumpy road or sharp bump/dip ahead; slow down to avoid vehicle damage or loss of control.',
      'Uphill grade begins.',
      'Culvert ahead.'
    ],
    correctAnswer: 1,
    explanation: 'The bump or dip sign warns of a sharp sudden change in road profile that requires reduced speed.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-56',
    category: 'signs',
    topic: 'Warning Signs',
    question: 'What does a yellow diamond sign showing a vehicle with open rear doors or water splash indicate near bridges?',
    options: [
      'Car ferry entrance.',
      'Opening bridge (drawbridge or swing bridge) ahead; be prepared to stop if lights flash.',
      'Flood zone ahead.',
      'Boat ramp access.'
    ],
    correctAnswer: 1,
    explanation: 'An opening or movable bridge warning sign alerts drivers to a bridge that opens for marine vessel passage.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Signs: Warning Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-57',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does a rectangular sign reading "COMMERCIAL VEHICLES OVER 5 TONNES MUST REPORT TO SCALE" mean?',
    options: [
      'All vehicles must stop.',
      'Heavy commercial trucks matching that weight threshold must enter the vehicle inspection station when open.',
      'Trucks must exit the highway.',
      'Scale applies to passenger cars towing trailers.'
    ],
    correctAnswer: 1,
    explanation: 'Commercial truck inspection station signs require qualifying commercial vehicles to pull in for weight and safety checks when the station is open.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Commercial Vehicle Inspection",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-58',
    category: 'signs',
    topic: 'Information & Guide Signs',
    question: 'What are the usual shape and colour characteristics of Ontario information signs?',
    options: [
      'Diamond-shaped with yellow background and black symbols.',
      'Usually rectangular with a green background and white letters.',
      'Circular with blue background and white letters.',
      'Triangular with orange background.'
    ],
    correctAnswer: 1,
    explanation: 'According to the Official MTO Driver\x27s Handbook: "Information signs are usually rectangular with a green background and white letters." (Warning signs are usually diamond-shaped with yellow backgrounds, and regulatory signs are usually rectangular or square with white or black backgrounds).',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Signs"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'sign-59',
    category: 'signs',
    topic: 'Information & Guide Signs',
    question: 'What does a blue square sign with a white "H" symbol indicate?',
    options: [
      'Highway entrance.',
      'Hospital with emergency medical services nearby.',
      'Hotel accommodations.',
      'Historical monument.'
    ],
    correctAnswer: 1,
    explanation: 'A white letter "H" on a blue background is the universal directional marker pointing to an emergency hospital facility.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Information Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'sign-60',
    category: 'signs',
    topic: 'Regulatory Signs',
    question: 'What does an inverted triangular white sign with a red border mean?',
    options: [
      'Stop completely.',
      'Yield right-of-way to all other traffic.',
      'No entry.',
      'Speed limit zone.'
    ],
    correctAnswer: 1,
    explanation: 'The downward-pointing triangle is uniquely reserved for Yield signs, requiring drivers to yield priority to cross-traffic and pedestrians.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Signs: Regulatory Signs",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15',
    signType: 'yield'
  },

  // =========================================================================
  // SECTION 2: RULES OF THE ROAD (60 QUESTIONS)
  // =========================================================================
  {
    id: 'rule-01',
    category: 'rules',
    topic: 'School Buses & Emergency Vehicles',
    question: 'When approaching a stopped school bus with red lights flashing or stop arm out, what does Ontario law require?',
    options: [
      'Slow to 20 km/h and pass on the left if no children are visible.',
      'You must stop whether you are behind or approaching the bus, stopping at least 20 metres away when approaching from behind.',
      'Sound your horn and proceed with caution.',
      'Stop only if you are directly behind the bus.'
    ],
    correctAnswer: 1,
    explanation: 'When red lights are flashing or the stop arm is out: "You must stop whether you are behind or approaching the bus." When approaching from behind, stop at least 20 metres away. Resume driving only when the bus moves, red lights stop flashing, and the stop arm is retracted.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Sharing the road with other road users"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-02',
    category: 'rules',
    topic: 'School Buses & Emergency Vehicles',
    question: 'When approaching a stopped school bus with flashing red lights on a roadway with a median strip, who must stop?',
    options: [
      'Traffic on both sides of the median.',
      'Only vehicles approaching from the rear of the bus must stop.',
      'Only public transit buses and commercial trucks.',
      'No vehicles need to stop if the median has grass.'
    ],
    correctAnswer: 1,
    explanation: 'On a divided road: "If you are on a roadway with a median strip, only vehicles approaching from the rear of the bus must stop." Oncoming vehicles on the other side of the median do not have to stop.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Sharing the road with other road users"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-03',
    category: 'rules',
    topic: 'School Buses & Emergency Vehicles',
    question: 'Under Ontario\x27s Move Over law, what must you do when passing a stopped emergency vehicle or tow truck with flashing lights on the roadside?',
    options: [
      'Maintain your normal speed and sound your horn.',
      'Slow down and pass with caution; on roads with two or more lanes, leave a lane of space if you can do so safely.',
      'Stop completely on the roadway and wait for permission to pass.',
      'Accelerate quickly to clear the scene as fast as possible.'
    ],
    correctAnswer: 1,
    explanation: 'When passing a stopped tow truck or emergency vehicle: slow down and pass with caution; on roads with two or more lanes leave a lane of space if safe. First offence carries fines ranging from $400 to $2,000, 3 demerit points if convicted, and possible licence suspension for up to 2 years.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Driving near emergency vehicles, tow trucks and work vehicles"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-04',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'What blood alcohol rule applies by law to an Ontario G1 driver?',
    options: [
      'Blood alcohol level must be under 0.05%.',
      'You must maintain a zero blood alcohol level (no alcohol in your blood).',
      'Blood alcohol level must be under 0.08%.',
      'One standard drink is permitted with food.'
    ],
    correctAnswer: 1,
    explanation: 'By law, a G1 driver must: "maintain a zero blood alcohol level (no alcohol in your blood)." There is zero tolerance for alcohol or drugs for novice drivers.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-05',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'What qualifications must the driver accompanying an Ontario G1 learner possess?',
    options: [
      'Any fully licensed driver over the age of 18.',
      'A fully licensed driver with at least 4 years of driving experience, BAC under .05 (zero if 21 and under), and they must be the only other person in the front seat.',
      'A licensed family member regardless of driving experience.',
      'A G2 driver with at least two years of clean record.'
    ],
    correctAnswer: 1,
    explanation: 'By law, a G1 driver must drive with a fully licensed driver who has "at least four years of driving experience" and "a blood alcohol level of less than .05 (if this person is 21 and under, their blood alcohol level should be zero)." The driver accompanying you must be the only other person in the front seat.',
    difficulty: 'medium',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-06',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'Which rule applies by law to an Ontario G1 driver regarding high-speed expressways?',
    options: [
      'You may drive on all expressways at any time with an accompanying driver.',
      'You must not drive on 400-series highways or high-speed expressways, except with an Ontario-certified driving instructor.',
      'You may drive on 400-series highways only between 9 a.m. and 4 p.m.',
      'You may drive on any highway as long as you do not exceed 80 km/h.'
    ],
    correctAnswer: 1,
    explanation: 'By law, a G1 driver must: "not drive on 400-series highways or high-speed expressways." Exception: with an Ontario-certified driving instructor, the G1 driver may drive on any road.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-07',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'What nighttime driving restriction applies by law to an Ontario G1 driver?',
    options: [
      'No driving between 9:00 p.m. and 6:00 a.m.',
      'You must not drive between midnight and 5 a.m.',
      'No driving after sunset.',
      'Driving is permitted 24 hours a day if accompanied.'
    ],
    correctAnswer: 1,
    explanation: 'By law, an Ontario G1 driver must: "not drive between midnight and 5 a.m."',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-08',
    category: 'rules',
    topic: 'Intersections & Right-of-Way',
    question: 'At an all-way (four-way) stop intersection, which vehicle has the right-of-way?',
    options: [
      'The vehicle on the wider street.',
      'The vehicle that arrived and came to a complete stop first.',
      'The largest commercial vehicle.',
      'The vehicle planning to turn left.'
    ],
    correctAnswer: 1,
    explanation: 'At an all-way stop, right-of-way goes to the first vehicle to come to a complete stop. If two vehicles stop at the same time, yield to the vehicle on your right.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Driving Through Intersections",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-09',
    category: 'rules',
    topic: 'Intersections & Right-of-Way',
    question: 'If two vehicles arrive at an uncontrolled intersection (no signs or lights) at approximately the same time, who must yield?',
    options: [
      'The driver on the right yields to the driver on the left.',
      'The driver on the left must yield to the vehicle approaching from their right.',
      'The vehicle travelling faster goes first.',
      'Both must turn right.'
    ],
    correctAnswer: 1,
    explanation: 'At uncontrolled intersections where vehicles arrive simultaneously, the vehicle on the left must yield the right-of-way to the vehicle on its right.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Driving Through Intersections",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-10',
    category: 'rules',
    topic: 'Intersections & Right-of-Way',
    question: 'When entering a roundabout in Ontario, who has the right-of-way?',
    options: [
      'Entering traffic has priority over circulating vehicles.',
      'Traffic already circulating inside the roundabout has right-of-way; entering vehicles must yield.',
      'Vehicles on the outside lane must yield to entering traffic.',
      'The faster vehicle has priority.'
    ],
    correctAnswer: 1,
    explanation: 'Traffic inside the roundabout circulatory roadway has right-of-way. Entering vehicles must yield to traffic approaching from the left inside the roundabout.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Roundabouts",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-11',
    category: 'rules',
    topic: 'Parking & Stopping',
    question: 'When parking facing downhill on a street with a curb, how should you turn your front wheels?',
    options: [
      'Straight ahead.',
      'Turned toward the right (toward the curb).',
      'Turned toward the left (away from the curb).',
      'It does not matter if parking brake is set.'
    ],
    correctAnswer: 1,
    explanation: 'When parking downhill with a curb, turn wheels toward the curb so that if brakes fail, the vehicle rolls into the curb rather than into the street.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Parking on Hills",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-12',
    category: 'rules',
    topic: 'Parking & Stopping',
    question: 'When parking facing uphill on a street with a curb, how should your front wheels be positioned?',
    options: [
      'Turned toward the right (toward curb).',
      'Turned toward the left (away from curb) with the tire resting gently against the curb.',
      'Straight ahead.',
      'Sharply onto the sidewalk.'
    ],
    correctAnswer: 1,
    explanation: 'When parking uphill with a curb, turn front wheels toward the left (away from the curb) and allow the vehicle to roll back slightly until the tire rests against the curb ("Up, Up, and Away").',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Parking on Hills",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-13',
    category: 'rules',
    topic: 'Parking & Stopping',
    question: 'Unless signs indicate otherwise, what is the minimum legal distance you must park away from a fire hydrant in Ontario?',
    options: [
      '1 metre.',
      '3 metres (approx. 10 feet).',
      '6 metres.',
      '9 metres.'
    ],
    correctAnswer: 1,
    explanation: 'Under the Ontario Highway Traffic Act and municipal bylaws, vehicles must not park within 3 metres of a fire hydrant.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Parking Rules",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-14',
    category: 'rules',
    topic: 'Speed & Following Distances',
    question: 'Where no speed limit is posted, what is the legal maximum speed in Ontario cities, towns, and villages?',
    options: [
      '40 km/h.',
      '50 km/h.',
      '60 km/h.',
      '70 km/h.'
    ],
    correctAnswer: 1,
    explanation: 'According to the Official MTO Driver\x27s Handbook: Where no limit is posted, "the maximum speed is 50 km/h in cities, towns and villages, and 80 km/h elsewhere."',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Driving along"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-15',
    category: 'rules',
    topic: 'Speed & Following Distances',
    question: 'Where no speed limit is posted, what is the legal maximum speed on Ontario rural roads outside cities, towns, and villages?',
    options: [
      '70 km/h.',
      '80 km/h.',
      '90 km/h.',
      '100 km/h.'
    ],
    correctAnswer: 1,
    explanation: 'According to the Official MTO Driver\x27s Handbook: Where no limit is posted, "the maximum speed is 50 km/h in cities, towns and villages, and 80 km/h elsewhere."',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Driving along"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-16',
    category: 'rules',
    topic: 'Speed & Following Distances',
    question: 'What is the official safe following distance behind the vehicle in front of you under normal conditions?',
    options: [
      'One car length for every 10 km/h of speed.',
      'At least two seconds behind the vehicle in front of you.',
      'Exactly one second in daytime.',
      'At least four car lengths at all speeds.'
    ],
    correctAnswer: 1,
    explanation: 'According to the Official MTO Driver\x27s Handbook: "A safe following distance is at least two seconds behind the vehicle in front of you."',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Driving along"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-17',
    category: 'rules',
    topic: 'Headlights & Night Driving',
    question: 'When must vehicle headlights be turned on in Ontario?',
    options: [
      'Only between 10:00 p.m. and 4:00 a.m.',
      'From one-half hour before sunset to one-half hour after sunrise, and anytime visibility is reduced to less than 150 metres.',
      'Only on unlit highways.',
      'Only during heavy precipitation.'
    ],
    correctAnswer: 1,
    explanation: 'Under Highway Traffic Act Section 62, headlights must be on from one-half hour before sunset until one-half hour after sunrise, and whenever visibility is under 150 metres.',
    difficulty: 'medium',
    sourceReference: "Ontario Highway Traffic Act, Section 62; MTO Handbook",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-18',
    category: 'rules',
    topic: 'Headlights & Night Driving',
    question: 'When driving at night with high beams, within what distance must you switch to low beams when approaching an oncoming vehicle?',
    options: [
      'Within 60 metres.',
      'Within 150 metres (approx. 500 feet).',
      'Within 300 metres.',
      'Only if the other vehicle flashes lights.'
    ],
    correctAnswer: 1,
    explanation: 'Under HTA Section 168, you must dim high beams to low beams within 150 metres of an oncoming vehicle to prevent blinding the other driver.',
    difficulty: 'medium',
    sourceReference: "Ontario Highway Traffic Act, Section 168; MTO Handbook",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-19',
    category: 'rules',
    topic: 'Headlights & Night Driving',
    question: 'When following another vehicle from behind at night, within what distance must you switch your headlights to low beams?',
    options: [
      'Within 30 metres.',
      'Within 60 metres (approx. 200 feet).',
      'Within 100 metres.',
      'Within 150 metres.'
    ],
    correctAnswer: 1,
    explanation: 'Under HTA Section 168, you must switch to low beams within 60 metres when following behind another vehicle to avoid glaring into their rearview mirror.',
    difficulty: 'hard',
    sourceReference: "Ontario Highway Traffic Act, Section 168; MTO Handbook",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-20',
    category: 'rules',
    topic: 'Demerit Points & Penalties',
    question: 'What consequence occurs when a novice driver (G1, G2, M1, M2) accumulates 9 or more demerit points in Ontario?',
    options: [
      'A warning letter by mail.',
      'Driver\x27s licence is suspended for 60 days.',
      'A 30-day vehicle impoundment.',
      'A fine with no licence suspension.'
    ],
    correctAnswer: 1,
    explanation: 'Under Ontario\x27s novice driver demerit point thresholds: 2 to 5 points = warning letter; 6 to 8 points = second warning letter; 9 or more points = licence suspended for 60 days.',
    difficulty: 'medium',
    sourceReference: 'ontario.ca, "Understanding demerit points"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-21',
    category: 'rules',
    topic: 'Demerit Points & Penalties',
    question: 'How long do demerit points remain on an Ontario driving record?',
    options: [
      'One year from the conviction date.',
      'Two years from the offence date.',
      'Three years from the date you pay the ticket.',
      'Five years from the court hearing.'
    ],
    correctAnswer: 1,
    explanation: 'Under Ontario\x27s official demerit point rules: "Points remain on the record for two years from the offence date."',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Understanding demerit points"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-22',
    category: 'rules',
    topic: 'Distracted Driving',
    question: 'Which of the following actions is prohibited under Ontario\'s distracted driving laws while operating a vehicle?',
    options: [
      'Looking at your dashboard speedometer.',
      'Holding or using a handheld mobile phone or wireless communication device, even while stopped at a red light.',
      'Listening to audio through built-in car speakers.',
      'Glancing at properly adjusted side mirrors.'
    ],
    correctAnswer: 1,
    explanation: 'Under Ontario law, holding or using handheld communication devices is illegal while operating a vehicle, even when stopped at red traffic lights.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Distracted Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-23',
    category: 'rules',
    topic: 'Pedestrians & Cyclists',
    question: 'When approaching a pedestrian crossover or school crossing with a crossing guard, when may a driver proceed?',
    options: [
      'As soon as the pedestrian crosses your side of the road.',
      'Only after all pedestrians and the crossing guard have completely cleared the entire roadway.',
      'When the pedestrian is at least 1 metre past your car.',
      'If you honk to alert the pedestrian.'
    ],
    correctAnswer: 1,
    explanation: 'At pedestrian crossovers and school crossings with a crossing guard, drivers must stop and wait until pedestrians and the guard have cleared the entire roadway from curb to curb before proceeding.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Pedestrian Crossovers",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-24',
    category: 'rules',
    topic: 'Pedestrians & Cyclists',
    question: 'When passing a cyclist on an Ontario road, what minimum passing distance must drivers maintain where practical?',
    options: [
      'Half a metre (50 cm).',
      'A minimum distance of one metre.',
      'Two full vehicle widths.',
      'Three metres.'
    ],
    correctAnswer: 1,
    explanation: 'Under the Official MTO Driver\x27s Handbook: "drivers of motor vehicles must maintain a minimum distance of one metre, where practical" when passing a cyclist. Failing to do so may bring a fine and two additional demerit points.',
    difficulty: 'easy',
    sourceReference: 'MTO Driver\x27s Handbook, "Sharing the road with other road users"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-25',
    category: 'rules',
    topic: 'Seat Belts & Child Safety',
    question: 'What passenger seatbelt requirement applies by law to an Ontario G1 driver?',
    options: [
      'Only front-seat passengers are required to wear seatbelts.',
      'You must make sure every passenger with you wears a properly working seatbelt.',
      'Passengers over the age of 18 are exempt.',
      'You may carry as many passengers as fit on the rear bench.'
    ],
    correctAnswer: 1,
    explanation: 'By law, a G1 driver must: "make sure every passenger with you wears a properly working seatbelt." The number of passengers cannot exceed the number of working seatbelts.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-26',
    category: 'rules',
    topic: 'Turning & Lane Changes',
    question: 'Before changing lanes or turning, what routine should every driver follow?',
    options: [
      'Turn the steering wheel first, then look.',
      'Check rearview and side mirrors, signal intention, check your blind spot over your shoulder, and move when safe.',
      'Sound your horn and accelerate rapidly.',
      'Flash hazard lights and change lanes.'
    ],
    correctAnswer: 1,
    explanation: 'The safe lane change sequence is mirror check, signal, shoulder check (blind spot), and smooth movement when clear.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Changing Positions",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-27',
    category: 'rules',
    topic: 'Turning & Lane Changes',
    question: 'Under what conditions is a right turn on red permitted in Ontario?',
    options: [
      'Right turns on red are never permitted.',
      'Only after coming to a complete stop and yielding to pedestrians and oncoming traffic, unless prohibited by a posted sign.',
      'Without stopping if the intersection is clear.',
      'Only during nighttime hours.'
    ],
    correctAnswer: 1,
    explanation: 'Unless a posted sign prohibits it, right turns on red are permitted only after coming to a full complete stop and yielding to all traffic and pedestrians.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Turns: Right Turns on Red",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-28',
    category: 'rules',
    topic: 'Turning & Lane Changes',
    question: 'When waiting in an intersection to make a left turn across oncoming traffic, how should your front wheels be positioned?',
    options: [
      'Turned sharply to the left.',
      'Pointed straight ahead until you actually begin the turn.',
      'Turned toward the right.',
      'Turned back and forth.'
    ],
    correctAnswer: 1,
    explanation: 'Keep your front wheels pointed straight ahead while waiting to turn left. If rear-ended, wheels pointed left would push your vehicle into oncoming traffic.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Turning Left",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-29',
    category: 'rules',
    topic: 'Emergency Vehicles & Sirens',
    question: 'When an emergency vehicle with active siren or flashing lights approaches, what does Ontario law require you to do?',
    options: [
      'Stop immediately in whichever lane you are in.',
      'Slow down, signal, move to the right side of the road, clear of any intersection, and stop.',
      'Speed up to get out of the emergency vehicle\x27s way.',
      'Pull onto the left shoulder of a multi-lane highway.'
    ],
    correctAnswer: 1,
    explanation: 'When an emergency vehicle approaches with siren or flashing lights: slow down, signal, "Move to the right side of the road, clear of any intersection," then stop until the vehicle has passed.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Driving near emergency vehicles, tow trucks and work vehicles"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-30',
    category: 'rules',
    topic: 'Highway Driving',
    question: 'What is the correct procedure when merging onto a freeway or 400-series highway from an on-ramp?',
    options: [
      'Stop at the end of the ramp and wait for an opening.',
      'Use the acceleration lane to build speed matching highway traffic, signal, check mirrors and blind spot, and merge into a gap.',
      'Enter at 40 km/h to force highway cars to brake.',
      'Cross solid lines immediately.'
    ],
    correctAnswer: 1,
    explanation: 'The acceleration lane exists so you can increase speed to match the highway flow before merging into an open traffic gap.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Freeway Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-31',
    category: 'rules',
    topic: 'Collision Reporting & Law',
    question: 'Under Ontario\x27s demerit point system, how many demerit points are applied for failing to remain at the scene of a collision?',
    options: [
      '3 demerit points.',
      '7 demerit points.',
      '4 demerit points.',
      '2 demerit points.'
    ],
    correctAnswer: 1,
    explanation: 'Under Ontario\x27s demerit points system: 7 points (the highest penalty category) are applied for failing to remain at the scene of a collision, as well as for failing to stop when signalled or asked by a police officer.',
    difficulty: 'medium',
    sourceReference: 'ontario.ca, "Understanding demerit points"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-32',
    category: 'rules',
    topic: 'Adverse Weather & Skids',
    question: 'If your vehicle begins to skid on ice or a slippery surface, what is the best steering response?',
    options: [
      'Slam on the brakes and hold the wheel rigidly.',
      'Ease off the accelerator and steer gently in the direction you want the front of the vehicle to go.',
      'Steer sharply in the opposite direction.',
      'Engage the emergency handbrake.'
    ],
    correctAnswer: 1,
    explanation: 'In a skid, release the accelerator, avoid hard braking, look in the intended direction of travel, and steer smoothly toward that path.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Driving in Difficult Situations",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-33',
    category: 'rules',
    topic: 'Railway Crossings',
    question: 'When approaching a railway crossing with active flashing signals and gates descending, where must you stop?',
    options: [
      'Right against the tracks.',
      'At least 5 metres from the nearest rail (or at the painted stop line).',
      'At least 25 metres back on the shoulder.',
      'You may drive around gates if no train is visible.'
    ],
    correctAnswer: 1,
    explanation: 'At a railway crossing with flashing signals or gates descending, drivers must stop at least 5 metres from the nearest track or at the painted stop line.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Railway Crossings",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-34',
    category: 'rules',
    topic: 'Streetcars & Light Rail',
    question: 'When driving behind a streetcar stopped to discharge passengers on a street without safety islands, where must you stop?',
    options: [
      'At least 2 metres behind the rearmost open door of the streetcar.',
      'Pass on the left at 10 km/h.',
      'Pass on the right if passengers are on the sidewalk.',
      'Even with the front driver cabin.'
    ],
    correctAnswer: 0,
    explanation: 'Under Highway Traffic Act Section 166, when a streetcar stops to load or unload passengers on a roadway without safety islands, drivers must stop at least 2 metres behind the rearmost open door.',
    difficulty: 'hard',
    sourceReference: "Ontario Highway Traffic Act, Section 166; MTO Handbook",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-35',
    category: 'rules',
    topic: 'Impaired Driving & Cannabis',
    question: 'What is the legal consequence of refusing a lawful roadside breathalyzer or drug screening demand by police?',
    options: [
      'A minor parking-level ticket.',
      'Criminal charges carrying immediate administrative licence suspension and penalties equal to driving over the limit.',
      'No penalty if you request legal counsel first.',
      'A 24-hour vehicle tow only.'
    ],
    correctAnswer: 1,
    explanation: 'Refusing to comply with a lawful police demand to provide a breath or fluid sample is a criminal offence carrying immediate 90-day licence suspension and the same consequences as impaired driving.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Impaired Driving Laws",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-36',
    category: 'rules',
    topic: 'Parking & Stopping',
    question: 'When parking on a hill without a curb (facing either uphill or downhill), how should you position your front wheels?',
    options: [
      'Turned toward the left.',
      'Turned toward the right (toward the edge of the roadway or shoulder).',
      'Straight ahead.',
      'It does not matter if the transmission is in park.'
    ],
    correctAnswer: 1,
    explanation: 'When parking on a hill without a curb, always turn front wheels to the right so that if brakes fail, the vehicle rolls off the road away from traffic.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Parking on Hills",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-37',
    category: 'rules',
    topic: 'Turning & Lane Changes',
    question: 'When turning left from a one-way street onto another one-way street, which lane should you turn from and into?',
    options: [
      'From the right curb lane into the right curb lane.',
      'From the leftmost curb lane into the leftmost open curb lane.',
      'From the centre lane into any lane.',
      'From any lane.'
    ],
    correctAnswer: 1,
    explanation: 'When turning left from a one-way street onto a one-way street, make the turn from the leftmost lane into the nearest left curb lane.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Turns: Left Turns",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-38',
    category: 'rules',
    topic: 'Intersections & Right-of-Way',
    question: 'When approaching an intersection where a police officer is directing traffic, what rule must you follow?',
    options: [
      'Obey traffic light signals over police hand directions.',
      'Obey the police officer\'s hand directions regardless of what the traffic lights or signs show.',
      'Yield to oncoming left-turning cars.',
      'Stop and wait for the officer to approach your car.'
    ],
    correctAnswer: 1,
    explanation: 'A police officer directing traffic takes precedence over all traffic signs and signal lights.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Driving Through Intersections",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-39',
    category: 'rules',
    topic: 'Intersections & Right-of-Way',
    question: 'When emerging from a private driveway, alleyway, or parking lot onto a public street, what must you do?',
    options: [
      'Sound your horn and proceed.',
      'Yield right-of-way to all pedestrians on the sidewalk and all vehicles on the public roadway.',
      'Merge aggressively into traffic.',
      'Only yield if entering from the left.'
    ],
    correctAnswer: 1,
    explanation: 'Vehicles exiting a private driveway or alley must yield to all pedestrians on the sidewalk and oncoming vehicular traffic on the public road.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Driving Through Intersections",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-40',
    category: 'rules',
    topic: 'Speed & Following Distances',
    question: 'What is "hydroplaning" and how should a driver react if it occurs?',
    options: [
      'Braking hard on dry pavement.',
      'Tires riding on a thin film of water losing contact with the road; ease off accelerator and steer straight without hard braking.',
      'Engine overheating due to rain.',
      'Driving through water over 1 foot deep.'
    ],
    correctAnswer: 1,
    explanation: 'Hydroplaning occurs when water builds up under tires, causing loss of steering and braking traction. Ease off the gas pedal and avoid abrupt braking until tires regain contact.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Driving in Difficult Situations",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-41',
    category: 'rules',
    topic: 'Headlights & Night Driving',
    question: 'When driving in heavy fog or falling snow during the day or night, which headlight setting should you use?',
    options: [
      'High-beam headlights for maximum range.',
      'Low-beam headlights (or dedicated fog lights).',
      'Parking lights only.',
      'Hazard warning flashers only.'
    ],
    correctAnswer: 1,
    explanation: 'High beams reflect off fog droplets and snowflakes, creating a blinding glare. Low beams direct light downward toward the road surface.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Driving at Night and in Bad Weather",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-42',
    category: 'rules',
    topic: 'Adverse Weather & Skids',
    question: 'What is "black ice" and why is it especially hazardous for drivers?',
    options: [
      'Ice formed from asphalt soot.',
      'A transparent, invisible layer of ice on the pavement surface that looks like wet asphalt.',
      'Frost on windshields.',
      'Snow packed by snowplows.'
    ],
    correctAnswer: 1,
    explanation: 'Black ice is a thin, transparent glaze of ice that blends in with the roadway surface, making bridges and shaded areas unexpectedly slick.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Winter Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-43',
    category: 'rules',
    topic: 'Sharing the Road',
    question: 'Why should you avoid cutting in closely ahead of a large commercial transport truck?',
    options: [
      'Trucks cannot change lanes.',
      'Large heavy commercial trucks require a significantly longer distance to stop than passenger vehicles.',
      'Trucks travel at higher speeds.',
      'Truck mirrors do not tilt.'
    ],
    correctAnswer: 1,
    explanation: 'Due to their weight and momentum, fully loaded commercial transport trucks take much longer to stop than passenger vehicles.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Sharing the Road: Large Commercial Vehicles",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-44',
    category: 'rules',
    topic: 'Sharing the Road',
    question: 'What are the blind spots around large transport trucks commonly known as?',
    options: [
      'Safe zones.',
      'No-Zones (areas directly in front, behind, and along both sides where the driver cannot see you).',
      'Passing channels.',
      'Drafting pockets.'
    ],
    correctAnswer: 1,
    explanation: 'Large commercial trucks have four major "No-Zones" (blind spots): directly in front, behind, and down both sides. If you cannot see the driver\'s side mirrors, they cannot see you.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Sharing the Road: Large Commercial Vehicles",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-45',
    category: 'rules',
    topic: 'Sharing the Road',
    question: 'When a city transit bus in a bus bay flashes its left turn signal to re-enter traffic, what does Ontario law require?',
    options: [
      'Transit buses must wait until all traffic has passed.',
      'Drivers in the adjacent lane must yield right-of-way and allow the bus to merge back into traffic.',
      'Speed up to pass before the bus pulls out.',
      'Sound your horn.'
    ],
    correctAnswer: 1,
    explanation: 'Under Ontario law, motorists must yield the right-of-way to a municipal transit bus signaling its intention to pull out from a designated bus bay.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Sharing the Road: Buses",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-46',
    category: 'rules',
    topic: 'Sharing the Road',
    question: 'What is the "Dutch Reach" technique and why is it recommended when opening vehicle doors?',
    options: [
      'Opening the door quickly with your nearest hand.',
      'Reaching across with your far hand to open the car door, naturally turning your body to check for oncoming cyclists.',
      'Leaving doors unlocked while driving.',
      'Steering with both hands at 12 o\'clock.'
    ],
    correctAnswer: 1,
    explanation: 'The Dutch Reach involves using the hand furthest from the door handle to open it, forcing your head and shoulders to turn and check your blind spot for oncoming cyclists before opening the door.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Sharing the Road: Cyclists",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-47',
    category: 'rules',
    topic: 'Highway Driving',
    question: 'If you accidentally miss your intended exit on a 400-series highway, what should you do?',
    options: [
      'Stop on the paved shoulder and reverse back to the ramp.',
      'Continue driving to the next exit, safely exit, and find a legal route back.',
      'Make a U-turn across the grass or gravel median divider.',
      'Back up slowly with hazard lights on.'
    ],
    correctAnswer: 1,
    explanation: 'Reversing or making a U-turn on a controlled-access highway is extremely dangerous and illegal. Continue to the next exit.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Freeway Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-48',
    category: 'rules',
    topic: 'Highway Driving',
    question: 'What is the purpose of the decelerating ramp lane on a highway exit?',
    options: [
      'To pass slower vehicles on the right.',
      'To slow down safely after exiting the main travel lanes, rather than braking in high-speed highway traffic.',
      'To stop and verify your GPS directions.',
      'For emergency parking only.'
    ],
    correctAnswer: 1,
    explanation: 'Drivers should signal and move into the deceleration lane before applying brakes to slow down, avoiding unexpected deceleration on the main freeway.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Freeway Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-49',
    category: 'rules',
    topic: 'Adverse Weather & Skids',
    question: 'Why are bridge surfaces and highway overpasses more hazardous during freezing temperatures than regular roadway pavement?',
    options: [
      'Bridges are narrower.',
      'Cold air circulates both above and below the bridge deck, causing bridges to freeze before adjacent roadway surfaces.',
      'Bridges have poor drainage.',
      'Salt cannot be applied to bridges.'
    ],
    correctAnswer: 1,
    explanation: 'Bridge decks freeze earlier than ground-supported roadways because cold air circulates below the deck, removing heat from both sides.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Winter Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-50',
    category: 'rules',
    topic: 'Parking & Stopping',
    question: 'Unless signs permit it, within what distance of a pedestrian crosswalk or intersection is parking generally restricted?',
    options: [
      'Within 1 metre.',
      'Within 9 metres.',
      'Within 30 metres.',
      'Within 50 metres.'
    ],
    correctAnswer: 1,
    explanation: 'Under municipal traffic bylaws and provincial guidance, parking within 9 metres of an intersection or crosswalk is prohibited to maintain visibility.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Parking Rules",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-51',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'How long must you practice with your G1 licence in most cases before taking your first road test?',
    options: [
      '6 months in all cases.',
      '12 months in most cases (reduced to 8 months with an approved driver education course).',
      '24 months.',
      '3 years.'
    ],
    correctAnswer: 1,
    explanation: 'According to ontario.ca: "In most cases, you practice with your G1 licence for 12 months." You can take your first road test after 8 months if you complete an approved driver education course. You have up to five years to finish the whole process.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-52',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'Under Ontario G1 rules, who is permitted to sit in the front seat alongside the G1 driver?',
    options: [
      'Any passenger as long as all rear seats are filled.',
      'The accompanying licensed driver must be the only other person in the front seat.',
      'A certified driving instructor and a second student observer.',
      'No one is permitted in the front seat.'
    ],
    correctAnswer: 1,
    explanation: 'According to ontario.ca: "The driver accompanying you must be the only other person in the front seat."',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Get a G driver\x27s licence: new drivers"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-53',
    category: 'rules',
    topic: 'Demerit Points & Penalties',
    question: 'For a novice driver (G1, G2), at what demerit point threshold is a warning letter issued by the Ministry?',
    options: [
      '2 to 5 demerit points.',
      '6 to 8 demerit points.',
      '9 or more demerit points.',
      '15 demerit points.'
    ],
    correctAnswer: 0,
    explanation: 'Under Ontario\x27s demerit point system for novice drivers: 2 to 5 points triggers a warning letter; 6 to 8 points triggers a second warning letter; 9 or more points results in a 60-day licence suspension.',
    difficulty: 'medium',
    sourceReference: 'ontario.ca, "Understanding demerit points"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-54',
    category: 'rules',
    topic: 'Seat Belts & Child Safety',
    question: 'Who is legally responsible in Ontario for ensuring that passengers under 16 years of age wear seat belts?',
    options: [
      'The passengers themselves.',
      'The driver of the vehicle.',
      'The owner of the vehicle even if not driving.',
      'The police officer.'
    ],
    correctAnswer: 1,
    explanation: 'Drivers are legally responsible for ensuring that all passengers under the age of 16 are properly secured in an appropriate seatbelt or child car seat.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Seatbelts",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-55',
    category: 'rules',
    topic: 'Turning & Lane Changes',
    question: 'When approaching an intersection to turn right, when should you move into the curb lane?',
    options: [
      'At the last second directly at the corner.',
      'Well in advance after checking mirrors, signaling, and checking blind spot for cyclists.',
      'Only when the light turns green.',
      'From the center lane.'
    ],
    correctAnswer: 1,
    explanation: 'Move into the right-hand lane well in advance of the intersection after signaling and checking your blind spot to ensure no cyclists or pedestrians are beside you.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Turns: Right Turns",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-56',
    category: 'rules',
    topic: 'Speed & Following Distances',
    question: 'If you are driving at the posted speed limit but severe rain reduces visibility to 50 metres, what should you do?',
    options: [
      'Continue at the speed limit because it is the posted legal speed.',
      'Reduce your speed to match the hazardous road and visibility conditions.',
      'Stop on the traveled highway.',
      'Turn on high-beam headlights.'
    ],
    correctAnswer: 1,
    explanation: 'Posted speed limits apply to ideal conditions. In adverse weather, drivers must reduce their speed to maintain vehicle control and safe stopping distance.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Safe and Responsible Driving",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-57',
    category: 'rules',
    topic: 'Intersections & Right-of-Way',
    question: 'When two vehicles approach an intersection from opposite directions and both signal to turn left, how should they pass each other?',
    options: [
      'Around each other, turning behind each other\'s vehicle.',
      'In front of each other, keeping each other on the right.',
      'The vehicle with higher speed turns first.',
      'Both must continue straight.'
    ],
    correctAnswer: 1,
    explanation: 'When two opposing vehicles both turn left at an intersection, they should turn in front of each other so that neither driver\'s path crosses behind the other.',
    difficulty: 'medium',
    sourceReference: "Official MTO Driver's Handbook - Turning Left",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-58',
    category: 'rules',
    topic: 'Sharing the Road',
    question: 'When following a motorcycle, why should you allow a greater following distance than behind a passenger car?',
    options: [
      'Motorcycles travel slower than cars.',
      'Motorcycles can stop much more rapidly, and road hazards like potholes or wet painted lines can cause sudden maneuvers.',
      'Motorcycles have larger blind spots.',
      'Motorcycle taillights are invisible during day.'
    ],
    correctAnswer: 1,
    explanation: 'Motorcycles are lightweight and can stop in shorter distances than cars; road debris and slippery surfaces can cause sudden loss of balance.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Sharing the Road: Motorcycles",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  },
  {
    id: 'rule-59',
    category: 'rules',
    topic: 'Emergency Vehicles & Sirens',
    question: 'If you are in the middle of an intersection when an emergency vehicle with active siren approaches, what should you do?',
    options: [
      'Stop immediately where you are in the middle of the intersection.',
      'Proceed cleanly through the intersection, clear the intersection, and then move to the right and stop.',
      'Make an immediate U-turn to reverse direction.',
      'Accelerate and turn left across traffic.'
    ],
    correctAnswer: 1,
    explanation: 'When an emergency vehicle approaches, you must move to the right side of the road "clear of any intersection," then stop. If already in an intersection, proceed through and clear the intersection before stopping.',
    difficulty: 'easy',
    sourceReference: 'ontario.ca, "Driving near emergency vehicles, tow trucks and work vehicles"',
    verificationStatus: 'verified',
    lastVerificationDate: '2026-10-15'
  },
  {
    id: 'rule-60',
    category: 'rules',
    topic: 'G1 Licensing Conditions',
    question: 'What is the rule regarding operating commercial tow trucks, heavy buses, or motorcycles while holding only an Ontario G1 licence?',
    options: [
      'G1 drivers may operate any vehicle under 10,000 kg.',
      'G1 licences apply only to Class G passenger vehicles; you cannot operate motorcycles, commercial buses, or heavy commercial vehicles without proper class licensing.',
      'G1 drivers may ride motorcycles during daytime.',
      'G1 drivers may drive commercial school buses if empty.'
    ],
    correctAnswer: 1,
    explanation: 'A Class G1 licence is a learner permit specifically for Class G passenger automobiles, vans, and small trucks. It does not permit driving commercial trucks, buses, or motorcycles.',
    difficulty: 'easy',
    sourceReference: "Official MTO Driver's Handbook - Licence Classes",
    verificationStatus: 'source-cited',
    lastVerificationDate: '2026-03-15'
  }
];

// Helper functions for question filtering and quiz assembly
export const getQuestionsByCategory = (category: 'signs' | 'rules'): Question[] => {
  return QUESTIONS.filter(q => q.category === category);
};

export const getQuestionsByTopic = (topic: string): Question[] => {
  return QUESTIONS.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
};

export const getQuestionById = (id: string): Question | undefined => {
  return QUESTIONS.find(q => q.id === id);
};

export const getFullG1ExamQuestions = (): { signs: Question[]; rules: Question[] } => {
  const signs = [...getQuestionsByCategory('signs')].sort(() => 0.5 - Math.random()).slice(0, 20);
  const rules = [...getQuestionsByCategory('rules')].sort(() => 0.5 - Math.random()).slice(0, 20);
  return { signs, rules };
};
