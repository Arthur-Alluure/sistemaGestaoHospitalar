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

    <!-- Modal de Paciente -->
    <ModalPaciente :isOpen="modalAberto" :tipo="tipoModal" :paciente="pacienteSelecionado" @close="fecharModal"
      @save="salvarPaciente" />
  </div>
</template>

<script>
import ModalPaciente from './modais/ModalPaciente.vue';

export default {
  name: 'Pacientes',
  components: {
    ModalPaciente
  },
  data() {
    return {
      modalAberto: false,
      tipoModal: 'form', // 'form' ou 'view'
      pacienteSelecionado: null,
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
  methods: {
    abrirModalNovoPaciente() {
      this.tipoModal = 'form';
      this.pacienteSelecionado = null;
      this.modalAberto = true;
    },
    editarPaciente(paciente) {
      this.tipoModal = 'form';
      this.pacienteSelecionado = paciente;
      this.modalAberto = true;
    },
    visualizarPaciente(paciente) {
      this.tipoModal = 'view';
      this.pacienteSelecionado = paciente;
      this.modalAberto = true;
    },
    fecharModal() {
      this.modalAberto = false;
      this.pacienteSelecionado = null;
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
    salvarPaciente(dadosPaciente) {
      const idade = this.calcularIdade(dadosPaciente.dataNascimento);

      if (this.pacienteSelecionado) {
        // Editar paciente existente
        const index = this.pacientes.findIndex(p => p.id === this.pacienteSelecionado.id);
        if (index !== -1) {
          this.pacientes[index] = {
            ...this.pacientes[index],
            ...dadosPaciente,
            idade: idade
          };
        }
      } else {
        // Novo paciente
        const novoPaciente = {
          id: this.pacientes.length > 0 ? Math.max(...this.pacientes.map(p => p.id)) + 1 : 1,
          ...dadosPaciente,
          idade: idade
        };
        this.pacientes.push(novoPaciente);
      }
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
}
</style>
