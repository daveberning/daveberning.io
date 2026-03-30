import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'
import ThemePicker from '.'
import { provideTheme } from '~/composables/useTheme'

const ThemePickerHarness = defineComponent({
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
    },
  },
  setup(props) {
    provideTheme()
    return () => h(ThemePicker, { orientation: props.orientation as 'horizontal' | 'vertical' })
  },
})

afterEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.classList.remove('dark')
})

describe('ThemePicker browser behavior', () => {
  it('toggles dark mode and changes the selected theme color', async () => {
    localStorage.setItem('theme:dark', 'false')
    localStorage.setItem('theme:color', 'teal')
    const view = render(ThemePickerHarness)

    const darkModeButton = view.getByRole('button', { name: 'Switch to dark mode' })
    await userEvent.click(darkModeButton)

    await expect.element(view.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme:dark')).toBe('true')

    const blueThemeButton = view.getByRole('button', { name: 'Change to the blue theme' })
    await userEvent.click(blueThemeButton)

    await expect.element(blueThemeButton).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.getAttribute('data-theme')).toBe('blue')
    expect(localStorage.getItem('theme:color')).toBe('blue')
  })

  it('moves focus with horizontal arrow-key navigation', async () => {
    localStorage.setItem('theme:dark', 'false')
    localStorage.setItem('theme:color', 'teal')
    const view = render(ThemePickerHarness, {
      props: { orientation: 'horizontal' },
    })

    const darkModeButton = view.getByRole('button', { name: 'Switch to dark mode' })
    const tealThemeButton = view.getByRole('button', { name: 'Change to the teal theme' })
    const purpleThemeButton = view.getByRole('button', { name: 'Change to the purple theme' })

    darkModeButton.element().focus()
    await expect.element(darkModeButton).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    await expect.element(tealThemeButton).toHaveFocus()

    darkModeButton.element().focus()
    await userEvent.keyboard('{ArrowLeft}')
    await expect.element(purpleThemeButton).toHaveFocus()
  })
})
