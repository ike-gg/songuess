import { Skeleton } from "@/components/ui/Skeleton";

const AuthLoading = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full">
        <Skeleton className="mb-2 h-5 w-20" />
        <Skeleton className="h-11 w-full" />
      </div>
      <div className="w-full">
        <Skeleton className="mb-2 h-5 w-32" />
        <Skeleton className="h-11 w-full" />
      </div>
      <Skeleton className="my-3 h-10 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default AuthLoading;
