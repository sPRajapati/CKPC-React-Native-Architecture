#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const { existsSync, readFileSync } = require('node:fs');

const stagedFiles = execFileSync(
  'git',
  ['diff', '--cached', '--name-only', '--diff-filter=ACMR'],
  { encoding: 'utf8' },
)
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean)
  .filter((file) => existsSync(file));

const blockedPatterns = [
  /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/i,
  /\b(private[_-]?key|auth[_-]?key|api[_-]?key|secret|token)\b\s*[:=]\s*['"][A-Za-z0-9_./+=-]{16,}['"]/i,
  /\b(PRIVATE[_-]?KEY|AUTH[_-]?KEY|API[_-]?KEY|SECRET|TOKEN)\b\s*[:=]\s*[A-Z0-9_./+=-]{20,}/,
];

const offenders = [];

for (const file of stagedFiles) {
  const lines = readFileSync(file, 'utf8').split('\n');
  if (lines.some((line) => blockedPatterns.some((pattern) => pattern.test(line)))) {
    offenders.push(file);
  }
}

if (offenders.length > 0) {
  console.error('Commit blocked: possible private key/auth key/API key found in:');
  offenders.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}
