<template>
    <div class="prontuario-container">
        <div class="prontuario-header">
            <h1><i class="bi bi-file-medical"></i> Prontuário Eletrônico</h1>
            <p class="subtitle">Gestão completa de registros médicos</p>
        </div>

        <!-- Mini Abas -->
        <div class="tabs-container">
            <div class="tab-item" :class="{ active: activeTab === 'historico' }" @click="activeTab = 'historico'">
                <i class="bi bi-clock-history"></i>
                <span>Histórico</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'agendamentos' }" @click="activeTab = 'agendamentos'">
                <i class="bi bi-calendar-event"></i>
                <span>Agendamentos</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'exames' }" @click="activeTab = 'exames'">
                <i class="bi bi-clipboard-pulse"></i>
                <span>Exames</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'prescricoes' }" @click="activeTab = 'prescricoes'">
                <i class="bi bi-capsule"></i>
                <span>Prescrições</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'receitas' }" @click="activeTab = 'receitas'">
                <i class="bi bi-receipt"></i>
                <span>Receitas</span>
            </div>
        </div>

        <!-- Conteúdo das Abas -->
        <div class="tab-content">
            <!-- Histórico -->
            <div v-if="activeTab === 'historico'" class="content-section">
                <div class="content-header">
                    <h2>Histórico de Atendimentos</h2>
                    <button class="btn-primary" @click="abrirModalHistorico">
                        <i class="bi bi-plus-circle"></i> Novo Registro
                    </button>
                </div>

                <div class="timeline">
                    <div class="timeline-item" v-for="item in historico" :key="item.id">
                        <div class="timeline-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-header">
                                <h3>{{ item.tipo }}</h3>
                                <span class="timeline-date">{{ item.data }}</span>
                            </div>
                            <p class="timeline-medico">
                                <i class="bi bi-person-badge"></i> {{ item.medico }}
                            </p>
                            <p class="timeline-desc">{{ item.descricao }}</p>
                            <div class="timeline-tags">
                                <span class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Agendamentos -->
            <div v-if="activeTab === 'agendamentos'" class="content-section">
                <div class="content-header">
                    <h2>Agendamentos</h2>
                    <button class="btn-primary" @click="navigate('agendamento')">
                        <i class="bi bi-plus-circle"></i> Novo Agendamento
                    </button>
                </div>

                <div class="agendamentos-grid">
                    <div class="agendamento-card" v-for="agend in agendamentos" :key="agend.id">
                        <div class="agend-status" :class="agend.status"></div>
                        <div class="agend-content">
                            <div class="agend-datetime">
                                <i class="bi bi-calendar3"></i>
                                <span>{{ agend.data }} - {{ agend.hora }}</span>
                            </div>
                            <h3>{{ agend.especialidade }}</h3>
                            <p><i class="bi bi-person-badge"></i> {{ agend.medico }}</p>
                            <p><i class="bi bi-geo-alt"></i> {{ agend.local }}</p>
                            <span class="status-badge" :class="agend.status">{{ agend.statusTexto }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Exames -->
            <div v-if="activeTab === 'exames'" class="content-section">
                <div class="content-header">
                    <h2>Exames Realizados</h2>
                    <button class="btn-primary" @click="abrirModalExame">
                        <i class="bi bi-plus-circle"></i> Adicionar Exame
                    </button>
                </div>

                <div class="exames-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Tipo de Exame</th>
                                <th>Solicitante</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exame in exames" :key="exame.id">
                                <td>{{ exame.data }}</td>
                                <td>
                                    <strong>{{ exame.tipo }}</strong>
                                    <br>
                                    <small>{{ exame.subtipo }}</small>
                                </td>
                                <td>{{ exame.medico }}</td>
                                <td>
                                    <span class="status-badge" :class="exame.status">
                                        {{ exame.statusTexto }}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn-action" title="Ver Resultado">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                    <button class="btn-action" title="Download">
                                        <i class="bi bi-download"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Prescrições -->
            <div v-if="activeTab === 'prescricoes'" class="content-section">
                <div class="content-header">
                    <h2>Prescrições Médicas</h2>
                    <button class="btn-primary" @click="abrirModalPrescricao">
                        <i class="bi bi-plus-circle"></i> Nova Prescrição
                    </button>
                </div>

                <div class="prescricoes-list">
                    <div class="prescricao-card" v-for="presc in prescricoes" :key="presc.id">
                        <div class="prescricao-header">
                            <div>
                                <h3>{{ presc.medicamento }}</h3>
                                <p class="prescricao-medico">
                                    <i class="bi bi-person-badge"></i> {{ presc.medico }}
                                </p>
                            </div>
                            <span class="prescricao-data">{{ presc.data }}</span>
                        </div>
                        <div class="prescricao-body">
                            <div class="prescricao-info">
                                <p><strong>Dosagem:</strong> {{ presc.dosagem }}</p>
                                <p><strong>Frequência:</strong> {{ presc.frequencia }}</p>
                                <p><strong>Duração:</strong> {{ presc.duracao }}</p>
                            </div>
                            <div class="prescricao-obs" v-if="presc.observacoes">
                                <strong>Observações:</strong>
                                <p>{{ presc.observacoes }}</p>
                            </div>
                        </div>
                        <div class="prescricao-footer">
                            <span class="status-badge" :class="presc.status">{{ presc.statusTexto }}</span>
                            <button class="btn-link">Ver detalhes</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Receitas -->
            <div v-if="activeTab === 'receitas'" class="content-section">
                <div class="content-header">
                    <h2>Receitas Médicas</h2>
                    <button class="btn-primary" @click="abrirModalReceita">
                        <i class="bi bi-plus-circle"></i> Nova Receita
                    </button>
                </div>

                <div class="receitas-grid">
                    <div class="receita-card" v-for="receita in receitas" :key="receita.id">
                        <div class="receita-icon">
                            <i class="bi bi-file-earmark-medical"></i>
                        </div>
                        <div class="receita-content">
                            <h3>Receita #{{ receita.numero }}</h3>
                            <p class="receita-date">{{ receita.data }}</p>
                            <p class="receita-medico">
                                <i class="bi bi-person-badge"></i> {{ receita.medico }}
                            </p>
                            <div class="receita-medicamentos">
                                <p><strong>Medicamentos:</strong></p>
                                <ul>
                                    <li v-for="(med, index) in receita.medicamentos" :key="index">{{ med }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="receita-actions">
                            <button class="btn-action btn-view">
                                <i class="bi bi-eye"></i> Ver
                            </button>
                            <button class="btn-action btn-download">
                                <i class="bi bi-download"></i> Baixar
                            </button>
                            <button class="btn-action btn-print">
                                <i class="bi bi-printer"></i> Imprimir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modais -->
        <ModalHistorico :isOpen="modalHistoricoAberto" @close="fecharModalHistorico" @save="salvarHistorico" />
        <ModalExame :isOpen="modalExameAberto" @close="fecharModalExame" @save="salvarExame" />
        <ModalPrescricao :isOpen="modalPrescricaoAberto" @close="fecharModalPrescricao" @save="salvarPrescricao" />
        <ModalReceita :isOpen="modalReceitaAberto" @close="fecharModalReceita" @save="salvarReceita" />
    </div>
</template>

<script>
import ModalHistorico from './modais/prontuario/ModalHistorico.vue';
import ModalExame from './modais/prontuario/ModalExame.vue';
import ModalPrescricao from './modais/prontuario/ModalPrescricao.vue';
import ModalReceita from './modais/prontuario/ModalReceita.vue';
import mockData from '@/data';

export default {
    name: 'ProntuarioEletronico',
    components: {
        ModalHistorico,
        ModalExame,
        ModalPrescricao,
        ModalReceita
    },
    data() {
        return {
            activeTab: 'historico',
            // Estados dos modais
            modalHistoricoAberto: false,
            modalExameAberto: false,
            modalPrescricaoAberto: false,
            modalReceitaAberto: false,
            historico: mockData.prontuarios.historico,
            agendamentos: mockData.prontuarios.agendamentos,
            exames: mockData.prontuarios.exames,
            prescricoes: mockData.prontuarios.prescricoes,
            receitas: mockData.prontuarios.receitas
        }
    },
    methods: {
        navigate(section) {
            this.$emit('navigate', section);
        },
        // Métodos Histórico
        abrirModalHistorico() {
            this.modalHistoricoAberto = true;
        },
        fecharModalHistorico() {
            this.modalHistoricoAberto = false;
        },
        salvarHistorico(dados) {
            const novoId = Math.max(...this.historico.map(h => h.id)) + 1;
            const dataFormatada = this.formatarData(dados.data);

            this.historico.unshift({
                id: novoId,
                tipo: dados.tipo,
                data: dataFormatada,
                medico: dados.medico,
                descricao: dados.descricao,
                tags: dados.tags
            });

            alert('Registro adicionado ao histórico com sucesso!');
        },
        // Métodos Exame
        abrirModalExame() {
            this.modalExameAberto = true;
        },
        fecharModalExame() {
            this.modalExameAberto = false;
        },
        salvarExame(dados) {
            const novoId = Math.max(...this.exames.map(e => e.id)) + 1;
            const statusTexto = {
                'concluido': 'Concluído',
                'aguardando': 'Aguardando',
                'pendente': 'Pendente'
            };

            const dataFormatada = this.formatarData(dados.data);

            this.exames.unshift({
                id: novoId,
                data: dataFormatada,
                tipo: dados.tipo,
                subtipo: dados.subtipo || '-',
                medico: dados.medico,
                status: dados.status,
                statusTexto: statusTexto[dados.status]
            });

            alert('Exame adicionado com sucesso!');
        },
        // Métodos Prescrição
        abrirModalPrescricao() {
            this.modalPrescricaoAberto = true;
        },
        fecharModalPrescricao() {
            this.modalPrescricaoAberto = false;
        },
        salvarPrescricao(dados) {
            const novoId = Math.max(...this.prescricoes.map(p => p.id)) + 1;
            const statusTexto = {
                'ativo': 'Em uso',
                'concluido': 'Concluído',
                'suspenso': 'Suspenso'
            };

            const dataFormatada = this.formatarData(dados.data);

            this.prescricoes.unshift({
                id: novoId,
                medicamento: dados.medicamento,
                dosagem: dados.dosagem,
                frequencia: dados.frequencia,
                duracao: dados.duracao,
                medico: dados.medico,
                data: dataFormatada,
                observacoes: dados.observacoes,
                status: dados.status,
                statusTexto: statusTexto[dados.status]
            });

            alert('Prescrição adicionada com sucesso!');
        },
        // Métodos Receita
        abrirModalReceita() {
            this.modalReceitaAberto = true;
        },
        fecharModalReceita() {
            this.modalReceitaAberto = false;
        },
        salvarReceita(dados) {
            const novoId = Math.max(...this.receitas.map(r => r.id)) + 1;
            const medicamentosArray = dados.medicamentos.split('\n').filter(m => m.trim() !== '');
            const dataFormatada = this.formatarData(dados.data);

            this.receitas.unshift({
                id: novoId,
                numero: dados.numero,
                data: dataFormatada,
                medico: dados.medico,
                medicamentos: medicamentosArray
            });

            alert('Receita adicionada com sucesso!');
        },
        // Método auxiliar para formatar data
        formatarData(dataISO) {
            if (!dataISO) return '';
            const [ano, mes, dia] = dataISO.split('-');
            return `${dia}/${mes}/${ano}`;
        }
    }
}
</script>

<style scoped>
.prontuario-container {
    padding: 20px;
    width: 100%;
}

.prontuario-header {
    margin-bottom: 30px;
}

.prontuario-header h1 {
    color: #333333;
    font-size: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 8px 0;
}

.prontuario-header h1 i {
    color: #E91E63;
}

.subtitle {
    color: #666666;
    font-size: 14px;
    margin: 0;
    padding-left: 38px;
}

/* Mini Abas */
.tabs-container {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    border-bottom: 2px solid #F5F5F5;
    padding-bottom: 0;
}

.tab-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #666666;
    font-weight: 500;
    border-bottom: 3px solid transparent;
    background: transparent;
    border-radius: 8px 8px 0 0;
}

.tab-item i {
    font-size: 18px;
}

.tab-item:hover {
    background-color: #FFF5F8;
    color: #E91E63;
}

.tab-item.active {
    color: #E91E63;
    background-color: #FFFFFF;
    border-bottom-color: #E91E63;
    font-weight: 600;
}

/* Conteúdo */
.tab-content {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #F8BBD0;
    min-height: 400px;
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #F5F5F5;
}

.content-header h2 {
    margin: 0;
    color: #333333;
    font-size: 20px;
}

.btn-primary {
    background-color: #E91E63;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-primary:hover {
    background-color: #C2185B;
}

/* Timeline (Histórico) */
.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #E91E63, #F8BBD0);
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
}

