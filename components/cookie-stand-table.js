import { hours } from '../assets/data'

export default function CookieStandTable({ stands, onDelete }) {

  return (
    <Table>
      <table className="">
        <thead className="bg-green-500">
          <tr className="text-left">

            <TH>Location</TH>
            {hours.map(slot => (
              <TH key={slot}>{slot}</TH>
            ))}
            <TH>Totals</TH>
          </tr>
        </thead>
        <tbody>
          {stands.map((stand, i) => {

            return (
              <tr key={stand.id} className="odd:bg-green-400 even:bg-green-200">

                <TH>
                  <div className="flex item-center justify-between gap-2 px-4">

                    <p className="inline">{stand.location}</p>

                    <span onClick={() => onDelete(stand)} className="pl-4">X</span>
                  </div>
                </TH>

                {stand.cookiesEachHour.map((amt, i) => (
                  <TD key={i}>
                    {amt}
                  </TD>
                ))}
                <TD>{stand.totalDailyCookies}</TD>
              </tr>
            )
          })}
        </tbody>
        <tfoot className="bg-green-500">
          <tr>
            <TH>Totals</TH>
            {hours.map((_, i) => {
              const amt = stands.reduce((acc, cur) => acc + cur.cookiesEachHour[i], 0);
              return <TD key={'amt' + i}>{amt}</TD>
            })}
            <TD>{stands.reduce((acc, cur) => acc + cur.totalDailyCookies, 0)}</TD>
          </tr>
        </tfoot>
      </table>
    </Table>

  );
}

function Table({ children }) {
  return (
    <table>
      {children}
    </table>
  );
}
function TH({ children }) {
  return (
    <th>{children}</th>
  )
}

function TD({ children }) {
  return (
    <td>{children}</td>
  )
}