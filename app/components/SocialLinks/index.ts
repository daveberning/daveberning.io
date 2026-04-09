/* Types
--------------------------------------------------------------------- */
export interface SocialLink {
  label: string
  href:  string
  icon:  string
}

export interface SocialLinksProps {
  links?:     SocialLink[]
  class?:     string
  linkClass?: string
}

/* Components
--------------------------------------------------------------------- */
import SocialLinks from './SocialLinks.vue'

export {
  SocialLinks as default,
  SocialLinks,
}
