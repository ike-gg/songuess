import { CardFooter, Skeleton } from "@/components/ui";

const UserLoading = async () => {
  return (
    <>
      <div className="flex justify-between">
        <Skeleton className="w-1/5" />
      </div>
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
      <CardFooter>
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </>
  );
};

export default UserLoading;
