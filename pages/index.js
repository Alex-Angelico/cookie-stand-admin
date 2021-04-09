import Head from 'next/head'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Cookie Stand Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4 bg-green-500 text-3xl">
        <h1 className="border-gray 50">Cookie Stand Admin</h1>
      </header>

      <main className="">
        <div className="m-30 w-960px h-400px border-black rounded-sm">
      <h2 className=""></h2>
      <form className="">
        <label className="">Location</label>
        <input className=""></input>
        <label className="">Minimum Customers per Hour</label>
        <input className=""></input>
        <label className="">Maximum Customers per Hour</label>
        <input className=""></input>
        <label className="">Average Cookies per Sale</label>
        <input className=""></input>
        <button className="">Create</button>
      </form>
</div>
      </main>

      <footer className="mb-30 p-4 bg-green-500 ">
      &copy; 2021</footer>
    </div>
  )
}

// text-center