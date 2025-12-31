'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
  activeClassName?: string;
  end?: boolean;
}

export function NavLink({ 
  href, 
  children, 
  className,
  activeClassName = 'active',
  end = false
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = end 
    ? pathname === href 
    : pathname.startsWith(href);

  const computedClassName = typeof className === 'function' 
    ? className({ isActive })
    : cn(className, isActive && activeClassName);

  return (
    <Link href={href} className={computedClassName}>
      {children}
    </Link>
  );
}

export default NavLink;
