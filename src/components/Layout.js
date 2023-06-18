import Head from "next/head"
import Nav from "./Nav"

const Layout = ({ children }) => {
  <>
    <Head>
      <title>film Database</title>
    </Head>
    <Nav />
    <main className="px-4">
      <div className="flex justify-center items-center bg-white mx-auto w-2/4 rounded-lg my-16 p-26">

      </div>
      <div className="text-2xl font-medium">{children}</div>
    </main>

  </>
}

export default Layout