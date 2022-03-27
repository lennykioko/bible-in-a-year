import Image from "next/image"

function Loader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Image
        className="object-contain group-hover:animate-bounce"
        src="/ascension_logo.png"
        alt="Logo"
        width={400}
        height={200}
      />
      <div className="my-4 h-20 w-20 animate-spin rounded-full border-4 border-dotted border-amber-300 border-t-transparent"></div>
    </div>
  )
}

export default Loader