.timeline-marker {
    position: absolute;
    left: -26px;
    top: 8px;
    width: 16px;
    height: 16px;
    background: #E91E63;
    border-radius: 50%;
    border: 3px solid #FFFFFF;
    box-shadow: 0 0 0 3px #F8BBD0;
}

.timeline-card {
    background: #F5F5F5;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #E91E63;
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.timeline-header h3 {
    margin: 0;
    color: #333333;
    font-size: 16px;
}

.timeline-date {
    color: #E91E63;
    font-size: 14px;
    font-weight: 600;
}

.timeline-medico {
    color: #666666;
    font-size: 14px;
    margin: 0 0 12px 0;
}

.timeline-medico i {
    color: #E91E63;
}

.timeline-desc {
    color: #333333;
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 12px 0;
}

.timeline-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tag {
    background: #FFFFFF;
    color: #E91E63;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

/* Agendamentos */
.agendamentos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.agendamento-card {
    position: relative;
    background: #F5F5F5;
    padding: 20px;
    border-radius: 8px;
    overflow: hidden;
}

.agend-status {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
}

.agend-status.confirmado {
    background: #4CAF50;
}

.agend-status.pendente {
    background: #FF9800;
}

.agend-content {
    padding-left: 15px;
}

.agend-datetime {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #E91E63;
    font-weight: 600;
    margin-bottom: 12px;
}

.agend-content h3 {
    margin: 0 0 10px 0;
    color: #333333;
    font-size: 16px;
}

.agend-content p {
    margin: 0 0 8px 0;
    color: #666666;
    font-size: 14px;
}

.agend-content i {
    color: #E91E63;
    margin-right: 6px;
}

.status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 10px;
}

.status-badge.confirmado {
    background: #E8F5E9;
    color: #4CAF50;
}

.status-badge.pendente {
    background: #FFF3E0;
    color: #FF9800;
}

.status-badge.concluido {
    background: #E3F2FD;
    color: #2196F3;
}

.status-badge.aguardando {
    background: #FFF3E0;
    color: #FF9800;
}

.status-badge.ativo {
    background: #E8F5E9;
    color: #4CAF50;
}

/* Exames - Tabela */
.exames-table {
    overflow-x: auto;
}

.exames-table table {
    width: 100%;
    border-collapse: collapse;
}

.exames-table thead {
    background: #F5F5F5;
}

.exames-table th {
    padding: 12px;
    text-align: left;
    color: #333333;
    font-weight: 600;
    border-bottom: 2px solid #F8BBD0;
}

.exames-table td {
    padding: 12px;
    color: #333333;
    border-bottom: 1px solid #F5F5F5;
}

.exames-table tbody tr:hover {
    background: #FFF5F8;
}

.btn-action {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 10px;
    margin: 0 4px;
    border-radius: 4px;
    transition: all 0.3s ease;
    color: #E91E63;
}

.btn-action:hover {
    background: #F8BBD0;
}

/* Prescrições */
.prescricoes-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.prescricao-card {
    background: #F5F5F5;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #E91E63;
}

.prescricao-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
}

