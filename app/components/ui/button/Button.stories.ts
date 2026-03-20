import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'text'],
    },
    color: {
      control: 'select',
      options: ['teal', 'purple', 'red', 'green', 'blue'],
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
    variant: 'solid',
    color: 'teal',
    size: 'regular',
    radius: 'regular',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Click me</Button>',
  }),
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Text: Story = {
  args: { variant: 'text' },
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
