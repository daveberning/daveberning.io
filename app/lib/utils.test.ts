import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('merges multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', undefined, null, false, 'bar')).toBe('foo bar')
  })

  it('handles conditional classes via object syntax', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo')
  })

  it('handles conditional classes via array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('deduplicates conflicting Tailwind classes, keeping the last', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('deduplicates conflicting Tailwind classes across multiple args', () => {
    expect(cn('text-sm', 'font-bold', 'text-lg')).toBe('font-bold text-lg')
  })

  it('handles an empty call', () => {
    expect(cn()).toBe('')
  })

  it('handles nested arrays', () => {
    expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
  })
})
