<template>
    <div class="teleconsulta-container">
        <h1><i class="bi bi-camera-video"></i> TeleConsulta</h1>

        <div class="grid-layout">
            <!-- Card de Consultas Online Disponíveis -->
            <div class="card">
                <div class="card-header">
                    <h3>Consultas Online Disponíveis</h3>
                    <button class="btn-primary" @click="abrirModalNovaConsulta">
                        <i class="bi bi-plus-circle"></i> Agendar TeleConsulta
                    </button>
                </div>
                <div class="consultas-list">
                    <div class="teleconsulta-item" v-for="consulta in consultasDisponiveis" :key="consulta.id">
                        <div class="consulta-info">
                            <p class="consulta-medico">
                                <strong>{{ consulta.medico }}</strong> - {{ consulta.especialidade }}
                            </p>
                            <p class="consulta-status">
                                <span
                                    :class="['status-badge', consulta.disponivel ? 'status-disponivel' : 'status-agendado']">
                                    <i :class="consulta.disponivel ? 'bi bi-circle-fill' : 'bi bi-clock'"></i>
                                    {{ consulta.disponivel ? 'Disponível agora' : `Agendado para ${consulta.horario}` }}
                                </span>
                            </p>
                            <p class="consulta-paciente" v-if="consulta.paciente">
                                <i class="bi bi-person"></i> {{ consulta.paciente }}
                            </p>
                        </div>
                        <div class="consulta-actions">
                            <button v-if="consulta.disponivel" class="btn-success" @click="iniciarConsulta(consulta)">
                                <i class="bi bi-camera-video"></i> Iniciar Consulta
                            </button>
                            <button v-else class="btn-primary" @click="editarConsulta(consulta)">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn-action btn-delete" @click="cancelarConsulta(consulta.id)"
                                title="Cancelar">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div v-if="consultasDisponiveis.length === 0" class="empty-state">
                        <i class="bi bi-camera-video-off"></i>
                        <p>Nenhuma teleconsulta disponível</p>
                    </div>
                </div>
            </div>

            <!-- Card de Histórico de Consultas -->
            <div class="card">
                <h3>Histórico de Consultas</h3>
                <div class="historico-list">
                    <div class="historico-item" v-for="consulta in historicoConsultas" :key="consulta.id">
                        <div class="historico-info">
                            <p class="historico-medico"><strong>{{ consulta.medico }}</strong></p>
                            <p class="historico-data">{{ consulta.data }}</p>
                            <p class="historico-duracao">
                                <i class="bi bi-clock"></i> {{ consulta.duracao }}
                            </p>
                        </div>
                        <span :class="['status-badge', `status-${consulta.status}`]">
                            {{ consulta.status === 'concluida' ? 'Concluída' : 'Cancelada' }}
                        </span>
                    </div>
                    <div v-if="historicoConsultas.length === 0" class="empty-state">
                        <i class="bi bi-calendar-x"></i>
                        <p>Nenhum histórico disponível</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estatísticas -->
        <div class="card stats-card">
            <h3>Estatísticas</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-icon total-icon">
                        <i class="bi bi-calendar-check"></i>
                    </div>
                    <div class="stat-content">
                        <h4>{{ totalConsultas }}</h4>
                        <p>Total de Consultas</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon concluidas-icon">
                        <i class="bi bi-check-circle"></i>
                    </div>
                    <div class="stat-content">
                        <h4>{{ consultasConcluidas }}</h4>
                        <p>Concluídas</p>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon tempo-icon">
                        <i class="bi bi-clock-history"></i>
                    </div>
                    <div class="stat-content">
                        <h4>{{ tempoMedio }} min</h4>
                        <p>Tempo Médio</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Nova TeleConsulta -->
        <div v-if="modalAberto" class="modal-overlay" @click="fecharModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h2>
                        <i class="bi bi-camera-video"></i>
                        {{ consultaEditando ? 'Editar TeleConsulta' : 'Agendar TeleConsulta' }}
                    </h2>
                    <button class="btn-close" @click="fecharModal">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <form @submit.prevent="salvarConsulta" class="modal-body">
                    <div class="form-group">
                        <label for="paciente">
                            <i class="bi bi-person"></i> Paciente
                        </label>
                        <select id="paciente" v-model="novaConsulta.paciente" required class="form-control">
                            <option value="">Selecione um paciente</option>
                            <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.nome">
                                {{ paciente.nome }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="medico">
                            <i class="bi bi-person-badge"></i> Médico
                        </label>
                        <select id="medico" v-model="novaConsulta.medico" required class="form-control">
                            <option value="">Selecione um médico</option>
                            <option v-for="medico in medicos" :key="medico.id" :value="medico.nome">
                                {{ medico.nome }} - {{ medico.especialidade }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="especialidade">
                            <i class="bi bi-hospital"></i> Especialidade
                        </label>
                        <input type="text" id="especialidade" v-model="especialidadeSelecionada" readonly
                            class="form-control" placeholder="Selecione um médico primeiro" />
                    </div>

                    <div class="form-group">
                        <label>
                            <i class="bi bi-calendar"></i> Tipo de Consulta
                        </label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" v-model="novaConsulta.tipo" value="imediata" required />
                                <span>Consulta Imediata</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" v-model="novaConsulta.tipo" value="agendada" required />
                                <span>Agendar para depois</span>
                            </label>
                        </div>
                    </div>

                    <div v-if="novaConsulta.tipo === 'agendada'" class="form-row">
                        <div class="form-group">
                            <label for="data">
                                <i class="bi bi-calendar"></i> Data
                            </label>
                            <input type="date" id="data" v-model="novaConsulta.data"
                                :required="novaConsulta.tipo === 'agendada'" :min="dataMinima" class="form-control" />
                        </div>

                        <div class="form-group">
                            <label for="hora">
                                <i class="bi bi-clock"></i> Horário
                            </label>
                            <select id="hora" v-model="novaConsulta.hora" :required="novaConsulta.tipo === 'agendada'"
                                class="form-control">
                                <option value="">Selecione</option>
                                <option v-for="hora in horariosDisponiveis" :key="hora" :value="hora">
                                    {{ hora }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="observacoes">
                            <i class="bi bi-chat-left-text"></i> Motivo da Consulta
                        </label>
                        <textarea id="observacoes" v-model="novaConsulta.observacoes" rows="3" class="form-control"
                            placeholder="Descreva brevemente o motivo da consulta..."></textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" @click="fecharModal">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="bi bi-check-circle"></i>
                            {{ consultaEditando ? 'Salvar Alterações' : 'Agendar Consulta' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal de Videochamada (Zoom) -->
        <div v-if="consultaEmAndamento" class="modal-overlay video-modal">
            <div class="video-container" @click.stop>
                <div class="video-header">
                    <div class="video-info">
                        <h3>{{ consultaAtual.medico }} - {{ consultaAtual.especialidade }}</h3>
                        <p>Paciente: {{ consultaAtual.paciente }}</p>
                    </div>
                    <div class="video-timer">
                        <i class="bi bi-record-circle"></i> {{ tempoConsulta }}
                    </div>
                </div>

                <div class="video-content">
                    <!-- Área do Zoom Meeting -->
                    <div id="zmmtg-root"></div>
                    <div id="zoom-meeting-container" class="zoom-meeting">
                        <div class="video-placeholder">
                            <i class="bi bi-camera-video"></i>
                            <p>Aguardando conexão com Zoom...</p>
                            <p class="video-instructions">
                                Para usar esta funcionalidade, você precisa configurar as credenciais do Zoom.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="video-controls">
                    <button class="control-btn" @click="toggleMicrofone" :class="{ active: microfoneAtivo }">
                        <i :class="microfoneAtivo ? 'bi bi-mic-fill' : 'bi bi-mic-mute-fill'"></i>
                    </button>
                    <button class="control-btn" @click="toggleCamera" :class="{ active: cameraAtiva }">
                        <i :class="cameraAtiva ? 'bi bi-camera-video-fill' : 'bi bi-camera-video-off-fill'"></i>
                    </button>
                    <button class="control-btn screen-btn" @click="compartilharTela">
                        <i class="bi bi-display"></i>
                    </button>
                    <button class="control-btn chat-btn" @click="toggleChat">
                        <i class="bi bi-chat-dots"></i>
                    </button>
                    <button class="control-btn end-btn" @click="encerrarConsulta">
                        <i class="bi bi-telephone-x-fill"></i>
                        Encerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TeleConsulta',
    data() {
        return {
            modalAberto: false,
            consultaEditando: null,
            consultaEmAndamento: false,
            consultaAtual: null,
            tempoConsulta: '00:00',
            timerInterval: null,
            microfoneAtivo: true,
            cameraAtiva: true,
            novaConsulta: {
                paciente: '',
                medico: '',
                tipo: 'imediata',
                data: '',
                hora: '',
                observacoes: ''
            },
            consultasDisponiveis: [
                {
                    id: 1,
                    medico: 'Dr. Oliveira',
                    especialidade: 'Clínica Geral',
                    disponivel: true,
                    paciente: null,
                    horario: null
                },
                {
                    id: 2,
                    medico: 'Dra. Costa',
                    especialidade: 'Pediatria',
                    disponivel: false,
                    paciente: 'Maria Oliveira',
                    horario: '15:30'
                }
            ],
            historicoConsultas: [
                {
                    id: 1,
                    medico: 'Dr. Mendes',
                    data: '25/10/2025',
                    duracao: '30 min',
                    status: 'concluida'
                },
                {
                    id: 2,
                    medico: 'Dra. Lima',
                    data: '20/10/2025',
                    duracao: '25 min',
                    status: 'concluida'
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
        totalConsultas() {
            return this.historicoConsultas.length + this.consultasDisponiveis.filter(c => c.paciente).length;
        },
        consultasConcluidas() {
            return this.historicoConsultas.filter(c => c.status === 'concluida').length;
        },
        tempoMedio() {
            if (this.historicoConsultas.length === 0) return 0;
            const total = this.historicoConsultas.reduce((acc, c) => {
                const tempo = parseInt(c.duracao);
                return acc + tempo;
            }, 0);
            return Math.round(total / this.historicoConsultas.length);
        },
        especialidadeSelecionada() {
            const medico = this.medicos.find(m => m.nome === this.novaConsulta.medico);
            return medico ? medico.especialidade : '';
        },
        dataMinima() {
            const hoje = new Date();
            return hoje.toISOString().split('T')[0];
        }
    },
    methods: {
        abrirModalNovaConsulta() {
            this.modalAberto = true;
            this.consultaEditando = null;
            this.resetarFormulario();
        },
        fecharModal() {
            this.modalAberto = false;
            this.consultaEditando = null;
            this.resetarFormulario();
        },
        resetarFormulario() {
            this.novaConsulta = {
                paciente: '',
                medico: '',
                tipo: 'imediata',
                data: '',
                hora: '',
                observacoes: ''
            };
        },
        salvarConsulta() {
            // Validar campos obrigatórios
            if (!this.novaConsulta.paciente || !this.novaConsulta.medico || !this.novaConsulta.tipo) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            if (this.novaConsulta.tipo === 'agendada' && (!this.novaConsulta.data || !this.novaConsulta.hora)) {
                alert('Por favor, preencha a data e horário para consultas agendadas!');
                return;
            }

            const medicoObj = this.medicos.find(m => m.nome === this.novaConsulta.medico);

            if (this.consultaEditando) {
                // Editar consulta existente
                const index = this.consultasDisponiveis.findIndex(c => c.id === this.consultaEditando.id);
                if (index !== -1) {
                    this.consultasDisponiveis[index] = {
                        ...this.consultasDisponiveis[index],
                        paciente: this.novaConsulta.paciente,
                        medico: this.novaConsulta.medico,
                        especialidade: medicoObj?.especialidade || '',
                        disponivel: this.novaConsulta.tipo === 'imediata',
                        horario: this.novaConsulta.tipo === 'agendada' ? this.novaConsulta.hora : null
                    };
                }
            } else {
                // Nova consulta
                const novaConsultaObj = {
                    id: Date.now(),
                    paciente: this.novaConsulta.paciente,
                    medico: this.novaConsulta.medico,
                    especialidade: medicoObj?.especialidade || '',
                    disponivel: this.novaConsulta.tipo === 'imediata',
                    horario: this.novaConsulta.tipo === 'agendada' ? this.novaConsulta.hora : null
                };
                this.consultasDisponiveis.push(novaConsultaObj);
            }

            this.fecharModal();
        },
        editarConsulta(consulta) {
            this.consultaEditando = consulta;
            this.novaConsulta = {
                paciente: consulta.paciente || '',
                medico: consulta.medico,
                tipo: consulta.disponivel ? 'imediata' : 'agendada',
                data: '',
                hora: consulta.horario || '',
                observacoes: ''
            };
            this.modalAberto = true;
        },
        cancelarConsulta(id) {
            if (confirm('Tem certeza que deseja cancelar esta teleconsulta?')) {
                this.consultasDisponiveis = this.consultasDisponiveis.filter(c => c.id !== id);
            }
        },
        iniciarConsulta(consulta) {
            this.consultaAtual = consulta;
            this.consultaEmAndamento = true;
            this.microfoneAtivo = true;
            this.cameraAtiva = true;
            this.iniciarTimer();

            // Aqui você integraria com o Zoom SDK
            this.iniciarZoomMeeting();
        },
        iniciarZoomMeeting() {
            //aqui seria a lógica de integração com o zoom, não implementada no frontend
        },
        encerrarConsulta() {
            if (confirm('Deseja encerrar a consulta?')) {
                this.pararTimer();

                // Adicionar ao histórico
                const duracao = this.tempoConsulta.split(':');
                const duracaoMin = parseInt(duracao[0]) * 60 + parseInt(duracao[1]);

                this.historicoConsultas.unshift({
                    id: Date.now(),
                    medico: this.consultaAtual.medico,
                    data: new Date().toLocaleDateString('pt-BR'),
                    duracao: `${duracaoMin} min`,
                    status: 'concluida'
                });

                this.consultaEmAndamento = false;
                this.consultaAtual = null;
                this.tempoConsulta = '00:00';
            }
        },
        iniciarTimer() {
            let segundos = 0;
            this.timerInterval = setInterval(() => {
                segundos++;
                const mins = Math.floor(segundos / 60);
                const secs = segundos % 60;
                this.tempoConsulta = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }, 1000);
        },
        pararTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        },
        toggleMicrofone() {
            this.microfoneAtivo = !this.microfoneAtivo;
            // Aqui você controlaria o microfone do Zoom
            console.log('Microfone:', this.microfoneAtivo ? 'Ativado' : 'Desativado');
        },
        toggleCamera() {
            this.cameraAtiva = !this.cameraAtiva;
            // Aqui você controlaria a câmera do Zoom
            console.log('Câmera:', this.cameraAtiva ? 'Ativada' : 'Desativada');
        },
        compartilharTela() {
            // Aqui você iniciaria o compartilhamento de tela do Zoom
            console.log('Compartilhar tela');
        },
        toggleChat() {
            // Aqui você abriria o chat do Zoom
            console.log('Toggle chat');
        }
    },
    beforeUnmount() {
        this.pararTimer();
    }
}
</script>

<style scoped>
.teleconsulta-container {
    padding: 20px;
    width: 100%;
}

.teleconsulta-container h1 {
    color: #333333;
    margin-bottom: 20px;
    font-size: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.teleconsulta-container h1 i {
    color: #91415c;
}

/* Grid Layout */
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
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

/* Stats Card */
.stats-card {
    grid-column: 1 / -1;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.total-icon {
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.concluidas-icon {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.tempo-icon {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
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

/* Lista de Consultas */
.consultas-list,
.historico-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.teleconsulta-item {
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}

.teleconsulta-item:hover {
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

.consulta-status {
    margin: 0 0 8px 0;
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
    align-items: center;
}

/* Status Badge */
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.status-disponivel {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-disponivel i {
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.status-agendado {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.status-concluida {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-cancelada {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

/* Histórico */
.historico-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
}

.historico-item:last-child {
    border-bottom: none;
}

.historico-info {
    flex: 1;
}

.historico-medico {
    margin: 0 0 4px 0;
    color: #333;
}

.historico-data,
.historico-duracao {
    margin: 0 0 2px 0;
    color: #666;
    font-size: 14px;
}

.historico-duracao {
    display: flex;
    align-items: center;
    gap: 4px;
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

/* Botões */
.btn-primary,
.btn-success,
.btn-secondary {
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

.btn-primary {
    background-color: #91415c;
    color: white;
}

.btn-primary:hover {
    background-color: #732f43;
}

.btn-success {
    background-color: #28a745;
    color: white;
}

.btn-success:hover {
    background-color: #1e7e34;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.btn-action {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
}

.btn-delete {
    color: #dc3545;
}

.btn-delete:hover {
    background: rgba(220, 53, 69, 0.1);
}

.btn-close {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
}

.btn-close:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.modal-header {
    padding: 24px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.modal-header h2 i {
    color: #91415c;
}

.modal-body {
    padding: 24px;
}

.modal-footer {
    padding: 24px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

/* Formulário */
.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
}

.form-group label i {
    color: #91415c;
}

.form-control {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.2s;
    box-sizing: border-box;
    cursor: text;
}

select.form-control {
    cursor: pointer;
}

.form-control:focus {
    outline: none;
    border-color: #91415c;
    box-shadow: 0 0 0 3px rgba(145, 65, 92, 0.1);
}

.form-control:read-only {
    background-color: #f8f9fa;
}

textarea.form-control {
    resize: vertical;
    font-family: inherit;
}

/* Radio Group */
.radio-group {
    display: flex;
    gap: 16px;
    margin-top: 8px;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: all 0.2s;
}

.radio-label:hover {
    border-color: #91415c;
    background: rgba(145, 65, 92, 0.05);
}

.radio-label input[type="radio"] {
    cursor: pointer;
}

.radio-label input[type="radio"]:checked+span {
    font-weight: 600;
    color: #91415c;
}

/* Modal de Vídeo */
.video-modal {
    background: rgba(0, 0, 0, 0.9);
}

.video-container {
    background: #1a1a1a;
    border-radius: 12px;
    width: 90%;
    max-width: 1200px;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.video-header {
    background: #2a2a2a;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3a3a3a;
}

.video-info h3 {
    margin: 0 0 4px 0;
    color: white;
    font-size: 18px;
}

.video-info p {
    margin: 0;
    color: #999;
    font-size: 14px;
}

.video-timer {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #dc3545;
    font-size: 16px;
    font-weight: 600;
}

.video-timer i {
    animation: pulse 2s infinite;
}

.video-content {
    flex: 1;
    position: relative;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.zoom-meeting {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.video-placeholder {
    text-align: center;
    color: #666;
    padding: 40px;
}

.video-placeholder i {
    font-size: 64px;
    display: block;
    margin-bottom: 20px;
    opacity: 0.5;
}

.video-placeholder p {
    margin: 0 0 12px 0;
    font-size: 16px;
}

.video-instructions {
    max-width: 600px;
    margin: 20px auto 0;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.6;
}

.video-instructions code {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    color: #91415c;
}

.video-controls {
    background: #2a2a2a;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-top: 1px solid #3a3a3a;
}

.control-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: #4a4a4a;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.2s;
}

.control-btn:hover {
    background: #5a5a5a;
    transform: scale(1.1);
}

.control-btn.active {
    background: #91415c;
}

.control-btn.active:hover {
    background: #732f43;
}

.end-btn {
    width: auto;
    padding: 0 24px;
    border-radius: 25px;
    background: #dc3545;
    gap: 8px;
}

.end-btn:hover {
    background: #c82333;
}

.screen-btn,
.chat-btn {
    background: #4a4a4a;
}

.screen-btn:hover,
.chat-btn:hover {
    background: #91415c;
}

/* Responsividade */
@media (max-width: 768px) {
    .teleconsulta-container {
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

    .teleconsulta-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .consulta-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .form-row,
    .radio-group {
        grid-template-columns: 1fr;
        flex-direction: column;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .video-container {
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }

    .video-controls {
        flex-wrap: wrap;
        gap: 12px;
    }

    .control-btn {
        width: 45px;
        height: 45px;
    }
}

@media (max-width: 480px) {
    .teleconsulta-container h1 {
        font-size: 24px;
    }

    .modal-content {
        margin: 0;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 16px;
    }
}
</style>
