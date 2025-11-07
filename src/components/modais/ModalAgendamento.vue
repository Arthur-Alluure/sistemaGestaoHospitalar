<template>
    <!-- Modal de Novo/Editar Agendamento -->
    <div v-if="isOpen" class="modal-overlay" @click="fechar">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2>
                    <i class="bi bi-calendar-plus"></i>
                    {{ consulta ? 'Editar Agendamento' : 'Novo Agendamento' }}
                </h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <form @submit.prevent="salvar" class="modal-body">
                <div class="form-group">
                    <label for="paciente">
                        <i class="bi bi-person"></i> Paciente *
                    </label>
                    <select id="paciente" v-model="form.paciente" required class="form-control">
                        <option value="">Selecione um paciente</option>
                        <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.nome">
                            {{ paciente.nome }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="medico">
                        <i class="bi bi-person-badge"></i> Médico *
                    </label>
                    <select id="medico" v-model="form.medico" required class="form-control">
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

                <div class="form-row">
                    <div class="form-group">
                        <label for="data">
                            <i class="bi bi-calendar"></i> Data *
                        </label>
                        <input type="date" id="data" v-model="form.data" required :min="dataMinima"
                            class="form-control" />
                    </div>

                    <div class="form-group">
                        <label for="hora">
                            <i class="bi bi-clock"></i> Horário *
                        </label>
                        <select id="hora" v-model="form.hora" required class="form-control">
                            <option value="">Selecione</option>
                            <option v-for="hora in horariosDisponiveis" :key="hora" :value="hora">
                                {{ hora }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="observacoes">
                        <i class="bi bi-chat-left-text"></i> Observações
                    </label>
                    <textarea id="observacoes" v-model="form.observacoes" rows="3" class="form-control"
                        placeholder="Informações adicionais sobre a consulta..."></textarea>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">
                        Cancelar
                    </button>
                    <button type="submit" class="btn-primary">
                        <i class="bi bi-check-circle"></i>
                        {{ consulta ? 'Salvar Alterações' : 'Agendar Consulta' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalAgendamento',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        consulta: {
            type: Object,
            default: null
        },
        pacientes: {
            type: Array,
            default: () => []
        },
        medicos: {
            type: Array,
            default: () => []
        },
        horariosDisponiveis: {
            type: Array,
            default: () => [
                '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
            ]
        }
    },
    emits: ['close', 'save'],
    data() {
        return {
            form: {
                paciente: '',
                medico: '',
                data: '',
                hora: '',
                observacoes: ''
            }
        }
    },
    computed: {
        especialidadeSelecionada() {
            const medico = this.medicos.find(m => m.nome === this.form.medico);
            return medico ? medico.especialidade : '';
        },
        dataMinima() {
            const hoje = new Date();
            return hoje.toISOString().split('T')[0];
        }
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.preencherFormulario();
            }
        },
        consulta() {
            if (this.isOpen) {
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
            if (this.consulta) {
                this.form = {
                    paciente: this.consulta.paciente || '',
                    medico: this.consulta.medico || '',
                    data: this.converterDataParaInput(this.consulta.data) || '',
                    hora: this.consulta.hora || '',
                    observacoes: this.consulta.observacoes || ''
                };
            } else {
                this.resetarFormulario();
            }
        },
        resetarFormulario() {
            this.form = {
                paciente: '',
                medico: '',
                data: '',
                hora: '',
                observacoes: ''
            };
        },
        salvar() {
            // Validar campos obrigatórios
            if (!this.form.paciente || !this.form.medico || !this.form.data || !this.form.hora) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            this.$emit('save', { ...this.form });
            this.fechar();
        },
        converterDataParaInput(dataTexto) {
            if (!dataTexto) return '';

            const hoje = new Date();
            if (dataTexto === 'Hoje') {
                return hoje.toISOString().split('T')[0];
            } else if (dataTexto === 'Amanhã') {
                const amanha = new Date(hoje);
                amanha.setDate(amanha.getDate() + 1);
                return amanha.toISOString().split('T')[0];
            } else {
                // Formato DD/MM/YYYY para YYYY-MM-DD
                const partes = dataTexto.split('/');
                if (partes.length === 3) {
                    return `${partes[2]}-${partes[1]}-${partes[0]}`;
                }
                return dataTexto;
            }
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

.form-control:read-only {
    background-color: #f8f9fa;
    cursor: not-allowed;
}

textarea.form-control {
    resize: vertical;
    font-family: inherit;
}

/* Responsividade */
@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
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
