import { HeartIcon } from "@heroicons/react/outline"

function Footer() {
  return (
    <footer className="mt-5 flex w-full items-center justify-center bg-slate-700 p-10">
      <div className="group flex gap-2">
        Built with
        <span>
          <HeartIcon className="h-8 fill-rose-500 group-hover:animate-bounce" />
        </span>
        by Lenny Kioko
      </div>
    </footer>
  )
}

export default Footer
