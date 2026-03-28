import React from 'react';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-slate-200 animate-pulse rounded-2xl ${className}`} />
);

export const HeroSkeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16 items-center">
    <div className="flex-1 space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-3/4" />
      <Skeleton className="h-12 w-1/2" />
      <div className="flex gap-4 pt-6">
        <Skeleton className="h-14 w-40" />
        <Skeleton className="h-14 w-40" />
      </div>
    </div>
    <div className="flex-1 w-full">
      <Skeleton className="aspect-[4/5] rounded-[48px] w-full" />
    </div>
  </div>
);

export const PricingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-10 rounded-[48px] border border-slate-100 bg-white h-[600px] flex flex-col gap-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-20 w-full" />
        <div className="space-y-4 flex-1 pt-10">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-16 w-full rounded-[24px]" />
      </div>
    ))}
  </div>
);

export const BookingListSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-[32px] border border-slate-100 p-8 h-48 flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
        <div className="w-48 flex flex-col justify-between items-end">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    ))}
  </div>
);

export const AdminStatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 flex items-center gap-6 h-32">
        <Skeleton className="w-14 h-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden">
    <div className="p-8 space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-8 items-center border-b border-slate-50 pb-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 flex-1" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);