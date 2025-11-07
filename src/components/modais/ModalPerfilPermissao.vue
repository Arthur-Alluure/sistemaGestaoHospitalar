<template>
    <div v-if="isOpen" class="modal-overlay" @click="fechar">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>
                    <i class="bi bi-shield-lock"></i>
                    {{ perfil ? 'Editar Perfil de Permissão' : 'Novo Perfil de Permissão' }}
                </h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <form @submit.prevent="salvar" class="modal-body">
                <div class="form-row">
                    <div class="form-group">
                        <label for="nomePerfil">
                            <i class="bi bi-tag"></i> Nome do Perfil *
                        </label>
                        <input type="text" id="nomePerfil" v-model="form.nome" required class="form-control"
                            placeholder="Ex: Administrador, Enfermagem..." />
                    </div>

                    <div class="form-group">
                        <label for="iconePerfil">
                            <i class="bi bi-emoji-smile"></i> Ícone *
                        </label>
                        <select id="iconePerfil" v-model="form.icone" required class="form-control">
                            <option value="">Selecione</option>
                            <option value="bi bi-shield-fill-check">Escudo</option>
                            <option value="bi bi-person-badge">Pessoa</option>
                            <option value="bi bi-heart-pulse">Coração</option>
                            <option value="bi bi-person-check">Pessoa Check</option>
                            <option value="bi bi-person-heart">Pessoa Coração</option>
                            <option value="bi bi-hospital">Hospital</option>
                            <option value="bi bi-clipboard-check">Clipboard</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="corPerfil">
                            <i class="bi bi-palette"></i> Cor *
                        </label>
                        <select id="corPerfil" v-model="form.cor" required class="form-control">
                            <option value="">Selecione</option>
                            <option value="#91415c">Roxo</option>
                            <option value="#5e72e4">Azul</option>
                            <option value="#2dce89">Verde</option>
                            <option value="#fb6340">Laranja</option>
                            <option value="#11cdef">Azul Claro</option>
                            <option value="#f5365c">Vermelho</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="usuariosPerfil">
                            <i class="bi bi-people"></i> Quantidade de Usuários
                        </label>
                        <input type="number" id="usuariosPerfil" v-model="form.usuarios" class="form-control"
                            placeholder="0" min="0" />
                    </div>
                </div>

                <div class="permissoes-section">
                    <h3><i class="bi bi-check2-square"></i> Permissões do Perfil</h3>
                    <div class="permissao-form-item" v-for="(perm, index) in form.permissoes" :key="index">
                        <div class="permissao-form-header">
                            <select v-model="perm.modulo" class="form-control modulo-input" required>
                                <option value="">Selecione um módulo</option>
                                <option v-for="modulo in modulosDisponiveis" :key="modulo" :value="modulo">
                                    {{ modulo }}
                                </option>
                            </select>
                            <button type="button" class="btn-icon btn-danger" @click="removerPermissao(index)"
                                v-if="form.permissoes.length > 1">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        <div class="niveis-checkboxes">
                            <label v-for="nivel in niveisDisponiveis" :key="nivel" class="checkbox-label">
                                <input type="checkbox" :value="nivel" v-model="perm.niveis" />
                                <span>{{ nivel }}</span>
                            </label>
                        </div>
                    </div>
                    <button type="button" class="btn-add-permissao" @click="adicionarPermissao">
                        <i class="bi bi-plus-circle"></i> Adicionar Módulo
                    </button>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">
                        Cancelar
                    </button>
                    <button type="submit" class="btn-primary">
                        <i class="bi bi-check-circle"></i>
                        {{ perfil ? 'Salvar Alterações' : 'Criar Perfil' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalPerfil',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        perfil: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            form: {
                nome: '',
                icone: '',
                cor: '',
                usuarios: 0,
                permissoes: [
                    { modulo: '', niveis: [] }
                ]
            },
            modulosDisponiveis: [
                'Dashboard',
                'Pacientes',
                'Profissionais',
                'Prontuário',
                'Agendamentos',
                'Telemedicina',
                'Relatórios',
                'Gerenciamento',
                'Configurações',
                'Auditoria',
                'Backup',
                'Meus Agendamentos',
                'Meu Prontuário',
                'Meus Exames'
            ],
            niveisDisponiveis: ['Criar', 'Visualizar', 'Editar', 'Excluir', 'Total', 'Acessar']
        }
    },
    watch: {
        perfil: {
            immediate: true,
            handler(novoPerfil) {
                if (novoPerfil) {
                    this.form = {
                        nome: novoPerfil.nome,
                        icone: novoPerfil.icone,
                        cor: novoPerfil.cor,
                        usuarios: novoPerfil.usuarios,
                        permissoes: JSON.parse(JSON.stringify(novoPerfil.permissoes))
                    };
                } else {
                    this.resetarForm();
                }
            }
        }
    },
    methods: {
        adicionarPermissao() {
            this.form.permissoes.push({ modulo: '', niveis: [] });
        },
        removerPermissao(index) {
            this.form.permissoes.splice(index, 1);
        },
        salvar() {
            // Validação
            if (!this.form.nome || !this.form.icone || !this.form.cor) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            // Verificar se tem pelo menos uma permissão válida
            const permissoesValidas = this.form.permissoes.filter(p => p.modulo && p.niveis.length > 0);
            if (permissoesValidas.length === 0) {
                alert('Adicione pelo menos uma permissão com módulo e níveis!');
                return;
            }

            this.$emit('save', {
                ...this.form,
                permissoes: permissoesValidas
            });
            this.resetarForm();
        },
        fechar() {
            this.$emit('close');
            this.resetarForm();
        },
        resetarForm() {
            this.form = {
                nome: '',
                icone: '',
                cor: '',
                usuarios: 0,
                permissoes: [
                    { modulo: '', niveis: [] }
                ]
            };
        }
    }
}
</script>

<style scoped>
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
    z-index: 2000;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 800px;
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
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
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
}

.form-control:focus {
    outline: none;
    border-color: #91415c;
    box-shadow: 0 0 0 3px rgba(145, 65, 92, 0.1);
}

select.form-control {
    cursor: pointer;
}

/* Permissões */
.permissoes-section {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 2px solid #f0f0f0;
}

.permissoes-section h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.permissoes-section h3 i {
    color: #91415c;
}

.permissao-form-item {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
}

.permissao-form-header {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: center;
}

.modulo-input {
    flex: 1;
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

.niveis-checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 6px 12px;
    background: white;
    border-radius: 6px;
    border: 1px solid #ddd;
    transition: all 0.2s;
}

.checkbox-label:hover {
    border-color: #91415c;
    background: rgba(145, 65, 92, 0.05);
}

.checkbox-label input[type="checkbox"] {
    cursor: pointer;
}

.checkbox-label input[type="checkbox"]:checked+span {
    color: #91415c;
    font-weight: 600;
}

.btn-add-permissao {
    width: 100%;
    padding: 12px;
    background: #f8f9fa;
    border: 2px dashed #ddd;
    border-radius: 8px;
    color: #666;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
}

.btn-add-permissao:hover {
    border-color: #91415c;
    color: #91415c;
    background: rgba(145, 65, 92, 0.05);
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
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* Responsividade */
@media (max-width: 768px) {
    .modal-content {
        margin: 0;
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 16px;
    }

    .modal-footer {
        flex-direction: column;
    }

    .modal-footer button {
        width: 100%;
        justify-content: center;
    }

    .niveis-checkboxes {
        flex-direction: column;
    }
}
</style>
