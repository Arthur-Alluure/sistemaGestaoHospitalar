<template>
    <div class="gerenciamento-container">
        <div class="gerenciamento-header">
            <h1><i class="bi bi-sliders"></i> Gerenciamento do Sistema</h1>
            <p class="subtitle">Configurações e controle administrativo completo</p>
        </div>

        <!-- Mini Abas -->
        <div class="tabs-container">
            <div class="tab-item" :class="{ active: activeTab === 'permissoes' }" @click="activeTab = 'permissoes'">
                <i class="bi bi-shield-lock"></i>
                <span>Permissões</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'configuracoes' }"
                @click="activeTab = 'configuracoes'">
                <i class="bi bi-gear"></i>
                <span>Configurações</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'auditoria' }" @click="activeTab = 'auditoria'">
                <i class="bi bi-clock-history"></i>
                <span>Auditoria</span>
            </div>

            <div class="tab-item" :class="{ active: activeTab === 'backup' }" @click="activeTab = 'backup'">
                <i class="bi bi-database"></i>
                <span>Backup</span>
            </div>
        </div>

        <!-- Conteúdo das Abas -->
        <div class="tab-content">
            <!-- Gerenciamento de Permissões -->
            <div v-if="activeTab === 'permissoes'" class="content-section">
                <div class="content-header">
                    <h2>Controle de Permissões</h2>
                    <button class="btn-primary" @click="criarPerfil">
                        <i class="bi bi-plus-circle"></i> Novo Perfil
                    </button>
                </div>

                <div class="permissoes-grid">
                    <div class="permissao-card" v-for="perfil in perfisPermissao" :key="perfil.id">
                        <div class="permissao-header">
                            <div class="permissao-icon" :style="{ backgroundColor: perfil.cor }">
                                <i :class="perfil.icone"></i>
                            </div>
                            <div>
                                <h3>{{ perfil.nome }}</h3>
                                <p>{{ perfil.usuarios }} usuários</p>
                            </div>
                        </div>
                        <div class="permissao-lista">
                            <div class="permissao-item" v-for="perm in perfil.permissoes" :key="perm.modulo">
                                <span class="permissao-modulo">{{ perm.modulo }}</span>
                                <div class="permissao-niveis">
                                    <span v-for="nivel in perm.niveis" :key="nivel" class="nivel-badge">
                                        {{ nivel }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="permissao-acoes">
                            <button class="btn-secondary" @click="editarPerfil(perfil)">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Configurações do Sistema -->
            <div v-if="activeTab === 'configuracoes'" class="content-section">
                <div class="content-header">
                    <h2>Configurações do Sistema</h2>
                </div>

                <div class="config-sections">
                    <div class="config-card">
                        <div class="config-header">
                            <i class="bi bi-hospital"></i>
                            <h3>Informações da Instituição</h3>
                        </div>
                        <div class="config-body">
                            <div class="form-group">
                                <label>Nome da Instituição</label>
                                <input type="text" v-model="configuracoes.nomeInstituicao" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>CNPJ</label>
                                <input type="text" v-model="configuracoes.cnpj" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Endereço</label>
                                <input type="text" v-model="configuracoes.endereco" class="form-control" />
                            </div>
                        </div>
                        <div class="config-footer">
                            <button class="btn-primary" @click="salvarConfiguracao('instituicao')">
                                <i class="bi bi-check-circle"></i> Salvar
                            </button>
                        </div>
                    </div>

                    <div class="config-card">
                        <div class="config-header">
                            <i class="bi bi-envelope"></i>
                            <h3>Configurações de E-mail</h3>
                        </div>
                        <div class="config-body">
                            <div class="form-group">
                                <label>Servidor SMTP</label>
                                <input type="text" v-model="configuracoes.smtpServidor" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Porta</label>
                                <input type="text" v-model="configuracoes.smtpPorta" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>E-mail de Envio</label>
                                <input type="email" v-model="configuracoes.emailEnvio" class="form-control" />
                            </div>
                        </div>
                        <div class="config-footer">
                            <button class="btn-secondary" @click="testarEmail">
                                <i class="bi bi-send"></i> Testar
                            </button>
                            <button class="btn-primary" @click="salvarConfiguracao('email')">
                                <i class="bi bi-check-circle"></i> Salvar
                            </button>
                        </div>
                    </div>

                    <div class="config-card">
                        <div class="config-header">
                            <i class="bi bi-clock"></i>
                            <h3>Agendamento e Horários</h3>
                        </div>
                        <div class="config-body">
                            <div class="form-group">
                                <label>Duração Padrão da Consulta (minutos)</label>
                                <input type="number" v-model="configuracoes.duracaoConsulta" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Intervalo entre Consultas (minutos)</label>
                                <input type="number" v-model="configuracoes.intervaloConsultas" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Horário de Funcionamento</label>
                                <div class="horario-grid">
                                    <input type="time" v-model="configuracoes.horarioInicio" class="form-control" />
                                    <span>até</span>
                                    <input type="time" v-model="configuracoes.horarioFim" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="config-footer">
                            <button class="btn-primary" @click="salvarConfiguracao('horarios')">
                                <i class="bi bi-check-circle"></i> Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Auditoria e Logs -->
            <div v-if="activeTab === 'auditoria'" class="content-section">
                <div class="content-header">
                    <h2>Auditoria e Logs do Sistema</h2>
                    <div class="filtros-auditoria">
                        <select v-model="filtroAuditoria" class="form-control">
                            <option value="todos">Todas as Ações</option>
                            <option value="login">Login/Logout</option>
                            <option value="cadastro">Cadastros</option>
                            <option value="edicao">Edições</option>
                            <option value="exclusao">Exclusões</option>
                        </select>
                        <button class="btn-secondary" @click="exportarLogs">
                            <i class="bi bi-download"></i> Exportar
                        </button>
                    </div>
                </div>

                <div class="auditoria-lista">
                    <div class="auditoria-item" v-for="log in logsAuditoria" :key="log.id">
                        <div class="log-icon" :class="log.tipo">
                            <i :class="log.icone"></i>
                        </div>
                        <div class="log-info">
                            <h4>{{ log.acao }}</h4>
                            <p>{{ log.descricao }}</p>
                            <div class="log-meta">
                                <span><i class="bi bi-person"></i> {{ log.usuario }}</span>
                                <span><i class="bi bi-clock"></i> {{ log.data }} às {{ log.hora }}</span>
                                <span><i class="bi bi-laptop"></i> {{ log.ip }}</span>
                            </div>
                        </div>
                        <button class="btn-icon" @click="verDetalhesLog(log)">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Backup e Restauração -->
            <div v-if="activeTab === 'backup'" class="content-section">
                <div class="content-header">
                    <h2>Backup e Restauração</h2>
                    <button class="btn-primary" @click="criarBackup">
                        <i class="bi bi-plus-circle"></i> Criar Backup
                    </button>
                </div>

                <div class="backup-info">
                    <div class="info-card">
                        <i class="bi bi-database-check"></i>
                        <div>
                            <h3>Último Backup</h3>
                            <p>05/11/2025 às 23:30</p>
                        </div>
                    </div>
                    <div class="info-card">
                        <i class="bi bi-hdd"></i>
                        <div>
                            <h3>Tamanho Total</h3>
                            <p>2.45 GB</p>
                        </div>
                    </div>
                    <div class="info-card">
                        <i class="bi bi-calendar-check"></i>
                        <div>
                            <h3>Backup Automático</h3>
                            <p>Ativado - Diário às 23:00</p>
                        </div>
                    </div>
                </div>

                <div class="backup-config">
                    <div class="config-card">
                        <div class="config-header">
                            <i class="bi bi-gear"></i>
                            <h3>Configurações de Backup Automático</h3>
                        </div>
                        <div class="config-body">
                            <div class="form-group">
                                <label class="switch-label">
                                    <span>Ativar Backup Automático</span>
                                    <div class="switch">
                                        <input type="checkbox" v-model="configuracoes.backupAutomatico" />
                                        <span class="slider"></span>
                                    </div>
                                </label>
                            </div>
                            <div class="form-group">
                                <label>Frequência</label>
                                <select v-model="configuracoes.frequenciaBackup" class="form-control">
                                    <option value="diario">Diário</option>
                                    <option value="semanal">Semanal</option>
                                    <option value="mensal">Mensal</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Horário</label>
                                <input type="time" v-model="configuracoes.horarioBackup" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Retenção de Backups (dias)</label>
                                <input type="number" v-model="configuracoes.retencaoBackup" class="form-control" />
                            </div>
                        </div>
                        <div class="config-footer">
                            <button class="btn-primary" @click="salvarConfiguracao('backup')">
                                <i class="bi bi-check-circle"></i> Salvar Configurações
                            </button>
                        </div>
                    </div>
                </div>

                <div class="backup-lista">
                    <h3>Backups Disponíveis</h3>
                    <div class="backup-item" v-for="backup in backups" :key="backup.id">
                        <div class="backup-icon">
                            <i class="bi bi-file-earmark-zip"></i>
                        </div>
                        <div class="backup-info-item">
                            <h4>{{ backup.nome }}</h4>
                            <p>{{ backup.data }} às {{ backup.hora }} - {{ backup.tamanho }}</p>
                        </div>
                        <div class="backup-acoes">
                            <button class="btn-secondary" @click="baixarBackup(backup)">
                                <i class="bi bi-download"></i> Baixar
                            </button>
                            <button class="btn-secondary" @click="restaurarBackup(backup)">
                                <i class="bi bi-arrow-counterclockwise"></i> Restaurar
                            </button>
                            <button class="btn-icon btn-danger" @click="excluirBackup(backup)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Criar/Editar Perfil -->
        <ModalPerfilPermissao 
            :isOpen="modalPerfilAberto" 
            :perfil="perfilEditando" 
            @close="fecharModalPerfil"
            @save="salvarPerfilFromModal" 
        />
    </div>
</template>

<script>
import ModalPerfilPermissao from './modais/ModalPerfilPermissao.vue';

export default {
    name: 'Gerenciamento',
    components: {
        ModalPerfilPermissao
    },
    props: {
        usuario: { type: Object, required: true }
    },
    data() {
        return {
            activeTab: 'permissoes',
            filtroAuditoria: 'todos',
            modalPerfilAberto: false,
            perfilEditando: null,
            perfisPermissao: [
                {
                    id: 1,
                    nome: 'Administrador',
                    usuarios: 1,
                    cor: '#91415c',
                    icone: 'bi bi-shield-fill-check',
                    permissoes: [
                        { modulo: 'Dashboard', niveis: ['Visualizar', 'Editar'] },
                        { modulo: 'Pacientes', niveis: ['Criar', 'Visualizar', 'Editar', 'Excluir'] },
                        { modulo: 'Profissionais', niveis: ['Criar', 'Visualizar', 'Editar', 'Excluir'] },
                        { modulo: 'Gerenciamento', niveis: ['Total'] }
                    ]
                },
                {
                    id: 2,
                    nome: 'Médico',
                    usuarios: 12,
                    cor: '#5e72e4',
                    icone: 'bi bi-person-badge',
                    permissoes: [
                        { modulo: 'Dashboard', niveis: ['Visualizar'] },
                        { modulo: 'Pacientes', niveis: ['Visualizar', 'Editar'] },
                        { modulo: 'Prontuário', niveis: ['Criar', 'Visualizar', 'Editar'] },
                        { modulo: 'Agendamentos', niveis: ['Visualizar'] }
                    ]
                },
                {
                    id: 3,
                    nome: 'Enfermagem',
                    usuarios: 18,
                    cor: '#2dce89',
                    icone: 'bi bi-heart-pulse',
                    permissoes: [
                        { modulo: 'Dashboard', niveis: ['Visualizar'] },
                        { modulo: 'Pacientes', niveis: ['Visualizar'] },
                        { modulo: 'Prontuário', niveis: ['Visualizar'] },
                        { modulo: 'Agendamentos', niveis: ['Visualizar', 'Editar'] }
                    ]
                },
                {
                    id: 4,
                    nome: 'Recepção',
                    usuarios: 8,
                    cor: '#fb6340',
                    icone: 'bi bi-person-check',
                    permissoes: [
                        { modulo: 'Pacientes', niveis: ['Criar', 'Visualizar', 'Editar'] },
                        { modulo: 'Agendamentos', niveis: ['Criar', 'Visualizar', 'Editar', 'Excluir'] }
                    ]
                },
                {
                    id: 5,
                    nome: 'Paciente',
                    usuarios: 156,
                    cor: '#11cdef',
                    icone: 'bi bi-person-heart',
                    permissoes: [
                        { modulo: 'Dashboard', niveis: ['Visualizar'] },
                        { modulo: 'Meus Agendamentos', niveis: ['Visualizar', 'Criar'] },
                        { modulo: 'Meu Prontuário', niveis: ['Visualizar'] },
                        { modulo: 'Meus Exames', niveis: ['Visualizar'] },
                        { modulo: 'Telemedicina', niveis: ['Acessar'] }
                    ]
                }
            ],
            configuracoes: {
                nomeInstituicao: 'Hospital São Lucas',
                cnpj: '12.345.678/0001-90',
                endereco: 'Rua das Flores, 123 - Centro',
                smtpServidor: 'smtp.hospital.com',
                smtpPorta: '587',
                emailEnvio: 'noreply@hospital.com',
                duracaoConsulta: 30,
                intervaloConsultas: 10,
                horarioInicio: '08:00',
                horarioFim: '18:00',
                backupAutomatico: true,
                frequenciaBackup: 'diario',
                horarioBackup: '23:00',
                retencaoBackup: 30
            },
            logsAuditoria: [
                {
                    id: 1,
                    acao: 'Login no Sistema',
                    descricao: 'Usuário realizou login com sucesso',
                    usuario: 'Arthur Rodrigues',
                    data: '07/11/2025',
                    hora: '08:45',
                    ip: '192.168.1.100',
                    tipo: 'login',
                    icone: 'bi bi-box-arrow-in-right'
                },
                {
                    id: 2,
                    acao: 'Paciente Cadastrado',
                    descricao: 'Novo paciente adicionado ao sistema',
                    usuario: 'Maria Santos',
                    data: '07/11/2025',
                    hora: '09:15',
                    ip: '192.168.1.102',
                    tipo: 'cadastro',
                    icone: 'bi bi-person-plus'
                },
                {
                    id: 3,
                    acao: 'Prontuário Editado',
                    descricao: 'Alterações realizadas no prontuário #1234',
                    usuario: 'Dr. Carlos Silva',
                    data: '07/11/2025',
                    hora: '10:30',
                    ip: '192.168.1.105',
                    tipo: 'edicao',
                    icone: 'bi bi-pencil-square'
                },
                {
                    id: 4,
                    acao: 'Configuração Alterada',
                    descricao: 'Configurações de e-mail foram atualizadas',
                    usuario: 'Arthur Rodrigues',
                    data: '07/11/2025',
                    hora: '11:20',
                    ip: '192.168.1.100',
                    tipo: 'edicao',
                    icone: 'bi bi-gear'
                },
                {
                    id: 5,
                    acao: 'Backup Criado',
                    descricao: 'Backup manual do banco de dados realizado',
                    usuario: 'Arthur Rodrigues',
                    data: '06/11/2025',
                    hora: '18:00',
                    ip: '192.168.1.100',
                    tipo: 'cadastro',
                    icone: 'bi bi-database'
                }
            ],
            backups: [
                {
                    id: 1,
                    nome: 'backup_2025_11_05_23_30.zip',
                    data: '05/11/2025',
                    hora: '23:30',
                    tamanho: '856 MB'
                },
                {
                    id: 2,
                    nome: 'backup_2025_11_04_23_30.zip',
                    data: '04/11/2025',
                    hora: '23:30',
                    tamanho: '842 MB'
                },
                {
                    id: 3,
                    nome: 'backup_2025_11_03_23_30.zip',
                    data: '03/11/2025',
                    hora: '23:30',
                    tamanho: '838 MB'
                },
                {
                    id: 4,
                    nome: 'backup_2025_11_02_23_30.zip',
                    data: '02/11/2025',
                    hora: '23:30',
                    tamanho: '831 MB'
                }
            ]
        }
    },
    methods: {
        criarPerfil() {
            this.perfilEditando = null;
            this.modalPerfilAberto = true;
        },
        editarPerfil(perfil) {
            this.perfilEditando = perfil;
            this.modalPerfilAberto = true;
        },
        fecharModalPerfil() {
            this.modalPerfilAberto = false;
            this.perfilEditando = null;
        },
        salvarPerfilFromModal(dadosPerfil) {
            if (this.perfilEditando) {
                // Editar perfil existente
                const index = this.perfisPermissao.findIndex(p => p.id === this.perfilEditando.id);
                if (index !== -1) {
                    this.perfisPermissao[index] = {
                        ...this.perfilEditando,
                        ...dadosPerfil
                    };
                }
                alert('Perfil atualizado com sucesso!');
            } else {
                // Criar novo perfil
                const novoId = Math.max(...this.perfisPermissao.map(p => p.id)) + 1;
                this.perfisPermissao.push({
                    id: novoId,
                    ...dadosPerfil
                });
                alert('Perfil criado com sucesso!');
            }

            this.fecharModalPerfil();
        },
        salvarConfiguracao(tipo) {
            alert(`Configurações de ${tipo} salvas com sucesso!`);
        },
        testarEmail() {
            alert('Enviando e-mail de teste...');
        },
        exportarLogs() {
            alert('Exportando logs de auditoria...');
        },
        verDetalhesLog(log) {
            alert(`Detalhes do log:\n\nAção: ${log.acao}\nDescrição: ${log.descricao}\nUsuário: ${log.usuario}\nData/Hora: ${log.data} às ${log.hora}`);
        },
        criarBackup() {
            alert('Criando backup do sistema...\n\nEsta operação pode levar alguns minutos.');
        },
        baixarBackup(backup) {
            alert(`Baixando backup: ${backup.nome}`);
        },
        restaurarBackup(backup) {
            if (confirm(`Deseja realmente restaurar o backup de ${backup.data}?\n\nATENÇÃO: Esta ação substituirá os dados atuais!`)) {
                alert('Restaurando backup...');
            }
        },
        excluirBackup(backup) {
            if (confirm(`Deseja realmente excluir o backup de ${backup.data}?`)) {
                alert('Backup excluído com sucesso!');
            }
        }
    }
}
</script>

<style scoped>
.gerenciamento-container {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
}

.gerenciamento-header {
    margin-bottom: 32px;
}

.gerenciamento-header h1 {
    font-size: 32px;
    color: #333;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.gerenciamento-header h1 i {
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
    flex-wrap: wrap;
    gap: 12px;
}

.content-header h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
}

