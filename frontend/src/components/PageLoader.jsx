import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-950">
      <LoaderIcon className="w-10 h-10 text-purple-500 animate-spin" />
    </div>
  );
};

export default PageLoader;
