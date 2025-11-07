<template>
    <div class="relatorios-container">
        <div class="relatorios-header">
            <h1><i class="bi bi-file-earmark-bar-graph"></i> Relatórios</h1>
            <p class="subtitle">Geração e análise de relatórios gerenciais</p>
        </div>

        <!-- Mini Abas -->
        <div class="tabs-container">
            <div class="tab-item" :class="{ active: activeTab === 'atendimentos' }" @click="activeTab = 'atendimentos'">
                <i class="bi bi-clipboard-data"></i>
                <span>Atendimentos</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'financeiro' }" @click="activeTab = 'financeiro'">
                <i class="bi bi-cash-coin"></i>
                <span>Financeiro</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'profissionais' }"
                @click="activeTab = 'profissionais'">
                <i class="bi bi-people"></i>
                <span>Profissionais</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'operacional' }" @click="activeTab = 'operacional'">
                <i class="bi bi-graph-up"></i>
                <span>Operacional</span>
            </div>
        </div>

        <!-- Conteúdo das Abas -->
        <div class="tab-content">
            <!-- Relatórios de Atendimentos -->
            <div v-if="activeTab === 'atendimentos'" class="content-section">
                <div class="content-header">
                    <h2>Relatórios de Atendimentos</h2>
                </div>

                <div class="relatorios-grid">
                    <div class="relatorio-card" v-for="relatorio in relatoriosAtendimentos" :key="relatorio.id">
                        <div class="relatorio-icon" :style="{ backgroundColor: relatorio.cor }">
                            <i :class="relatorio.icone"></i>
                        </div>
                        <div class="relatorio-info">
                            <h3>{{ relatorio.titulo }}</h3>
                            <p>{{ relatorio.descricao }}</p>
                            <div class="relatorio-meta">
                                <span><i class="bi bi-clock"></i> {{ relatorio.periodo }}</span>
                                <span><i class="bi bi-file-earmark"></i> {{ relatorio.registros }} registros</span>
                            </div>
                        </div>
                        <div class="relatorio-acoes">
                            <button class="btn-visualizar" @click="visualizarRelatorio(relatorio)">
                                <i class="bi bi-eye"></i> Visualizar
                            </button>
                            <button class="btn-download" @click="baixarRelatorio(relatorio)">
                                <i class="bi bi-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Relatórios Financeiros -->
            <div v-if="activeTab === 'financeiro'" class="content-section">
                <div class="content-header">
                    <h2>Relatórios Financeiros</h2>
                </div>

                <div class="relatorios-grid">
                    <div class="relatorio-card" v-for="relatorio in relatoriosFinanceiros" :key="relatorio.id">
                        <div class="relatorio-icon" :style="{ backgroundColor: relatorio.cor }">
                            <i :class="relatorio.icone"></i>
                        </div>
                        <div class="relatorio-info">
                            <h3>{{ relatorio.titulo }}</h3>
                            <p>{{ relatorio.descricao }}</p>
                            <div class="relatorio-meta">
                                <span><i class="bi bi-clock"></i> {{ relatorio.periodo }}</span>
                                <span><i class="bi bi-currency-dollar"></i> {{ relatorio.valor }}</span>
                            </div>
                        </div>
                        <div class="relatorio-acoes">
                            <button class="btn-visualizar" @click="visualizarRelatorio(relatorio)">
                                <i class="bi bi-eye"></i> Visualizar
                            </button>
                            <button class="btn-download" @click="baixarRelatorio(relatorio)">
                                <i class="bi bi-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Relatórios de Profissionais -->
            <div v-if="activeTab === 'profissionais'" class="content-section">
                <div class="content-header">
                    <h2>Relatórios de Profissionais</h2>
                </div>

                <div class="relatorios-grid">
                    <div class="relatorio-card" v-for="relatorio in relatoriosProfissionais" :key="relatorio.id">
                        <div class="relatorio-icon" :style="{ backgroundColor: relatorio.cor }">
                            <i :class="relatorio.icone"></i>
                        </div>
                        <div class="relatorio-info">
                            <h3>{{ relatorio.titulo }}</h3>
                            <p>{{ relatorio.descricao }}</p>
                            <div class="relatorio-meta">
                                <span><i class="bi bi-clock"></i> {{ relatorio.periodo }}</span>
                                <span><i class="bi bi-people"></i> {{ relatorio.profissionais }} profissionais</span>
                            </div>
                        </div>
                        <div class="relatorio-acoes">
                            <button class="btn-visualizar" @click="visualizarRelatorio(relatorio)">
                                <i class="bi bi-eye"></i> Visualizar
                            </button>
                            <button class="btn-download" @click="baixarRelatorio(relatorio)">
                                <i class="bi bi-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Relatórios Operacionais -->
            <div v-if="activeTab === 'operacional'" class="content-section">
                <div class="content-header">
                    <h2>Relatórios Operacionais</h2>
                </div>

                <div class="relatorios-grid">
                    <div class="relatorio-card" v-for="relatorio in relatoriosOperacionais" :key="relatorio.id">
                        <div class="relatorio-icon" :style="{ backgroundColor: relatorio.cor }">
                            <i :class="relatorio.icone"></i>
                        </div>
                        <div class="relatorio-info">
                            <h3>{{ relatorio.titulo }}</h3>
                            <p>{{ relatorio.descricao }}</p>
                            <div class="relatorio-meta">
                                <span><i class="bi bi-clock"></i> {{ relatorio.periodo }}</span>
                                <span><i class="bi bi-speedometer2"></i> {{ relatorio.indicador }}</span>
                            </div>
                        </div>
                        <div class="relatorio-acoes">
                            <button class="btn-visualizar" @click="visualizarRelatorio(relatorio)">
                                <i class="bi bi-eye"></i> Visualizar
                            </button>
                            <button class="btn-download" @click="baixarRelatorio(relatorio)">
                                <i class="bi bi-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Relatorios',
    data() {
        return {
            activeTab: 'atendimentos',
            relatoriosAtendimentos: [
                {
                    id: 1,
                    titulo: 'Atendimentos por Período',
                    descricao: 'Relatório detalhado de todos os atendimentos realizados no período selecionado',
                    icone: 'bi bi-calendar-range',
                    cor: '#91415c',
                    periodo: 'Último mês',
                    registros: 1247,
                    tipo: 'atendimentos'
                },
                {
                    id: 2,
                    titulo: 'Atendimentos por Especialidade',
                    descricao: 'Distribuição de atendimentos agrupados por especialidade médica',
                    icone: 'bi bi-diagram-3',
                    cor: '#5e72e4',
                    periodo: 'Último trimestre',
                    registros: 3892,
                    tipo: 'atendimentos'
                },
                {
                    id: 3,
                    titulo: 'Taxa de Ocupação',
                    descricao: 'Análise da taxa de ocupação de salas e consultórios',
                    icone: 'bi bi-pie-chart',
                    cor: '#2dce89',
                    periodo: 'Últimos 6 meses',
                    registros: 5634,
                    tipo: 'atendimentos'
                },
                {
                    id: 4,
                    titulo: 'Pacientes Novos vs Retorno',
                    descricao: 'Comparativo entre pacientes novos e retorno no período',
                    icone: 'bi bi-bar-chart-line',
                    cor: '#fb6340',
                    periodo: 'Último ano',
                    registros: 8920,
                    tipo: 'atendimentos'
                }
            ],
            relatoriosFinanceiros: [
                {
                    id: 5,
                    titulo: 'Faturamento Mensal',
                    descricao: 'Relatório completo do faturamento mensal por categoria',
                    icone: 'bi bi-graph-up-arrow',
                    cor: '#2dce89',
                    periodo: 'Último mês',
                    valor: 'R$ 245.890,00',
                    tipo: 'financeiro'
                },
                {
                    id: 6,
                    titulo: 'Contas a Receber',
                    descricao: 'Listagem de todas as contas a receber e status de pagamento',
                    icone: 'bi bi-wallet2',
                    cor: '#5e72e4',
                    periodo: 'Atual',
                    valor: 'R$ 78.340,00',
                    tipo: 'financeiro'
                },
                {
                    id: 7,
                    titulo: 'Análise de Convênios',
                    descricao: 'Relatório de faturamento por convênio e plano de saúde',
                    icone: 'bi bi-building',
                    cor: '#91415c',
                    periodo: 'Último trimestre',
                    valor: 'R$ 698.450,00',
                    tipo: 'financeiro'
                },
                {
                    id: 8,
                    titulo: 'Despesas Operacionais',
                    descricao: 'Controle de despesas operacionais e administrativas',
                    icone: 'bi bi-receipt-cutoff',
                    cor: '#fb6340',
                    periodo: 'Último mês',
                    valor: 'R$ 156.230,00',
                    tipo: 'financeiro'
                }
            ],
            relatoriosProfissionais: [
                {
                    id: 9,
                    titulo: 'Produtividade Médica',
                    descricao: 'Análise de produtividade e número de atendimentos por profissional',
                    icone: 'bi bi-person-check',
                    cor: '#2dce89',
                    periodo: 'Último mês',
                    profissionais: 28,
                    tipo: 'profissionais'
                },
                {
                    id: 10,
                    titulo: 'Escala de Trabalho',
                    descricao: 'Relatório de escalas, plantões e horas trabalhadas',
                    icone: 'bi bi-calendar2-week',
                    cor: '#5e72e4',
                    periodo: 'Últimas 4 semanas',
                    profissionais: 42,
                    tipo: 'profissionais'
                },
                {
                    id: 11,
                    titulo: 'Avaliação de Desempenho',
                    descricao: 'Indicadores de desempenho e satisfação dos pacientes',
                    icone: 'bi bi-star',
                    cor: '#fb6340',
                    periodo: 'Último trimestre',
                    profissionais: 28,
                    tipo: 'profissionais'
                },
                {
                    id: 12,
                    titulo: 'Quadro de Profissionais',
                    descricao: 'Listagem completa do quadro de profissionais e suas especialidades',
                    icone: 'bi bi-people-fill',
                    cor: '#91415c',
                    periodo: 'Atual',
                    profissionais: 42,
                    tipo: 'profissionais'
                }
            ],
            relatoriosOperacionais: [
                {
                    id: 13,
                    titulo: 'Tempo Médio de Atendimento',
                    descricao: 'Análise do tempo médio de atendimento por especialidade',
                    icone: 'bi bi-stopwatch',
                    cor: '#5e72e4',
                    periodo: 'Último mês',
                    indicador: '32 minutos',
                    tipo: 'operacional'
                },
                {
                    id: 14,
                    titulo: 'Taxa de Absenteísmo',
                    descricao: 'Relatório de faltas e cancelamentos de consultas',
                    icone: 'bi bi-x-circle',
                    cor: '#fb6340',
                    periodo: 'Último trimestre',
                    indicador: '12,3%',
                    tipo: 'operacional'
                },
                {
                    id: 15,
                    titulo: 'Satisfação dos Pacientes',
                    descricao: 'Índice de satisfação baseado em pesquisas e avaliações',
                    icone: 'bi bi-emoji-smile',
                    cor: '#2dce89',
                    periodo: 'Últimos 6 meses',
                    indicador: '4.7/5.0',
                    tipo: 'operacional'
                },
                {
                    id: 16,
                    titulo: 'Eficiência de Agendamento',
                    descricao: 'Análise de aproveitamento de horários e otimização de agenda',
                    icone: 'bi bi-calendar-check',
                    cor: '#91415c',
                    periodo: 'Último mês',
                    indicador: '87,5%',
                    tipo: 'operacional'
                }
            ]
        }
    },
    methods: {
        visualizarRelatorio(relatorio) {
            alert(`Visualizando relatório: ${relatorio.titulo}\n\nEsta funcionalidade abrirá uma página com os dados detalhados do relatório.`);
        },
        baixarRelatorio(relatorio) {
            // Simulação de download
            const nomeArquivo = relatorio.titulo.toLowerCase().replace(/ /g, '_');
            const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
            alert(`Download iniciado!\n\nArquivo: ${nomeArquivo}_${dataAtual}.pdf\n\nO relatório será baixado em formato PDF.`);
            
            console.log('Baixando relatório:', relatorio);
        }
    }
}
</script>

