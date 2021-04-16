import { hours } from '../assets/data'

export default function CookieStandTable({ stands, onDelete }) {

  return (
    <Table>
      <thead className="bg-green-500">
        <tr>

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
            <tr key={stand.id} className="text-left odd:bg-green-400 even:bg-green-200">

              <TH>
                <div className="w-48 text-justify">

                  <p className="inline">{stand.location}</p>

                  <span onClick={() => onDelete(stand)} className="">X</span>
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