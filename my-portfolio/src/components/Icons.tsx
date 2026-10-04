import type { ReactNode, SVGProps } from 'react'

export type IconName = 'terminal' | 'user' | 'code' | 'layers' | 'file' | 'mail' | 'search' | 'theme' | 'clock' | 'share' | 'menu' | 'close'

type IconProps = SVGProps<SVGSVGElement> & { name: IconName }

export function Icon({ name, ...props }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    terminal: <><rect x="2.5" y="4" width="19" height="16" rx=".5" /><path d="m6.5 9 3 3-3 3M12 15h5" /></>,
    user: <><circle cx="12" cy="7" r="3" /><path d="M5 20v-2.2c0-3.2 2.9-5.3 7-5.3s7 2.1 7 5.3V20H5Z" /></>,
    code: <><rect x="2.5" y="4" width="19" height="16" rx=".5" /><path d="m9.5 9-3 3 3 3m5-6 3 3-3 3" /></>,
    layers: <><path d="m12 2 9.5 5.5L12 13 2.5 7.5 12 2Zm-9.5 10L12 17.5 21.5 12M2.5 16.5 12 22l9.5-5.5" /></>,
    file: <><path d="M5 2.5h9l5 5V21H5V2.5Z" /><path d="M14 2.5v5h5M8 12h8M8 16h6" /></>,
    mail: <><rect x="2" y="5" width="20" height="14" rx=".5" /><path d="m2.5 6 9.5 7 9.5-7" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></>,
    theme: <><path d="M12 2.5a9.5 9.5 0 1 0 0 19V2.5Z" /><path d="M12 5.5a6.5 6.5 0 0 1 0 13" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6.5V12l3.5 2" /></>,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4m-7.6 6.8 7.6 4.4" /></>,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="M4 4 20 20M20 4 4 20" />,
  }

  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" {...props}>{paths[name]}</svg>
}
