import Link from 'next/link'

export default function CookieStandHeader({ username, onLogout }) {
  return (
    <header className="p-4 bg-green-500 flex justify-evenly items-center">
      <h1 className="font-black text-3xl">
        Cookie Stand Admin
                </h1>
      <div className="">
        <p className="inline p-1 m-1 rounded-md bg-green-100">{username}</p>
        <Link href="/">
          <a onClick={onLogout} className="inline p-1 m-1 rounded-md bg-green-100">Sign Out</a>
        </Link>
        <nav>
          <Link href="/overview"><a className="inline p-1 m-1 rounded-md bg-green-100">Overview</a></Link>
        </nav>
      </div>
    </header>
  )
}