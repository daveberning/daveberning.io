import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Text } from '.'

const meta: Meta<typeof Text> = {
  title: 'UI/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    },
  },
  args: {
    as: 'p',
  },
  render: (args) => ({
    components: { Text },
    setup: () => ({ args }),
    template: '<Text v-bind="args">The quick brown fox jumps over the lazy dog</Text>',
  }),
}

export default meta
type Story = StoryObj<typeof Text>

export const Paragraph: Story = {}

export const H1: Story = {
  args: { as: 'h1' },
}

export const H2: Story = {
  args: { as: 'h2' },
}

export const H3: Story = {
  args: { as: 'h3' },
}

export const H4: Story = {
  args: { as: 'h4' },
}

export const H5: Story = {
  args: { as: 'h5' },
}

export const H6: Story = {
  args: { as: 'h6' },
}
