import { useEffect, useState } from "react"
import CreditForm from "../components/creditForm"
import ResultsTable from "../components/ResulTable"
import type { CreditFormData, AmortizationRow, SimulationResponse  } from "../types/credit"
import {CreateSimulation} from '../api/simulate.api'
import axios from "axios";

const STORAGE_FORM_KEY = "credit_form"
const STORAGE_RESULTS_KEY = "credit_results"

export default function CreditSimulator() {
    const [form,setForm] = useState<CreditFormData>(() => {
        const saved = localStorage.getItem(STORAGE_FORM_KEY)
        return saved ? JSON.parse(saved) : {monto:"", tasa:"", plazo:""}
    })
    const [results, setResults] = useState<AmortizationRow[] | null>(() => {
        const saved = localStorage.getItem(STORAGE_RESULTS_KEY)
        return saved ? JSON.parse(saved) : null
    })
    const [showTable, setShowTable] = useState<boolean>(() => {
        return localStorage.getItem(STORAGE_RESULTS_KEY) !== null
    })
    const [loading, setLoading] = useState<boolean>(false)

    // Guardar cambios del formulario
    useEffect(() => {
        localStorage.setItem(STORAGE_FORM_KEY,JSON.stringify(form))
    }, [form])
    useEffect(() => {
        if(results) {
            localStorage.setItem(
                STORAGE_RESULTS_KEY,
                JSON.stringify(results)
            )
        }
    },[results])

    const handleChange = (
        name:keyof CreditFormData,
        value: string
    ) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
        if (name === "monto"){
            setShowTable(false)
            setResults(null)
        }
    }
    
    const handleSubmit = async () => {
        setLoading(true)
        try{
            const data:SimulationResponse = await  CreateSimulation(form)
            setResults(data.tabla)
            setShowTable(true)
        } catch(error) {
            if(axios.isAxiosError(error)) {
                const message = 
                error.response?.data?.detail ||
                "Error al calcular el credito"
                alert(message)
            }else {
                alert("Error inesperado")
            }
        } finally {
            setLoading(false)
        }
    }

    return (<div className="max-w-[900] w-full px-4 my-10 mx-auto">
      <h1 className="text-3x1 font-bold text-gray-800 text-center mb-6  ">Simulador de Crédito</h1>

      <CreditForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {showTable && results && (
        <ResultsTable data={results} />
      )}
    </div>
  )
}