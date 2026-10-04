import type { ReactNode, SVGProps } from 'react'

export type IconName = 'terminal' | 'user' | 'code' | 'layers' | 'file' | 'mail' | 'search' | 'theme' | 'clock' | 'share' | 'menu' | 'close' | 'folder' | 'arrow-right' | 'arrow-up-right' | 'briefcase' | 'spark' | 'lock' | 'robot' | 'reset' | 'send'

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
    folder: <path d="M2.5 5h7l2.3 2.5H21.5V19H2.5V5Z" />,
    'arrow-right': <path d="M3 12h17m-7-7 7 7-7 7" />,
    'arrow-up-right': <path d="M5 19 19 5M8 5h11v11" />,
    briefcase: <><rect x="2.5" y="7" width="19" height="14" rx="1" /><path d="M8 7V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V7M2.5 13l9.5 3 9.5-3M10 14.5v3h4v-3" /></>,
    spark: <path d="M12 1.5v21M1.5 12h21M4.5 4.5l15 15M19.5 4.5l-15 15" />,
    lock: <><rect x="4" y="10" width="16" height="11" rx="1" /><path d="M7 10V7a5 5 0 0 1 10 0v3M12 14v3" /></>,
    robot: <><path d="M9 7V4h6v3M12 4V2" /><rect x="3" y="7" width="18" height="13" rx="1" /><path d="M7 12h.01M17 12h.01M8 16h8M1 11v5M23 11v5" /></>,
    reset: <><path d="M4 4v6h6" /><path d="M5.3 9.2A7.5 7.5 0 1 1 5 15" /></>,
    send: <><path d="m3 4 18 8-18 8 4-8-4-8Z" /><path d="M7 12h14" /></>,
  }

  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" {...props}>{paths[name]}</svg>
}