/* Usuários Grid */
.usuarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}

.usuario-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: all 0.3s;
}

.usuario-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.usuario-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
    flex-shrink: 0;
}

.usuario-info {
    flex: 1;
}

.usuario-info h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 18px;
}

.usuario-email,
.usuario-cargo {
    margin: 4px 0;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.usuario-meta {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-ativo {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-inativo {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
}

.permissao-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.usuario-acoes {
    display: flex;
    gap: 8px;
    flex-direction: column;
}

.btn-icon {
    width: 36px;
    height: 36px;
    border: 1px solid #e0e0e0;
    background: #f8f9fa;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    color: #333;
}

.btn-icon:hover {
    background: #e9ecef;
    border-color: #ced4da;
}

.btn-icon.btn-danger {
    color: #dc3545;
}

.btn-icon.btn-danger:hover {
    background: rgba(220, 53, 69, 0.1);
    border-color: #dc3545;
}

/* Permissões Grid */
.permissoes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
}

.permissao-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s;
}

.permissao-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.permissao-header {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
}

.permissao-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
}

.permissao-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
}

.permissao-header p {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 14px;
}

.permissao-lista {
    margin-bottom: 16px;
}

.permissao-item {
    padding: 12px 0;
    border-bottom: 1px solid #f8f9fa;
}

