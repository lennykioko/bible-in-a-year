import type { NextPage, GetStaticProps } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Thumbnails from "../components/Thumbnails"
import { Item } from "../typings"
import Loader from "../components/Loader"
import { getData } from "./api/data"

interface Props {
  items: Item[]
}

const Home: NextPage<Props> = ({ items }: Props) => {
  const { data: session, status } = useSession()

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-slate-800 py-2 text-white">
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
          <Thumbnails items={items} />
        </>
      )}
      <Footer />
    </div>
  )
}

interface Data {
  items: Item[]
}

export const getStaticProps: GetStaticProps = async () => {
  const data: Data = await getData()
  const items = data?.items || []

  return {
    props: {
      items,
    },
    revalidate: 7200, // revalidate after 2 hours
  }
}

export default Home
