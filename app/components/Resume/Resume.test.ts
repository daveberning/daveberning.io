import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Resume from './Resume.vue'
import ResumeSection from './ResumeSection.vue'
import ResumeEntry from './ResumeEntry.vue'

describe('Resume', () => {
  it('renders as an article by default', () => {
    const wrapper = mount(Resume)
    expect(wrapper.element.tagName).toBe('ARTICLE')
  })

  it('renders slot content', () => {
    const wrapper = mount(Resume, {
      slots: { default: '<p>resume body</p>' },
    })
    expect(wrapper.html()).toContain('resume body')
  })

  it('supports polymorphic rendering and class merging', () => {
    const wrapper = mount(Resume, {
      props: {
        as: 'section',
        class: 'custom-resume',
      },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('custom-resume')
  })
})

describe('ResumeSection', () => {
  it('renders the section title in a heading', () => {
    const wrapper = mount(ResumeSection, {
      props: { title: 'Experience' },
      slots: { default: 'content' },
    })

    expect(wrapper.find('h2').text()).toBe('Experience')
    expect(wrapper.text()).toContain('content')
  })

  it('supports custom content classes', () => {
    const wrapper = mount(ResumeSection, {
      props: {
        title: 'Skills',
        contentClass: 'custom-content',
      },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })
})

describe('ResumeEntry', () => {
  it('renders role metadata and summary text', () => {
    const wrapper = mount(ResumeEntry, {
      props: {
        title: 'Senior Front-End Engineer I',
        organization: 'WDTech / Walker & Dunlop',
        period: 'March 2021 - Present',
        location: 'Cincinnati, OH',
        summary: 'Leading scalable front-end architecture.',
      },
    })

    expect(wrapper.find('h3').text()).toBe('Senior Front-End Engineer I')
    expect(wrapper.text()).toContain('WDTech / Walker & Dunlop')
    expect(wrapper.text()).toContain('Cincinnati, OH')
    expect(wrapper.text()).toContain('March 2021 - Present')
    expect(wrapper.text()).toContain('Leading scalable front-end architecture.')
  })

  it('renders bullet content through the default slot', () => {
    const wrapper = mount(ResumeEntry, {
      props: {
        title: 'Engineer',
        organization: 'Example Co',
        period: '2020 - 2024',
      },
      slots: {
        default: '<ul><li>Built reusable components.</li></ul>',
      },
    })

    expect(wrapper.html()).toContain('Built reusable components.')
  })

  it('supports polymorphic rendering and custom classes', () => {
    const wrapper = mount(ResumeEntry, {
      props: {
        title: 'Engineer',
        organization: 'Example Co',
        period: '2020 - 2024',
        as: 'section',
        class: 'custom-entry',
      },
    })

    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('custom-entry')
  })
})
