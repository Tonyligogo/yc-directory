import { formatDate } from "@/lib/utils"
import { Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"

const StartupCard = ({post}) => {
  return (
    <li className="group border-t-2 border-l-2 border-r-4 border-b-8 border-black rounded-xl p-4">
      <div className="flex justify-between">
        <p className="bg-slate-100 rounded-full px-2 py-1 text-sm">{formatDate(post?._createdAt)}</p>
        <div className="flex items-center gap-1.5">
          <Eye size={20}/>
          <span className="font-semibold">{post?.views}</span>
        </div>
      </div>
      <div className="flex justify-between gap-5 mt-5">
        <div className="flex-1">
          <Link href={`/user/${post?.author?._id}`}>
          <p className="line-clamp-1 text-sm text-gray-600">{post?.author?.name}</p>
          </Link>
          <Link href={`/startup/${post?._id}`}>
          <h3 className="line-clamp-2 font-semibold text-lg">{post?.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post?.author?._id}`}>
        <img src={post?.author?.image} alt={post?.author?.name} width={40} height={40} className="rounded-full" />
        </Link>
      </div>
          <p className="line-clamp-2 leading-normal text-sm text-gray-600 mt-1 mb-4 pb-1">{post?.description}</p>
        <Link href={`/startup/${post?._id}`}>
        <div className="flex-1 h-[150px]">
          <img src={post?.image} alt={post?.title} width={300} height={150} className="w-full h-full object-cover rounded-lg" />
        </div>
        </Link>
        <div className="flex items-center mt-4 justify-between">
          <Link href={`/?query=${post?.category?.toLowerCase()}`}> <span>{post?.category}</span> </Link>
          <Link href={`/startup/${post?._id}`} className="bg-black text-white px-4 py-1 rounded-full">Details</Link>
        </div>
    </li>
  )
}

export default StartupCard

export const StartupCardSkeleton = () => (
  <>
  {[1,2,3,4].map((index) => (
    <li key={index}>
      <Skeleton className="h-[250px] w-full rounded-xl"/>
    </li>
  ))}
  </>
)
