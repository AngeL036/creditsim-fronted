import type { AmortizationRow } from "../types/credit"

interface ResultsTableProps {
  data: AmortizationRow[]
}

export default function ResultsTable({ data }: ResultsTableProps) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Tabla de Amortización
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Periodo</th>
              <th className="px-4 py-3 text-right">Cuota</th>
              <th className="px-4 py-3 text-right">Interés</th>
              <th className="px-4 py-3 text-right">Amortización</th>
              <th className="px-4 py-3 text-right">Capital pendiente</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map(row => (
              <tr
                key={row.periodo}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 font-medium">
                  {row.periodo}
                </td>
                <td className="px-4 py-2 text-right">
                  ${row.cuota.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right text-red-600">
                  ${row.interes.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right text-green-600">
                  ${row.amortizacion.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  ${row.capital_pendiente.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
