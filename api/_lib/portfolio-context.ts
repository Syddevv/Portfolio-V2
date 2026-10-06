import { portfolioProfile, projects } from '../../src/data/portfolioData.js'

function formatProject(project: (typeof projects)[number], index: number) {
  const links = [
    (project.assistantOnly?.liveUrl ?? project.liveUrl) ? `Live: ${project.assistantOnly?.liveUrl ?? project.liveUrl}` : null,
    (project.assistantOnly?.githubUrl ?? project.githubUrl) ? `Code: ${project.assistantOnly?.githubUrl ?? project.githubUrl}` : null,
  ].filter(Boolean)

  return [
    `${index + 1}. ${project.title} — ${project.shortDescription}`,
    project.description,
    (project.assistantOnly?.technologies ?? project.technologies)?.length
      ? `Technologies: ${(project.assistantOnly?.technologies ?? project.technologies)?.join(', ')}.`
      : null,
    project.contributions?.length ? `Contributions: ${project.contributions.join(' ')}` : null,
    links.length ? links.join(' ') : 'No public project link is configured.',
  ].filter(Boolean).join('\n')
}

export function buildPortfolioContext() {
  const profile = portfolioProfile
  const experience = profile.experiences.map((entry) => [
    `${entry.company} — ${entry.role} (${entry.date})`,
    ...entry.responsibilities,
  ].join('\n')).join('\n\n')

  return `
SYDNEY SANTOS — VERIFIED PORTFOLIO FACTS

Profile:
- Sydney Santos is a ${profile.role} based in ${profile.location}.
- Pronouns: ${profile.pronouns}.
- Email: ${profile.email}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Availability: ${profile.availability}

Education:
- ${profile.education.program} at ${profile.education.school}; started in ${profile.education.started}.
- Current year level: ${profile.education.yearLevel}

Experience:
${experience}

Achievements:
${profile.achievements.map((achievement) => `- ${achievement}`).join('\n')}

Technologies shown across the portfolio:
${profile.technologies.join(', ')}.
Do not imply equal expertise in every technology. Use project-specific technologies when discussing a project.

Projects in the current portfolio order:
${projects.map(formatProject).join('\n\n')}
`.trim()
}
