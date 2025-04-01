import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn, formatDate } from "@/lib/utils";

export function Hero({heading, subHeading, createdAt}) {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden bg-background">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="absolute flex items-center">
        <div>
          {createdAt ? <p className="bg-black text-white w-fit mx-auto px-4 mt-5 py-2 text-sm">{formatDate(createdAt)}</p> : 
          null
          }
      <p className="heading">{heading}</p>
      <p className="text-center text-lg max-w-3xl">{subHeading}</p>
        </div>
      </div>
    </div>
  );
}
