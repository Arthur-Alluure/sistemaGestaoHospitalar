<template>
    <div class="profissionais-container">
        <h1><i class="bi bi-hospital"></i> Profissionais</h1>
        <div class="card">
            <div class="card-header">
                <h3>Lista de Profissionais</h3>
                <button class="btn-primary" @click="abrirModalNovoProfissional">
                    <i class="bi bi-plus-circle"></i> Novo Profissional
                </button>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CRM/COREN/CRO</th>
                        <th>Especialidade</th>
                        <th>Cargo</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="profissional in profissionais" :key="profissional.id">
                        <td>{{ profissional.id }}</td>
                        <td>{{ profissional.nome }}</td>
                        <td>{{ profissional.registro }}</td>
                        <td>{{ profissional.especialidade }}</td>
                        <td>{{ profissional.cargo }}</td>
                        <td>{{ profissional.telefone }}</td>
                        <td>
                            <span
                                :class="['status-badge', profissional.status === 'Ativo' ? 'status-ativo' : 'status-inativo']">
                                {{ profissional.status }}
                            </span>
                        </td>
                        <td>
                            <button class="btn-action btn-edit" @click="editarProfissional(profissional)"
                                title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn-action btn-view" @click="visualizarProfissional(profissional)"
                                title="Visualizar">
                                <i class="bi bi-eye"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="profissionais.length === 0" class="empty-state">
                <i class="bi bi-person-x"></i>
                <p>Nenhum profissional cadastrado</p>
            </div>
        </div>

        <!-- Modal de Profissional -->
        <ModalProfissional :isOpen="modalAberto" :tipo="tipoModal" :profissional="profissionalSelecionado"
            @close="fecharModal" @save="salvarProfissional" />
    </div>
</template>

<script>
import ModalProfissional from './modais/ModalProfissional.vue';
import mockData from '@/data';

export default {
    name: 'Profissionais',
    components: {
        ModalProfissional
    },
    data() {
        return {
            modalAberto: false,
            tipoModal: 'form', // 'form' ou 'view'
            profissionalSelecionado: null,
            profissionais: mockData.profissionais
        }
    },
    methods: {
        abrirModalNovoProfissional() {
            this.tipoModal = 'form';
            this.profissionalSelecionado = null;
            this.modalAberto = true;
        },
        editarProfissional(profissional) {
            this.tipoModal = 'form';
            this.profissionalSelecionado = { ...profissional };
            this.modalAberto = true;
        },
        visualizarProfissional(profissional) {
            this.tipoModal = 'view';
            this.profissionalSelecionado = profissional;
            this.modalAberto = true;
        },
        fecharModal() {
            this.modalAberto = false;
            this.profissionalSelecionado = null;
        },
        salvarProfissional(profissional) {
            if (profissional.id) {
                // Editar existente
                const index = this.profissionais.findIndex(p => p.id === profissional.id);
                if (index !== -1) {
                    this.profissionais[index] = profissional;
                }
            } else {
                // Adicionar novo
                profissional.id = this.profissionais.length + 1;
                this.profissionais.push(profissional);
            }
            this.fecharModal();
        }
    }
}
</script>

<style scoped>
.profissionais-container {
    padding: 20px;
    width: 100%;
}

.profissionais-container h1 {
    color: #333333;
    margin-bottom: 20px;
    font-size: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.profissionais-container h1 i {
    color: #91415c;
}

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
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f0f0f0;
}

.card-header h3 {
    margin: 0;
    color: #333333;
    font-size: 20px;
}

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
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(145, 65, 92, 0.3);
}

/* Tabela */
.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
}

.table thead tr {
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
}

.table th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #495057;
    font-size: 14px;
    white-space: nowrap;
}

.table td {
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
    color: #333;
    font-size: 14px;
}

.table tbody tr {
    transition: background-color 0.2s;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}

/* Status Badge */
.status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}

.status-ativo {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-inativo {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

/* Botões de Ação */
.btn-action {
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    margin-right: 4px;
}

.btn-edit {
    color: #007bff;
}

.btn-edit:hover {
    background: rgba(0, 123, 255, 0.1);
}

.btn-view {
    color: #6c757d;
}

.btn-view:hover {
    background: rgba(108, 117, 125, 0.1);
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
@media (max-width: 1200px) {
    .table {
        font-size: 13px;
    }

    .table th,
    .table td {
        padding: 8px;
    }
}

@media (max-width: 968px) {
    .card-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }

    .btn-primary {
        width: 100%;
        justify-content: center;
    }

    .table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}

@media (max-width: 768px) {
    .profissionais-container {
        padding: 10px;
    }

    .profissionais-container h1 {
        font-size: 24px;
    }

    .card {
        padding: 16px;
    }
}

@media (max-width: 480px) {

    .table th,
    .table td {
        padding: 6px;
        font-size: 12px;
    }

    .btn-action {
        padding: 4px 8px;
    }
}
</style>