.prescricao-header h3 {
    margin: 0 0 8px 0;
    color: #333333;
    font-size: 18px;
}

.prescricao-medico {
    color: #666666;
    font-size: 14px;
    margin: 0;
}

.prescricao-data {
    color: #E91E63;
    font-size: 14px;
    font-weight: 600;
}

.prescricao-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 15px;
}

.prescricao-info p {
    margin: 0;
    color: #333333;
    font-size: 14px;
}

.prescricao-obs {
    background: #FFFFFF;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 15px;
}

.prescricao-obs strong {
    color: #E91E63;
}

.prescricao-obs p {
    margin: 8px 0 0 0;
    color: #666666;
    font-size: 14px;
}

.prescricao-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #E0E0E0;
}

.btn-link {
    background: none;
    border: none;
    color: #E91E63;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
}

.btn-link:hover {
    color: #C2185B;
    text-decoration: underline;
}

/* Receitas */
.receitas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}

.receita-card {
    background: #F5F5F5;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #E91E63;
}

.receita-icon {
    font-size: 40px;
    color: #E91E63;
    margin-bottom: 15px;
}

.receita-content h3 {
    margin: 0 0 8px 0;
    color: #333333;
    font-size: 18px;
}

.receita-date {
    color: #666666;
    font-size: 14px;
    margin: 0 0 12px 0;
}

