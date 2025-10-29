<template>
    <div class="pacientes-container">
        <h1><i class="bi bi-person"></i> Pacientes</h1>
        <div class="card">
          <div class="card-header">
            <h3>Lista de Pacientes</h3>
            <button class="btn-primary">
              <i class="bi bi-plus-circle"></i> Novo Paciente
            </button>
          </div>
          <table class="table table-striped">
            <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Gênero</th>
                  <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="paciente in pacientes" :key="paciente.id">
                  <td>{{ paciente.id }}</td>
                  <td>{{ paciente.nome }}</td>
                  <td>{{ paciente.idade }}</td>
                  <td>{{ paciente.genero }}</td>
                  <td>
                    <button class="btn-action btn-edit" title="Editar">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-action btn-view" title="Visualizar">
                      <i class="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Pacientes',
  data() {
    return {
      pacientes: [
        { id: 1, nome: 'João Silva', idade: 30, genero: 'Masculino' },
        { id: 2, nome: 'Maria Oliveira', idade: 25, genero: 'Feminino' },
        { id: 3, nome: 'Carlos Souza', idade: 40, genero: 'Masculino' },
      ]
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
  color: #E91E63;
}

.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #F8BBD0;
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
  border-bottom: 2px solid #F8BBD0;
}

.table td {
  padding: 12px;
  color: #333333;
  border-bottom: 1px solid #F5F5F5;
}

.table tbody tr:hover {
  background-color: #FFF5F8;
}

.btn-action {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  margin: 0 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-edit {
  color: #E91E63;
}

.btn-edit:hover {
  background-color: #F8BBD0;
}

.btn-view {
  color: #00BCD4;
}

.btn-view:hover {
  background-color: #E0F7FA;
}

.btn-action i {
  font-size: 16px;
}

/* Responsividade */
@media (max-width: 768px) {
  .pacientes-container {
    padding: 10px;
  }

  .card-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
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
}
</style>