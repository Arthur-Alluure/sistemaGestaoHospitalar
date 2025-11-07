<template>
    <div v-if="isOpen" class="modal-overlay" @click="fechar">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2><i class="bi bi-clock-history"></i> Novo Registro no Histórico</h2>
                <button class="btn-close" @click="fechar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <form @submit.prevent="salvar" class="modal-body">
                <div class="form-group">
                    <label>Tipo de Atendimento *</label>
                    <input type="text" v-model="form.tipo" required class="form-control"
                        placeholder="Ex: Consulta Cardiológica" />
                </div>
                <div class="form-group">
                    <label>Data *</label>
                    <input type="date" v-model="form.data" required class="form-control" />
                </div>
                <div class="form-group">
                    <label>Médico Responsável *</label>
                    <input type="text" v-model="form.medico" required class="form-control"
                        placeholder="Dr(a). Nome do Médico" />
                </div>
                <div class="form-group">
                    <label>Descrição do Atendimento *</label>
                    <textarea v-model="form.descricao" required class="form-control" rows="4"
                        placeholder="Descreva o atendimento realizado..."></textarea>
                </div>
                <div class="form-group">
                    <label>Tags (separadas por vírgula)</label>
                    <input type="text" v-model="form.tags" class="form-control"
                        placeholder="Ex: Cardiologia, Rotina, Urgência" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" @click="fechar">Cancelar</button>
                    <button type="submit" class="btn-primary">
                        <i class="bi bi-check-circle"></i> Salvar Registro
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalHistorico',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            form: {
                tipo: '',
                data: '',
                medico: '',
                descricao: '',
                tags: ''
            }
        };
    },
    methods: {
        salvar() {
            const tagsArray = this.form.tags ? this.form.tags.split(',').map(t => t.trim()) : [];

            const dados = {
                tipo: this.form.tipo,
                data: this.form.data,
                medico: this.form.medico,
                descricao: this.form.descricao,
                tags: tagsArray
            };

            this.$emit('save', dados);
            this.resetarForm();
        },
        fechar() {
            this.$emit('close');
            this.resetarForm();
        },
        resetarForm() {
            this.form = {
                tipo: '',
                data: '',
                medico: '',
                descricao: '',
                tags: ''
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
