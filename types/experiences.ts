import type { ThemeVariant } from '~/stores/theme'

export type ExperienceType = 'professional' | 'freelance'

export interface ExperienceEntry {
  company: string
  role: string
  period?: string
  logo: string
  logoClass?: string
  type: ExperienceType
}