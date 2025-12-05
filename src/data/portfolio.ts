// Portfolio data structure with business context

export interface PortfolioItem {
  id: string;
  clientName: string;
  industry: 'campground' | 'winery' | 'restaurant';
  beforeImage: string;
  afterImage: string;
  result: string;
  testimonial: string;
  challenge: string;
  timeline: string;
  launchDate: Date;
  featured: boolean;
  liveSiteUrl?: string; // Optional
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'maryjane-campground',
    clientName: "Mary Jane's Campground",
    industry: 'campground',
    beforeImage: '/portfolio-before-1.jpg',
    afterImage: '/portfolio-after-1.jpg',
    result: '60% increase in online bookings',
    testimonial: 'Carson understood our business from day one. The new site captures the beauty of our property perfectly.',
    challenge: 'Outdated website didn\'t showcase property, lost bookings to competitors',
    timeline: 'Delivered in 2 weeks',
    launchDate: new Date('2025-01-15'),
    featured: true
  },
  {
    id: 'sunset-valley-winery',
    clientName: 'Sunset Valley Winery',
    industry: 'winery',
    beforeImage: '/portfolio-before-1.jpg',
    afterImage: '/portfolio-after-1.jpg',
    result: 'Wine club signups doubled',
    testimonial: 'Our wine club has never been easier to manage. Members love the new online experience.',
    challenge: 'Manual wine club management, no online signup or member portal',
    timeline: 'Delivered in 3 weeks',
    launchDate: new Date('2025-02-01'),
    featured: false
  },
  {
    id: 'farm-table-restaurant',
    clientName: 'Farm Table Restaurant',
    industry: 'restaurant',
    beforeImage: '/portfolio-before-1.jpg',
    afterImage: '/portfolio-after-1.jpg',
    result: 'Reservations up 40%',
    testimonial: 'Guests love seeing our farm-to-table story online. The site perfectly captures our mission.',
    challenge: 'No online presence, relying on word-of-mouth only, losing customers to competitors',
    timeline: 'Delivered in 2 weeks',
    launchDate: new Date('2025-03-01'),
    featured: false
  }
];

// Helper function to get featured items
export function getFeaturedPortfolioItems(): PortfolioItem[] {
  return portfolioItems.filter(item => item.featured);
}

// Helper function to filter by industry
export function getPortfolioItemsByIndustry(industry: PortfolioItem['industry']): PortfolioItem[] {
  return portfolioItems.filter(item => item.industry === industry);
}
