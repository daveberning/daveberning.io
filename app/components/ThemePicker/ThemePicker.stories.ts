import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThemePicker from '.'

const meta: Meta<typeof ThemePicker> = {
  title: 'ThemePicker',
  component: ThemePicker,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    orientation: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof ThemePicker>

export const Vertical: Story = {
  args: { orientation: 'vertical' },
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
}
