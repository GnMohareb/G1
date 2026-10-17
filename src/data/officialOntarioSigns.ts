import { RoadSignCatalogItem } from '../types';

/**
 * Official Ontario Signs Database Module
 *
 * Source: Ontario Ministry of Transportation (MTO) Driver's Handbook,
 * Ontario Highway Traffic Act (HTA), and Ontario Traffic Manual (OTM Books 5, 6, 7 & 8).
 *
 * Covers standard provincial categories:
 * - Regulatory (OTM Book 5 / HTA): Enforces laws and regulations.
 * - Warning (OTM Book 6): Alerts drivers to road hazards and conditions ahead.
 * - Temporary Conditions / Construction (OTM Book 7): Warns of construction, maintenance, and work zones.
 * - Information & Services (OTM Book 8): Directional, route, and highway assistance guidance.
 */

export const OFFICIAL_ONTARIO_SIGNS: RoadSignCatalogItem[] = [
  // =========================================================================
  // 1. REGULATORY SIGNS (Ontario Traffic Manual Book 5 / Highway Traffic Act)
  // =========================================================================
  {
    id: 'ont-stop',
    signType: 'stop',
    name: 'Stop Sign',
    category: 'regulatory',
    code: 'MTO R-1',
    shapeAndColor: 'Red regular octagon (8 sides) with white border and bold white lettering',
    meaning: 'Come to a complete stop before the stop line, marked crosswalk, or edge of the sidewalk/intersection.',
    driverAction: 'Bring the vehicle to a complete, motionless stop. Check left, center, right, and left again. Yield right-of-way to all crossing pedestrians and vehicles before proceeding.',
    officialMtoRef: 'Ontario HTA Section 136(1) & MTO Driver’s Handbook',
    legalConsequence: 'Disobeying a stop sign carries 3 demerit points and a fine of $110 to $500 ($180 in community safety zones).',
    g1TestTip: 'A rolling stop is illegal in Ontario. Your wheels must come to a complete dead stop behind the painted line or sidewalk before creeping forward.'
  },
  {
    id: 'ont-all-way-stop',
    signType: 'all_way_stop',
    name: 'All-Way Stop Sign',
    category: 'regulatory',
    code: 'MTO R-1 + R-1-t',
    shapeAndColor: 'Red regular octagon with white STOP lettering plus a red rectangular plaque below with white "ALL WAY" text',
    meaning: 'All approaches to this intersection are controlled by stop signs. Right-of-way is determined strictly by arrival order.',
    driverAction: 'Come to a complete motionless stop. The first vehicle that came to a complete stop has the right-of-way to proceed first. If two vehicles reach a complete stop at the exact same moment, yield to the vehicle on your right.',
    officialMtoRef: 'Ontario HTA Section 136(2) & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield right-of-way at an all-way stop carries 3 demerit points and a fine of $110.',
    g1TestTip: 'Frequently tested on the G1: if two vehicles arrive simultaneously at an all-way stop, the driver on the left MUST yield to the driver on the right.'
  },
  {
    id: 'ont-yield',
    signType: 'yield',
    name: 'Yield Sign',
    category: 'regulatory',
    code: 'MTO RA-2',
    shapeAndColor: 'Inverted equilateral triangle (apex pointing down) with thick red border and white interior',
    meaning: 'You must give the right-of-way to all incoming traffic, pedestrians, and cyclists already in or near the intersection.',
    driverAction: 'Slow down smoothly, scan both directions, and be prepared to stop if another vehicle or pedestrian is near your path. Merge only when a safe gap exists.',
    officialMtoRef: 'Ontario HTA Section 138 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield carries 3 demerit points and a fine of $110.',
    g1TestTip: 'You do not have to come to a complete stop at a yield sign IF the road is completely clear, but you must be going slow enough to stop if necessary.'
  },
  {
    id: 'ont-do-not-enter',
    signType: 'do_not_enter',
    name: 'Do Not Enter',
    category: 'regulatory',
    code: 'MTO Rb-19',
    shapeAndColor: 'White square with a solid red circle containing a horizontal white bar across the center',
    meaning: 'Traffic flows towards you on this roadway, highway ramp, or lane. Entry from this direction is strictly forbidden.',
    driverAction: 'Never enter a ramp, street, or lane facing this sign. If encountered accidentally, immediately stop safely, signal, and reverse or turn around without entering oncoming lanes.',
    officialMtoRef: 'Ontario HTA Section 153 & MTO Driver’s Handbook',
    legalConsequence: 'Driving the wrong way carries 3 demerit points and fines up to $500.',
    g1TestTip: 'Commonly found at expressway exit ramps, one-way streets, and transit-only access points to prevent head-on collisions.'
  },
  {
    id: 'ont-one-way-right',
    signType: 'one_way_right',
    name: 'One Way Traffic',
    category: 'regulatory',
    code: 'MTO Rb-21',
    shapeAndColor: 'Black horizontal rectangle containing a bold white directional arrow with "ONE WAY" lettering',
    meaning: 'Vehicular traffic is legally permitted to move in only one direction along this roadway.',
    driverAction: 'Travel only in the direction pointed by the arrow. When turning onto this street, turn into the nearest curb lane.',
    officialMtoRef: 'Ontario HTA Section 153 & MTO Driver’s Handbook',
    legalConsequence: 'Driving in the opposite direction on a one-way street carries 3 demerit points and a $110 fine.',
    g1TestTip: 'Remember: When turning left from a one-way street onto another one-way street, you must turn from the extreme left lane into the extreme left lane.'
  },
  {
    id: 'ont-no-left-turn',
    signType: 'no_left_turn',
    name: 'No Left Turn',
    category: 'regulatory',
    code: 'MTO Rb-12',
    shapeAndColor: 'White square, black 90-degree left arrow, red prohibition circle with 45-degree diagonal slash',
    meaning: 'Left turns are strictly prohibited at this intersection, driveway, or cross-street.',
    driverAction: 'Do not attempt a left turn. Proceed straight through or turn right if permitted, and find an alternate route downstream.',
    officialMtoRef: 'Ontario HTA Section 142 & MTO Driver’s Handbook',
    legalConsequence: 'Disobeying a turn prohibition sign carries 2 demerit points and a $110 fine.',
    g1TestTip: 'In Ontario traffic signage, a red circle with a diagonal slash always means PROHIBITED (action cannot be done).'
  },
  {
    id: 'ont-no-right-turn',
    signType: 'no_right_turn',
    name: 'No Right Turn',
    category: 'regulatory',
    code: 'MTO Rb-11',
    shapeAndColor: 'White square, black 90-degree right arrow, red prohibition circle with 45-degree diagonal slash',
    meaning: 'Right turns are prohibited at this location, either at all times or during posted signal phases.',
    driverAction: 'Maintain current travel path. Do not turn right. Proceed straight or as directed by lane assignment markings.',
    officialMtoRef: 'Ontario HTA Section 142 & MTO Driver’s Handbook',
    legalConsequence: 'Disobeying sign carries 2 demerit points and a $110 fine.',
    g1TestTip: 'Watch for supplemental tabs underneath, such as "ON RED", which means right turns on a red light are prohibited at that intersection.'
  },
  {
    id: 'ont-no-u-turn',
    signType: 'no_u_turn',
    name: 'No U-Turn',
    category: 'regulatory',
    code: 'MTO Rb-13',
    shapeAndColor: 'White square, black inverted U-arrow, red prohibition circle with diagonal slash',
    meaning: 'You cannot make a 180-degree U-turn to reverse your direction of travel at this location.',
    driverAction: 'Do not execute a U-turn. Continue forward to a safe side street or around the block to reverse direction safely.',
    officialMtoRef: 'Ontario HTA Section 143 & MTO Driver’s Handbook',
    legalConsequence: 'Executing an illegal U-turn carries 2 demerit points and a $110 fine.',
    g1TestTip: 'Under Ontario law, U-turns are also illegal within 150 metres of a bridge, curve, railway crossing, or crest of a hill where visibility is less than 150 m.'
  },
  {
    id: 'ont-green-arrow-turn',
    signType: 'green_arrow_turn',
    name: 'Permissive Left Turn (Compulsory Movement)',
    category: 'regulatory',
    code: 'MTO Rb-10 / MUTCDC',
    shapeAndColor: 'White square with a vibrant green circle enclosing a black directional turning arrow',
    meaning: 'The directional movement shown inside the green ring is permitted or compulsory from this lane.',
    driverAction: 'Execute the specified movement safely after checking for cross-pedestrians and oncoming traffic.',
    officialMtoRef: 'Ontario Traffic Manual Book 5 & MTO Driver’s Handbook',
    legalConsequence: 'Disobeying lane designation or movement signs carries 2 demerit points and a $110 fine.',
    g1TestTip: 'Ontario standard distinction: A GREEN CIRCLE means the movement IS permitted or mandatory. A RED CIRCLE with a slash means PROHIBITED.'
  },
  {
    id: 'ont-maximum-50',
    signType: 'maximum_50',
    name: 'Maximum Speed 50 km/h (Urban Default)',
    category: 'regulatory',
    code: 'MTO Rb-1 (50)',
    shapeAndColor: 'White vertical rectangle with black border, "MAXIMUM" at top, bold numeral "50", and "km/h" at bottom',
    meaning: 'The maximum legal speed under ideal road and weather conditions is 50 kilometres per hour.',
    driverAction: 'Maintain speedometer at or below 50 km/h. Decelerate further in school zones, wet weather, snow, or heavy traffic.',
    officialMtoRef: 'Ontario HTA Section 128(1) & MTO Driver’s Handbook',
    legalConsequence: 'Speeding fines escalate with km/h over limit; 16-29 km/h over = 3 demerit points, 30-49 km/h over = 4 demerit points.',
    g1TestTip: 'Unless otherwise posted, the statutory default speed limit within Ontario cities, towns, and built-up areas is 50 km/h.'
  },
  {
    id: 'ont-maximum-80',
    signType: 'maximum_80',
    name: 'Maximum Speed 80 km/h (Rural Default)',
    category: 'regulatory',
    code: 'MTO Rb-1 (80)',
    shapeAndColor: 'White vertical rectangle with black border, "MAXIMUM", bold numeral "80", and "km/h"',
    meaning: 'The maximum legal speed is 80 kilometres per hour under ideal conditions.',
    driverAction: 'Drive at or below 80 km/h. Maintain at least a 2-second following distance behind vehicles ahead.',
    officialMtoRef: 'Ontario HTA Section 128(2) & MTO Driver’s Handbook',
    legalConsequence: 'Speeding penalties apply under HTA Sec. 128.',
    g1TestTip: 'Unless otherwise posted, the statutory default speed limit on rural roads and secondary provincial highways outside cities and towns is 80 km/h.'
  },
  {
    id: 'ont-maximum-100',
    signType: 'maximum_100',
    name: 'Maximum Speed 100 km/h (Provincial Expressway)',
    category: 'regulatory',
    code: 'MTO Rb-1 (100)',
    shapeAndColor: 'White vertical rectangle with black border, "MAXIMUM", bold numeral "100", and "km/h"',
    meaning: 'Maximum legal speed is 100 km/h on high-speed provincial expressways (400-series highways and QEW).',
    driverAction: 'Travel at or below 100 km/h. Keep to the right lanes unless actively overtaking slower vehicles. Maintain a 3 to 4-second gap at highway speeds.',
    officialMtoRef: 'Ontario HTA Section 128 & MTO Driver’s Handbook',
    legalConsequence: 'Exceeding limit by 50 km/h or more constitutes Stunt Driving under HTA Sec. 172 (immediate 30-day licence suspension, 14-day vehicle impoundment).',
    g1TestTip: 'Remember that novice G1 drivers are strictly prohibited from driving on 400-series highways and expressways with speed limits over 80 km/h unless accompanied by a licensed driving instructor.'
  },
  {
    id: 'ont-keep-right',
    signType: 'keep_right',
    name: 'Keep Right of Obstacle / Divider',
    category: 'regulatory',
    code: 'MTO Rb-25',
    shapeAndColor: 'White vertical rectangle, black obstacle island at bottom-center, thick arrow curving to the right',
    meaning: 'All oncoming vehicles must keep to the right side of the upcoming median barrier, pedestrian island, or channelized divider.',
    driverAction: 'Steer right of the physical concrete curb, island, or painted median. Never pass on the left of this sign.',
    officialMtoRef: 'Ontario HTA Section 154 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to keep right carries 2 demerit points and a fine of $110.',
    g1TestTip: 'Commonly posted at the approach to divided medians, pedestrian refuge islands, and dual-carriageway splits.'
  },
  {
    id: 'ont-slower-traffic-keep-right',
    signType: 'slower_traffic_keep_right',
    name: 'Slower Traffic Keep Right',
    category: 'regulatory',
    code: 'MTO Rb-34',
    shapeAndColor: 'White vertical rectangle with bold black text "SLOWER TRAFFIC KEEP RIGHT"',
    meaning: 'Vehicles travelling at less than the normal speed of traffic must drive in the rightmost lane.',
    driverAction: 'If you are driving slower than the flow of surrounding traffic, move into the right lane so faster vehicles can pass safely on the left.',
    officialMtoRef: 'Ontario HTA Section 147 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to keep right when travelling slowly carries a $110 fine.',
    g1TestTip: 'Ontario law requires drivers moving slower than other vehicles on multi-lane highways to keep right, regardless of posted limit.'
  },
  {
    id: 'ont-pass-with-care',
    signType: 'pass_with_care',
    name: 'Pass With Care',
    category: 'regulatory',
    code: 'MTO Rb-35',
    shapeAndColor: 'White vertical rectangle with black text "PASS WITH CARE"',
    meaning: 'Marks the end of a no-passing zone on a two-lane road. Passing is permitted when safe and clear.',
    driverAction: 'You may pass slower vehicles if sightlines are unobstructed, the oncoming lane is clear of traffic, and no road hazards exist.',
    officialMtoRef: 'Ontario HTA Section 148 & MTO Driver’s Handbook',
    legalConsequence: 'Passing unsafely or off the roadway carries 3 demerit points.',
    g1TestTip: 'Only overtake when you have full visibility of at least 150 metres of clear road ahead.'
  },
  {
    id: 'ont-do-not-pass',
    signType: 'do_not_pass',
    name: 'Do Not Pass',
    category: 'regulatory',
    code: 'MTO Rb-31',
    shapeAndColor: 'White vertical rectangle with black text "DO NOT PASS"',
    meaning: 'Passing any vehicle travelling in the same direction is prohibited along this section of roadway.',
    driverAction: 'Stay in your lane behind leading vehicles. Do not cross the centerline or pull out to overtake.',
    officialMtoRef: 'Ontario HTA Section 148 & MTO Driver’s Handbook',
    legalConsequence: 'Passing in a prohibited zone carries 3 demerit points and a $110 fine.',
    g1TestTip: 'Commonly placed before crests of hills, blind curves, and railway approaches where overtaking is extremely dangerous.'
  },
  {
    id: 'ont-no-parking',
    signType: 'no_parking',
    name: 'No Parking',
    category: 'regulatory',
    code: 'MTO Rb-51',
    shapeAndColor: 'White square, bold black letter "P", red circle with 45-degree diagonal slash',
    meaning: 'You may stop temporarily to load or unload passengers or merchandise, but you cannot leave the vehicle unattended or parked.',
    driverAction: 'Do not park or leave the car. You may briefly discharge or pick up passengers while remaining in the driver’s seat.',
    officialMtoRef: 'Ontario HTA Section 170 & Municipal Traffic By-laws',
    legalConsequence: 'Subject to municipal parking infraction notice and vehicle towing.',
    g1TestTip: 'Difference on G1 test: No Parking permits brief loading/unloading of passengers or goods. No Stopping forbids any stop whatsoever.'
  },
  {
    id: 'ont-no-stopping',
    signType: 'no_stopping',
    name: 'No Stopping',
    category: 'regulatory',
    code: 'MTO Rb-52',
    shapeAndColor: 'White square, red circle with two crossed diagonal red bars (an "X" inside the red circle)',
    meaning: 'No stopping at any time for any reason except to obey a police officer, crossing guard, or traffic control signal.',
    driverAction: 'Keep moving. Never pull over, idle, wait, or drop off passengers along this curb.',
    officialMtoRef: 'Ontario HTA Section 170 & Municipal By-laws',
    legalConsequence: 'Strict liability municipal ticket and immediate vehicle towing.',
    g1TestTip: 'No Stopping is the strictest curb restriction in Ontario. You cannot even stop for 5 seconds to let someone out of the car.'
  },
  {
    id: 'ont-no-standing',
    signType: 'no_standing',
    name: 'No Standing',
    category: 'regulatory',
    code: 'MTO Rb-53',
    shapeAndColor: 'White square, black passenger car silhouette, red circle with diagonal slash',
    meaning: 'You may halt only to immediately pick up or drop off passengers, but you cannot load or unload goods or leave the vehicle.',
    driverAction: 'Do not load cargo or merchandise. Stop only long enough for passengers to enter or exit the vehicle.',
    officialMtoRef: 'Ontario HTA Section 170 & Municipal Traffic By-laws',
    legalConsequence: 'Municipal parking ticket and vehicle tow fee.',
    g1TestTip: 'Order of severity in Ontario curb rules: No Stopping (strictest) > No Standing > No Parking.'
  },
  {
    id: 'ont-no-bicycles',
    signType: 'no_bicycles',
    name: 'No Bicycles Permitted',
    category: 'regulatory',
    code: 'MTO Rb-68',
    shapeAndColor: 'White square, black bicycle silhouette, red circle with 45-degree diagonal slash',
    meaning: 'Bicycles and cycling are strictly prohibited on this roadway, freeway, or pedestrian pathway.',
    driverAction: 'Cyclists must dismount and use alternate municipal bike routes or secondary streets.',
    officialMtoRef: 'Ontario HTA Section 185(2) & MTO Driver’s Handbook',
    legalConsequence: 'HTA fine of $110 for operating prohibited conveyance.',
    g1TestTip: 'Standard on Ontario 400-series freeways and controlled-access expressway ramps where slow-moving bicycles are hazardous.'
  },
  {
    id: 'ont-no-pedestrians',
    signType: 'no_pedestrians',
    name: 'No Pedestrians Permitted',
    category: 'regulatory',
    code: 'MTO Rb-67',
    shapeAndColor: 'White square, black pedestrian silhouette, red circle with diagonal slash',
    meaning: 'Pedestrians are prohibited on this roadway, expressway, bridge, or highway ramp.',
    driverAction: 'Drivers should be aware that pedestrians are strictly barred; pedestrians must seek designated sidewalks or overpasses.',
    officialMtoRef: 'Ontario HTA Section 185(1) & MTO Driver’s Handbook',
    legalConsequence: 'HTA violation fine for pedestrians on controlled-access highways.',
    g1TestTip: 'Posted along all 400-series highway on-ramps to protect pedestrians from high-speed vehicular traffic.'
  },
  {
    id: 'ont-transit-priority',
    signType: 'transit_priority_signal',
    name: 'Transit Priority Signal (White Bar)',
    category: 'regulatory',
    code: 'MTO Signal Regulation',
    shapeAndColor: 'Traffic signal head showing a luminous vertical white bar on a dark circular lens',
    meaning: 'Indicates that public transit buses have exclusive right to proceed straight or turn before regular vehicular traffic.',
    driverAction: 'Regular passenger cars must remain stopped at the red signal until their circular green light illuminates.',
    officialMtoRef: 'Ontario HTA Section 144(19) & MTO Driver’s Handbook',
    legalConsequence: 'Proceeding through a transit priority signal as a regular driver is treated as running a red light (3 demerit points, $325 fine).',
    g1TestTip: 'Only public transit buses may proceed on the vertical white bar. Passenger cars must never proceed on a transit signal.'
  },

  // =========================================================================
  // 2. WARNING SIGNS (Ontario Traffic Manual Book 6 / Driver's Handbook)
  // =========================================================================
  {
    id: 'ont-traffic-signal-ahead',
    signType: 'traffic_signal_ahead',
    name: 'Traffic Signal Ahead',
    category: 'warning',
    code: 'MTO Wa-1',
    shapeAndColor: 'Yellow diamond with a 3-light traffic signal graphic (red, amber, green circular lenses)',
    meaning: 'Warns that an intersection controlled by traffic signal lights is located ahead, possibly obscured by a curve or crest.',
    driverAction: 'Ease off the accelerator and prepare to decelerate or stop if the light changes to amber or red.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Running a red light at the upcoming signal carries 3 demerit points and a $325 fine.',
    g1TestTip: 'Often installed on high-speed rural roads or after blind curves where drivers have reduced sight distance to the intersection.'
  },
  {
    id: 'ont-stop-ahead',
    signType: 'stop_sign_ahead',
    name: 'Stop Sign Ahead',
    category: 'warning',
    code: 'MTO Wa-1A',
    shapeAndColor: 'Yellow diamond with a miniature red STOP octagon and a black arrow pointing straight up',
    meaning: 'A stop sign is situated ahead around a curve, over a crest, or at an upcoming intersection.',
    driverAction: 'Begin slowing down now so you are prepared to come to a smooth, complete stop at the stop line.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to stop at the upcoming stop sign carries 3 demerit points.',
    g1TestTip: 'Do not wait until you see the actual stop sign to brake. Begin feathering the brakes upon seeing this warning.'
  },
  {
    id: 'ont-yield-ahead',
    signType: 'yield_ahead',
    name: 'Yield Sign Ahead',
    category: 'warning',
    code: 'MTO Wa-2A',
    shapeAndColor: 'Yellow diamond with a miniature red-and-white yield triangle and a black arrow pointing straight up',
    meaning: 'A yield sign is situated ahead where you must give right-of-way to other traffic.',
    driverAction: 'Check oncoming and cross traffic early. Reduce speed so you can yield without sudden braking.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield carries 3 demerit points.',
    g1TestTip: 'Commonly posted on high-speed channelized right-turn lanes and highway entrance ramps.'
  },
  {
    id: 'ont-sharp-curve-right',
    signType: 'sharp_curve_right',
    name: 'Sharp Curve Right Ahead',
    category: 'warning',
    code: 'MTO Wa-3',
    shapeAndColor: 'Yellow diamond with a black arrow bending at a sharp right angle',
    meaning: 'The roadway turns sharply to the right. A severe speed reduction is necessary to negotiate the curve safely.',
    driverAction: 'Brake before entering the curve. Do not brake hard during the turn. Accelerate gently only as you exit.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Losing control due to excessive speed on curves can lead to careless driving charges (6 demerit points).',
    g1TestTip: 'Always slow down BEFORE turning the steering wheel into the curve, never while inside the sharpest radius.'
  },
  {
    id: 'ont-winding-road',
    signType: 'winding_road',
    name: 'Winding Road Ahead',
    category: 'warning',
    code: 'MTO Wa-5',
    shapeAndColor: 'Yellow diamond with an S-shaped curving arrow pointing upward with 3 or more curves',
    meaning: 'A series of three or more consecutive curves begins ahead on this roadway.',
    driverAction: 'Reduce speed, maintain lane discipline, avoid crossing the centerline, and look ahead through each curve.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Crossing centerline into oncoming traffic carries 3 demerit points.',
    g1TestTip: 'The first curve in the sequence turns in the direction of the bottom bend of the arrow.'
  },
  {
    id: 'ont-hidden-intersection',
    signType: 'hidden_intersection',
    name: 'Hidden Intersection / Side Road Ahead',
    category: 'warning',
    code: 'MTO Wa-11',
    shapeAndColor: 'Yellow diamond with a bold black T or cross symbol showing a concealed side road entering',
    meaning: 'A concealed intersection or side road enters the roadway ahead where cross visibility is obscured.',
    driverAction: 'Scan the roadside, watch for vehicles entering or turning from the obscured driveway or side street.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Standard right-of-way and safe following distance laws apply.',
    g1TestTip: 'Drivers on the side road may have limited sight distance; be prepared to react if they pull out unexpectedly.'
  },
  {
    id: 'ont-railway-advance',
    signType: 'railway_advance_warning',
    name: 'Railway Crossing Advance Warning',
    category: 'warning',
    code: 'MTO Wa-18A',
    shapeAndColor: 'Yellow circular disc with black border, bold black "X", and letters "R" and "R" in left and right quadrants',
    meaning: 'Warns that railway tracks cross the roadway ahead. Trains cannot stop quickly; be prepared to yield or stop.',
    driverAction: 'Look in both directions and listen for whistles. Never stop on the tracks or race a train.',
    officialMtoRef: 'Ontario HTA Section 163 & MTO Driver’s Handbook',
    legalConsequence: 'Disobeying railway crossing signals carries 3 demerit points and a fine of $110 to $500.',
    g1TestTip: 'Tested on G1: School buses and certain commercial vehicles carrying flammable goods MUST stop at all railway crossings, even when empty.'
  },
  {
    id: 'ont-railway-crossing',
    signType: 'railway_crossing',
    name: 'Railway Crossing Crossbuck',
    category: 'warning',
    code: 'MTO Wa-18',
    shapeAndColor: 'White X-shaped crossbuck with bold red border (and optional red "RAILWAY CROSSING" lettering)',
    meaning: 'Railway tracks are located at this exact position. Marks the immediate crossing boundary.',
    driverAction: 'Stop at least 5 metres back from the nearest rail if a train is approaching or if warning signals/bells activate.',
    officialMtoRef: 'Ontario HTA Section 163 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to stop at railway crossing carries 3 demerit points.',
    g1TestTip: 'Under Ontario law, you must stop at least 5 metres (15 feet) from the nearest rail when lights flash or gates lower.'
  },
  {
    id: 'ont-narrow-structure',
    signType: 'narrow_structure_ahead',
    name: 'Narrow Structure / Road Narrows',
    category: 'warning',
    code: 'MTO Wa-22',
    shapeAndColor: 'Yellow diamond with two vertical lines narrowing symmetrically in the center',
    meaning: 'The roadway or bridge ahead is narrower than the road you are currently travelling on.',
    driverAction: 'Slow down, align vehicle squarely between lane markings, and give approaching wide vehicles extra room.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Safe lane keeping rules apply under HTA Section 154.',
    g1TestTip: 'Large trucks or agricultural machinery may take up more than half the bridge deck; be prepared to wait if necessary.'
  },
  {
    id: 'ont-lane-ends',
    signType: 'lane_ends',
    name: 'Right Lane Ends (Merge Left)',
    category: 'warning',
    code: 'MTO Wa-23',
    shapeAndColor: 'Yellow diamond with a straight left line and a right line tapering 45 degrees into the center',
    meaning: 'The right lane is terminating ahead. Traffic in the right lane must merge safely into the left adjacent lane.',
    driverAction: 'Signal, check mirrors, check shoulder blind spot, and merge safely into the left lane before your lane ends.',
    officialMtoRef: 'Ontario HTA Section 154 & MTO Driver’s Handbook',
    legalConsequence: 'Improper lane change carries 3 demerit points and a $110 fine.',
    g1TestTip: 'Drivers in the ending lane must yield right-of-way to vehicles already established in the continuous through lane.'
  },
  {
    id: 'ont-slippery-when-wet',
    signType: 'slippery_when_wet',
    name: 'Slippery When Wet',
    category: 'warning',
    code: 'MTO Wa-24',
    shapeAndColor: 'Yellow diamond with rear silhouette of a passenger car with wavy crossed tire skid marks beneath',
    meaning: 'Pavement traction drops significantly when wet, rainy, or icy. Risk of skidding and hydroplaning is elevated.',
    driverAction: 'Reduce cruising speed, increase following distance to at least 4 seconds, and avoid abrupt steering, acceleration, or heavy braking.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Driving too fast for road conditions carries 3 demerit points under HTA Section 130.',
    g1TestTip: 'Roads are most slippery during the first 10-15 minutes after rainfall begins, as oil and grease on the asphalt float to the surface.'
  },
  {
    id: 'ont-steep-hill',
    signType: 'steep_hill_downward',
    name: 'Steep Hill Downward Ahead',
    category: 'warning',
    code: 'MTO Wa-25',
    shapeAndColor: 'Yellow diamond with an incline wedge and a truck descending a steep downward slope',
    meaning: 'A steep downward hill grade begins ahead. Heavy vehicles and cars may gather speed rapidly.',
    driverAction: 'Shift to a lower gear before starting down the hill to use engine braking, preventing brake overheating and brake fade.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Vehicle equipment and brake maintenance enforced under HTA Section 64.',
    g1TestTip: 'Do not ride your brakes all the way down a long hill; shift into a lower transmission gear to control your speed.'
  },
  {
    id: 'ont-low-clearance',
    signType: 'low_clearance',
    name: 'Low Clearance Overhead',
    category: 'warning',
    code: 'MTO Wa-26',
    shapeAndColor: 'Yellow diamond with arrows pointing up and down from the center measurement (e.g., "3.8 m")',
    meaning: 'The overhead bridge, tunnel, or structure has limited vertical clearance as stated in metres.',
    driverAction: 'Do not enter if your vehicle or load exceeds the posted height. High-profile vehicles must detour.',
    officialMtoRef: 'Ontario HTA Section 109 & MTO Driver’s Handbook',
    legalConsequence: 'Striking an overhead structure results in heavy fines, licence suspension, and structural liability costs.',
    g1TestTip: 'Ontario signs use metric height in metres (e.g., 3.8 m). 3.8 m is approximately 12.5 feet.'
  },
  {
    id: 'ont-two-way-traffic',
    signType: 'two_way_traffic',
    name: 'Two-Way Traffic Ahead',
    category: 'warning',
    code: 'MTO Wa-27',
    shapeAndColor: 'Yellow diamond with two vertical opposing arrows: left arrow points down, right arrow points up',
    meaning: 'You are leaving a one-way street or divided highway and entering a roadway with two-way opposing traffic.',
    driverAction: 'Stay to the right half of the road and watch for oncoming opposing vehicles sharing the same roadway.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 (Wa-27) & MTO Driver’s Handbook',
    legalConsequence: 'Driving on wrong side of roadway carries 3 demerit points.',
    g1TestTip: 'Frequently appears when approaching the end of a one-way street or when a dual highway transitions to a two-lane rural road.'
  },
  {
    id: 'ont-deer-crossing',
    signType: 'deer_crossing',
    name: 'Deer / Wild Animal Crossing',
    category: 'warning',
    code: 'MTO Wa-28',
    shapeAndColor: 'Yellow diamond with bold black silhouette of a leaping stag/deer',
    meaning: 'Deer and wild animals frequently cross the roadway in this area, particularly during twilight hours.',
    driverAction: 'Scan both shoulders of the road, especially at dusk and dawn. If you see one deer, slow down immediately as they travel in groups.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Standard safe vehicle operation rules apply.',
    g1TestTip: 'Do not swerve sharply into oncoming traffic or ditches to avoid a deer; brake firmly in a straight line.'
  },
  {
    id: 'ont-merge',
    signType: 'merge',
    name: 'Merge Warning',
    category: 'warning',
    code: 'MTO Wa-33',
    shapeAndColor: 'Yellow diamond with straight vertical arrow and an angled curved arrow merging in from the right',
    meaning: 'Traffic from another road or freeway on-ramp is merging into your flow of traffic from the right.',
    driverAction: 'Adjust speed or move over to the left lane if clear to allow merging vehicles to enter smoothly.',
    officialMtoRef: 'Ontario HTA Section 154 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield when merging carries 3 demerit points.',
    g1TestTip: 'Drivers on the highway should cooperate with merging drivers, but the driver on the ramp is legally responsible for merging safely.'
  },
  {
    id: 'ont-divided-highway-begins',
    signType: 'divided_highway_begins',
    name: 'Divided Highway Begins',
    category: 'warning',
    code: 'MTO Wa-34',
    shapeAndColor: 'Yellow diamond with solid black median divider island at the TOP and two curved opposing arrows',
    meaning: 'The roadway separates into two directional divided carriageways separated by a median barrier.',
    driverAction: 'Keep to the right of the upcoming center median barrier. Opposing oncoming traffic will now be separated.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 (Wa-34) & MTO Driver’s Handbook',
    legalConsequence: 'Driving on wrong side of divided highway barrier carries 3 demerit points and a fine up to $500.',
    g1TestTip: 'Crucial G1 question: Divided Highway BEGINS has the divider island at the TOP between diverging arrows.'
  },
  {
    id: 'ont-divided-highway-ends',
    signType: 'divided_highway_ends',
    name: 'Divided Highway Ends',
    category: 'warning',
    code: 'MTO Wa-35',
    shapeAndColor: 'Yellow diamond with solid black median divider island at the BOTTOM and two converging arrows',
    meaning: 'The physical divider ends and two-way undivided traffic resumes on a single roadway.',
    driverAction: 'Keep right and prepare for oncoming opposing vehicles sharing the same pavement without a physical barrier.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 (Wa-35) & MTO Driver’s Handbook',
    legalConsequence: 'Failing to keep right carries 2 demerit points.',
    g1TestTip: 'Crucial G1 question: Divided Highway ENDS has the divider island at the BOTTOM with converging arrows.'
  },
  {
    id: 'ont-roundabout-ahead',
    signType: 'roundabout_ahead',
    name: 'Roundabout Ahead',
    category: 'warning',
    code: 'MTO Wa-64',
    shapeAndColor: 'Yellow diamond with three counter-clockwise circular rotating arrows',
    meaning: 'A circular roundabout junction is ahead. Traffic circulates counter-clockwise around a central island.',
    driverAction: 'Choose your lane before entering, slow down, yield to both lanes of traffic already inside the roundabout from your left, and enter when clear.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield at roundabout entry carries 3 demerit points.',
    g1TestTip: 'Always yield to vehicles inside the roundabout (coming from your left). Never stop inside a roundabout unless to avoid a collision.'
  },
  {
    id: 'ont-school-zone',
    signType: 'school_zone',
    name: 'School Zone',
    category: 'warning',
    code: 'MTO Wa-101',
    shapeAndColor: 'Fluorescent Yellow-Green pentagon (schoolhouse shape pointing up) with silhouettes of two children walking left',
    meaning: 'A school zone or school crossing is located ahead. Children may be walking near or across the roadway.',
    driverAction: 'Slow down, scan both sidewalks, obey crossing guards, and look under parked cars for darting children.',
    officialMtoRef: 'Ontario HTA Section 176 & MTO Driver’s Handbook',
    legalConsequence: 'Fines for speeding and failing to yield to crossing guards are doubled in designated school safety zones.',
    g1TestTip: 'Ontario standard shape: School zone signs are ALWAYS a 5-sided pentagon with a pointed roof shape.'
  },
  {
    id: 'ont-playground-ahead',
    signType: 'playground_ahead',
    name: 'Playground Area Ahead',
    category: 'warning',
    code: 'MTO Wa-103',
    shapeAndColor: 'Fluorescent Yellow-Green or Yellow diamond with silhouette of a child running after a ball',
    meaning: 'A children’s public playground or recreational park borders the roadway ahead.',
    driverAction: 'Reduce speed, increase alertness, and expect children to chase balls or run into the street unexpectedly.',
    officialMtoRef: 'Ontario Traffic Manual Book 6 & MTO Driver’s Handbook',
    legalConsequence: 'Higher liability and fines in municipal park safety zones.',
    g1TestTip: 'Extra caution is required during daylight hours and summer weekends around playground zones.'
  },
  {
    id: 'ont-pedestrian-crossover',
    signType: 'pedestrian_crossover',
    name: 'Pedestrian Crossover (PXO)',
    category: 'warning',
    code: 'MTO Ra-4 / Wa-30',
    shapeAndColor: 'Yellow diamond (or overhead white rectangular sign) with pedestrian walking across road between horizontal bars',
    meaning: 'A marked pedestrian crossover is ahead where drivers must yield to pedestrians.',
    driverAction: 'Stop completely behind the white yield line when a pedestrian wishes to cross. You must wait until all pedestrians completely clear the road before proceeding.',
    officialMtoRef: 'Ontario HTA Section 140 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield at a pedestrian crossover carries 4 demerit points and a fine up to $1,000.',
    g1TestTip: 'At an Ontario Pedestrian Crossover (PXO), you cannot proceed until the pedestrian is completely off the roadway onto the opposite sidewalk.'
  },
  {
    id: 'ont-share-the-road',
    signType: 'share_the_road',
    name: 'Share the Road with Cyclists',
    category: 'warning',
    code: 'MTO Wb-102',
    shapeAndColor: 'Yellow diamond with black bicycle silhouette, plus attached yellow plate below reading "SHARE THE ROAD"',
    meaning: 'Cyclists regularly share this roadway with motor vehicles. Roads are shared public spaces.',
    driverAction: 'Leave a minimum 1-metre buffer space when passing a cyclist. Do not sound loud horns close behind bicycles.',
    officialMtoRef: 'Ontario HTA Section 148(6.1) & MTO Driver’s Handbook',
    legalConsequence: 'Failing to leave 1 metre when passing a cyclist carries 2 demerit points and a fine of $110 ($180 in community safety zones).',
    g1TestTip: 'Ontario’s 1-metre passing law (HTA 148(6.1)) requires drivers to maintain at least 1 metre of clearance between their vehicle and a cyclist.'
  },

  // =========================================================================
  // 3. TEMPORARY CONDITIONS & CONSTRUCTION (Ontario Traffic Manual Book 7)
  // =========================================================================
  {
    id: 'ont-construction-ahead',
    signType: 'construction_ahead',
    name: 'Road Work / Construction Ahead',
    category: 'temporary',
    code: 'MTO TC-2',
    shapeAndColor: 'Fluorescent Safety Orange diamond with black border and silhouette of worker digging with shovel',
    meaning: 'Road maintenance, paving, or utility excavation work is taking place on or adjacent to the roadway ahead.',
    driverAction: 'Slow down, scan for construction equipment, obey temporary lane shifts, and be prepared to stop for workers.',
    officialMtoRef: 'Ontario HTA Section 128(8) & OTM Book 7',
    legalConsequence: 'Speeding fines are legally doubled in construction zones when workers are present.',
    g1TestTip: 'All temporary condition and construction signs in Ontario are distinguished by their bright SAFETY ORANGE background color.'
  },
  {
    id: 'ont-flagperson-ahead',
    signType: 'flagperson_ahead',
    name: 'Traffic Control Person / Flagperson Ahead',
    category: 'temporary',
    code: 'MTO TC-21',
    shapeAndColor: 'Safety Orange diamond with silhouette of a worker holding a traffic control flagstaff horizontally',
    meaning: 'A designated traffic control person (flagperson) is actively directing traffic through a work zone ahead.',
    driverAction: 'Slow down and prepare to stop. Obey all hand and paddle signals from the flagperson promptly.',
    officialMtoRef: 'Ontario HTA Section 146(1) & OTM Book 7',
    legalConsequence: 'Disobeying a traffic control person carries 3 demerit points and a fine up to $500.',
    g1TestTip: 'Under Ontario law, the instructions of a traffic control person (flagperson) take precedence over existing traffic signs and signals.'
  },
  {
    id: 'ont-construction-fines-doubled',
    signType: 'construction_fines_doubled',
    name: 'Construction Zone Fines Doubled',
    category: 'temporary',
    code: 'MTO TC-81',
    shapeAndColor: 'Safety Orange horizontal rectangle with black text "CONSTRUCTION ZONE / FINES DOUBLED"',
    meaning: 'Notifies drivers that statutory fines for speeding and traffic offences in this designated zone are legally doubled.',
    driverAction: 'Strictly obey posted temporary speed limits. Fines for exceeding the limit in this corridor are multiplied by two.',
    officialMtoRef: 'Ontario HTA Section 128(8) & OTM Book 7',
    legalConsequence: 'Speeding fines are doubled when workers are present (e.g. $10/km/h over becomes $20/km/h over).',
    g1TestTip: 'Tested on G1: Fines are doubled in Ontario construction zones ONLY when construction workers are present in the zone.'
  },
  {
    id: 'ont-emergency-detour-route',
    signType: 'emergency_detour_route',
    name: 'Emergency Detour Route (EDR)',
    category: 'information',
    code: 'MTO EDR',
    shapeAndColor: 'Safety Orange (or Green) horizontal rectangle with bold black text "EDR" and a directional arrow',
    meaning: 'Designated emergency detour route used when 400-series highways or major expressways are closed due to severe collisions.',
    driverAction: 'Follow consecutive EDR route markers to navigate around the closed highway section and rejoin downstream.',
    officialMtoRef: 'MTO Provincial Emergency Management & OTM Book 7',
    legalConsequence: 'Standard municipal speed limits and bylaws apply along the detour corridor.',
    g1TestTip: 'EDR signs are installed alongside municipal roads to guide diverted traffic around major highway closures back to the expressway.'
  },

  // =========================================================================
  // 4. INFORMATION & GUIDE SIGNS (Ontario Traffic Manual Book 8 / Services)
  // =========================================================================
  {
    id: 'ont-hov-lane',
    signType: 'hov_lane',
    name: 'High Occupancy Vehicle (HOV) Lane',
    category: 'information',
    code: 'MTO Rb-84',
    shapeAndColor: 'White vertical rectangle with black header containing a white diamond emblem, "HOV LANE", and "2+ PERSONS"',
    meaning: 'Reserved highway lane for vehicles carrying 2 or more occupants, eligible green-plate electric vehicles, emergency vehicles, and buses.',
    driverAction: 'Enter or exit the HOV lane ONLY at designated broken dashed line areas. Never cross the solid double lines.',
    officialMtoRef: 'Ontario HTA Regulation 618 & MTO Driver’s Handbook',
    legalConsequence: 'Improper use or crossing solid HOV lines carries 3 demerit points and a $110 fine.',
    g1TestTip: 'Crossing solid lines into or out of an HOV lane is illegal in Ontario. You must wait for the designated broken dashed lane buffer.'
  },
  {
    id: 'ont-hospital',
    signType: 'hospital',
    name: 'Hospital / Emergency Medical Care',
    category: 'information',
    code: 'MTO Service Sign (H)',
    shapeAndColor: 'Sky Blue square with white border and a bold white capital letter "H"',
    meaning: 'Directs motorists to an accredited hospital facility providing 24/7 urgent medical emergency services.',
    driverAction: 'Watch for emergency ambulances entering or exiting the roadway and yield right-of-way immediately if sirens sound.',
    officialMtoRef: 'Ontario Traffic Manual Book 8 & MTO Driver’s Handbook',
    legalConsequence: 'Failing to yield right-of-way to an emergency vehicle carries 3 demerit points and a fine of $490 to $2,000.',
    g1TestTip: 'When an emergency vehicle with flashing red/blue lights or siren approaches, you must immediately pull to the right curb and stop.'
  },
  {
    id: 'ont-ontario-400-highway',
    signType: 'ontario_400_highway',
    name: 'Ontario 400-Series Highway Route Marker',
    category: 'information',
    code: 'MTO King’s Highway Shield',
    shapeAndColor: 'Blue and white shield topped by the provincial King’s Highway Royal Crown with route number (e.g. 401)',
    meaning: 'Identifies a multi-lane, controlled-access provincial freeway belonging to Ontario’s premier highway network.',
    driverAction: 'Follow provincial freeway driving rules: merge at speed of traffic, keep right, signal 100m before lane changes.',
    officialMtoRef: 'Ontario Highway Traffic Act & MTO Driver’s Handbook',
    legalConsequence: 'Strict controlled-access regulations apply (no pedestrians, no bicycles, no farm machinery).',
    g1TestTip: 'Ontario’s 400-series highways include Highway 400, 401, 402, 403, 404, 407, 410, 416, 417, 427, and the QEW.'
  }
];

/**
 * Filter helpers for category segregation
 */
export const ONTARIO_REGULATORY_SIGNS = OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'regulatory');
export const ONTARIO_WARNING_SIGNS = OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'warning');
export const ONTARIO_TEMPORARY_SIGNS = OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'temporary');
export const ONTARIO_INFORMATION_SIGNS = OFFICIAL_ONTARIO_SIGNS.filter(s => s.category === 'information');

export default OFFICIAL_ONTARIO_SIGNS;
