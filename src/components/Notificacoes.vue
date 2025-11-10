<template>
    <div class="notificacoes-container">
        <h1>
            <i class="bi bi-bell"></i>
            Notificações
        </h1>

        <!-- Filtros -->
        <div class="filtros-card">
            <div class="filtros-header">
                <h3><i class="bi bi-funnel"></i> Filtros</h3>
                <button v-if="filtroSelecionado !== 'todas'" @click="limparFiltro" class="btn-limpar">
                    <i class="bi bi-x-circle"></i> Limpar
                </button>
            </div>
            <div class="filtros-lista">
                <button :class="['filtro-btn', { active: filtroSelecionado === 'todas' }]"
                    @click="filtroSelecionado = 'todas'">
                    <i class="bi bi-inbox"></i>
                    Todas
                    <span class="badge">{{ notificacoes.length }}</span>
                </button>
                <button :class="['filtro-btn', { active: filtroSelecionado === 'consulta' }]"
                    @click="filtroSelecionado = 'consulta'">
                    <i class="bi bi-calendar-check"></i>
                    Consultas
                    <span class="badge">{{ contarPorTipo('consulta') }}</span>
                </button>
                <button :class="['filtro-btn', { active: filtroSelecionado === 'paciente' }]"
                    @click="filtroSelecionado = 'paciente'">
                    <i class="bi bi-person"></i>
                    Pacientes
                    <span class="badge">{{ contarPorTipo('paciente') }}</span>
                </button>
                <button :class="['filtro-btn', { active: filtroSelecionado === 'sistema' }]"
                    @click="filtroSelecionado = 'sistema'">
                    <i class="bi bi-gear"></i>
                    Sistema
                    <span class="badge">{{ contarPorTipo('sistema') }}</span>
                </button>
                <button :class="['filtro-btn', { active: filtroSelecionado === 'lembrete' }]"
                    @click="filtroSelecionado = 'lembrete'">
                    <i class="bi bi-clock"></i>
                    Lembretes
                    <span class="badge">{{ contarPorTipo('lembrete') }}</span>
                </button>
            </div>
        </div>

        <!-- Ações em massa -->
        <div class="acoes-massa" v-if="notificacoesNaoLidas.length > 0">
            <button @click="marcarTodasComoLidas" class="btn-acao-massa">
                <i class="bi bi-check-all"></i>
                Marcar todas como lidas ({{ notificacoesNaoLidas.length }})
            </button>
            <button @click="limparTodasLidas" class="btn-acao-massa">
                <i class="bi bi-trash"></i>
                Limpar lidas
            </button>
        </div>

        <!-- Lista de Notificações -->
        <div class="notificacoes-lista">
            <div v-for="notificacao in notificacoesFiltradas" :key="notificacao.id"
                :class="['notificacao-item', { 'nao-lida': !notificacao.lida }]" @click="marcarComoLida(notificacao)">
                <div :class="['notificacao-icon', `tipo-${notificacao.tipo}`]">
                    <i :class="getIconePorTipo(notificacao.tipo)"></i>
                </div>

                <div class="notificacao-conteudo">
                    <div class="notificacao-header">
                        <h4>{{ notificacao.titulo }}</h4>
                        <span class="notificacao-tempo">{{ formatarTempo(notificacao.data) }}</span>
                    </div>
                    <p>{{ notificacao.mensagem }}</p>
                    <div class="notificacao-footer">
                        <span :class="['tipo-badge', `tipo-${notificacao.tipo}`]">
                            {{ formatarTipo(notificacao.tipo) }}
                        </span>
                        <span v-if="notificacao.prioridade === 'alta'" class="prioridade-badge">
                            <i class="bi bi-exclamation-triangle"></i> Urgente
                        </span>
                    </div>
                </div>

                <div class="notificacao-acoes">
                    <button v-if="!notificacao.lida" @click.stop="marcarComoLida(notificacao)" class="btn-icon"
                        title="Marcar como lida">
                        <i class="bi bi-check"></i>
                    </button>
                    <button @click.stop="excluirNotificacao(notificacao.id)" class="btn-icon btn-excluir"
                        title="Excluir">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="notificacoesFiltradas.length === 0" class="empty-state">
                <i class="bi bi-bell-slash"></i>
                <p>Nenhuma notificação encontrada</p>
            </div>
        </div>
    </div>
</template>

<script>
import mockData from '@/data'

