/**
 * The organization-wide disclosure policy has to stay usable.
 *
 * This file is what GitHub shows on every repository that has no policy of its
 * own, so a broken link or a missing reporting route is broken everywhere at
 * once and shows up nowhere — no build consumes it, and nothing else reads it.
 *
 * Checks the things that make it a policy rather than a page: somewhere to
 * report, a promise about what happens next, and links that resolve.
 */
import {readFileSync} from 'node:fs';

const text = readFileSync('SECURITY.md', 'utf8');
const problems = [];

function sectionBody(heading) {
  const headings = [...text.matchAll(/^##\s+(.+?)\s*$/gm)];
  const index = headings.findIndex((match) => match[1].toLowerCase() === heading.toLowerCase());
  if (index === -1) return null;
  const start = headings[index].index + headings[index][0].length;
  const end = headings[index + 1]?.index ?? text.length;
  return text.slice(start, end);
}

// The route belongs in the reporting section. An address in background text
// does not tell a reporter where to send a vulnerability.
const reporting = sectionBody('How to report');
if (reporting === null) {
  problems.push('no "How to report" section');
} else if (
  !/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/.test(reporting) &&
  !/security\/advisories\/new/.test(reporting)
) {
  problems.push('no reporting route: neither an email address nor a private advisory link');
}

// What a reporter is told to expect. The policy makes a commitment; if the
// section naming it disappears, the commitment disappears silently.
if (!/##\s*What to expect/i.test(text)) {
  problems.push('no "What to expect" section — a reporter is told nothing about what follows');
}

// Scope. A policy without one invites testing nobody wants.
if (!/##\s*Scope/i.test(text)) {
  problems.push('no "Scope" section');
}

// Relative links must resolve. An absolute one is somebody else's uptime.
for (const [, label, target] of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
  if (/^(https?:|mailto:|#)/.test(target)) continue;
  try {
    readFileSync(target.split('#')[0], 'utf8');
  } catch {
    problems.push(`link "${label}" points at ${target}, which is not in this repository`);
  }
}

if (problems.length) {
  console.error('SECURITY.md problems:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log('SECURITY.md: reporting route, expectations, scope and links all present');
