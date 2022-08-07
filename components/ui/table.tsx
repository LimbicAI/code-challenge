import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TableProps {
  data: any[];
  headers: string[];
  keys: string[];
  handleEdit: (row: any) => void;
  handleRemove: (row: any) => void;
}
export default function Table(
  {
    headers,
    data,
    keys,
    handleRemove,
    handleEdit,
  }: TableProps,

) {
  return (
    <div className="mt-2 w-full">
      <table className="mx-auto table-auto float-left w-full">
        <thead className="justify-between">
          <tr className="bg-pink-500">
            {headers.map((column, index) => (
              <th key={index} className="px-16 py-2 text-left">
                <span className="text-gray-100 font-semibold">{column}</span>
              </th>
            ))}

            {/* add actions header if icons are visible */}
            {(handleEdit || handleRemove)
            && (<th className="text-gray-100 font-semibold text-center">actions</th>)}
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b-2 border-gray-200"
            >
              {Object.keys(row).filter((key) => keys.includes(key)).map((key, i) => (
                <td
                  key={i}
                  className="px-16 py-2"
                >
                  {row[key]}
                </td>

              ))}
              <td className="px-16 py-2 text-center">
                {/* Show  actions conditionally based on handler existence */}
                {handleEdit
                && (
                <FontAwesomeIcon
                  className="h-5 w-5 text-green-700 mx-2 cursor-pointer inline"
                  icon={faEdit}
                  onClick={() => handleEdit(row)}
                />
                )}
                {handleRemove
                && (
                <FontAwesomeIcon
                  className="h-5 w-5 text-red-700 mx-2 cursor-pointer inline"
                  icon={faTrash}
                  onClick={() => handleRemove(row)}
                />
                )}

              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
