import { Skeleton } from "@/components/ui";

const UserLoading = async () => {
  return (
    <>
      <div className="flex justify-between">
        <Skeleton className="w-1/5" />
        <Skeleton className="h-8 w-1/5" />
      </div>
    </>
  );
};

export default UserLoading;
