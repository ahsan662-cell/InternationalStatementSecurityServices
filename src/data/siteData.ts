// ============================================================
// SITE DATA — Edit this file to update all content sitewide
// ============================================================

export const SITE_CONFIG = {
  name: 'International Statement Security Services',
  shortName: 'ISS',
  tagline: 'Elite Protection. Global Reach. Zero Compromise.',
  founded: '2012',
  phone: '+1 (212) 000-0000',
  email: 'ops@statementsecurity.com',
  responseTime: 'Under 4 Hours',
}

export const STATS = [
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 127, suffix: '', label: 'Elite Operators' },
  { value: 2800, suffix: 'k', label: 'Assets Protected', display: '2.8k' },
  { value: 7, suffix: '', label: 'Global Locations' },
]

export const LOCATIONS = [
  {
    id: '01',
    city: 'New York',
    country: 'USA',
    region: 'North America · Primary Hub',
    description:
      'Our North American headquarters. Operating across Manhattan and the tri-state area. Licensed and insured, serving VVIP and corporate clients since 2012.',
    tags: ['Close Protection', 'Executive Security', 'Event Security'],
    // Map coordinates (SVG viewBox 0 0 900 420)
    mapX: 155,
    mapY: 140,
    // Three.js globe coordinates (lat/lon)
    lat: 40.7,
    lon: -74,
  },
  {
    id: '02',
    city: 'London',
    country: 'UK',
    region: 'Europe · Command Centre',
    description:
      'Our European command centre. Serving royal families, diplomats, and VVIP clients from the UK and across the continent.',
    tags: ['VIP Protection', 'Diplomatic Escort', 'Residential Security'],
    mapX: 355,
    mapY: 68,
    lat: 51.5,
    lon: -0.1,
  },
  {
    id: '03',
    city: 'Rome',
    country: 'Italy',
    region: 'Southern Europe · Regional Hub',
    description:
      'Mediterranean coverage including high-net-worth tourism circuits, yachting security, and political liaison protection across Italy.',
    tags: ['Lifestyle Protection', 'Asset Security', 'Travel Detail'],
    mapX: 428,
    mapY: 113,
    lat: 41.9,
    lon: 12.5,
  },
  {
    id: '04',
    city: 'Tirana',
    country: 'Albania',
    region: 'Balkans · Regional Office',
    description:
      'Strategic Balkan presence supporting regional operations and cross-border deployments throughout Southeastern Europe.',
    tags: ['Regional Ops', 'Cross-Border', 'Close Protection'],
    mapX: 452,
    mapY: 111,
    lat: 41.3,
    lon: 19.8,
  },
  {
    id: '05',
    city: 'Doha',
    country: 'Qatar',
    region: 'Middle East · Gulf Hub',
    description:
      'Gulf operations servicing royalty, state officials, and international events including high-profile summits and sporting occasions.',
    tags: ['Royal Protection', 'VVIP Events', 'Gulf Operations'],
    mapX: 558,
    mapY: 142,
    lat: 25.3,
    lon: 51.5,
  },
  {
    id: '06',
    city: 'Abu Dhabi',
    country: 'UAE',
    region: 'Middle East · UAE Operations',
    description:
      'UAE operations covering Abu Dhabi and Dubai circuits, supporting UHNWI clients, government liaisons, and luxury estate protection.',
    tags: ['UHNWI', 'Government Liaison', 'Estate Security'],
    mapX: 587,
    mapY: 150,
    lat: 24.5,
    lon: 54.4,
  },
  {
    id: '07',
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East · UAE Operations',
    description:
      'UAE operations covering Abu Dhabi and Dubai circuits, supporting UHNWI clients, government liaisons, and luxury estate protection.',
    tags: ['UHNWI', 'Government Liaison', 'Estate Security'],
    mapX: 587,
    mapY: 150,
    lat: 24.5,
    lon: 54.4,
  },
]

export const SERVICES = [
  {
    id: '01',
    featured: true,
    icon: 'shield',
    title: 'Close Protection',
    description:
      'Elite one-to-one protection by ex-special forces operators. Anti-surveillance trained, situationally aware, and always discreet.',
    tags: ['24/7 Coverage', 'Ex-SF Operators', 'Adaptive Detail'],
  },
  {
    id: '02',
    featured: false,
    icon: 'lock',
    title: 'Executive & VIP Protection',
    description:
      'Discreet, dignified security for CEOs, diplomats, royals, and UHNWI across all social and professional environments.',
    tags: ['UHNWI', 'Diplomatic', 'Discreet'],
  },
  {
    id: '03',
    featured: false,
    icon: 'globe',
    title: 'International Deployments',
    description:
      'Cross-border operations with embedded intelligence networks. Pathfinding and convoy security in high-risk zones.',
    tags: ['High-Risk Zones', 'Convoy Security'],
  },
  {
    id: '04',
    featured: false,
    icon: 'car',
    title: 'Secure Chauffeur',
    description:
      'Advanced-trained security drivers with route planning, counter-surveillance, and armoured vehicle capability on request.',
    tags: ['Armoured Available', 'Route Intel'],
  },
  {
    id: '05',
    featured: false,
    icon: 'home',
    title: 'Residential Security',
    description:
      'Static and mobile protection for private estates, safe houses, and high-value residences. Perimeter management and access control.',
    tags: ['Estate Protection', 'Perimeter Control'],
  },
  {
    id: '06',
    featured: false,
    icon: 'star',
    title: 'Special Events & Assets',
    description:
      'End-to-end security for high-profile events, galas, and protection of high-value goods and art in transit.',
    tags: ['Events', 'Asset Transit', 'Advance Team'],
  },
]

export const WHY_US = [
  {
    num: '01',
    title: 'Prevention, Not Reaction',
    description:
      'We study every journey, destination, and threat vector before you move. Site inspections, cartographic analysis, local staff interviews — nothing left to chance.',
  },
  {
    num: '02',
    title: 'Ex-Special Forces Only',
    description:
      'Every operator is handpicked from elite military backgrounds. Trained in martial arts, anti-surveillance, and rapid threat assessment.',
  },
  {
    num: '03',
    title: 'Aesthetics Matter',
    description:
      'Our operators dress appropriately for every environment — from black-tie galas to sports venues — blending in while staying vigilant.',
  },
  {
    num: '04',
    title: 'Truly Global Reach',
    description:
      '8 permanent locations across Europe, the Middle East, and North America. Intelligence networks on every continent. Deploy anywhere, fast.',
  },
  {
    num: '05',
    title: 'Absolute Discretion',
    description:
      'Every engagement is protected by strict NDA. Client information is never shared. Our reputation is built on silence as much as expertise.',
  },
  {
    num: '06',
    title: 'Licensed & Insured',
    description:
      'Full legal compliance across every jurisdiction. Background-checked personnel, professional code of conduct, comprehensive liability coverage.',
  },
]

export const TRUSTED_BY = [
  'Royal Families',
  'Heads of State',
  'Diplomats',
  'VVIP Individuals',
  'UHNWI',
  'Global Celebrities',
  'Corporate Executives',
  'High-Risk Travelers',
]

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Initial Brief',
    description:
      'Confidential consultation to assess your threat profile and specific requirements.',
  },
  {
    num: '02',
    title: 'Intelligence Assessment',
    description:
      'Route analysis, site inspection, cartographic review, and local staff interviews.',
  },
  {
    num: '03',
    title: 'Tailored Proposal',
    description: 'Bespoke security package designed around your environment and lifestyle.',
  },
  {
    num: '04',
    title: 'Deployment',
    description:
      'Operators briefed, on-ground, and continuously adapting to your situation.',
  },
]
