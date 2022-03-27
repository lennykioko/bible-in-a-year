import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { Item } from "../typings"
import Thumbnail from "./Thumbnail"

interface Props {
  items: Item[]
}

function Thumbnails({ items }: Props) {
  const [watched, setWatched] = useState<string[]>([])
  const [filterBy, setFilterBy] = useState("all")
  const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  const { data: session } = useSession()

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
  }

  const app = !getApps()?.length ? initializeApp(firebaseConfig) : getApp()
  const db = getFirestore(app)

  const colRef = collection(db, "progress")
  const myquery = session?.user?.email
    ? query(colRef, where("userEmail", "==", session?.user?.email))
    : null

  useEffect(() => {
    try {
      const createDocIfNotExists = async () => {
        if (session?.user?.email) {
          const docRef = doc(db, "progress", session?.user?.email)
          const myDoc = await getDoc(docRef)

          if (!myDoc.exists()) {
            await setDoc(docRef, {
              userEmail: session?.user?.email,
              watched: watched,
              timestamp: serverTimestamp(),
            })
          }
        }
      }
      createDocIfNotExists()
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    try {
      if (myquery) {
        onSnapshot(myquery, (snapshot: any) => {
          let myWatched = []
          snapshot.docs.forEach((doc: any) => {
            myWatched = doc.data().watched
            setWatched(myWatched)
          })
        })
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (filterBy === "all") {
      setFilteredItems(items)
    } else if (filterBy === "watched") {
      const watchedItems = items.filter((item) => watched.includes(item.id))
      setFilteredItems(watchedItems)
    } else if (filterBy === "unwatched") {
      const unwatchedItems = items.filter((item) => !watched.includes(item.id))
      setFilteredItems(unwatchedItems)
    }
  }, [filterBy])

  const updatesavedWatched = async (updatedArr: string[]) => {
    try {
      if (session?.user?.email) {
        const docRef = doc(db, "progress", session?.user?.email)
        await updateDoc(docRef, {
          userEmail: session?.user?.email,
          watched: updatedArr,
          timestamp: serverTimestamp(),
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="my-4 inline-flex">
        <button
          onClick={() => setFilterBy("all")}
          className={`rounded-l-lg bg-amber-500 py-2 px-4 text-lg font-semibold text-black hover:bg-amber-600 active:bg-amber-600 ${
            filterBy === "all" ? "active" : null
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterBy("watched")}
          className={`bg-amber-500 py-2 px-4 text-lg font-semibold text-black hover:bg-amber-600 active:bg-amber-600 ${
            filterBy === "watched" ? "active" : null
          }`}
        >
          Watched
        </button>
        <button
          onClick={() => setFilterBy("unwatched")}
          className={`rounded-r-lg bg-amber-500 py-2 px-4 text-lg font-semibold text-black hover:bg-amber-600 active:bg-amber-600 ${
            filterBy === "unwatched" ? "active" : null
          }`}
        >
          Unwatched
        </button>
      </div>
      <main className="mt-6 grow flex-wrap items-center justify-start gap-3 p-3 md:flex">
        {filteredItems.length ? (
          filteredItems.map((item) => (
            <Thumbnail
              key={item.id}
              item={item}
              watched={watched}
              setWatched={setWatched}
              updatesavedWatched={updatesavedWatched}
            />
          ))
        ) : (
          <div className="flex h-full w-full grow items-center justify-center truncate text-xl">
            No Items to display at the moment
          </div>
        )}
      </main>
    </>
  )
}

export default Thumbnails
