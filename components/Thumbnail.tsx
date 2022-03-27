import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Item } from "../typings"

interface Props {
  item: Item
  watched: string[]
  setWatched(watched: string[]): void
  updatesavedWatched(updatedArr: string[]): void
}

const BASE_URL = "https://www.youtube.com/watch?v="

function Thumbnail({ item, watched, setWatched, updatesavedWatched }: Props) {
  const [isChecked, setIsChecked] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const isWatched = watched.includes(item.id)
    setIsChecked(isWatched)
  }, [watched])

  const toggleWatched = (itemId: string) => {
    if (watched.includes(itemId)) {
      const newArr = watched.filter((savedId) => savedId !== itemId)
      setWatched(newArr)
      setIsChecked(false)
      updatesavedWatched(newArr)
    } else {
      const newArr = watched
      newArr.push(itemId)
      setWatched(newArr)
      setIsChecked(true)
      updatesavedWatched(newArr)
    }
  }

  return (
    <div className="m-1 mb-4 flex cursor-pointer flex-col justify-start rounded-lg border-2 border-solid border-amber-500 p-4 transition-all duration-100 ease-in-out hover:bg-slate-900">
      <a href={`${BASE_URL}${item.videoId}`} rel="noreferrer" target="_blank">
        <div className="h-80 w-96">
          <Image
            layout="responsive"
            src={
              item.thumbnailUrl
                ? `${item.thumbnailUrl}`
                : "https://i.ytimg.com/vi/g7o7WjQc3as/sddefault.jpg" // default image src
            }
            width={640}
            height={480}
          />
          <h4 className="my-4 truncate text-lg font-semibold">{item.title}</h4>
        </div>
      </a>
      <div className="mt-8">
        <label className="align-middle font-semibold text-slate-500">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleWatched(item.id)}
            className="h-4 w-4 rounded accent-amber-500"
          />
          {"  "}
          Watched
        </label>
      </div>
    </div>
  )
}

export default Thumbnail