<style scoped>
.relatorios-container {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
}

.relatorios-header {
    margin-bottom: 32px;
}

.relatorios-header h1 {
    font-size: 32px;
    color: #333;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.relatorios-header h1 i {
    color: #91415c;
}

.subtitle {
    color: #666;
    font-size: 16px;
    margin: 0;
}

/* Abas */
.tabs-container {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid #e0e0e0;
    overflow-x: auto;
    padding-bottom: 0;
}

.tab-item {
    padding: 12px 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-weight: 500;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    white-space: nowrap;
    margin-bottom: -2px;
}

.tab-item:hover {
    color: #91415c;
    background: rgba(145, 65, 92, 0.05);
}

.tab-item.active {
    color: #91415c;
    border-bottom-color: #91415c;
    background: rgba(145, 65, 92, 0.05);
}

.tab-item i {
    font-size: 18px;
}

/* Conteúdo */
.tab-content {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-section {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f0f0f0;
}

.content-header h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
}

/* Grid de Relatórios */
.relatorios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}

.relatorio-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: all 0.3s;
}

.relatorio-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.relatorio-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
}

.relatorio-info {
    flex: 1;
}

.relatorio-info h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 18px;
}

.relatorio-info p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
}

.relatorio-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.relatorio-meta span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #888;
    font-size: 13px;
}

.relatorio-meta i {
    color: #91415c;
}

.relatorio-acoes {
    display: flex;
    gap: 8px;
}

.btn-visualizar,
.btn-download {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
}

.btn-visualizar {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #e0e0e0;
}

.btn-visualizar:hover {
    background: #e9ecef;
    border-color: #ced4da;
}

.btn-download {
    background: #91415c;
    color: white;
}

.btn-download:hover {
    background: #732f43;
}

/* Responsividade */
@media (max-width: 1024px) {
    .relatorios-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}

@media (max-width: 768px) {
    .relatorios-container {
        padding: 16px;
    }

    .relatorios-header h1 {
        font-size: 24px;
    }

    .tabs-container {
        gap: 4px;
    }

    .tab-item {
        padding: 10px 16px;
        font-size: 14px;
    }

    .tab-item span {
        display: none;
    }

    .tab-item i {
        font-size: 20px;
    }

    .tab-content {
        padding: 16px;
    }

    .content-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .relatorios-grid {
        grid-template-columns: 1fr;
    }

    .relatorio-acoes {
        flex-direction: column;
    }
}
</style>
