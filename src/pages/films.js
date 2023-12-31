import Layout from "@/components/Layout"
import Films from "@/components/Films"
import React from 'react'
import { fetcher } from "@/lib/api"
import { useFetchUser } from '@/lib/authContext'
import { useState } from "react"

import useSWR from 'swr'

const FilmsList = ({ films }) => {
  const { user, loading } = useFetchUser()
  const [pageIndex, setPageIndex] = useState(1)
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=2`, fetcher, { fallback: films })

  return (
    <Layout user={user}>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4 w-full justify-start">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-neutral-400">
          Films
        </span>
      </h1>

      <Films films={data} />

      <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
            }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${pageIndex === (data && data.meta.pagination.pageCount)
            ? 'bg-gray-300'
            : 'bg-blue-400'
            }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount
          }`}</span>
      </div>
    </Layout>
  )
}

export default FilmsList

export async function getStaticProps() {
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=2`
  )

  return {
    props: {
      films: filmsResponse,
    },
  }
}