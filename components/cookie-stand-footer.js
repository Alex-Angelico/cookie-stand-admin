export default function CookieStandFooter({ reports }) {
  return (
    <footer className="mb-30 p-4 bg-green-500 text-center">
      <p>{reports.length} Locations Worldwide</p>
    </footer>
  )
}