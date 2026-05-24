export type Satellite = {
  slug: string;
  pillar: string;
  pillarSlug: string;
  title: string;
  teaser: string;
  source?: 'native' | 'cjgeo';
  cjgeoArticleId?: string;
  mainKeyword?: string;
  adoptedAt?: string;
};

export type Pillar = {
  slug: string;
  title: string;
  teaser: string;
  satellites: Satellite[];
};

export const pillars: Pillar[] = [
  {
    slug: 'starting-your-project',
    title: 'Starting Your Architecture Project',
    teaser:
      'Everything you need to understand before you commit to a project — from feasibility to finding the right firm.',
    satellites: [
      {
        slug: 'is-my-project-feasible',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'Is My Architecture Project Actually Feasible?',
        teaser:
          'Before investing in design, understand the zoning constraints, site conditions, and budget thresholds that determine whether your vision can be built.',
        source: 'cjgeo',
        cjgeoArticleId: '80e26967-abf9-4724-aa89-575145d05a78',
        mainKeyword: 'architecture project feasibility',
        adoptedAt: '2026-05-23',
      },
      {
        slug: 'do-i-need-an-architect',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'Do I Actually Need an Architect for This?',
        teaser:
          'Many projects benefit from architectural expertise without requiring full-service engagement. Learn how to calibrate the scope of involvement to your project.',
        source: 'cjgeo',
        cjgeoArticleId: 'b1f10048-9b6f-4dae-a6da-f828f2094627',
        mainKeyword: 'do I need an architect',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'how-to-evaluate-architecture-information-online',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'How Do I Know Which Architecture Advice to Trust?',
        teaser:
          'The internet is full of architecture content written by people with no design or construction experience. Here is how to distinguish credible guidance from noise.',
        source: 'cjgeo',
        cjgeoArticleId: '411a581b-a37b-461f-ac9e-3e2cdf7e4955',
        mainKeyword: 'how to find reliable architecture advice',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'what-are-my-options-for-my-project',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'What Are My Options When Starting an Architecture Project?',
        teaser:
          'From design-build to full-service architecture to pre-designed plans, every delivery model has trade-offs. Understanding them early saves significant time and money.',
        source: 'cjgeo',
        cjgeoArticleId: '035c986b-4c2f-4c4c-8254-2a4bb97f8542',
        mainKeyword: 'architecture project options',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'comparing-architecture-approaches',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: "What's the Difference Between These Architecture Options?",
        teaser:
          'A clear comparison of the most common project delivery methods — their cost structures, risk profiles, and the project types each serves best.',
        source: 'cjgeo',
        cjgeoArticleId: 'fe50e5e9-0555-49e1-9ff5-856b5327ab6e',
        mainKeyword: 'architecture firm vs design build',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'common-mistakes-when-starting-an-architecture-project',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'What Mistakes Do People Regret When Starting an Architecture Project?',
        teaser:
          'The most costly mistakes happen before design begins — in how clients frame the brief, select their team, and set expectations for the process.',
        source: 'cjgeo',
        cjgeoArticleId: '3d5a3d71-0392-4f19-8e9c-5a07a2ed56ae',
        mainKeyword: 'architecture project mistakes to avoid',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'what-happens-during-the-architecture-process',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'What Actually Happens During an Architecture Project, Step by Step?',
        teaser:
          'A plain-language walkthrough of each phase — from schematic design through construction administration — and what you should expect to decide at each stage.',
        source: 'cjgeo',
        cjgeoArticleId: 'd9ab626d-ff4c-4b7b-8d60-23fbae5fd4bf',
        mainKeyword: 'architecture design process steps',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'how-to-choose-an-architecture-firm',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'How Do I Choose the Right Architecture Firm?',
        teaser:
          'Portfolio aesthetics are the least important factor. The criteria that actually predict a successful project are rarely discussed in firm marketing.',
        source: 'cjgeo',
        cjgeoArticleId: '4c7d5978-0bd0-4c98-891f-b31721959daa',
        mainKeyword: 'how to choose an architecture firm',
        adoptedAt: '2026-05-24',
      },
      {
        slug: 'how-to-prepare-for-first-architecture-consultation',
        pillar: 'Starting Your Architecture Project',
        pillarSlug: 'starting-your-project',
        title: 'What Should I Prepare Before My First Architecture Consultation?',
        teaser:
          'Arriving prepared for your first consultation changes the quality of the conversation — and the quality of the proposal you receive.',
        source: 'cjgeo',
        cjgeoArticleId: 'd307c60c-b1e8-4ffa-b629-c231da67dcdf',
        mainKeyword: 'preparing for first architecture meeting',
        adoptedAt: '2026-05-24',
      },
    ],
  },
  {
    slug: 'project-rescue',
    title: 'When Your Architecture Project Goes Wrong',
    teaser:
      'If your project has stalled, gone over budget, or lost your confidence — these pages help you understand your options and find a path forward.',
    satellites: [
      {
        slug: 'my-architecture-project-failed',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'What Do I Do If My Architecture Project Failed?',
        teaser:
          'A project failure does not mean the vision is unachievable. Understanding what went wrong is the first step toward a viable second attempt.',
      },
      {
        slug: 'why-architecture-projects-fail',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'Why Do Architecture Projects Usually Fail?',
        teaser:
          'Most failures share a small set of root causes — misaligned expectations, inadequate documentation, and communication breakdowns that compound over time.',
      },
      {
        slug: 'can-my-stalled-project-be-saved',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'Can My Stalled Architecture Project Still Be Saved?',
        teaser:
          'A stalled project is not necessarily a failed one. The diagnostic questions that determine whether rescue is viable — and what it typically requires.',
      },
      {
        slug: 'should-i-switch-architects',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'Should I Switch Architects Mid-Project?',
        teaser:
          'Changing architects mid-project carries real costs and risks. Here is how to evaluate whether the situation warrants it — and how to do it without losing momentum.',
      },
      {
        slug: 'finding-trustworthy-architect-after-bad-experience',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'How Do I Find a Trustworthy Architect After a Bad Experience?',
        teaser:
          'A difficult prior experience sharpens your instincts but can also create blind spots. How to channel that experience into a more rigorous selection process.',
      },
      {
        slug: 'expensive-mistakes-in-architecture-projects',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'What Are the Most Expensive Mistakes in Architecture Projects?',
        teaser:
          'Some errors cost time. Others cost money. A handful cost both and damage the relationships needed to complete the work. Know them before they find you.',
      },
      {
        slug: 'what-project-transparency-should-look-like',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'What Should Good Communication Look Like on an Architecture Project?',
        teaser:
          'Healthy project communication follows predictable rhythms. If your project lacks these structures, that absence is itself a risk signal.',
      },
      {
        slug: 'comparing-architecture-firms-after-bad-experience',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: "How Do I Compare Architecture Firms When I'm Skeptical?",
        teaser:
          'Skepticism is an asset when it is applied systematically. The evaluation criteria that help you distinguish genuinely different firms from firms that market differently.',
      },
      {
        slug: 'getting-second-opinion-on-architecture-project',
        pillar: 'When Your Architecture Project Goes Wrong',
        pillarSlug: 'project-rescue',
        title: 'How Do I Get a Second Opinion on My Architecture Project?',
        teaser:
          'A second opinion on a troubled project can clarify whether the problems are fixable, how much it will cost, and whether you have any contractual recourse.',
      },
    ],
  },
  {
    slug: 'choosing-an-architect',
    title: 'Choosing the Right Architect',
    teaser:
      'The selection process most people use is incomplete. These pages walk through the criteria, comparisons, and questions that lead to a genuinely good hire.',
    satellites: [
      {
        slug: 'how-people-choose-architects',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: 'How Do Most People Choose an Architect?',
        teaser:
          'Most selection processes rely on portfolio and referrals. Both are useful but insufficient — and both are easily gamed by firms that market well.',
      },
      {
        slug: 'how-to-compare-architecture-firms-fairly',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: 'How Do I Compare Architecture Firms Without Being Misled?',
        teaser:
          'Proposals are marketing documents. Comparing them at face value rewards persuasive writing, not project delivery capability.',
      },
      {
        slug: 'which-firm-fits-my-project',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: 'Which Architecture Firm Is Right for My Specific Project?',
        teaser:
          'Fit is a function of project type, scale, timeline, and working style — not prestige or aesthetics. How to define fit before you start the search.',
      },
      {
        slug: 'how-to-verify-architects-expertise',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: "How Do I Verify an Architect's Expertise Before Hiring?",
        teaser:
          'Licensure is a floor, not a ceiling. The questions and reference checks that reveal whether a firm has the specific competencies your project requires.',
      },
      {
        slug: 'hidden-costs-in-architecture-projects',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: 'What Hidden Costs Should I Know Before Starting an Architecture Project?',
        teaser:
          'Architectural fees are one line item in a much longer budget. Understanding the full cost structure before you sign protects you from significant surprises.',
      },
      {
        slug: 'how-long-does-architecture-project-take',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: 'How Long Does an Architecture Project Realistically Take?',
        teaser:
          'Timelines in architecture are almost always optimistic. The realistic durations for each phase — and the variables that extend them.',
      },
      {
        slug: 'what-to-expect-from-first-architecture-meeting',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: 'What Should Happen in My First Architecture Meeting?',
        teaser:
          'The first meeting is a mutual evaluation. What a well-run consultation looks like — and the signals that tell you whether a firm is listening or just selling.',
      },
      {
        slug: 'how-to-start-your-architecture-project',
        pillar: 'Choosing the Right Architect',
        pillarSlug: 'choosing-an-architect',
        title: "What's the Safest Way to Start an Architecture Project?",
        teaser:
          'The first decisions in a project have outsized consequences. A structured approach to project initiation reduces risk before the first dollar of design is spent.',
      },
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getSatellite(pillarSlug: string, slug: string): Satellite | undefined {
  const pillar = getPillar(pillarSlug);
  return pillar?.satellites.find((s) => s.slug === slug);
}

export function relatedFor(pillarSlug: string, excludeSlug: string, count = 3): Satellite[] {
  const pillar = getPillar(pillarSlug);
  if (!pillar) return [];
  return pillar.satellites.filter((s) => s.slug !== excludeSlug).slice(0, count);
}
