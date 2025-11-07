<template>
    <div class="agendamento-container">
        <h1><i class="bi bi-calendar-check"></i> Sistema de Agendamento</h1>

        <div class="grid-layout">
            <!-- Card de Próximas Consultas -->
            <div class="card">
                <div class="card-header">
                    <h3>Próximas Consultas</h3>
                    <button class="btn-primary" @click="abrirModalAgendamento">
                        <i class="bi bi-plus-circle"></i> Novo Agendamento
                    </button>
                </div>
                <div class="consultas-list">
                    <div class="consulta-item" v-for="consulta in proximasConsultas" :key="consulta.id">
                        <div class="consulta-info">
                            <p class="consulta-medico"><strong>{{ consulta.medico }}</strong> - {{
                                consulta.especialidade }}</p>
                            <p class="consulta-data">{{ consulta.data }}, {{ consulta.hora }}</p>
                            <p class="consulta-paciente"><i class="bi bi-person"></i> {{ consulta.paciente }}</p>
                        </div>
                        <div class="consulta-actions">
                            <button class="btn-action btn-edit" @click="editarConsulta(consulta)" title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn-action btn-delete" @click="cancelarConsulta(consulta.id)"
                                title="Cancelar">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div v-if="proximasConsultas.length === 0" class="empty-state">
                        <i class="bi bi-calendar-x"></i>
                        <p>Nenhuma consulta agendada</p>
                    </div>
                </div>
            </div>

            <!-- Card de Estatísticas -->
            <div class="card">
                <h3>Estatísticas</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-icon consultas-icon">
                            <i class="bi bi-calendar-check"></i>
                        </div>
                        <div class="stat-content">
                            <h4>{{ consultasMes }}</h4>
                            <p>Consultas este mês</p>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon pendentes-icon">
                            <i class="bi bi-clock-history"></i>
                        </div>
                        <div class="stat-content">
                            <h4>{{ consultasPendentes }}</h4>
                            <p>Pendentes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Agendamento -->
        <ModalAgendamento :isOpen="modalAberto" :consulta="consultaSelecionada" :pacientes="pacientes"
            :medicos="medicos" :horariosDisponiveis="horariosDisponiveis" @close="fecharModal"
            @save="salvarAgendamento" />
    </div>
</template>

<script>
import ModalAgendamento from './modais/ModalAgendamento.vue';

