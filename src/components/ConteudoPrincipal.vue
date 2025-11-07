<template>
  <div class="conteudo-principal">
    <!-- Seção de Dashboard (Sidebar) -->
    <Dashboard :usuario="usuario" v-if="sidebarSection === 'dashboard'" />

    <!-- Seção de Pacientes (Sidebar) -->
    <Pacientes v-if="sidebarSection === 'pacientes'" />

    <!-- Seção de Agendamento -->
    <Agendamento v-if="currentSection === 'agendamento'" />

    <!-- Seção de TeleConsulta -->
    <TeleConsulta v-if="currentSection === 'teleconsulta'" />

    <!-- Seção de Notificações -->
    <Notificacoes v-if="currentSection === 'notificacoes'" />

    <!-- Seção de Perfil -->
    <Perfil :usuario="usuario" v-if="currentSection === 'perfil'" />

    <!-- Seção de Profissionais (Sidebar) -->
    <Profissionais v-if="sidebarSection === 'profissionais'" />


    <!-- Seção de Prontuário (Sidebar) -->
    <ProntuarioEletronico v-if="sidebarSection === 'prontuario'" />

    <!-- Seção de Relatórios (Sidebar) -->
    <Relatorios v-if="sidebarSection === 'relatorios'" />

    <!-- Seção de Gerenciamento (Sidebar) -->
    <Gerenciamento :usuario="usuario" v-if="sidebarSection === 'gerenciamento'" />

    <!-- Seção de Segurança (Sidebar) -->
    <div v-if="sidebarSection === 'seguranca'" class="secao-seguranca">
      <h1>⭐ Segurança</h1>
      <div class="card">
        <p>Configurações de segurança em desenvolvimento...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from './Dashboard.vue';
import Pacientes from './Pacientes.vue';
import ProntuarioEletronico from './ProntuarioEletronico.vue';
import Agendamento from './Agendamento.vue';
import TeleConsulta from './TeleConsulta.vue';
import Notificacoes from './Notificacoes.vue';
import Perfil from './Perfil.vue';
import Profissionais from './Profissionais.vue';
import Relatorios from './Relatorios.vue';
import Gerenciamento from './Gerenciamento.vue';

export default {
  name: 'ConteudoPrincipal',
  components: {
    Dashboard,
    Pacientes,
    ProntuarioEletronico,
    Agendamento,
    TeleConsulta,
    Notificacoes,
    Perfil,
    Profissionais,
    Relatorios,
    Gerenciamento
  },
  props: {
    currentSection: {
      type: String,
    },
    sidebarSection: {
      type: String,
    },
    usuario: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.conteudo-principal {
  padding: 20px;
  width: 100%;
  margin: 0;
  min-height: calc(100vh - 70px);
  box-sizing: border-box;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 100%;
  max-width: none;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Estatísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-item h4 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 8px;
}

.stat-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Histórico */
.historico-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.historico-item:last-child {
  border-bottom: none;
}

.status-concluida {
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* Seções de Agendamento e TeleConsulta */
.consulta-item,
.teleconsulta-item {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.consulta-item p,
.teleconsulta-item p {
  margin: 0;
}

/* Botões */
.btn-primary,
.btn-success,
.btn-warning {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #91415c;
  color: white;
}

.btn-primary:hover {
  background: #732f43;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #1e7e34;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background: #e0a800;
}

/* Responsividade */
@media (max-width: 768px) {
  .conteudo-principal {
    padding: 10px;
  }

  .grid-layout {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .consulta-item,
  .teleconsulta-item {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  h1 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .conteudo-principal {
    padding: 8px;
  }

  .card {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>