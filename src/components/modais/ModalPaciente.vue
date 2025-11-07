<template>
    <!-- Modal de Novo/Editar Paciente -->
    <div v-if="isOpen && tipo === 'form'" class="modal-overlay" @click="fechar">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>
                    <i class="bi bi-person-plus"></i>
                    {{ paciente ? 'Editar Paciente' : 'Novo Paciente' }}
                </h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <form @submit.prevent="salvar" class="modal-body">
                <div class="form-row">
                    <div class="form-group">
                        <label for="nome">
                            <i class="bi bi-person"></i> Nome Completo *
                        </label>
                        <input type="text" id="nome" v-model="form.nome" required class="form-control"
                            placeholder="Digite o nome completo" />
                    </div>

                    <div class="form-group">
                        <label for="cpf">
                            <i class="bi bi-card-text"></i> CPF *
                        </label>
                        <input type="text" id="cpf" v-model="form.cpf" required class="form-control"
                            placeholder="000.000.000-00" maxlength="14" @input="formatarCPF" />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="dataNascimento">
                            <i class="bi bi-calendar"></i> Data de Nascimento *
                        </label>
                        <input type="date" id="dataNascimento" v-model="form.dataNascimento" required
                            class="form-control" :max="dataMaxima" />
                    </div>

                    <div class="form-group">
                        <label for="genero">
                            <i class="bi bi-gender-ambiguous"></i> Gênero *
                        </label>
                        <select id="genero" v-model="form.genero" required class="form-control">
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="telefone">
                            <i class="bi bi-telephone"></i> Telefone *
                        </label>
                        <input type="text" id="telefone" v-model="form.telefone" required class="form-control"
                            placeholder="(00) 00000-0000" maxlength="15" @input="formatarTelefone" />
                    </div>

                    <div class="form-group">
                        <label for="email">
                            <i class="bi bi-envelope"></i> E-mail
                        </label>
                        <input type="email" id="email" v-model="form.email" class="form-control"
                            placeholder="email@exemplo.com" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="endereco">
                        <i class="bi bi-geo-alt"></i> Endereço
                    </label>
                    <input type="text" id="endereco" v-model="form.endereco" class="form-control"
                        placeholder="Rua, Número, Bairro, Cidade - UF" />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="convenio">
                            <i class="bi bi-hospital"></i> Convênio
                        </label>
                        <select id="convenio" v-model="form.convenio" class="form-control">
                            <option value="">Particular</option>
                            <option value="Unimed">Unimed</option>
                            <option value="Bradesco Saúde">Bradesco Saúde</option>
                            <option value="SulAmérica">SulAmérica</option>
                            <option value="Amil">Amil</option>
                            <option value="NotreDame Intermédica">NotreDame Intermédica</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="numeroCarteira">
                            <i class="bi bi-credit-card"></i> Número da Carteirinha
                        </label>
                        <input type="text" id="numeroCarteira" v-model="form.numeroCarteira" class="form-control"
                            placeholder="Número da carteirinha" :disabled="!form.convenio" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="observacoes">
                        <i class="bi bi-chat-left-text"></i> Observações
                    </label>
                    <textarea id="observacoes" v-model="form.observacoes" rows="3" class="form-control"
                        placeholder="Alergias, condições especiais, etc..."></textarea>
                </div>

                <div class="form-group">
                    <label for="perfilPermissao">
                        <i class="bi bi-shield-check"></i> Perfil de Permissão
                    </label>
                    <select id="perfilPermissao" v-model="form.perfilPermissao" class="form-control">
                        <option value="Paciente">Paciente</option>
                    </select>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">
                        Cancelar
                    </button>
                    <button type="submit" class="btn-primary">
                        <i class="bi bi-check-circle"></i>
                        {{ paciente ? 'Salvar Alterações' : 'Cadastrar Paciente' }}
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de Visualização -->
    <div v-if="isOpen && tipo === 'view'" class="modal-overlay" @click="fechar">
        <div class="modal-content modal-visualizacao" @click.stop>
            <div class="modal-header">
                <h2>
                    <i class="bi bi-person-badge"></i>
                    Dados do Paciente
                </h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <div class="modal-body" v-if="paciente">
                <div class="info-section">
                    <h3><i class="bi bi-person-lines-fill"></i> Informações Pessoais</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label><i class="bi bi-person"></i> Nome</label>
                            <p>{{ paciente.nome }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-card-text"></i> CPF</label>
                            <p>{{ paciente.cpf }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-calendar"></i> Data de Nascimento</label>
                            <p>{{ formatarData(paciente.dataNascimento) }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-hourglass"></i> Idade</label>
                            <p>{{ paciente.idade }} anos</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-gender-ambiguous"></i> Gênero</label>
                            <p>{{ paciente.genero }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-telephone"></i> Telefone</label>
                            <p>{{ paciente.telefone }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-envelope"></i> E-mail</label>
                            <p>{{ paciente.email || 'Não informado' }}</p>
                        </div>
                        <div class="info-item full-width">
                            <label><i class="bi bi-geo-alt"></i> Endereço</label>
                            <p>{{ paciente.endereco || 'Não informado' }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-hospital"></i> Convênio</label>
                            <p>{{ paciente.convenio || 'Particular' }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-credit-card"></i> Carteirinha</label>
                            <p>{{ paciente.numeroCarteira || 'N/A' }}</p>
                        </div>
                        <div class="info-item full-width" v-if="paciente.observacoes">
                            <label><i class="bi bi-chat-left-text"></i> Observações</label>
                            <p>{{ paciente.observacoes }}</p>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalPaciente',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        tipo: {
            type: String,
            default: 'form', // 'form' ou 'view'
            validator: (value) => ['form', 'view'].includes(value)
        },
        paciente: {
            type: Object,
            default: null
        }
    },
    emits: ['close', 'save'],
    data() {
        return {
            form: {
                nome: '',
                cpf: '',
                dataNascimento: '',
                genero: '',
                telefone: '',
                email: '',
                endereco: '',
                convenio: '',
                numeroCarteira: '',
                observacoes: '',
                perfilPermissao: 'Paciente'
            }
        }
    },
    computed: {
        dataMaxima() {
            const hoje = new Date();
            return hoje.toISOString().split('T')[0];
        }
    },
    watch: {
        isOpen(newVal) {
            if (newVal && this.tipo === 'form') {
                this.preencherFormulario();
            }
        },
        paciente() {
            if (this.isOpen && this.tipo === 'form') {
                this.preencherFormulario();
            }
        }
    },
    methods: {
        fechar() {
            this.$emit('close');
            this.resetarFormulario();
        },
        preencherFormulario() {
            if (this.paciente) {
                this.form = {
                    nome: this.paciente.nome || '',
                    cpf: this.paciente.cpf || '',
                    dataNascimento: this.paciente.dataNascimento || '',
                    genero: this.paciente.genero || '',
                    telefone: this.paciente.telefone || '',
                    email: this.paciente.email || '',
                    endereco: this.paciente.endereco || '',
                    convenio: this.paciente.convenio || '',
                    numeroCarteira: this.paciente.numeroCarteira || '',
                    observacoes: this.paciente.observacoes || ''
                };
            } else {
                this.resetarFormulario();
            }
        },
        resetarFormulario() {
            this.form = {
                nome: '',
                cpf: '',
                dataNascimento: '',
                genero: '',
                telefone: '',
                email: '',
                endereco: '',
                convenio: '',
                numeroCarteira: '',
                observacoes: ''
            };
        },
        salvar() {
            // Validar campos obrigatórios
            if (!this.form.nome || !this.form.cpf ||
                !this.form.dataNascimento || !this.form.genero ||
                !this.form.telefone) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            this.$emit('save', { ...this.form });
            this.fechar();
        },
        formatarCPF(event) {
            let valor = event.target.value.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                this.form.cpf = valor;
            }
        },
        formatarTelefone(event) {
            let valor = event.target.value.replace(/\D/g, '');
            if (valor.length <= 11) {
                if (valor.length <= 10) {
                    valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
                    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
                    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
                }
                this.form.telefone = valor;
            }
        },
        formatarData(data) {
            if (!data) return 'Não informado';
            const [ano, mes, dia] = data.split('-');
            return `${dia}/${mes}/${ano}`;
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
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.modal-visualizacao {
    max-width: 600px;
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

.form-control:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
}

textarea.form-control {
    resize: vertical;
    font-family: inherit;
}

/* Modal de Visualização */
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.info-item {
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
}

.info-item.full-width {
    grid-column: 1 / -1;
}

.info-item label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    color: #666;
    font-size: 13px;
    margin-bottom: 6px;
}

.info-item label i {
    color: #91415c;
}

.info-item p {
    margin: 0;
    color: #333;
    font-size: 15px;
}

/* Switch */
.switch-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
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

.switch input:checked+.slider {
    background-color: #91415c;
}

.switch input:checked+.slider:before {
    transform: translateX(24px);
}

.switch-text {
    font-weight: 500;
    color: #333;
}

/* Responsividade */
@media (max-width: 768px) {

    .form-row,
    .info-grid {
        grid-template-columns: 1fr;
    }

    .info-item.full-width {
        grid-column: 1;
    }
}

@media (max-width: 480px) {
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
