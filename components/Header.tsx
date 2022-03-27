import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex w-full items-center justify-between bg-slate-900">
      <div className="group cursor-pointer">
        <Image
          className="object-contain group-hover:animate-bounce"
          src="/ascension_logo.png"
          alt="Logo"
          width={200}
          height={100}
        />
      </div>
      <div className="mr-4 flex cursor-pointer items-center gap-3 pr-4">
        {session ? (
          session?.user?.image ? (
            <Image
              className="z-10 rounded-full object-contain"
              src={session?.user?.image}
              alt="Profile Picture"
              width={50}
              height={50}
            />
          ) : (
            <div className=" rounded-full bg-amber-400 py-3 px-4 text-xl font-semibold uppercase tracking-wider text-black hover:animate-bounce">
              {session?.user?.email?.substring(0, 2)}
            </div>
          )
        ) : (
          <></>
        )}

        {session ? (
          <button
            onClick={() => signOut()}
            className="ml-4 rounded-lg p-2 text-lg font-medium outline outline-offset-2 outline-rose-500 hover:outline-rose-600"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="ml-4 rounded-lg p-2 text-lg font-medium outline outline-offset-2 outline-blue-500 hover:outline-blue-600"
          >
            Sign In With Google
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