.permissao-item:last-child {
    border-bottom: none;
}

.permissao-modulo {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
}

.permissao-niveis {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.nivel-badge {
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
    background: rgba(145, 65, 92, 0.1);
    color: #91415c;
}

.permissao-acoes {
    display: flex;
    gap: 8px;
}

/* Configurações */
.config-sections {
    display: grid;
    gap: 24px;
}

.config-card {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
}

.config-header {
    padding: 20px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.config-header i {
    font-size: 24px;
    color: #91415c;
}

.config-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
}

.config-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
}

.form-control {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.2s;
    box-sizing: border-box;
}

.form-control:focus {
    outline: none;
    border-color: #91415c;
    box-shadow: 0 0 0 3px rgba(145, 65, 92, 0.1);
}

.horario-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 12px;
    align-items: center;
}

.config-footer {
    padding: 20px;
    background: white;
    border-top: 1px solid #e0e0e0;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

/* Switch */
.switch-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.switch {
    position: relative;
    width: 50px;
    height: 26px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 26px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #91415c;
}

input:checked+.slider:before {
    transform: translateX(24px);
}

/* Auditoria */
.filtros-auditoria {
    display: flex;
    gap: 12px;
}

.filtros-auditoria .form-control {
    width: 200px;
}

.auditoria-lista {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.auditoria-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 12px;
    transition: all 0.2s;
}

.auditoria-item:hover {
    background: #e9ecef;
}

.log-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    flex-shrink: 0;
}

