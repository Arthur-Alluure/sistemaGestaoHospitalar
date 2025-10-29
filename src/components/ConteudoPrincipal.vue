<template>
  <div class="conteudo-principal">
    <!-- Seção de Dashboard (Sidebar) -->
    <Dashboard :usuario="usuario" v-if="sidebarSection === 'dashboard'" />

    <!-- Seção de Pacientes (Sidebar) -->
    <Pacientes v-if="sidebarSection === 'pacientes'" />

    <!-- Seção de Agendamento -->
    <div v-if="currentSection === 'agendamento'" class="secao-agendamento">
      <h1>📅 Sistema de Agendamento</h1>
      <div class="grid-layout">
        <div class="card">
          <h3>Próximas Consultas</h3>
          <div class="consulta-item">
            <p><strong>Dr. Silva</strong> - Cardiologia</p>
            <p>Hoje, 14:30</p>
          </div>
          <div class="consulta-item">
            <p><strong>Dra. Santos</strong> - Dermatologia</p>
            <p>Amanhã, 09:00</p>
          </div>
          <button class="btn-primary">Novo Agendamento</button>
        </div>
        <div class="card">
          <h3>Estatísticas</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <h4>15</h4>
              <p>Consultas este mês</p>
            </div>
            <div class="stat-item">
              <h4>3</h4>
              <p>Pendentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de TeleConsulta -->
    <div v-if="currentSection === 'teleconsulta'" class="secao-teleconsulta">
      <h1>💻 TeleConsulta</h1>
      <div class="grid-layout">
        <div class="card">
          <h3>Consultas Online Disponíveis</h3>
          <div class="teleconsulta-item">
            <p><strong>Dr. Oliveira</strong> - Clínica Geral</p>
            <p>Disponível agora</p>
            <button class="btn-success">Iniciar Consulta</button>
          </div>
          <div class="teleconsulta-item">
            <p><strong>Dra. Costa</strong> - Pediatria</p>
            <p>Disponível em 30min</p>
            <button class="btn-primary">Agendar</button>
          </div>
        </div>
        <div class="card">
          <h3>Histórico de Consultas</h3>
          <div class="historico-item">
            <p><strong>Dr. Mendes</strong> - 25/10/2025</p>
            <span class="status-concluida">Concluída</span>
          </div>
          <div class="historico-item">
            <p><strong>Dra. Lima</strong> - 20/10/2025</p>
            <span class="status-concluida">Concluída</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Notificações -->
    <div v-if="currentSection === 'notificacoes'" class="secao-notificacoes">
      <h1>🔔 Notificações</h1>
      <div class="card">
        <div class="notificacao" v-for="notif in notificacoes" :key="notif.id">
          <div class="notificacao-icon">{{ notif.icon }}</div>
          <div class="notificacao-content">
            <h4>{{ notif.titulo }}</h4>
            <p>{{ notif.mensagem }}</p>
            <small>{{ notif.tempo }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Perfil -->
    <div v-if="currentSection === 'perfil'" class="secao-perfil">
      <h1>👤 Meu Perfil</h1>
      <div class="card perfil-card">
        <div class="avatar">{{ usuario.iniciais }}</div>
        <h3>{{ usuario.nome }}</h3>
        <p>{{ usuario.email }}</p>
        <p><strong>Plano:</strong> {{ usuario.plano }}</p>
        <button class="btn-primary">Editar Perfil</button>
      </div>
    </div>

    <!-- Seção de Pacientes (Sidebar) -->
    <Pacientes v-if="sidebarSection === 'pacientes'" />

    <!-- Seção de Profissionais (Sidebar) -->
    <div v-if="sidebarSection === 'profissionais'" class="secao-profissionais">
      <h1>👨‍⚕️ Profissionais</h1>
      <div class="card">
        <p>Gerenciamento de profissionais em desenvolvimento...</p>
      </div>
    </div>

    <!-- Seção de Telemedicina (Sidebar) -->
    <div v-if="sidebarSection === 'telemedicina'" class="secao-telemedicina">
      <h1>📹 Telemedicina</h1>
      <div class="card">
        <p>Sistema de telemedicina em desenvolvimento...</p>
      </div>
    </div>

    <!-- Seção de Prontuário (Sidebar) -->
    <ProntuarioEletronico v-if="sidebarSection === 'prontuario'" />

    <!-- Seção de Relatórios (Sidebar) -->
    <div v-if="sidebarSection === 'relatorios'" class="secao-relatorios">
      <h1>📊 Relatórios</h1>
      <div class="card">
        <p>Sistema de relatórios em desenvolvimento...</p>
      </div>
    </div>

    <!-- Seção de Permissões (Sidebar) -->
    <div v-if="sidebarSection === 'permissoes'" class="secao-permissoes">
      <h1>🔒 Permissões</h1>
      <div class="card">
        <p>Gerenciamento de permissões em desenvolvimento...</p>
      </div>
    </div>

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

export default {
  name: 'ConteudoPrincipal',
  components: {
    Dashboard,
    Pacientes,
    ProntuarioEletronico
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
  },
  data() {
    return {
      notificacoes: [
        {
          id: 1,
          icon: '📅',
          titulo: 'Consulta Agendada',
          mensagem: 'Sua consulta com Dr. Silva foi confirmada para hoje às 14:30',
          tempo: 'há 2 horas'
        },
        {
          id: 2,
          icon: '💊',
          titulo: 'Lembrete de Medicação',
          mensagem: 'Hora de tomar seu medicamento - Losartana 50mg',
          tempo: 'há 4 horas'
        },
        {
          id: 3,
          icon: '📋',
          titulo: 'Resultado de Exame',
          mensagem: 'Resultado do hemograma completo já está disponível',
          tempo: 'ontem'
        }
      ]
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

/* Seção de Notificações */
.notificacao {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.notificacao:hover {
  background-color: #f8f9fa;
}

.notificacao:last-child {
  border-bottom: none;
}

.notificacao-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.notificacao-content h4 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
}

.notificacao-content p {
  margin: 0 0 4px 0;
  color: #666;
  line-height: 1.4;
}

.notificacao-content small {
  color: #999;
  font-size: 12px;
}

/* Seção de Perfil */
.perfil-card {
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 20px;
}

/* Seções de Agendamento e TeleConsulta */
.consulta-item, .teleconsulta-item {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.consulta-item p, .teleconsulta-item p {
  margin: 0;
}

/* Botões */
.btn-primary, .btn-success, .btn-warning {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #91415c ;
  color: white;
}

.btn-primary:hover {
  background: #732f43 ;
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
  
  .consulta-item, .teleconsulta-item {
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