import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { hours } from '../assets/data'

export default function Home() {

  const [allStoresSales, setAllStoresSales] = useState([]);

  function storeCreate(event) {
    event.preventDefault()

    const newStoreRecord = {
      location: event.target.location.value,
      sales_data: getCookieSalesHourly(event.target.minimum.value, event.target.maximum.value, event.target.average.value, hours.length)
    }
    setAllStoresSales([...allStoresSales, newStoreRecord])
  }

  function getCookieSalesHourly(min, max, avg, count) {
    var store_sales = []
    for (var i = 0; i < count; i++) { store_sales.push(Math.round(getCustomersHourly(min, max) * avg)) }
    return store_sales
  }

  function getCustomersHourly(min, max) { return Math.random() * (max - min + 1) + min }

  function getHourlySubtotals(hours, sales) {
    var hourly_subtotals = []
    for (var i = 0; i < hours.length; i++) {
      var hour_subtotal = 0
      for (var j = 0; j < sales.length; j++) { hour_subtotal += sales[j].sales_data[i] }
      hourly_subtotals.push(hour_subtotal)
    }
    return hourly_subtotals
  }

  function getTotalCookies(hourly_data) {
    var total = 0
    for (var i = 0; i < hourly_data.length; i++) { total += hourly_data[i] }
    return total
  }

  function Header(props) {
    return (
      <header className="p-4 bg-green-500 flex justify-between items-center">
        <h1 className="text-3xl">{props.title}</h1>
        <nav>
          <Link href="/overview"><a className="p-1 rounded-md bg-green-100">Overview</a></Link>
        </nav>
      </header>
    )
  }

  function CreateForm() {
    return (
      <div className="p-1 mt-8 mb-8 ml-auto mr-auto w-5/6 h-auto rounded-md bg-green-300 text-center self-center">
        <h2 className="text-xl m-4">Create Cookie Stand</h2>
        <form onSubmit={storeCreate} className="">
          <section className="">
            <label className="mr-2.5">Location</label>
            <input name="location" className="md:w-9/12 lg:w-10/12"></input>
          </section>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center mt-4 mb-4">
            <section className="rounded-md bg-green-100 m-1 p-2">
              <label className="block">Minimum Customers per Hour</label>
              <input name="minimum" className="block w-56"></input>
            </section>
            <section className="rounded-md bg-green-100 m-1 p-2">
              <label className="block">Maximum Customers per Hour</label>
              <input name="maximum" className="block w-56"></input>
            </section>
            <section className="rounded-md bg-green-100 m-1 p-2">
              <label className="block">Average Cookies per Sale</label>
              <input name="average" className="block w-56"></input>
            </section>
            <button className="rounded-md bg-green-500 m-1 w-60 h-16">Create</button>
          </div>
        </form>
      </div>
    )
  }

  function ReportTable(props) {
    if (props.sales_hourly.length === 0) { return (<h2 className="mt-8 mb-8 ml-auto mr-auto text-center w-5/6">No Cookie Stands Available</h2>) }
    var hourly_subtotals = getHourlySubtotals(props.store_hours, props.sales_hourly)
    return (
      <table className="p-1 mt-8 mb-8 ml-auto mr-auto w-5/6 h-auto text-center self-center">
        <thead className="bg-green-500">
          <tr>
            <th className="border border-gray-700">Location</th>
            {props.store_hours.map(hour => (<th className="border border-gray-700">{hour}</th>))}
            <th className="border border-gray-700">Totals</th>
          </tr>
        </thead>
        <tbody>
          {props.sales_hourly.map(store => (
            <tr className="odd:bg-green-400 even:bg-green-200">
              <td className="border border-gray-700">{store.location}</td>
              {store.sales_data.map(cookies => (<td className="border border-gray-700">{cookies}</td>))}
              <td className="border border-gray-700">{getTotalCookies(store.sales_data)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-green-500">
          <th className="border border-gray-700">Totals</th>
          {hourly_subtotals.map(subtotal => (<th className="border border-gray-700">{subtotal}</th>))}
          <th className="border border-gray-700">{getTotalCookies(hourly_subtotals)}</th>
        </tfoot>

      </table>
    )
  }

  function Footer(props) { return (<footer className="mb-30 p-4 bg-green-500 ">{props.location_count} Locations Worldwide</footer>) }

  return (
    <div className="">
      <Head>
        <title>Cookie Stand Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Header title="Cookie Stand Admin" />
        <CreateForm />
        <ReportTable store_hours={hours} sales_hourly={allStoresSales} />
        <Footer location_count={allStoresSales.length} />
      </main>
    </div>
  )
}