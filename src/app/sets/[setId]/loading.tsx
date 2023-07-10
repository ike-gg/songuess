import Skeleton from "@/components/ui/Skeleton";
import CardFooter from "@/components/ui/Card/CardFooter";

const SetPreviewLoading = async () => {
  return (
    <>
      <Skeleton className="-m-6 mb-0 h-52 w-screen rounded-none" />
      <Skeleton className="w-1/5" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-2/5" />
        <Skeleton className="h-5 w-1/6" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="mt-8 flex flex-col gap-2">
        <Skeleton className="h-7 w-14" />
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-7 w-36" />
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

export default SetPreviewLoading;
