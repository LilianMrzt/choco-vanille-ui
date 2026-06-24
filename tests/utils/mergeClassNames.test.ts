import { describe, expect, it } from 'vitest';

import { mergeClassNames } from '@/utils/mergeClassNames.ts';

describe('mergeClassNames', () => {
  it('merges multiple class strings', () => {
    expect(mergeClassNames('foo', 'bar')).toBe('foo bar');
  });

  it('resolves Tailwind conflicts — last value wins', () => {
    expect(mergeClassNames('text-sm', 'text-lg')).toBe('text-lg');
    expect(mergeClassNames('font-bold', 'font-normal')).toBe('font-normal');
    expect(mergeClassNames('p-2', 'p-4')).toBe('p-4');
  });

  it('ignores falsy values (false, null, undefined)', () => {
    const condition = false as boolean;
    expect(mergeClassNames('foo', condition && 'bar', undefined, null, 'baz')).toBe('foo baz');
  });

  it('returns an empty string when called with no arguments', () => {
    expect(mergeClassNames()).toBe('');
  });

  it('handles arrays of class names', () => {
    expect(mergeClassNames(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('handles conditional object syntax from clsx', () => {
    expect(mergeClassNames({ active: true, disabled: false })).toBe('active');
  });

  it('does NOT deduplicate non-Tailwind class names (tailwind-merge only resolves conflicts)', () => {
    // tailwind-merge deduplicates conflicting Tailwind utilities (e.g. text-sm + text-lg → text-lg)
    // but does not remove arbitrary duplicate class names.
    expect(mergeClassNames('foo', 'foo')).toBe('foo foo');
  });
});



