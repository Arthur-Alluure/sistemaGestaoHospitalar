<template>
  <div class="agendamento-container">
    <h1><i class="bi bi-calendar-check"></i> Sistema de Agendamento</h1>
    
    <div class="grid-layout">
      <!-- Card de Próximas Consultas -->
      <div class="card">
        <div class="card-header">
          <h3>Próximas Consultas</h3>
          <button class="btn-primary" @click="abrirModalAgendamento">
            <i class="bi bi-plus-circle"></i> Novo Agendamento
          </button>
        </div>
        <div class="consultas-list">
          <div class="consulta-item" v-for="consulta in proximasConsultas" :key="consulta.id">
            <div class="consulta-info">
              <p class="consulta-medico"><strong>{{ consulta.medico }}</strong> - {{ consulta.especialidade }}</p>
              <p class="consulta-data">{{ consulta.data }}, {{ consulta.hora }}</p>
              <p class="consulta-paciente"><i class="bi bi-person"></i> {{ consulta.paciente }}</p>
            </div>
            <div class="consulta-actions">
              <button class="btn-action btn-edit" @click="editarConsulta(consulta)" title="Editar">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn-action btn-delete" @click="cancelarConsulta(consulta.id)" title="Cancelar">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div v-if="proximasConsultas.length === 0" class="empty-state">
            <i class="bi bi-calendar-x"></i>
            <p>Nenhuma consulta agendada</p>
          </div>
        </div>
      </div>

      <!-- Card de Estatísticas -->
      <div class="card">
        <h3>Estatísticas</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon consultas-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <div class="stat-content">
              <h4>{{ consultasMes }}</h4>
              <p>Consultas este mês</p>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon pendentes-icon">
              <i class="bi bi-clock-history"></i>
            </div>
            <div class="stat-content">
              <h4>{{ consultasPendentes }}</h4>
              <p>Pendentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Novo Agendamento -->
    <div v-if="modalAberto" class="modal-overlay" @click="fecharModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>
            <i class="bi bi-calendar-plus"></i> 
            {{ consultaEditando ? 'Editar Agendamento' : 'Novo Agendamento' }}
          </h2>
          <button class="btn-close" @click="fecharModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <form @submit.prevent="salvarAgendamento" class="modal-body">
          <div class="form-group">
            <label for="paciente">
              <i class="bi bi-person"></i> Paciente
            </label>
            <select 
              id="paciente" 
              v-model="novoAgendamento.paciente" 
              required
              class="form-control"
            >
              <option value="">Selecione um paciente</option>
              <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.nome">
                {{ paciente.nome }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="medico">
              <i class="bi bi-person-badge"></i> Médico
            </label>
            <select 
              id="medico" 
              v-model="novoAgendamento.medico" 
              required
              class="form-control"
            >
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
            <input 
              type="text" 
              id="especialidade" 
              v-model="especialidadeSelecionada" 
              readonly
              class="form-control"
              placeholder="Selecione um médico primeiro"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="data">
                <i class="bi bi-calendar"></i> Data
              </label>
              <input 
                type="date" 
                id="data" 
                v-model="novoAgendamento.data" 
                required
                :min="dataMinima"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="hora">
                <i class="bi bi-clock"></i> Horário
              </label>
              <select 
                id="hora" 
                v-model="novoAgendamento.hora" 
                required
                class="form-control"
              >
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
            <textarea 
              id="observacoes" 
              v-model="novoAgendamento.observacoes" 
              rows="3"
              class="form-control"
              placeholder="Informações adicionais sobre a consulta..."
            ></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="fecharModal">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              <i class="bi bi-check-circle"></i> 
              {{ consultaEditando ? 'Salvar Alterações' : 'Agendar Consulta' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Agendamento',
  data() {
    return {
      modalAberto: false,
      consultaEditando: null,
      novoAgendamento: {
        paciente: '',
        medico: '',
        data: '',
        hora: '',
        observacoes: ''
      },
      proximasConsultas: [
        {
          id: 1,
          paciente: 'João Silva',
          medico: 'Dr. Silva',
          especialidade: 'Cardiologia',
          data: 'Hoje',
          hora: '14:30'
        },
        {
          id: 2,
          paciente: 'Maria Oliveira',
          medico: 'Dra. Santos',
          especialidade: 'Dermatologia',
          data: 'Amanhã',
          hora: '09:00'
        }
      ],
      pacientes: [
        { id: 1, nome: 'João Silva' },
        { id: 2, nome: 'Maria Oliveira' },
        { id: 3, nome: 'Carlos Souza' },
        { id: 4, nome: 'Ana Costa' },
        { id: 5, nome: 'Pedro Santos' }
      ],
      medicos: [
        { id: 1, nome: 'Dr. Silva', especialidade: 'Cardiologia' },
        { id: 2, nome: 'Dra. Santos', especialidade: 'Dermatologia' },
        { id: 3, nome: 'Dr. Oliveira', especialidade: 'Clínica Geral' },
        { id: 4, nome: 'Dra. Costa', especialidade: 'Pediatria' },
        { id: 5, nome: 'Dr. Mendes', especialidade: 'Ortopedia' }
      ],
      horariosDisponiveis: [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
      ]
    }
  },
  computed: {
    consultasMes() {
      return this.proximasConsultas.length + 13;
    },
    consultasPendentes() {
      return this.proximasConsultas.length;
    },
    especialidadeSelecionada() {
      const medico = this.medicos.find(m => m.nome === this.novoAgendamento.medico);
      return medico ? medico.especialidade : '';
    },
    dataMinima() {
      const hoje = new Date();
      return hoje.toISOString().split('T')[0];
    }
  },
  methods: {
    abrirModalAgendamento() {
      this.modalAberto = true;
      this.consultaEditando = null;
      this.resetarFormulario();
    },
    fecharModal() {
      this.modalAberto = false;
      this.consultaEditando = null;
      this.resetarFormulario();
    },
    resetarFormulario() {
      this.novoAgendamento = {
        paciente: '',
        medico: '',
        data: '',
        hora: '',
        observacoes: ''
      };
    },
    salvarAgendamento() {
      // Validar campos obrigatórios
      if (!this.novoAgendamento.paciente || 
          !this.novoAgendamento.medico || 
          !this.novoAgendamento.data || 
          !this.novoAgendamento.hora) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
      }

      if (this.consultaEditando) {
        // Editar consulta existente
        const index = this.proximasConsultas.findIndex(c => c.id === this.consultaEditando.id);
        if (index !== -1) {
          const medicoObj = this.medicos.find(m => m.nome === this.novoAgendamento.medico);
          this.proximasConsultas[index] = {
            ...this.proximasConsultas[index],
            paciente: this.novoAgendamento.paciente,
            medico: this.novoAgendamento.medico,
            especialidade: medicoObj?.especialidade || '',
            data: this.formatarData(this.novoAgendamento.data),
            hora: this.novoAgendamento.hora
          };
        }
      } else {
        // Nova consulta
        const medicoObj = this.medicos.find(m => m.nome === this.novoAgendamento.medico);
        const novaConsulta = {
          id: Date.now(),
          paciente: this.novoAgendamento.paciente,
          medico: this.novoAgendamento.medico,
          especialidade: medicoObj?.especialidade || '',
          data: this.formatarData(this.novoAgendamento.data),
          hora: this.novoAgendamento.hora
        };
        this.proximasConsultas.push(novaConsulta);
      }
      
      this.fecharModal();
    },
    editarConsulta(consulta) {
      this.consultaEditando = consulta;
      this.novoAgendamento = {
        paciente: consulta.paciente,
        medico: consulta.medico,
        data: this.converterDataParaInput(consulta.data),
        hora: consulta.hora,
        observacoes: ''
      };
      this.modalAberto = true;
    },
    cancelarConsulta(id) {
      if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
        this.proximasConsultas = this.proximasConsultas.filter(c => c.id !== id);
      }
    },
    formatarData(data) {
      const dataObj = new Date(data + 'T00:00:00');
      const hoje = new Date();
      const amanha = new Date(hoje);
      amanha.setDate(amanha.getDate() + 1);
      
      if (dataObj.toDateString() === hoje.toDateString()) {
        return 'Hoje';
      } else if (dataObj.toDateString() === amanha.toDateString()) {
        return 'Amanhã';
      } else {
        return dataObj.toLocaleDateString('pt-BR');
      }
    },
    converterDataParaInput(dataTexto) {
      const hoje = new Date();
      if (dataTexto === 'Hoje') {
        return hoje.toISOString().split('T')[0];
      } else if (dataTexto === 'Amanhã') {
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        return amanha.toISOString().split('T')[0];
      } else {
        const partes = dataTexto.split('/');
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }
  }
}
</script>

<style scoped>
.agendamento-container {
  padding: 20px;
  width: 100%;
}

.agendamento-container h1 {
  color: #333333;
  margin-bottom: 20px;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.agendamento-container h1 i {
  color: #91415c;
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

/* Card */
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
  margin-bottom: 20px;
}

.card h3 {
  margin: 0 0 20px 0;
  color: #333333;
  font-size: 20px;
}

/* Lista de Consultas */
.consultas-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.consulta-item {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.consulta-item:hover {
  border-color: #91415c;
  box-shadow: 0 2px 8px rgba(145, 65, 92, 0.1);
}

.consulta-info {
  flex: 1;
}

.consulta-medico {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
}

.consulta-data {
  margin: 0 0 4px 0;
  color: #666;
  font-size: 14px;
}

.consulta-paciente {
  margin: 0;
  color: #999;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.consulta-actions {
  display: flex;
  gap: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-state i {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

/* Estatísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.consultas-icon {
  background: rgba(145, 65, 92, 0.1);
  color: #91415c;
}

.pendentes-icon {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.stat-content h4 {
  margin: 0 0 4px 0;
  font-size: 24px;
  color: #333;
}

.stat-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
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

.btn-action {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
}

.btn-edit {
  color: #007bff;
}

.btn-edit:hover {
  background: rgba(0, 123, 255, 0.1);
}

.btn-delete {
  color: #dc3545;
}

.btn-delete:hover {
  background: rgba(220, 53, 69, 0.1);
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
}

textarea.form-control {
  resize: vertical;
  font-family: inherit;
}

/* Responsividade */
@media (max-width: 768px) {
  .agendamento-container {
    padding: 10px;
  }
  
  .grid-layout {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .card-header .btn-primary {
    justify-content: center;
  }
  
  .consulta-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .consulta-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .agendamento-container h1 {
    font-size: 24px;
  }
  
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