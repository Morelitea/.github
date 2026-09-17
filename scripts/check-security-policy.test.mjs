import assert from 'node:assert/strict';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import test from 'node:test';

const CHECK = resolve('scripts/check-security-policy.mjs');

function check(policy) {
  const root = mkdtempSync(resolve(tmpdir(), 'security-policy-'));
  try {
    writeFileSync(resolve(root, 'SECURITY.md'), policy);
    return spawnSync(process.execPath, [CHECK], {
      cwd: root,
      encoding: 'utf8',
    });
  } finally {
    rmSync(root, {recursive: true, force: true});
  }
}

test('accepts a reporting route inside the reporting section', () => {
  const result = check(`# Security

## How to report

Email security@example.com.

## What to expect

We will acknowledge the report.

## Scope

First-party code.
`);

  assert.equal(result.status, 0, result.stderr);
});

test('rejects a policy whose reporting section was deleted', () => {
  const result = check(`# Security

The security@example.com address is used by the security team.

## What to expect

We will acknowledge the report.

## Scope

First-party code.
`);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /How to report/);
});

test('rejects a reporting section with no route of its own', () => {
  const result = check(`# Security

Contact information elsewhere: security@example.com.

## How to report

Please report vulnerabilities privately.

## What to expect

We will acknowledge the report.

## Scope

First-party code.
`);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /reporting route/);
});