export default {
    name: 'Notificacoes',
    data() {
        return {
            filtroSelecionado: 'todas',
            notificacoes: mockData.notificacoes
        }
    },
    computed: {
        notificacoesFiltradas() {
            if (this.filtroSelecionado === 'todas') {
                return this.notificacoes;
            }
            return this.notificacoes.filter(n => n.tipo === this.filtroSelecionado);
        },
        notificacoesNaoLidas() {
            return this.notificacoes.filter(n => !n.lida);
        }
    },
    methods: {
        contarPorTipo(tipo) {
            return this.notificacoes.filter(n => n.tipo === tipo).length;
        },
        limparFiltro() {
            this.filtroSelecionado = 'todas';
        },
        getIconePorTipo(tipo) {
            const icones = {
                consulta: 'bi bi-calendar-check',
                paciente: 'bi bi-person',
                sistema: 'bi bi-gear',
                lembrete: 'bi bi-clock'
            };
            return icones[tipo] || 'bi bi-bell';
        },
        formatarTipo(tipo) {
            const tipos = {
                consulta: 'Consulta',
                paciente: 'Paciente',
                sistema: 'Sistema',
                lembrete: 'Lembrete'
            };
            return tipos[tipo] || tipo;
        },
        formatarTempo(dataISO) {
            const data = new Date(dataISO);
            const agora = new Date();
            const diffMs = agora - data;
            const diffMinutos = Math.floor(diffMs / (1000 * 60));
            const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffMinutos < 1) {
                return 'Agora';
            } else if (diffMinutos < 60) {
                return `Há ${diffMinutos} min`;
            } else if (diffHoras < 24) {
                return `Há ${diffHoras}h`;
            } else if (diffDias === 1) {
                return 'Ontem';
            } else if (diffDias < 7) {
                return `Há ${diffDias} dias`;
            } else {
                return data.toLocaleDateString('pt-BR');
            }
        },
        marcarComoLida(notificacao) {
            notificacao.lida = true;
        },
        marcarTodasComoLidas() {
            this.notificacoes.forEach(n => n.lida = true);
        },
        excluirNotificacao(id) {
            if (confirm('Deseja realmente excluir esta notificação?')) {
                const index = this.notificacoes.findIndex(n => n.id === id);
                if (index !== -1) {
                    this.notificacoes.splice(index, 1);
                }
            }
        },
        limparTodasLidas() {
            if (confirm('Deseja limpar todas as notificações já lidas?')) {
                this.notificacoes = this.notificacoes.filter(n => !n.lida);
            }
        }
    }
}
</script>

<style scoped>
.notificacoes-container {
    padding: 20px;
    width: 100%;
}

.notificacoes-container h1 {
    color: #333333;
    margin-bottom: 20px;
    font-size: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.notificacoes-container h1 i {
    color: #91415c;
}

/* Filtros Card */
.filtros-card {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
    margin-bottom: 20px;
}

.filtros-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.filtros-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.filtros-header h3 i {
    color: #91415c;
}

.btn-limpar {
    background: transparent;
    border: 1px solid #e0e0e0;
    color: #666;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.btn-limpar:hover {
    background: #f8f9fa;
    border-color: #91415c;
    color: #91415c;
}

.filtros-lista {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.filtro-btn {
    background: #f8f9fa;
    border: 2px solid transparent;
    color: #666;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.filtro-btn:hover {
    background: #e9ecef;
    color: #333;
}

.filtro-btn.active {
    background: rgba(145, 65, 92, 0.1);
    border-color: #91415c;
    color: #91415c;
}

.filtro-btn .badge {
    background: #91415c;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    min-width: 24px;
    text-align: center;
}

.filtro-btn.active .badge {
    background: #732f43;
}

/* Ações em massa */
.acoes-massa {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

.btn-acao-massa {
    background: #FFFFFF;
    border: 1px solid #e0e0e0;
    color: #666;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-acao-massa:hover {
    border-color: #91415c;
    color: #91415c;
    background: rgba(145, 65, 92, 0.05);
}

/* Lista de Notificações */
.notificacoes-lista {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.notificacao-item {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 2px solid transparent;
    display: flex;
    gap: 16px;
    transition: all 0.2s;
    cursor: pointer;
    position: relative;
}

.notificacao-item:hover {
    border-color: #91415c;
    box-shadow: 0 4px 16px rgba(145, 65, 92, 0.15);
}

.notificacao-item.nao-lida {
    background: rgba(145, 65, 92, 0.02);
    border-color: rgba(145, 65, 92, 0.3);
}

.notificacao-item.nao-lida::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #91415c;
    border-radius: 12px 0 0 12px;
}

.notificacao-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
}

.notificacao-icon.tipo-consulta {
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.notificacao-icon.tipo-paciente {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
}

.notificacao-icon.tipo-sistema {
    background: rgba(108, 117, 125, 0.1);
    color: #6c757d;
}

.notificacao-icon.tipo-lembrete {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.notificacao-conteudo {
    flex: 1;
    min-width: 0;
}

.notificacao-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 8px;
}

.notificacao-conteudo h4 {
    margin: 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
}

.notificacao-tempo {
    color: #999;
    font-size: 13px;
    white-space: nowrap;
}

.notificacao-conteudo p {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
}

.notificacao-footer {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
}

.tipo-badge {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
}

.tipo-badge.tipo-consulta {
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.tipo-badge.tipo-paciente {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
}

.tipo-badge.tipo-sistema {
    background: rgba(108, 117, 125, 0.1);
    color: #6c757d;
}

.tipo-badge.tipo-lembrete {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.prioridade-badge {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    display: flex;
    align-items: center;
    gap: 4px;
}

.notificacao-acoes {
    display: flex;
    gap: 8px;
    align-items: flex-start;
}

.btn-icon {
    padding: 8px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: transparent;
    color: #666;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-icon:hover {
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.btn-icon.btn-excluir:hover {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #999;
}

.empty-state i {
    font-size: 64px;
    display: block;
    margin-bottom: 20px;
    opacity: 0.5;
}

.empty-state p {
    margin: 0;
    font-size: 16px;
}

/* Responsividade */
@media (max-width: 768px) {
    .notificacoes-container {
        padding: 10px;
    }

    .notificacoes-container h1 {
        font-size: 24px;
    }

    .filtros-lista {
        flex-direction: column;
    }

    .filtro-btn {
        justify-content: space-between;
    }

    .acoes-massa {
        flex-direction: column;
    }

    .btn-acao-massa {
        justify-content: center;
    }

    .notificacao-item {
        padding: 16px;
    }

    .notificacao-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
    }

    .notificacao-header {
        flex-direction: column;
        gap: 4px;
    }

    .notificacao-acoes {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .notificacao-conteudo h4 {
        font-size: 15px;
    }

    .notificacao-conteudo p {
        font-size: 13px;
    }
}
</style>
