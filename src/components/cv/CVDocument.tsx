import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { siteConfig, skillsData } from '@/data/site';
import { experienceData } from '@/data/experience';
import { coursesData } from '@/data/courses';

Font.register({
  family: 'Cormorant',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff',
      fontWeight: 300,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-italic.woff',
      fontWeight: 300,
      fontStyle: 'italic',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff',
      fontWeight: 500,
    },
  ],
});

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-300-normal.woff',
      fontWeight: 300,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-500-normal.woff',
      fontWeight: 500,
    },
  ],
});

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
      fontWeight: 400,
    },
  ],
});

const OBSIDIAN = '#0A0A0A';
const PEARL = '#1F1F1A';
const CHROME = '#444444';
const MIST = '#7A7A7A';
const GOLD = '#B8963E';
const RACING = '#0B3D2E';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 56,
    fontFamily: 'Inter',
    fontSize: 9.5,
    color: PEARL,
    lineHeight: 1.5,
  },
  hairlineLeft: {
    position: 'absolute',
    top: 56,
    bottom: 56,
    left: 56,
    width: 0.5,
    backgroundColor: GOLD,
    opacity: 0.6,
  },
  contentWrapper: {
    paddingLeft: 24,
  },
  caption: {
    fontFamily: 'JetBrains Mono',
    fontSize: 7,
    letterSpacing: 1.5,
    color: RACING,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Cormorant',
    fontWeight: 300,
    fontSize: 36,
    color: OBSIDIAN,
    letterSpacing: -0.5,
    lineHeight: 1.05,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 11,
    color: CHROME,
    marginBottom: 14,
  },
  goldRule: {
    width: 56,
    height: 0.6,
    backgroundColor: GOLD,
    marginBottom: 18,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 28,
  },
  contactItem: {
    fontFamily: 'JetBrains Mono',
    fontSize: 8,
    color: CHROME,
  },
  bio: {
    fontSize: 10,
    color: PEARL,
    lineHeight: 1.65,
    marginBottom: 28,
  },
  sectionHeading: {
    fontFamily: 'Cormorant',
    fontWeight: 500,
    fontSize: 16,
    color: OBSIDIAN,
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  sectionMark: {
    width: 28,
    height: 0.6,
    backgroundColor: GOLD,
    marginBottom: 10,
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  entryTitle: {
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: 10,
    color: OBSIDIAN,
  },
  entryRole: {
    fontSize: 9.5,
    color: CHROME,
    marginBottom: 4,
  },
  entryMeta: {
    fontFamily: 'JetBrains Mono',
    fontSize: 7.5,
    color: MIST,
    letterSpacing: 0.5,
  },
  highlightBullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  bulletDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: GOLD,
    marginTop: 5,
    marginRight: 8,
  },
  highlightText: {
    flex: 1,
    fontSize: 9.5,
    color: PEARL,
    lineHeight: 1.55,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 28,
  },
  col: {
    flex: 1,
  },
  skillCategory: {
    fontFamily: 'JetBrains Mono',
    fontSize: 7,
    letterSpacing: 1.2,
    color: RACING,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  skillItems: {
    fontSize: 9.5,
    color: PEARL,
    marginBottom: 10,
  },
  courseLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    marginBottom: 2,
    color: PEARL,
  },
  courseHours: {
    fontFamily: 'JetBrains Mono',
    fontSize: 8,
    color: MIST,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 56,
    right: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'JetBrains Mono',
    fontSize: 7,
    color: MIST,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

const BIO =
  'Depois de dez anos na joalheria de luxo, reorientei a carreira para o desenvolvimento de software. Hoje construo aplicações web full stack com Python, TypeScript, Java e Go, com cuidado tipográfico e operacional do mesmo nível que aprendi com peças únicas.';

export function CVDocument() {
  const work = experienceData.filter((e) => e.type === 'work');
  const education = experienceData.filter((e) => e.type === 'education');

  return (
    <Document
      title={`${siteConfig.name} · CV`}
      author={siteConfig.name}
      subject="Curriculum vitae"
      keywords="software developer, full stack, typescript, python, go"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.hairlineLeft} />

        <View style={styles.contentWrapper}>
          <Text style={styles.caption}>Curriculum vitae</Text>
          <Text style={styles.name}>{siteConfig.name}</Text>
          <Text style={styles.tagline}>{siteConfig.tagline}</Text>
          <View style={styles.goldRule} />

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{siteConfig.email}</Text>
            <Text style={styles.contactItem}>{siteConfig.phone}</Text>
            <Text style={styles.contactItem}>{siteConfig.location}</Text>
            <Text style={styles.contactItem}>
              {siteConfig.github.replace('https://', '')}
            </Text>
          </View>

          <Text style={styles.bio}>{BIO}</Text>

          <View style={{ marginBottom: 18 }}>
            <Text style={styles.sectionHeading}>Experiência</Text>
            <View style={styles.sectionMark} />
            {work.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{entry.organisation}</Text>
                  <Text style={styles.entryMeta}>
                    {entry.period} · {entry.location}
                  </Text>
                </View>
                <Text style={styles.entryRole}>{entry.role}</Text>
                {entry.highlights.map((highlight) => (
                  <View key={highlight} style={styles.highlightBullet}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={{ marginBottom: 18 }}>
            <Text style={styles.sectionHeading}>Formação</Text>
            <View style={styles.sectionMark} />
            {education.map((entry) => (
              <View key={entry.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{entry.organisation}</Text>
                  <Text style={styles.entryMeta}>
                    {entry.period} · {entry.location}
                  </Text>
                </View>
                <Text style={styles.entryRole}>{entry.role}</Text>
                {entry.highlights.map((highlight) => (
                  <View key={highlight} style={styles.highlightBullet}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.twoCol}>
            <View style={styles.col}>
              <Text style={styles.sectionHeading}>Skills</Text>
              <View style={styles.sectionMark} />
              {skillsData.map((skill) => (
                <View key={skill.category}>
                  <Text style={styles.skillCategory}>{skill.category}</Text>
                  <Text style={styles.skillItems}>
                    {skill.items.join(' · ')}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={styles.sectionHeading}>Cursos</Text>
              <View style={styles.sectionMark} />
              {coursesData.slice(0, 14).map((course) => (
                <View key={course.name} style={styles.courseLine}>
                  <Text style={{ flex: 1 }}>{course.name}</Text>
                  <Text style={styles.courseHours}>{course.hours}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>{siteConfig.name}</Text>
          <Text>nicolaspilegidenigris.dev</Text>
        </View>
      </Page>
    </Document>
  );
}
