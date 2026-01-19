import api from '../api/axiosConfig'
import type {CreditFormData , SimulationResponse} from '../types/credit'

export const CreateSimulation = async (form: CreditFormData): Promise<SimulationResponse> => {
    const data = {
        monto:Number(form.monto),
        tasa_anual:Number(form.tasa),
        plazo_meses:Number(form.plazo)
    };
    const res = await api.post<SimulationResponse>('/simulate', data)
    return res.data
}