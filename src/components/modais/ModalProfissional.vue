<template>
    <!-- Modal de Novo/Editar Profissional -->
    <div v-if="isOpen && tipo === 'form'" class="modal-overlay" @click="fechar">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>
                    <i class="bi bi-person-plus"></i>
                    {{ profissional ? 'Editar Profissional' : 'Novo Profissional' }}
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
                        <label for="cargo">
                            <i class="bi bi-briefcase"></i> Cargo *
                        </label>
                        <select id="cargo" v-model="form.cargo" required class="form-control">
                            <option value="">Selecione</option>
                            <option value="Médico">Médico</option>
                            <option value="Médica">Médica</option>
                            <option value="Enfermeiro">Enfermeiro</option>
                            <option value="Enfermeira">Enfermeira</option>
                            <option value="Técnico em Enfermagem">Técnico em Enfermagem</option>
                            <option value="Técnico em Radiologia">Técnico em Radiologia</option>
                            <option value="Fisioterapeuta">Fisioterapeuta</option>
                            <option value="Nutricionista">Nutricionista</option>
                            <option value="Psicólogo">Psicólogo</option>
                            <option value="Recepcionista">Recepcionista</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="registro">
                            <i class="bi bi-award"></i> Registro Profissional *
                        </label>
                        <input type="text" id="registro" v-model="form.registro" required class="form-control"
                            placeholder="CRM, COREN, CRO, etc." />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="especialidade">
                            <i class="bi bi-card-checklist"></i> Especialidade *
                        </label>
                        <input type="text" id="especialidade" v-model="form.especialidade" required class="form-control"
                            placeholder="Cardiologia, Pediatria, etc." />
                    </div>

                    <div class="form-group">
                        <label for="status">
                            <i class="bi bi-circle-fill"></i> Status *
                        </label>
                        <select id="status" v-model="form.status" required class="form-control">
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
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
                            <i class="bi bi-envelope"></i> E-mail *
                        </label>
                        <input type="email" id="email" v-model="form.email" required class="form-control"
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
                        <label for="dataAdmissao">
                            <i class="bi bi-calendar-event"></i> Data de Admissão *
                        </label>
                        <input type="date" id="dataAdmissao" v-model="form.dataAdmissao" required class="form-control"
                            :max="dataAtual" />
                    </div>

                    <div class="form-group">
                        <label for="horarioTrabalho">
                            <i class="bi bi-clock"></i> Horário de Trabalho
                        </label>
                        <input type="text" id="horarioTrabalho" v-model="form.horarioTrabalho" class="form-control"
                            placeholder="Ex: 08:00 - 18:00" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="diasTrabalho">
                        <i class="bi bi-calendar-week"></i> Dias de Trabalho
                    </label>
                    <input type="text" id="diasTrabalho" v-model="form.diasTrabalho" class="form-control"
                        placeholder="Ex: Segunda a Sexta" />
                </div>

                <div class="form-group">
                    <label for="perfilPermissao">
                        <i class="bi bi-shield-check"></i> Perfil de Permissão *
                    </label>
                    <select id="perfilPermissao" v-model="form.perfilPermissao" required class="form-control">
                        <option value="">Selecione</option>
                        <option value="Médico">Médico</option>
                        <option value="Enfermagem">Enfermagem</option>
                        <option value="Recepção">Recepção</option>
                    </select>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">
                        Cancelar
                    </button>
                    <button type="submit" class="btn-primary">
                        <i class="bi bi-check-circle"></i>
                        {{ profissional ? 'Salvar Alterações' : 'Cadastrar Profissional' }}
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
                    Dados do Profissional
                </h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <div class="modal-body" v-if="profissional">
                <div class="info-section">
                    <h3><i class="bi bi-person-lines-fill"></i> Informações Pessoais</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label><i class="bi bi-person"></i> Nome</label>
                            <p>{{ profissional.nome }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-card-text"></i> CPF</label>
                            <p>{{ profissional.cpf }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-calendar"></i> Data de Nascimento</label>
                            <p>{{ formatarData(profissional.dataNascimento) }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-gender-ambiguous"></i> Gênero</label>
                            <p>{{ profissional.genero }}</p>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3><i class="bi bi-briefcase"></i> Informações Profissionais</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label><i class="bi bi-hospital"></i> Cargo</label>
                            <p>{{ profissional.cargo }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-award"></i> Registro</label>
                            <p>{{ profissional.registro }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-card-checklist"></i> Especialidade</label>
                            <p>{{ profissional.especialidade }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-circle-fill"></i> Status</label>
                            <p>
                                <span
                                    :class="['status-badge', profissional.status === 'Ativo' ? 'status-ativo' : 'status-inativo']">
                                    {{ profissional.status }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3><i class="bi bi-telephone"></i> Contato</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label><i class="bi bi-phone"></i> Telefone</label>
                            <p>{{ profissional.telefone }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-envelope"></i> E-mail</label>
                            <p>{{ profissional.email }}</p>
                        </div>
                        <div class="info-item full-width">
                            <label><i class="bi bi-geo-alt"></i> Endereço</label>
                            <p>{{ profissional.endereco || 'Não informado' }}</p>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3><i class="bi bi-clock-history"></i> Horários</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label><i class="bi bi-calendar-event"></i> Data de Admissão</label>
                            <p>{{ formatarData(profissional.dataAdmissao) }}</p>
                        </div>
                        <div class="info-item">
                            <label><i class="bi bi-clock"></i> Horário de Trabalho</label>
                            <p>{{ profissional.horarioTrabalho || 'Não informado' }}</p>
                        </div>
                        <div class="info-item full-width">
                            <label><i class="bi bi-calendar-week"></i> Dias de Trabalho</label>
                            <p>{{ profissional.diasTrabalho || 'Não informado' }}</p>
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
    name: 'ModalProfissional',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        profissional: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            form: {
                id: null,
                nome: '',
                cpf: '',
                cargo: '',
                registro: '',
                especialidade: '',
                status: 'Ativo',
                dataNascimento: '',
                genero: '',
                telefone: '',
                email: '',
                endereco: '',
                dataAdmissao: '',
                horarioTrabalho: '',
                diasTrabalho: '',
                perfilPermissao: ''
            }
        }
    },
    computed: {
        dataMaxima() {
            const hoje = new Date();
            hoje.setFullYear(hoje.getFullYear() - 18);
            return hoje.toISOString().split('T')[0];
        },
        dataAtual() {
            return new Date().toISOString().split('T')[0];
        }
    },
    watch: {
        profissional: {
            immediate: true,
            handler(novoProfissional) {
                if (novoProfissional) {
                    this.form = { ...novoProfissional };
                } else {
                    this.resetarForm();
                }
            }
        }
    },
    methods: {
        formatarCPF() {
            let valor = this.form.cpf.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            this.form.cpf = valor;
        },
        formatarTelefone() {
            let valor = this.form.telefone.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            this.form.telefone = valor;
        },
        formatarData(dataISO) {
            if (!dataISO) return 'Não informado';
            const data = new Date(dataISO);
            return data.toLocaleDateString('pt-BR');
        },
        salvar() {
            if (!this.form.nome || !this.form.cpf || !this.form.cargo || !this.form.registro ||
                !this.form.especialidade || !this.form.telefone || !this.form.email ||
                !this.form.dataNascimento || !this.form.dataAdmissao || !this.form.perfilPermissao) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            this.$emit('save', { ...this.form });
            this.resetarForm();
        },
        fechar() {
            this.$emit('close');
            this.resetarForm();
        },
        resetarForm() {
            this.form = {
                id: null,
                nome: '',
                cpf: '',
                cargo: '',
                registro: '',
                especialidade: '',
                status: 'Ativo',
                dataNascimento: '',
                genero: '',
                telefone: '',
                email: '',
                endereco: '',
                dataAdmissao: '',
                horarioTrabalho: '',
                diasTrabalho: '',
                perfilPermissao: ''
            };
        }
    }
}
</script>

<style scoped>
/* Modal Overlay */
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
    max-width: 800px;
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

.form-control:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
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

/* Visualização */
.info-section {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e0e0e0;
}

.info-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.info-section h3 {
    color: #333;
    font-size: 18px;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.info-section h3 i {
    color: #91415c;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.info-item.full-width {
    grid-column: 1 / -1;
}

.info-item label {
    font-weight: 600;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.info-item label i {
    color: #91415c;
}

.info-item p {
    margin: 0;
    color: #333;
    font-size: 15px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
}

/* Status Badge */
.status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
}

.status-ativo {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
}

.status-inativo {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
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
    .modal-content {
        margin: 0;
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .info-grid {
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
}
</style>