export default {
    name: 'Agendamento',
    components: {
        ModalAgendamento
    },
    data() {
        return {
            modalAberto: false,
            consultaSelecionada: null,
            proximasConsultas: [
                {
                    id: 1,
                    paciente: 'João Silva',
                    medico: 'Dr. Silva',
                    especialidade: 'Cardiologia',
                    data: 'Hoje',
                    hora: '14:30'
                },
                {
                    id: 2,
                    paciente: 'Maria Oliveira',
                    medico: 'Dra. Santos',
                    especialidade: 'Dermatologia',
                    data: 'Amanhã',
                    hora: '09:00'
                }
            ],
            pacientes: [
                { id: 1, nome: 'João Silva' },
                { id: 2, nome: 'Maria Oliveira' },
                { id: 3, nome: 'Carlos Souza' },
                { id: 4, nome: 'Ana Costa' },
                { id: 5, nome: 'Pedro Santos' }
            ],
            medicos: [
                { id: 1, nome: 'Dr. Silva', especialidade: 'Cardiologia' },
                { id: 2, nome: 'Dra. Santos', especialidade: 'Dermatologia' },
                { id: 3, nome: 'Dr. Oliveira', especialidade: 'Clínica Geral' },
                { id: 4, nome: 'Dra. Costa', especialidade: 'Pediatria' },
                { id: 5, nome: 'Dr. Mendes', especialidade: 'Ortopedia' }
            ],
            horariosDisponiveis: [
                '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
            ]
        }
    },
    computed: {
        consultasMes() {
            return this.proximasConsultas.length + 13;
        },
        consultasPendentes() {
            return this.proximasConsultas.length;
        }
    },
    methods: {
        abrirModalAgendamento() {
            this.consultaSelecionada = null;
            this.modalAberto = true;
        },
        editarConsulta(consulta) {
            this.consultaSelecionada = consulta;
            this.modalAberto = true;
        },
        fecharModal() {
            this.modalAberto = false;
            this.consultaSelecionada = null;
        },
        salvarAgendamento(dadosAgendamento) {
            const medicoObj = this.medicos.find(m => m.nome === dadosAgendamento.medico);

            if (this.consultaSelecionada) {
                // Editar consulta existente
                const index = this.proximasConsultas.findIndex(c => c.id === this.consultaSelecionada.id);
                if (index !== -1) {
                    this.proximasConsultas[index] = {
                        ...this.proximasConsultas[index],
                        paciente: dadosAgendamento.paciente,
                        medico: dadosAgendamento.medico,
                        especialidade: medicoObj?.especialidade || '',
                        data: this.formatarData(dadosAgendamento.data),
                        hora: dadosAgendamento.hora
                    };
                }
            } else {
                // Nova consulta
                const novaConsulta = {
                    id: Date.now(),
                    paciente: dadosAgendamento.paciente,
                    medico: dadosAgendamento.medico,
                    especialidade: medicoObj?.especialidade || '',
                    data: this.formatarData(dadosAgendamento.data),
                    hora: dadosAgendamento.hora
                };
                this.proximasConsultas.push(novaConsulta);
            }
        },
        cancelarConsulta(id) {
            if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
                this.proximasConsultas = this.proximasConsultas.filter(c => c.id !== id);
            }
        },
        formatarData(data) {
            const dataObj = new Date(data + 'T00:00:00');
            const hoje = new Date();
            const amanha = new Date(hoje);
            amanha.setDate(amanha.getDate() + 1);

            if (dataObj.toDateString() === hoje.toDateString()) {
                return 'Hoje';
            } else if (dataObj.toDateString() === amanha.toDateString()) {
                return 'Amanhã';
            } else {
                return dataObj.toLocaleDateString('pt-BR');
            }
        }
    }
}
</script>

<style scoped>
.agendamento-container {
    padding: 20px;
    width: 100%;
}

.agendamento-container h1 {
    color: #333333;
    margin-bottom: 20px;
    font-size: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.agendamento-container h1 i {
    color: #91415c;
}

/* Grid Layout */
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
}

/* Card */
.card {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.card h3 {
    margin: 0 0 20px 0;
    color: #333333;
    font-size: 20px;
}

/* Lista de Consultas */
.consultas-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.consulta-item {
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}

.consulta-item:hover {
    border-color: #91415c;
    box-shadow: 0 2px 8px rgba(145, 65, 92, 0.1);
}

.consulta-info {
    flex: 1;
}

.consulta-medico {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 16px;
}

.consulta-data {
    margin: 0 0 4px 0;
    color: #666;
    font-size: 14px;
}

.consulta-paciente {
    margin: 0;
    color: #999;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.consulta-actions {
    display: flex;
    gap: 8px;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #999;
}

.empty-state i {
    font-size: 48px;
    display: block;
    margin-bottom: 16px;
    opacity: 0.5;
}

.empty-state p {
    margin: 0;
    font-size: 16px;
}

/* Estatísticas */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.consultas-icon {
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.pendentes-icon {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.stat-content h4 {
    margin: 0 0 4px 0;
    font-size: 24px;
    color: #333;
}

.stat-content p {
    margin: 0;
    font-size: 14px;
    color: #666;
}

/* Botões */
.btn-primary {
    background-color: #91415c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-primary:hover {
    background-color: #732f43;
}

.btn-action {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
}

.btn-edit {
    color: #007bff;
}

.btn-edit:hover {
    background: rgba(0, 123, 255, 0.1);
}

.btn-delete {
    color: #dc3545;
}

.btn-delete:hover {
    background: rgba(220, 53, 69, 0.1);
}

/* Responsividade */
@media (max-width: 768px) {
    .agendamento-container {
        padding: 10px;
    }

    .grid-layout {
        grid-template-columns: 1fr;
    }

    .card-header {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .card-header .btn-primary {
        justify-content: center;
    }

    .consulta-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .consulta-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .agendamento-container h1 {
        font-size: 24px;
    }
}
</style>