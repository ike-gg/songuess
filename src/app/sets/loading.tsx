import { Skeleton } from "@/components/ui";

const SetsLoading = async () => {
  return (
    <>
      <div className="flex justify-between">
        <Skeleton className="w-1/5" />
        <Skeleton className="h-8 w-1/5" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-2/5" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <div className="flex flex-row gap-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-16" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </>
  );
};

export default SetsLoading;
