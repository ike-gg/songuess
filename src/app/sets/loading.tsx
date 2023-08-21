//@ts-nocheck

import { Card, Divider, Skeleton } from "@/components/ui";

const SetsLoading = async () => {
  return (
    <>
      <aside className="static top-12 flex h-fit max-h-screen w-full flex-col gap-4 md:sticky md:w-full md:max-w-[18rem]">
        <div className="flex items-center justify-between gap-12">
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-10 w-16" />
        </div>
        <Divider className="my-0" />
        <div className="flex gap-3 md:flex-col">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>
      <Card className="w-full flex-col gap-4">
        <div className="grid grid-flow-row-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
          <Skeleton className="col-span-2 row-span-2 aspect-square h-full w-full rounded-lg" />
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
          <Skeleton className="col-span-2 row-span-2 aspect-square h-full w-full rounded-lg" />
          <Skeleton className="col-span-2 row-span-2 aspect-square h-full w-full rounded-lg" />
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
          <Skeleton className="col-span-2 row-span-2 aspect-square h-full w-full rounded-lg" />
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
          <Skeleton className="aspect-square h-full w-full rounded-lg" />
        </div>
      </Card>
    </>
  );
};

export default SetsLoading;
