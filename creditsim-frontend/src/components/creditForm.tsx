import type { CreditFormData } from "../types/credit"

interface CreditFormProps {
  form: CreditFormData
  onChange: (name: keyof CreditFormData, value: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function CreditForm({
  form,
  onChange,
  onSubmit,
  loading
}: CreditFormProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
      className="max-w-md mx-automax-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Monto</label>
        <input
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={form.monto}
          onChange={e =>{
            const value = e.target.value
            if(Number(value) >= 0 || value ===""){
              onChange("monto", value)
            }
          }}
          required
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label  className="text-sm font-medium text-gray-700">Tasa anual (%)</label>
        <input 
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={form.tasa}
          onChange={e => {
            const value  = e.target.value
            if(Number(value) >= 0 || value === ""){
              onChange("tasa",value)
            }
          }}
          required
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Plazo (meses)</label>
        <input 
          type="number"
          min={0}
          step={1}
          inputMode="numeric"
          value={form.plazo}
          onChange={e => {
            const value = e.target.value
            if(value === "" || /^[0-9]+$/.test(value)){
              onChange("plazo", value)
            }
          }}
          required
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-medium transition
          ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {loading ? "Calculando..." : "Calcular"}
      </button>
    </form>
  )
}
