import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { hours } from '../assets/data'

export default function Home() {

  // const [storeData, setStoreData] = useState('No Cookie Stands Available')
  const [allStoresSales, setAllStoresSales] = useState([]);

  function storeCreate(event) {
    event.preventDefault();
    const data = getCookieSalesHourly(event.target.minimum.value, event.target.maximum.value, event.target.average.value, hours.length)

    const newStoreRecord = {
      location: event.target.location.value,
      sales_data: data
    }
    setAllStoresSales([...allStoresSales, newStoreRecord])
  }

  function getCookieSalesHourly(min, max, avg, count) {
    var store_sales = []
    for (var i = 0; i < count; i++) {
      var hour_sales = Math.round(getCustomersHourly(min, max) * avg);
      store_sales.push(hour_sales);
    }
    return store_sales
  }

  function getCustomersHourly(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  function getTotalCookies(hourly_data) {
    var total = 0
    for (var i = 0; i < hourly_data.length; i++) {
      total += hourly_data[i]
    }
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

  function CreateForm(props) {
    return (
      <div className="p-1 mt-8 mb-8 ml-auto mr-auto w-5/6 h-auto rounded-md bg-green-300 text-center block self-center">
        <h2 className="text-xl m-4">Create Cookie Stand</h2>
        <form onSubmit={storeCreate} className="">
          <label className="mr-2.5">Location</label>
          <input name="location" className="w-11/12"></input>
          <div className="grid grid-cols-4 place-items-center mt-4 mb-4">
            <section className="rounded-md bg-green-100 p-2">
              <label className="block">Minimum Customers per Hour</label>
              <input name="minimum" className="block w-56"></input>
            </section>
            <section className="rounded-md bg-green-100 p-2">
              <label className="block">Maximum Customers per Hour</label>
              <input name="maximum" className="block w-56"></input>
            </section>
            <section className="rounded-md bg-green-100 p-2">
              <label className="block">Average Cookies per Sale</label>
              <input name="average" className="block w-56"></input>
            </section>
            <button className="rounded-md bg-green-500 w-56 h-16">Create</button>
          </div>
        </form>
      </div>
    )
  }

  function ReportTable(props) {
    if (props.sales_hourly.length === 0) { return (<h2 className="mt-8 mb-8 ml-auto mr-auto text-center w-5/6">No Cookie Stands Available</h2>) }
    var hourly_subtotals = []
    for (var i = 0; i < props.store_hours.length; i++) {
      var hour_subtotal = 0
      for (var j = 0; j < props.sales_hourly.length; j++) {
        hour_subtotal += props.sales_hourly[j].sales_data[i]
      }
      hourly_subtotals.push(hour_subtotal)
    }
    return (
      <table className="p-1 mt-8 mb-8 ml-auto mr-auto w-5/6 h-auto bg-green-500 text-center self-center">
        <thead>
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
        <tfoot>
          <th className="border border-gray-700">Totals</th>
          {hourly_subtotals.map(subtotal => (<th className="border border-gray-700">{subtotal}</th>))}
          <th className="border border-gray-700">{getTotalCookies(hourly_subtotals)}</th>
        </tfoot>

      </table>
    )
  }

  function Footer(props) {
    return (
      <footer className="mb-30 p-4 bg-green-500 ">
        {props.location_count} Locations Worldwide</footer>
    )
  }

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