export interface CreditFormData {
  monto: string
  tasa: string
  plazo: string
}

export interface AmortizationRow {
  periodo: number
  cuota: number
  interes: number
  amortizacion: number
  capital_pendiente: number
}

export interface SimulationResponse {
  simulation_id: number
  monto: number
  tasa_anual: number
  plazo_meses: number
  tabla: AmortizationRow[]
}