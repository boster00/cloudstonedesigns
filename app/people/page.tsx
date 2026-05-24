import PeopleCard from "@/components/PeopleCard";

export const metadata = {
  title: "People",
  description: "The team at Cloudstone Designs.",
};

const team = [
  {
    name: "Eleanor Marsh",
    role: "Principal Architect",
    bio: "Eleanor founded Cloudstone Designs after twelve years in practice at firms in San Francisco and Tokyo. She holds a Master of Architecture from Yale and is licensed in California, Oregon, and Washington. Her work has been recognized by the AIA California Council and published in Architectural Record and Metropolis.",
  },
  {
    name: "Daniel Voss",
    role: "Associate — Design",
    bio: "Daniel joined the studio in 2019 after completing graduate work at the Southern California Institute of Architecture. His focus is the intersection of structural expression and spatial sequence — a preoccupation that runs through every project he leads. He brings particular expertise in adaptive reuse and envelope performance.",
  },
  {
    name: "Priya Nair",
    role: "Associate — Project Delivery",
    bio: "Priya manages the construction administration process across the studio's active projects. She came to architecture from a background in construction management, and the combination gives her an unusually practical fluency in the gap between design intent and field condition. Clients consistently cite her responsiveness and clarity as decisive factors in their experience of the process.",
  },
];

export default function PeoplePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">Team</p>
        <h1
          className="text-5xl font-light text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The People Behind the Work
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {team.map((person) => (
          <PeopleCard
            key={person.name}
            name={person.name}
            role={person.role}
            bio={person.bio}
          />
        ))}
      </div>
    </div>
  );
}
