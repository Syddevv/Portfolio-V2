import type { IconType } from 'react-icons'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export type SocialLink = {
  label: 'LinkedIn' | 'Facebook' | 'Instagram' | 'GitHub'
  icon: IconType
  url: string
}

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/sydney-santos-471a0b301/' },
  { label: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/sydney.santos.7773/' },
  { label: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/jst.sydd/' },
  { label: 'GitHub', icon: FaGithub, url: 'https://github.com/Syddevv' },
]
