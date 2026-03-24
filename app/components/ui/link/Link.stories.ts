import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Link from '.'

const meta: Meta<typeof Link> = {
  title: 'UI/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['small', 'regular', 'large'],
    },
    radius: {
      control: 'select',
      options: ['small', 'regular', 'full', 'none'],
    },
  },
  args: {
    as: 'a',
    variant: 'text',
    size: 'regular',
    radius: 'regular',
    href: '#',
  },
  render: (args) => ({
    components: { Link },
    setup: () => ({ args }),
    template: '<Link v-bind="args">Visit page</Link>',
  }),
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const Solid: Story = {
  args: { variant: 'solid' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Small: Story = {
  args: { size: 'small' },
}

export const Large: Story = {
  args: { size: 'large' },
}

export const Rounded: Story = {
  args: { radius: 'full' },
}