.receita-medico {
    color: #666666;
    font-size: 14px;
    margin: 0 0 15px 0;
}

.receita-medicamentos {
    background: #FFFFFF;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 15px;
}

.receita-medicamentos p {
    margin: 0 0 8px 0;
    color: #E91E63;
    font-weight: 600;
}

.receita-medicamentos ul {
    margin: 0;
    padding-left: 20px;
}

.receita-medicamentos li {
    color: #333333;
    font-size: 14px;
    margin-bottom: 6px;
}

.receita-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.receita-actions .btn-action {
    flex: 1;
    padding: 8px 12px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 13px;
}

.btn-view {
    color: #00BCD4;
}

.btn-download {
    color: #4CAF50;
}

.btn-print {
    color: #FF9800;
}

/* Responsividade */
@media (max-width: 768px) {
    .prontuario-container {
        padding: 10px;
    }

    .tabs-container {
        overflow-x: auto;
        flex-wrap: nowrap;
    }

    .tab-item {
        white-space: nowrap;
    }

    .content-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }

    .agendamentos-grid,
    .receitas-grid {
        grid-template-columns: 1fr;
    }

    .prescricao-info {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .timeline {
        padding-left: 20px;
    }

    .exames-table {
        font-size: 12px;
    }

    .exames-table th,
    .exames-table td {
        padding: 8px;
    }
}
</style>