.log-icon.login {
    background: #5e72e4;
}

.log-icon.cadastro {
    background: #2dce89;
}

.log-icon.edicao {
    background: #fb6340;
}

.log-icon.exclusao {
    background: #dc3545;
}

.log-info {
    flex: 1;
}

.log-info h4 {
    margin: 0 0 4px 0;
    color: #333;
    font-size: 16px;
}

.log-info p {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 14px;
}

.log-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.log-meta span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #888;
    font-size: 13px;
}

.log-meta i {
    color: #91415c;
}

/* Backup */
.backup-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.info-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.info-card i {
    font-size: 32px;
    color: #91415c;
}

.info-card h3 {
    margin: 0 0 4px 0;
    color: #666;
    font-size: 14px;
    font-weight: 500;
}

.info-card p {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
}

.backup-config {
    margin-bottom: 32px;
}

.backup-lista h3 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 20px;
}

.backup-item {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 12px;
    margin-bottom: 12px;
}

.backup-icon {
    width: 48px;
    height: 48px;
    background: #91415c;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
}

.backup-info-item {
    flex: 1;
}

.backup-info-item h4 {
    margin: 0 0 4px 0;
    color: #333;
    font-size: 14px;
}

.backup-info-item p {
    margin: 0;
    color: #666;
    font-size: 13px;
}

.backup-acoes {
    display: flex;
    gap: 8px;
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
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-primary:hover {
    background-color: #732f43;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* Responsividade */
@media (max-width: 1024px) {

    .usuarios-grid,
    .permissoes-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}

@media (max-width: 768px) {
    .gerenciamento-container {
        padding: 16px;
    }

    .gerenciamento-header h1 {
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
    }

    .usuarios-grid,
    .permissoes-grid {
        grid-template-columns: 1fr;
    }

    .usuario-card {
        flex-direction: column;
    }

    .usuario-acoes {
        flex-direction: row;
        width: 100%;
    }

    .filtros-auditoria {
        flex-direction: column;
    }

    .filtros-auditoria .form-control {
        width: 100%;
    }

    .backup-acoes {
        flex-direction: column;
        width: 100%;
    }

    .backup-acoes button {
        width: 100%;
        justify-content: center;
    }

    .config-footer {
        flex-direction: column;
    }

    .config-footer button {
        width: 100%;
        justify-content: center;
    }
}
</style>
