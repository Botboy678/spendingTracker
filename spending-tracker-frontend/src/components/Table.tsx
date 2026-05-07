import type { Entry } from "../interfaces/Entry"

interface props {
  titles: string[]
  entries: Entry[]
}

function Table({ titles, entries }: props) {
  return <>
    <div className="table-responsive m-3 rounded">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            {titles.map((title, index) => {
              return <th className="text-nowrap" key={index}>{title}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => {
            return <tr key={index}>
              {Object.values(entry).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </>

}

export default Table;
