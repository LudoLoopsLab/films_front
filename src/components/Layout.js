import Head from 'next/head'
import Nav from './Nav'


const Layout = ({ user, loading = false, children }) => (
  <>
    <Head>
      <title>Film Database</title>
    </Head>

    <Nav />
    <main className="px-4">
      <div
        className="
          flex
          content-start
          items-center
          bg-white
          mx-auto
          w-2/4
          rounded-lg
          my-16
          p-16
        "
      >
        <div className="text-2xl font-medium text-black w-full">{children}</div>
      </div>
    </main>
  </>
)
export default Layout