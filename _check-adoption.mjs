import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const env = readFileSync("C:/Users/xsj70/cjgeo/.env.local", "utf8");
const url = env.match(/^NEXT_PUBLIC_SUPABASE_URL=(.+)$/m)?.[1]?.trim();
const key = env.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m)?.[1]?.trim();
const db = createClient(url, key);

const articles = [
  // Pillar 1
  { slug: "is-my-project-feasible", id: "80e26967-abf9-4724-aa89-575145d05a78", pillar: "starting-your-project" },
  { slug: "do-i-need-an-architect", id: "b1f10048-9b6f-4dae-a6da-f828f2094627", pillar: "starting-your-project" },
  { slug: "how-to-evaluate-architecture-information-online", id: "411a581b-a37b-461f-ac9e-3e2cdf7e4955", pillar: "starting-your-project" },
  { slug: "what-are-my-options-for-my-project", id: "035c986b-4c2f-4c4c-8254-2a4bb97f8542", pillar: "starting-your-project" },
  { slug: "comparing-architecture-approaches", id: "fe50e5e9-0555-49e1-9ff5-856b5327ab6e", pillar: "starting-your-project" },
  { slug: "common-mistakes-when-starting-an-architecture-project", id: "3d5a3d71-0392-4f19-8e9c-5a07a2ed56ae", pillar: "starting-your-project" },
  { slug: "what-happens-during-the-architecture-process", id: "d9ab626d-ff4c-4b7b-8d60-23fbae5fd4bf", pillar: "starting-your-project" },
  { slug: "how-to-choose-an-architecture-firm", id: "4c7d5978-0bd0-4c98-891f-b31721959daa", pillar: "starting-your-project" },
  { slug: "how-to-prepare-for-first-architecture-consultation", id: "d307c60c-b1e8-4ffa-b629-c231da67dcdf", pillar: "starting-your-project" },
  // Pillar 2
  { slug: "my-architecture-project-failed", id: "149e1822-722c-45b2-ac78-5b08dccff2df", pillar: "project-rescue" },
  { slug: "why-architecture-projects-fail", id: "c72012eb-9ad5-4240-ac30-74073d0f5802", pillar: "project-rescue" },
  { slug: "can-my-stalled-project-be-saved", id: "16d1d5fc-624b-4168-b18c-56a3640a94f4", pillar: "project-rescue" },
  { slug: "should-i-switch-architects", id: "271487de-b169-468a-ac77-1477737b186f", pillar: "project-rescue" },
  { slug: "finding-trustworthy-architect-after-bad-experience", id: "59d4315d-29ec-46bd-b5dc-cd8883ed3360", pillar: "project-rescue" },
  { slug: "expensive-mistakes-in-architecture-projects", id: "a6a84853-3d2c-4203-853c-0f98cd23ca50", pillar: "project-rescue" },
  { slug: "what-project-transparency-should-look-like", id: "ba76a585-fa2d-4972-98b0-6347f8329ebb", pillar: "project-rescue" },
  { slug: "comparing-architecture-firms-after-bad-experience", id: "4cb832bc-85c4-4d5f-a89c-26de1ab61faa", pillar: "project-rescue" },
  { slug: "getting-second-opinion-on-architecture-project", id: "321c3d39-63b9-4a96-b64e-513419b518f5", pillar: "project-rescue" },
  // Pillar 3 (only 1 completed so far)
  { slug: "how-people-choose-architects", id: "8110a4fb-cc26-47a1-8817-b26ad8f769b0", pillar: "choosing-an-architect" },
];

const ids = articles.map(a => a.id);
const { data, error } = await db.from("content_magic_articles")
  .select("id,title,status,content_html")
  .in("id", ids);

if (error) { console.error(error); process.exit(1); }

const byId = Object.fromEntries(data.map(r => [r.id, r]));

for (const a of articles) {
  const row = byId[a.id];
  if (!row) { console.log(`MISSING  ${a.pillar}/${a.slug}`); continue; }
  const htmlLen = row.content_html?.length ?? 0;
  const status = row.status?.padEnd(10) ?? "unknown   ";
  const flag = htmlLen > 500 ? "✓" : "NO_HTML";
  console.log(`${flag}  ${status}  ${String(htmlLen).padStart(6)}  ${a.pillar}/${a.slug}`);
}
