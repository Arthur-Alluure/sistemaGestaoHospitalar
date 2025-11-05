<template>
    <div class="pacientes-container">
        <h1><i class="bi bi-person"></i> Pacientes</h1>
        <div class="card">
          <div class="card-header">
            <h3>Lista de Pacientes</h3>
            <button class="btn-primary" @click="abrirModalNovoPaciente">
              <i class="bi bi-plus-circle"></i> Novo Paciente
            </button>
          </div>
          <table class="table table-striped">
            <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Idade</th>
                  <th>Gênero</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="paciente in pacientes" :key="paciente.id">
                  <td>{{ paciente.id }}</td>
                  <td>{{ paciente.nome }}</td>
                  <td>{{ paciente.cpf }}</td>
                  <td>{{ paciente.idade }}</td>
                  <td>{{ paciente.genero }}</td>
                  <td>{{ paciente.telefone }}</td>
                  <td>
                    <button class="btn-action btn-edit" @click="editarPaciente(paciente)" title="Editar">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-action btn-view" @click="visualizarPaciente(paciente)" title="Visualizar">
                      <i class="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
          <div v-if="pacientes.length === 0" class="empty-state">
            <i class="bi bi-person-x"></i>
            <p>Nenhum paciente cadastrado</p>
          </div>
        </div>

        <!-- Modal de Novo/Editar Paciente -->
        <div v-if="modalAberto" class="modal-overlay" @click="fecharModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h2>
                <i class="bi bi-person-plus"></i> 
                {{ pacienteEditando ? 'Editar Paciente' : 'Novo Paciente' }}
              </h2>
              <button class="btn-close" @click="fecharModal">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            
            <form @submit.prevent="salvarPaciente" class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label for="nome">
                    <i class="bi bi-person"></i> Nome Completo *
                  </label>
                  <input 
                    type="text" 
                    id="nome" 
                    v-model="novoPaciente.nome" 
                    required
                    class="form-control"
                    placeholder="Digite o nome completo"
                  />
                </div>

                <div class="form-group">
                  <label for="cpf">
                    <i class="bi bi-card-text"></i> CPF *
                  </label>
                  <input 
                    type="text" 
                    id="cpf" 
                    v-model="novoPaciente.cpf" 
                    required
                    class="form-control"
                    placeholder="000.000.000-00"
                    maxlength="14"
                    @input="formatarCPF"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="dataNascimento">
                    <i class="bi bi-calendar"></i> Data de Nascimento *
                  </label>
                  <input 
                    type="date" 
                    id="dataNascimento" 
                    v-model="novoPaciente.dataNascimento" 
                    required
                    class="form-control"
                    :max="dataMaxima"
                  />
                </div>

                <div class="form-group">
                  <label for="genero">
                    <i class="bi bi-gender-ambiguous"></i> Gênero *
                  </label>
                  <select 
                    id="genero" 
                    v-model="novoPaciente.genero" 
                    required
                    class="form-control"
                  >
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
                  <input 
                    type="text" 
                    id="telefone" 
                    v-model="novoPaciente.telefone" 
                    required
                    class="form-control"
                    placeholder="(00) 00000-0000"
                    maxlength="15"
                    @input="formatarTelefone"
                  />
                </div>

                <div class="form-group">
                  <label for="email">
                    <i class="bi bi-envelope"></i> E-mail
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="novoPaciente.email" 
                    class="form-control"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="endereco">
                  <i class="bi bi-geo-alt"></i> Endereço
                </label>
                <input 
                  type="text" 
                  id="endereco" 
                  v-model="novoPaciente.endereco" 
                  class="form-control"
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="convenio">
                    <i class="bi bi-hospital"></i> Convênio
                  </label>
                  <select 
                    id="convenio" 
                    v-model="novoPaciente.convenio" 
                    class="form-control"
                  >
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
                  <input 
                    type="text" 
                    id="numeroCarteira" 
                    v-model="novoPaciente.numeroCarteira" 
                    class="form-control"
                    placeholder="Número da carteirinha"
                    :disabled="!novoPaciente.convenio"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="observacoes">
                  <i class="bi bi-chat-left-text"></i> Observações
                </label>
                <textarea 
                  id="observacoes" 
                  v-model="novoPaciente.observacoes" 
                  rows="3"
                  class="form-control"
                  placeholder="Alergias, condições especiais, etc..."
                ></textarea>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-secondary" @click="fecharModal">
                  Cancelar
                </button>
                <button type="submit" class="btn-primary">
                  <i class="bi bi-check-circle"></i> 
                  {{ pacienteEditando ? 'Salvar Alterações' : 'Cadastrar Paciente' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal de Visualização -->
        <div v-if="modalVisualizacao" class="modal-overlay" @click="fecharModalVisualizacao">
          <div class="modal-content modal-visualizacao" @click.stop>
            <div class="modal-header">
              <h2>
                <i class="bi bi-person-badge"></i> 
                Dados do Paciente
              </h2>
              <button class="btn-close" @click="fecharModalVisualizacao">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div class="modal-body" v-if="pacienteVisualizando">
              <div class="info-grid">
                <div class="info-item">
                  <label><i class="bi bi-person"></i> Nome</label>
                  <p>{{ pacienteVisualizando.nome }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-card-text"></i> CPF</label>
                  <p>{{ pacienteVisualizando.cpf }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-calendar"></i> Data de Nascimento</label>
                  <p>{{ formatarData(pacienteVisualizando.dataNascimento) }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-hourglass"></i> Idade</label>
                  <p>{{ pacienteVisualizando.idade }} anos</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-gender-ambiguous"></i> Gênero</label>
                  <p>{{ pacienteVisualizando.genero }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-telephone"></i> Telefone</label>
                  <p>{{ pacienteVisualizando.telefone }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-envelope"></i> E-mail</label>
                  <p>{{ pacienteVisualizando.email || 'Não informado' }}</p>
                </div>
                <div class="info-item full-width">
                  <label><i class="bi bi-geo-alt"></i> Endereço</label>
                  <p>{{ pacienteVisualizando.endereco || 'Não informado' }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-hospital"></i> Convênio</label>
                  <p>{{ pacienteVisualizando.convenio || 'Particular' }}</p>
                </div>
                <div class="info-item">
                  <label><i class="bi bi-credit-card"></i> Carteirinha</label>
                  <p>{{ pacienteVisualizando.numeroCarteira || 'N/A' }}</p>
                </div>
                <div class="info-item full-width" v-if="pacienteVisualizando.observacoes">
                  <label><i class="bi bi-chat-left-text"></i> Observações</label>
                  <p>{{ pacienteVisualizando.observacoes }}</p>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-secondary" @click="fecharModalVisualizacao">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Pacientes',
  data() {
    return {
      modalAberto: false,
      modalVisualizacao: false,
      pacienteEditando: null,
      pacienteVisualizando: null,
      novoPaciente: {
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
      },
      pacientes: [
        { 
          id: 1, 
          nome: 'João Silva', 
          cpf: '123.456.789-00',
          dataNascimento: '1993-05-15',
          idade: 30, 
          genero: 'Masculino',
          telefone: '(11) 98765-4321',
          email: 'joao.silva@email.com',
          endereco: 'Rua das Flores, 123, Centro, São Paulo - SP',
          convenio: 'Unimed',
          numeroCarteira: '123456789'
        },
        { 
          id: 2, 
          nome: 'Maria Oliveira', 
          cpf: '987.654.321-00',
          dataNascimento: '1998-08-20',
          idade: 25, 
          genero: 'Feminino',
          telefone: '(11) 91234-5678',
          email: 'maria.oliveira@email.com',
          endereco: 'Av. Paulista, 456, Bela Vista, São Paulo - SP',
          convenio: 'Bradesco Saúde',
          numeroCarteira: '987654321'
        },
        { 
          id: 3, 
          nome: 'Carlos Souza', 
          cpf: '456.789.123-00',
          dataNascimento: '1983-12-10',
          idade: 40, 
          genero: 'Masculino',
          telefone: '(11) 99999-8888',
          email: 'carlos.souza@email.com',
          endereco: 'Rua Augusta, 789, Consolação, São Paulo - SP',
          convenio: '',
          numeroCarteira: ''
        },
      ]
    }
  },
  computed: {
    dataMaxima() {
      const hoje = new Date();
      return hoje.toISOString().split('T')[0];
    }
  },
  methods: {
    abrirModalNovoPaciente() {
      this.modalAberto = true;
      this.pacienteEditando = null;
      this.resetarFormulario();
    },
    fecharModal() {
      this.modalAberto = false;
      this.pacienteEditando = null;
      this.resetarFormulario();
    },
    fecharModalVisualizacao() {
      this.modalVisualizacao = false;
      this.pacienteVisualizando = null;
    },
    resetarFormulario() {
      this.novoPaciente = {
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
    calcularIdade(dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      
      return idade;
    },
    salvarPaciente() {
      // Validar campos obrigatórios
      if (!this.novoPaciente.nome || !this.novoPaciente.cpf || 
          !this.novoPaciente.dataNascimento || !this.novoPaciente.genero || 
          !this.novoPaciente.telefone) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
      }

      const idade = this.calcularIdade(this.novoPaciente.dataNascimento);

      if (this.pacienteEditando) {
        // Editar paciente existente
        const index = this.pacientes.findIndex(p => p.id === this.pacienteEditando.id);
        if (index !== -1) {
          this.pacientes[index] = {
            ...this.pacientes[index],
            ...this.novoPaciente,
            idade: idade
          };
        }
      } else {
        // Novo paciente
        const novoPacienteObj = {
          id: this.pacientes.length > 0 ? Math.max(...this.pacientes.map(p => p.id)) + 1 : 1,
          ...this.novoPaciente,
          idade: idade
        };
        this.pacientes.push(novoPacienteObj);
      }
      
      this.fecharModal();
    },
    editarPaciente(paciente) {
      this.pacienteEditando = paciente;
      this.novoPaciente = {
        nome: paciente.nome,
        cpf: paciente.cpf,
        dataNascimento: paciente.dataNascimento,
        genero: paciente.genero,
        telefone: paciente.telefone,
        email: paciente.email || '',
        endereco: paciente.endereco || '',
        convenio: paciente.convenio || '',
        numeroCarteira: paciente.numeroCarteira || '',
        observacoes: paciente.observacoes || ''
      };
      this.modalAberto = true;
    },
    visualizarPaciente(paciente) {
      this.pacienteVisualizando = paciente;
      this.modalVisualizacao = true;
    },
    formatarCPF(event) {
      let valor = event.target.value.replace(/\D/g, '');
      if (valor.length <= 11) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        this.novoPaciente.cpf = valor;
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
        this.novoPaciente.telefone = valor;
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
.pacientes-container {
  padding: 20px;
  width: 100%;
}

.pacientes-container h1 {
  color: #333333;
  margin-bottom: 20px;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pacientes-container h1 i {
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
  margin-bottom: 20px;
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

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table thead {
  background-color: #F5F5F5;
}

.table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333333;
  border-bottom: 2px solid #e0e0e0;
}

.table td {
  padding: 12px;
  color: #333333;
  border-bottom: 1px solid #f0f0f0;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.btn-action {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  margin: 0 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-edit {
  color: #007bff;
}

.btn-edit:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.btn-view {
  color: #28a745;
}

.btn-view:hover {
  background-color: rgba(40, 167, 69, 0.1);
}

.btn-delete {
  color: #dc3545;
}

.btn-delete:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

.btn-action i {
  font-size: 16px;
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

/* Responsividade */
@media (max-width: 768px) {
  .pacientes-container {
    padding: 10px;
  }

  .card-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .card-header .btn-primary {
    justify-content: center;
  }

  .table {
    font-size: 14px;
  }

  .table th,
  .table td {
    padding: 8px;
  }

  .form-row,
  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-item.full-width {
    grid-column: 1;
  }
}

@media (max-width: 480px) {
  .table {
    display: block;
    overflow-x: auto;
  }

  .table th,
  .table td {
    white-space: nowrap;
  }

  .pacientes-container h1 {
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
