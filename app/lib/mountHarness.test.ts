import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import Text from '~/components/ui/text'
import Link from '~/components/ui/link'
import { mountWithTheme } from './mountHarness'

const ThemeProbe = defineComponent({
  props: {
    label: {
      type: String,
      default: 'default-label',
    },
  },
  template: '<div class="probe"><slot />{{ label }}</div>',
})

const TextProbe = defineComponent({
  render() {
    return h(Text, { color: 'default' }, () => 'Themed text')
  },
})

const LinkProbe = defineComponent({
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  render() {
    return h(Link, { to: this.href }, () => 'Read more')
  },
})

describe('mountWithTheme', () => {
  it('mounts components that require the theme provider', () => {
    const wrapper = mountWithTheme(TextProbe)

    expect(wrapper.text()).toContain('Themed text')
    expect(wrapper.findComponent(Text).exists()).toBe(true)
  })

  it('passes props and slots through to the mounted component', () => {
    const wrapper = mountWithTheme(ThemeProbe, {
      props: { label: 'custom-label' },
      slots: { default: () => 'slot content ' },
    })

    expect(wrapper.classes()).toContain('probe')
    expect(wrapper.text()).toBe('slot content custom-label')
  })

  it('passes global mounting options through, including stubs', () => {
    const wrapper = mountWithTheme(LinkProbe, {
      props: { href: '/work' },
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to" data-test="stubbed-link"><slot /></a>',
          },
        },
      },
    })

    const link = wrapper.get('[data-test="stubbed-link"]')
    expect(link.attributes('href')).toBe('/work')
    expect(link.text()).toBe('Read more')
  })

  it('installs a working localStorage mock when the environment does not provide the browser API', () => {
    globalThis.localStorage = {} as Storage

    mountWithTheme(TextProbe)

    expect(globalThis.localStorage.getItem('theme:color')).toBe(null)

    globalThis.localStorage.setItem('theme:color', 'purple')

    expect(globalThis.localStorage.getItem('theme:color')).toBe('purple')
    expect(globalThis.localStorage.length).toBe(1)
    expect(globalThis.localStorage.key(0)).toBe('theme:color')

    globalThis.localStorage.removeItem('theme:color')
    expect(globalThis.localStorage.getItem('theme:color')).toBe(null)

    globalThis.localStorage.setItem('theme:dark', 'true')
    globalThis.localStorage.clear()
    expect(globalThis.localStorage.length).toBe(0)
  })
})
