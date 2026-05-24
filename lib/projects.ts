export type Project = {
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Interior' | 'Renovation';
  year: number;
  location: string;
  teaser: string;
  imageSrc: string;
};

export const projects: Project[] = [
  {
    slug: 'meridian-house',
    title: 'Meridian House',
    category: 'Residential',
    year: 2024,
    location: 'San Francisco, CA',
    teaser: 'A 3,200 sq ft hillside residence emphasizing material honesty and passive solar design.',
    imageSrc: '/images/placeholder-project.jpg',
  },
  {
    slug: 'vale-studio',
    title: 'Vale Studio',
    category: 'Commercial',
    year: 2023,
    location: 'Portland, OR',
    teaser: 'Creative workspace for a film production company — adaptive reuse of a 1940s warehouse.',
    imageSrc: '/images/placeholder-project.jpg',
  },
  {
    slug: 'thornfield-renovation',
    title: 'Thornfield Renovation',
    category: 'Renovation',
    year: 2024,
    location: 'Seattle, WA',
    teaser: 'Whole-home renovation of a 1960s mid-century split-level. Structural and envelope improvements throughout.',
    imageSrc: '/images/placeholder-project.jpg',
  },
  {
    slug: 'atlas-pavilion',
    title: 'Atlas Pavilion',
    category: 'Commercial',
    year: 2022,
    location: 'Austin, TX',
    teaser: 'Open-air event pavilion for a private vineyard estate. Net-zero energy target.',
    imageSrc: '/images/placeholder-project.jpg',
  },
  {
    slug: 'sable-residence',
    title: 'Sable Residence',
    category: 'Residential',
    year: 2023,
    location: 'Marin County, CA',
    teaser: 'New construction single-family home on a constrained hillside lot with bay views.',
    imageSrc: '/images/placeholder-project.jpg',
  },
  {
    slug: 'quill-interiors',
    title: 'Quill Interiors',
    category: 'Interior',
    year: 2024,
    location: 'Los Angeles, CA',
    teaser: 'Interior architecture scope for a boutique hotel conversion — 24 guest rooms + common spaces.',
    imageSrc: '/images/placeholder-project.jpg',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
