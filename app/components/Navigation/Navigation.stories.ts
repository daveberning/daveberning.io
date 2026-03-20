import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Navigation, NavigationItem } from '.'

const meta: Meta<typeof Navigation> = {
  title: 'Navigation',
  component: Navigation,
  tags: ['autodocs'],
  render: () => ({
    components: { Navigation, NavigationItem },
    template: `
      <Navigation>
        <NavigationItem to="/about">About</NavigationItem>
        <NavigationItem to="/work">Work</NavigationItem>
        <NavigationItem to="/contact">Contact</NavigationItem>
        <NavigationItem to="/writing">Writing</NavigationItem>
      </Navigation>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof Navigation>

export const Default: Story = {}
