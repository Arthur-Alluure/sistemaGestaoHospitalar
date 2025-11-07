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
            profissionais: [
                {
                    id: 1,
                    nome: 'Dr. Carlos Silva',
                    cpf: '123.456.789-00',
                    registro: 'CRM 123456-SP',
                    especialidade: 'Cardiologia',
                    cargo: 'Médico',
                    dataNascimento: '1985-03-15',
                    genero: 'Masculino',
                    telefone: '(11) 98765-4321',
                    email: 'carlos.silva@hospital.com',
                    endereco: 'Rua das Acácias, 789, Jardins, São Paulo - SP',
                    dataAdmissao: '2020-01-15',
                    status: 'Ativo',
                    horarioTrabalho: '08:00 - 18:00',
                    diasTrabalho: 'Segunda a Sexta'
                },
                {
                    id: 2,
                    nome: 'Dra. Ana Costa',
                    cpf: '987.654.321-00',
                    registro: 'CRM 654321-SP',
                    especialidade: 'Pediatria',
                    cargo: 'Médica',
                    dataNascimento: '1990-07-22',
                    genero: 'Feminino',
                    telefone: '(11) 91234-5678',
                    email: 'ana.costa@hospital.com',
                    endereco: 'Av. Brasil, 456, Centro, São Paulo - SP',
                    dataAdmissao: '2019-05-20',
                    status: 'Ativo',
                    horarioTrabalho: '07:00 - 13:00',
                    diasTrabalho: 'Segunda a Sábado'
                },
                {
                    id: 3,
                    nome: 'Enf. Beatriz Souza',
                    cpf: '456.789.123-00',
                    registro: 'COREN 789456-SP',
                    especialidade: 'Enfermagem Geral',
                    cargo: 'Enfermeira',
                    dataNascimento: '1988-11-10',
                    genero: 'Feminino',
                    telefone: '(11) 97654-3210',
                    email: 'beatriz.souza@hospital.com',
                    endereco: 'Rua das Palmeiras, 321, Vila Maria, São Paulo - SP',
                    dataAdmissao: '2018-03-10',
                    status: 'Ativo',
                    horarioTrabalho: '12:00 - 00:00',
                    diasTrabalho: 'Escala 12x36'
                },
                {
                    id: 4,
                    nome: 'Dr. Ricardo Mendes',
                    cpf: '321.654.987-00',
                    registro: 'CRM 987654-SP',
                    especialidade: 'Ortopedia',
                    cargo: 'Médico',
                    dataNascimento: '1982-04-18',
                    genero: 'Masculino',
                    telefone: '(11) 96543-2109',
                    email: 'ricardo.mendes@hospital.com',
                    endereco: 'Av. Independência, 987, Ipiranga, São Paulo - SP',
                    dataAdmissao: '2017-09-01',
                    status: 'Ativo',
                    horarioTrabalho: '13:00 - 19:00',
                    diasTrabalho: 'Segunda a Sexta'
                },
                {
                    id: 5,
                    nome: 'Dra. Fernanda Lima',
                    cpf: '789.123.456-00',
                    registro: 'CRM 456789-SP',
                    especialidade: 'Ginecologia',
                    cargo: 'Médica',
                    dataNascimento: '1987-09-25',
                    genero: 'Feminino',
                    telefone: '(11) 95432-1098',
                    email: 'fernanda.lima@hospital.com',
                    endereco: 'Rua dos Lírios, 654, Moema, São Paulo - SP',
                    dataAdmissao: '2021-02-15',
                    status: 'Ativo',
                    horarioTrabalho: '08:00 - 14:00',
                    diasTrabalho: 'Segunda, Quarta e Sexta'
                },
                {
                    id: 6,
                    nome: 'Téc. Paulo Santos',
                    cpf: '147.258.369-00',
                    registro: 'COREN 258147-SP',
                    especialidade: 'Radiologia',
                    cargo: 'Técnico em Radiologia',
                    dataNascimento: '1992-12-05',
                    genero: 'Masculino',
                    telefone: '(11) 94321-0987',
                    email: 'paulo.santos@hospital.com',
                    endereco: 'Rua São João, 159, República, São Paulo - SP',
                    dataAdmissao: '2022-06-01',
                    status: 'Inativo',
                    horarioTrabalho: '06:00 - 14:00',
                    diasTrabalho: 'Segunda a Sexta'
                }
            ]
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
