import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card, { CardHeader, CardContent, CardFooter } from '.'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'raised', 'outline', 'theme'],
    },
  },
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { Card, CardHeader, CardContent, CardFooter },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" class="w-80">
        <CardHeader>
          <p class="text-sm font-semibold">Card Title</p>
          <p class="text-xs text-text-muted mt-0.5">Supporting subtitle text</p>
        </CardHeader>
        <CardContent>
          <p class="text-sm">This is the main content area of the card. It can hold any content you need.</p>
        </CardContent>
        <CardFooter>
          <p class="text-xs text-text-muted">Footer metadata or actions</p>
        </CardFooter>
      </Card>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const Raised: Story = {
  args: { variant: 'raised' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Theme: Story = {
  args: { variant: 'theme' },
}

export const ContentOnly: Story = {
  render: (args) => ({
    components: { Card, CardContent },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" class="w-80">
        <CardContent>
          <p class="text-sm">A card with only content — no header or footer.</p>
        </CardContent>
      </Card>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Card, CardHeader, CardContent, CardFooter },
    template: `
      <div class="flex flex-wrap gap-4">
        <Card v-for="variant in ['default', 'raised', 'outline', 'theme']" :key="variant" :variant="variant" class="w-64">
          <CardHeader>
            <p class="text-sm font-semibold capitalize">{{ variant }}</p>
            <p class="text-xs mt-0.5" :class="variant === 'theme' ? 'text-theme-fg/70' : 'text-text-muted'">Subtitle</p>
          </CardHeader>
          <CardContent>
            <p class="text-sm">Content for the {{ variant }} card variant.</p>
          </CardContent>
          <CardFooter>
            <p class="text-xs" :class="variant === 'theme' ? 'text-theme-fg/70' : 'text-text-muted'">Footer</p>
          </CardFooter>
        </Card>
      </div>
    `,
  }),
}
