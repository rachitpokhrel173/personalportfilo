// Generates public/Rachit-Pokhrel-Resume.pdf from the same data as the website.
// Runs automatically before `npm run build`; run manually with `npm run resume`.

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { RESUME } from "@/lib/resume";
import { SITE } from "@/lib/site";

// Never hyphenate: broken words hurt readability and applicant-tracking parsers.
Font.registerHyphenationCallback((word) => [word]);

const INK = "#14161f";
const MUTED = "#4a5063";
const ACCENT = "#4c3fc4";
const RULE = "#d5d8e2";

const s = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingBottom: 40,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9.4,
    lineHeight: 1.42,
    color: INK,
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, letterSpacing: 0.2, lineHeight: 1.15 },
  title: { fontSize: 11.5, color: ACCENT, marginTop: 3, lineHeight: 1.2 },
  contact: { flexDirection: "row", flexWrap: "wrap", marginTop: 7, color: MUTED },
  link: { color: MUTED, textDecoration: "none" },
  sep: { marginHorizontal: 5, color: "#9aa0b2" },
  section: { marginTop: 13 },
  heading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: ACCENT,
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: RULE,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  strong: { fontFamily: "Helvetica-Bold" },
  meta: { color: MUTED },
  bulletRow: { flexDirection: "row", marginTop: 1.5 },
  bullet: { width: 10, color: MUTED },
  bulletText: { flex: 1 },
  block: { marginBottom: 8 },
  small: { fontSize: 8.6, color: MUTED, marginTop: 2 },
  skillRow: { flexDirection: "row", marginBottom: 2.5 },
  skillLabel: { width: 118, paddingRight: 8, fontFamily: "Helvetica-Bold" },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 44,
    right: 44,
    fontSize: 7.6,
    color: "#8a90a3",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <View key={item} style={s.bulletRow} wrap={false}>
          <Text style={s.bullet}>•</Text>
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.heading} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function ResumeDocument() {
  const r = RESUME;
  return (
    <Document
      title={`${r.name}, ${r.title} (Resume)`}
      author={r.name}
      subject={`Resume of ${r.name}, ${r.title}`}
      keywords={r.skills.flatMap((g) => g.items.map((i) => i.name)).join(", ")}
      creator={r.name}
      producer={r.name}
      language="en"
    >
      <Page size="A4" style={s.page}>
        <View>
          <Text style={s.name}>{r.name}</Text>
          <Text style={s.title}>{r.title}</Text>
          <View style={s.contact}>
            {r.contact.map((c, i) => (
              <View key={c.label} style={{ flexDirection: "row" }}>
                {i > 0 && <Text style={s.sep}>|</Text>}
                {c.href ? (
                  <Link src={c.href} style={s.link}>
                    {c.label}
                  </Link>
                ) : (
                  <Text>{c.label}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <Section title="Summary">
          <Text>{r.summary}</Text>
        </Section>

        <Section title="Technical Skills">
          {r.skills.map((g) => (
            <View key={g.label} style={s.skillRow} wrap={false}>
              <Text style={s.skillLabel}>{g.label}</Text>
              <Text style={{ flex: 1 }}>
                {g.items.map((item) => (item.inProgress ? `${item.name}*` : item.name)).join(", ")}
              </Text>
            </View>
          ))}
          {r.skills.some((g) => g.items.some((i) => i.inProgress)) && (
            <Text style={s.small}>* Used in a project that is still in development.</Text>
          )}
        </Section>

        <Section title="Projects">
          {r.projects.map((p) => (
            <View key={p.name} style={s.block} wrap={false}>
              <View style={s.row}>
                <Text>
                  <Text style={s.strong}>{p.name}</Text>
                  <Text style={s.meta}>{`  ${p.category}`}</Text>
                </Text>
                {p.status && <Text style={s.meta}>{p.status}</Text>}
              </View>
              <Bullets items={p.bullets} />
              <Text style={s.small}>
                {`Stack: ${p.stack.join(", ")}`}
              </Text>
              <Text style={s.small}>
                {p.link && (
                  <>
                    {"Live: "}
                    <Link src={p.link.href} style={s.link}>
                      {p.link.label}
                    </Link>
                    {"   "}
                  </>
                )}
                {"Case study: "}
                <Link src={p.caseStudy} style={s.link}>
                  {p.caseStudy.replace(/^https?:\/\//, "")}
                </Link>
              </Text>
            </View>
          ))}
          {r.otherProjects.length > 0 && (
            <View style={s.block} wrap={false}>
              <Text style={s.strong}>Other projects</Text>
              {r.otherProjects.map((p) => (
                <Text key={p.name} style={{ marginTop: 2 }}>
                  {"•  "}
                  <Link src={p.caseStudy} style={s.link}>
                    {p.name}
                  </Link>
                  <Text style={s.meta}>{`  ${p.category} · ${p.status}`}</Text>
                </Text>
              ))}
            </View>
          )}
        </Section>

        <Section title="Experience">
          {r.experience.map((job) => (
            <View key={job.organization} style={s.block}>
              <View style={s.row} wrap={false}>
                <Text>
                  <Text style={s.strong}>{job.organization}</Text>
                  <Text style={s.meta}>{`  ${job.location}`}</Text>
                </Text>
                <Text style={s.meta}>{job.period}</Text>
              </View>
              <Text style={{ fontFamily: "Helvetica-Oblique" }}>{job.position}</Text>
              {job.roles.map((role) => (
                <View key={role.period} style={{ marginTop: 3 }} wrap={false}>
                  <Text>
                    <Text style={s.strong}>{role.title}</Text>
                    <Text style={s.meta}>{`  ${role.period}`}</Text>
                  </Text>
                  <Bullets items={role.responsibilities} />
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Education">
          {r.education.map((e) => (
            <View key={e.institution} style={{ marginBottom: 4 }} wrap={false}>
              <View style={s.row}>
                <Text style={s.strong}>{e.institution}</Text>
                <Text style={s.meta}>{e.period}</Text>
              </View>
              <Text>
                {e.program}
                {e.location ? <Text style={s.meta}>{`  ${e.location}`}</Text> : null}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Languages">
          {r.languages.map((l) => (
            <Text key={l.name} style={{ marginBottom: 2 }}>
              <Text style={s.strong}>{l.name}: </Text>
              {l.level}
              {l.detail ? <Text style={s.meta}>{` (${l.detail})`}</Text> : null}
            </Text>
          ))}
        </Section>

        <View style={s.footer} fixed>
          <Text>{`${r.name}, ${r.title}`}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

async function main() {
  const out = join(process.cwd(), "public", SITE.resumeFileName);
  const buffer = await renderToBuffer(<ResumeDocument />);
  writeFileSync(out, buffer);
  console.log(`Resume written to ${out} (${Math.round(buffer.length / 1024)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
