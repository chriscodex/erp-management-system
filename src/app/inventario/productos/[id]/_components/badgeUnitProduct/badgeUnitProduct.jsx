import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        successTable:
          'bg-green-600 text-neutral-100 font-normal text-base w-[120px] flex items-center justify-center',
        blueTable:
          'bg-blue-500 text-neutral-100 font-normal text-base w-[120px] flex items-center justify-center',
        orangeTable:
          'bg-orange-500 text-neutral-100 font-normal text-base w-[120px] flex items-center justify-center',
        redTable:
          'bg-red-500 text-neutral-100 font-normal text-base w-[120px] flex items-center justify-center',
        purpleTable:
          'bg-purple-500 text-neutral-100 font-normal text-base w-[120px] flex items-center justify-center',
        yellowTable:
          'bg-yellow-500 text-neutral-100 font-normal text-base w-[120px] flex items-center justify-center',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function BadgeUnitProduct({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { BadgeUnitProduct, badgeVariants };
