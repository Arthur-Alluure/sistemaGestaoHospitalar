<template>
    <div v-if="isOpen" class="modal-overlay" @click="fechar">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2><i class="bi bi-capsule"></i> Nova Prescrição Médica</h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <form @submit.prevent="salvar" class="modal-body">
                <div class="form-group">
                    <label>Medicamento *</label>
                    <input type="text" v-model="form.medicamento" required class="form-control"
                        placeholder="Nome do medicamento" />
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Data da Prescrição *</label>
                        <input type="date" v-model="form.data" required class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Médico Responsável *</label>
                        <input type="text" v-model="form.medico" required class="form-control"
                            placeholder="Dr(a). Nome" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Dosagem *</label>
                        <input type="text" v-model="form.dosagem" required class="form-control"
                            placeholder="Ex: 500mg" />
                    </div>
                    <div class="form-group">
                        <label>Frequência *</label>
                        <input type="text" v-model="form.frequencia" required class="form-control"
                            placeholder="Ex: 2x ao dia" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Duração *</label>
                        <input type="text" v-model="form.duracao" required class="form-control"
                            placeholder="Ex: 7 dias" />
                    </div>
                    <div class="form-group">
                        <label>Status *</label>
                        <select v-model="form.status" required class="form-control">
                            <option value="">Selecione</option>
                            <option value="ativo">Ativo</option>
                            <option value="concluido">Concluído</option>
                            <option value="suspenso">Suspenso</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Observações</label>
                    <textarea v-model="form.observacoes" class="form-control" rows="3"
                        placeholder="Instruções adicionais para o paciente..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">Cancelar</button>
                    <button type="submit" class="btn-primary">
                        <i class="bi bi-check-circle"></i> Salvar Prescrição
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalPrescricao',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            form: {
                medicamento: '',
                data: '',
                medico: '',
                dosagem: '',
                frequencia: '',
                duracao: '',
                status: '',
                observacoes: ''
            }
        };
    },
    methods: {
        salvar() {
            this.$emit('save', { ...this.form });
            this.resetarForm();
        },
        fechar() {
            this.$emit('close');
            this.resetarForm();
        },
        resetarForm() {
            this.form = {
                medicamento: '',
                data: '',
                medico: '',
                dosagem: '',
                frequencia: '',
                duracao: '',
                status: '',
                observacoes: ''
            };
        }
    }
};
</script>

<style scoped>
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
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.modal-header h2 i {
    color: #E91E63;
}

.btn-close {
    background: transparent;
    border: none;
    font-size: 20px;
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

.form-group {
    margin-bottom: 20px;
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
    border-color: #E91E63;
    box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.form-control::placeholder {
    color: #999;
}

textarea.form-control {
    resize: vertical;
    font-family: inherit;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
}

.modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
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

.btn-secondary {
    padding: 10px 20px;
    border: 1px solid #ddd;
    background: white;
    color: #666;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: #f5f5f5;
    border-color: #ccc;
}

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
}
</style>
