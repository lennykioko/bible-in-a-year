import type { NextPage, GetStaticProps } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Thumbnails from "../components/Thumbnails"
import { Item } from "../typings"
import Loader from "../components/Loader"
const data = require("../utils/cleanedData.json")

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    if (data?.items) setItems(data?.items)
  }, [])

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-slate-800 text-white">
      <Head>
        <title>Bible In A year</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {session ? (
            <></>
          ) : (
            <div className="flex w-full items-center justify-center truncate bg-amber-500 py-4 text-lg font-bold text-white">
              Kindly sign in with Google to save and sync progress
            </div>
          )}

          {items?.length ? (
            <Thumbnails items={items} />
          ) : (
            <div className="flex h-full w-full grow items-center justify-center truncate text-xl">
              No Items to display at the moment
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  )
}

export default Home
