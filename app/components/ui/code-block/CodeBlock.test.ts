import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CodeBlock from './CodeBlock.vue'
import CodeBlockLabel from './CodeBlockLabel.vue'
import CodeBlockCopyButton from './CodeBlockCopyButton.vue'

const IconStub = { props: ['name', 'size'], template: '<span :data-icon="name" />' }
const globalStubs = { Icon: IconStub, NuxtIcon: IconStub }

describe('CodeBlock', () => {
  describe('default rendering', () => {
    it('renders a <code> element by default', () => {
      const wrapper = mount(CodeBlock, {
        global: { stubs: globalStubs },
      })
      expect(wrapper.element.tagName).toBe('CODE')
    })

    it('applies inline variant classes by default', () => {
      const wrapper = mount(CodeBlock, {
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('bg-surface')
      expect(wrapper.classes()).toContain('font-mono')
      expect(wrapper.classes()).toContain('rounded-sm')
    })

    it('renders slot content', () => {
      const wrapper = mount(CodeBlock, {
        slots: { default: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.text()).toContain('const x = 1')
    })
  })

  describe('variant="block"', () => {
    it('renders a <div> wrapper instead of <code>', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('renders a <pre> element inside the block wrapper', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.find('pre').exists()).toBe(true)
    })

    it('applies block variant base classes', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('rounded-lg')
      expect(wrapper.classes()).toContain('bg-surface')
      expect(wrapper.classes()).toContain('overflow-hidden')
    })

    it('applies preClass to the inner pre element instead of the wrapper', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', preClass: 'shiki language-ts' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).not.toContain('shiki')
      expect(wrapper.find('pre').classes()).toContain('shiki')
      expect(wrapper.find('pre').classes()).toContain('language-ts')
    })

    it('applies preStyle to the inner pre element', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', preStyle: '--shiki-light: #111;' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.find('pre').attributes('style')).toContain('--shiki-light: #111;')
    })

    it('does not inject template indentation into preformatted slot content', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block' },
        slots: { default: '<code class="shiki language-ts"><span class="line">const x = 1</span></code>' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.find('pre').element.innerHTML).toBe('<code class="shiki language-ts"><span class="line">const x = 1</span></code>')
    })

    it('does not render CodeBlockLabel when agent="none"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', agent: 'none' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.findComponent(CodeBlockLabel).exists()).toBe(false)
    })

    it('renders CodeBlockLabel when agent is set', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', agent: 'qa-engineer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.findComponent(CodeBlockLabel).exists()).toBe(true)
    })

    it('shows the language string in the header when language and code are provided', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', language: 'typescript', code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.text()).toContain('typescript')
    })

    it('renders CodeBlockCopyButton when code is provided', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.findComponent(CodeBlockCopyButton).exists()).toBe(true)
    })

    it('does not render the header when language and code are absent', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.findComponent(CodeBlockCopyButton).exists()).toBe(false)
    })
  })

  describe('inline agent color variants', () => {
    it('applies cyan background for agent="front-end-software-engineer"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'inline', agent: 'front-end-software-engineer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('bg-cyan-400')
    })

    it('applies green background for agent="qa-engineer"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'inline', agent: 'qa-engineer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('bg-green-500')
    })

    it('applies amber background for agent="seo-copywriter"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'inline', agent: 'seo-copywriter' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('bg-pink-400')
    })

    it('applies purple background for agent="ui-designer"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'inline', agent: 'ui-designer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('bg-amber-500')
    })

    it('applies no agent background class for agent="none"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'inline', agent: 'none' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).not.toContain('bg-cyan-400')
      expect(wrapper.classes()).not.toContain('bg-brand-green')
      expect(wrapper.classes()).not.toContain('bg-amber-400')
      expect(wrapper.classes()).not.toContain('bg-brand-purple')
    })
  })

  describe('block agent border variants', () => {
    it('adds cyan left border for agent="front-end-software-engineer"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', agent: 'front-end-software-engineer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('border-3')
      expect(wrapper.classes()).toContain('border-cyan-400')
    })

    it('adds green left border for agent="qa-engineer"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', agent: 'qa-engineer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('border-3')
      expect(wrapper.classes()).toContain('border-green-500')
    })

    it('adds amber left border for agent="seo-copywriter"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', agent: 'seo-copywriter' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('border-3')
      expect(wrapper.classes()).toContain('border-pink-500')
    })

    it('adds purple left border for agent="ui-designer"', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', agent: 'ui-designer' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('border-3')
      expect(wrapper.classes()).toContain('border-amber-400')
    })
  })

  describe('class prop', () => {
    it('merges custom classes via tailwind-merge on inline variant', () => {
      const wrapper = mount(CodeBlock, {
        props: { class: 'my-custom-class' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('my-custom-class')
    })

    it('merges custom classes via tailwind-merge on block variant', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', class: 'my-block-class' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('my-block-class')
    })
  })

  describe('language prop', () => {
    it('does not throw when language is undefined', () => {
      expect(() =>
        mount(CodeBlock, {
          props: { variant: 'block' },
          global: { stubs: globalStubs },
        }),
      ).not.toThrow()
    })

    it('passes language to the header label when code is also provided', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', language: 'vue', code: '<template />' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.find('span.font-mono').text()).toBe('vue')
    })

    it('renders empty placeholder span when code is set but language is absent', () => {
      const wrapper = mount(CodeBlock, {
        props: { variant: 'block', code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.find('span.font-mono').exists()).toBe(false)
    })
  })
})
