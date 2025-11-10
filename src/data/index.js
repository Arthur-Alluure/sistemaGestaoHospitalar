/**
 * Centralizador de dados mockados do sistema para simulação do backend.
 * Importa todos os arquivos JSON com dados mockados e os reexporta
 * para facilitar o acesso em outras partes da aplicação.
 
 * 
 * Uso:
 * import mockData from '@/data'
 * ou
 * import { pacientes, etc } from '@/data'
 */

import pacientes from './pacientes.json'
import profissionais from './profissionais.json'
import notificacoes from './notificacoes.json'
import dashboard from './dashboard.json'
import agendamentos from './agendamentos.json'
import teleconsultas from './teleconsultas.json'
import prontuarios from './prontuarios.json'
import usuario from './usuario.json'

export default {
    pacientes,
    profissionais,
    notificacoes,
    dashboard,
    agendamentos,
    teleconsultas,
    prontuarios,
    usuario,
}