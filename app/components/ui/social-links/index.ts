/* Types
--------------------------------------------------------------------- */
export interface SocialLink {
  label: string
  href:  string
  icon:  string
}

export interface SocialLinksProps {
  links?: SocialLink[]
  class?: string
}

/* Defaults
--------------------------------------------------------------------- */
export const defaultSocialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daveberning', icon: 'simple-icons:linkedin' },
  { label: 'GitHub',   href: 'https://github.com/daveberning',          icon: 'simple-icons:github' },
  { label: 'Email',    href: 'mailto:hello@daveberning.io',              icon: 'lucide:mail' },
]

/* Components
--------------------------------------------------------------------- */
import SocialLinks from './SocialLinks.vue'

export {
  SocialLinks as default,
  SocialLinks,
}
