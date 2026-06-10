import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'ghost';

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type HudButtonProps = BaseProps &
  (
    | ({ as?: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

/* HUD-style button: outlined mono uppercase with bracket glyphs */
export default function HudButton({ children, variant = 'primary', className = '', ...rest }: HudButtonProps) {
  const base = variant === 'primary' ? 'hud-btn' : 'hud-btn-ghost';
  const cls = `${base} ${className}`;

  if (rest.as === 'button') {
    const { as: _as, ...btnProps } = rest;
    return (
      <button className={cls} {...(btnProps as ButtonHTMLAttributes<HTMLButtonElement>)}>
        <span aria-hidden="true">[</span>
        {children}
        <span aria-hidden="true">]</span>
      </button>
    );
  }

  const { as: _as, ...aProps } = rest;
  return (
    <a className={cls} {...(aProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      <span aria-hidden="true">[</span>
      {children}
      <span aria-hidden="true">]</span>
    </a>
  );
}
