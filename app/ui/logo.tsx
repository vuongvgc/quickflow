import { GlobeAltIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold"
      prefetch={false}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />

      <span className="">QuickFlow</span>
    </Link>
  );
}
