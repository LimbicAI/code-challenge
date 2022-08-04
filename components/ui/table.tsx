import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Table({
  columns, data, handleClick, handleRemove, handleEdit,
}) {
  return (
    <div className="mt-2">
      <table className="max-w-5xl mx-auto table-auto">
        <thead className="justify-between">
          <tr className="bg-pink-600">
            {columns.map((column) => (
              <th key={column.name} className="px-16 py-2">
                <span className="text-gray-100 font-semibold">{column}</span>
              </th>
            ))}

            {/* add actions header if icons are visible */}
            {(handleEdit || handleRemove)
            && (<th className="text-gray-100 font-semibold">actions</th>)}
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={handleClick ? () => handleClick(row) : null}
              className="bg-white border-b-2 border-gray-200"
            >
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className="px-16 py-2"
                >
                  {value}
                </td>

              ))}
              <td className="px-16 py-2">
                {/* Show  actions conditionally based on handler existence */}
                {handleEdit
                && <FontAwesomeIcon className="h-5 w-5 text-red-700 mx-2" icon={faTrash} />}
                {handleRemove
                && <FontAwesomeIcon className="h-5 w-5 text-green-700 mx-2" icon={faEdit} />}

              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
