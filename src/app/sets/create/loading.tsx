import { CardFooter, Skeleton } from "@/components/ui";

const SetCreateLoading = async () => {
  return (
    <>
      <div className="flex justify-between">
        <Skeleton className="w-1/5" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <Skeleton className="h-8 w-2/5" />
      <Skeleton className="h-52 w-full" />
      <div className="flex h-fit flex-wrap gap-3 overflow-y-scroll">
        <Skeleton className="h-[60px] w-24" />
        <Skeleton className="h-[60px] w-52" />
        <Skeleton className="h-[60px] w-72" />
        <Skeleton className="h-[60px] w-40" />
        <Skeleton className="h-[60px] w-48" />
        <Skeleton className="h-[60px] w-72" />
      </div>
      <CardFooter>
        <div className="flex justify-end gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </CardFooter>
    </>
  );
};

export default SetCreateLoading;
