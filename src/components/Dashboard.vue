<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <h1><i class="bi bi-speedometer2"></i> Dashboard</h1>
      <p class="welcome-message">Bem-vindo de volta, <strong>{{ usuario?.nome || 'Usuário' }}</strong></p>
    </div>

    <!-- Cards de Estatísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon pacientes-icon">
          <i class="bi bi-people-fill"></i>
        </div>
        <div class="stat-content">
          <h3>{{ totalPacientes }}</h3>
          <p>Total de Pacientes</p>
          <span class="stat-change positive">+12% este mês</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon consultas-icon">
          <i class="bi bi-calendar-check-fill"></i>
        </div>
        <div class="stat-content">
          <h3>{{ consultasHoje }}</h3>
          <p>Consultas Hoje</p>
          <span class="stat-change">{{ consultasPendentes }} pendentes</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon profissionais-icon">
          <i class="bi bi-person-badge-fill"></i>
        </div>
        <div class="stat-content">
          <h3>{{ profissionaisAtivos }}</h3>
          <p>Profissionais Ativos</p>
          <span class="stat-change positive">100% disponível</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon receita-icon">
          <i class="bi bi-currency-dollar"></i>
        </div>
        <div class="stat-content">
          <h3>R$ {{ receitaMensal.toLocaleString() }}</h3>
          <p>Receita do Mês</p>
          <span class="stat-change positive">+8% vs mês anterior</span>
        </div>
      </div>
    </div>

    <!-- Seção de Gráficos e Informações -->
    <div class="dashboard-grid">
      <!-- Próximas Consultas -->
      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-calendar-event"></i> Próximas Consultas</h3>
          <button class="btn-link">Ver todas</button>
        </div>
        <div class="consultas-list">
          <div class="consulta-item" v-for="consulta in proximasConsultas" :key="consulta.id">
            <div class="consulta-time">
              <span class="time">{{ consulta.hora }}</span>
              <span class="date">{{ consulta.data }}</span>
            </div>
            <div class="consulta-info">
              <h4>{{ consulta.paciente }}</h4>
              <p><i class="bi bi-person-badge"></i> {{ consulta.medico }}</p>
              <p><i class="bi bi-hospital"></i> {{ consulta.especialidade }}</p>
            </div>
            <div class="consulta-status" :class="consulta.status">
              {{ consulta.statusTexto }}
            </div>
          </div>
        </div>
      </div>

      <!-- Atividades Recentes -->
      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-activity"></i> Atividades Recentes</h3>
        </div>
        <div class="atividades-list">
          <div class="atividade-item" v-for="atividade in atividadesRecentes" :key="atividade.id">
            <div class="atividade-icon" :class="atividade.tipo">
              <i :class="atividade.icone"></i>
            </div>
            <div class="atividade-content">
              <p class="atividade-titulo">{{ atividade.titulo }}</p>
              <p class="atividade-descricao">{{ atividade.descricao }}</p>
              <span class="atividade-tempo">{{ atividade.tempo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráfico de Tendências -->
    <div class="card chart-card">
      <div class="card-header">
        <h3><i class="bi bi-graph-up"></i> Tendências de Atendimento</h3>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot consultas"></span> Consultas</span>
          <span class="legend-item"><span class="dot teleconsultas"></span> TeleConsultas</span>
        </div>
      </div>
      <div class="chart-placeholder">
        <p>📊 Gráfico de tendências (Em desenvolvimento)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    usuario: {
      type: Object,
      default: () => ({
        nome: 'Usuário',
        email: '',
        plano: '',
        iniciais: 'U'
      })
    }
  },
  data() {
    return {
      totalPacientes: 247,
      consultasHoje: 18,
      consultasPendentes: 5,
      profissionaisAtivos: 12,
      receitaMensal: 45750,
      proximasConsultas: [
        {
          id: 1,
          hora: '14:30',
          data: 'Hoje',
          paciente: 'Maria Silva',
          medico: 'Dr. João Santos',
          especialidade: 'Cardiologia',
          status: 'confirmada',
          statusTexto: 'Confirmada'
        },
        {
          id: 2,
          hora: '15:00',
          data: 'Hoje',
          paciente: 'Beatriz Souza',
          medico: 'Dra. Anna Clara Lopes',
          especialidade: 'Dermatologia',
          status: 'aguardando',
          statusTexto: 'Aguardando'
        },
        {
          id: 3,
          hora: '09:00',
          data: 'Amanhã',
          paciente: 'Pedro Mendes',
          medico: 'Dr. Paulo Lima',
          especialidade: 'Ortopedia',
          status: 'confirmada',
          statusTexto: 'Confirmada'
        }
      ],
      atividadesRecentes: [
        {
          id: 1,
          tipo: 'nova-consulta',
          icone: 'bi bi-calendar-plus',
          titulo: 'Nova consulta agendada',
          descricao: 'Maria Silva agendou consulta com Dr. João Santos',
          tempo: 'há 15 minutos'
        },
        {
          id: 2,
          tipo: 'paciente',
          icone: 'bi bi-person-plus',
          titulo: 'Novo paciente cadastrado',
          descricao: 'Luciana Ferreira foi cadastrada no sistema',
          tempo: 'há 1 hora'
        },
        {
          id: 3,
          tipo: 'exame',
          icone: 'bi bi-file-earmark-medical',
          titulo: 'Resultado de exame disponível',
          descricao: 'Hemograma completo de Carlos Oliveira',
          tempo: 'há 2 horas'
        },
        {
          id: 4,
          tipo: 'teleconsulta',
          icone: 'bi bi-camera-video',
          titulo: 'TeleConsulta realizada',
          descricao: 'Dra. Anna Clara Lopes atendeu 3 pacientes remotamente',
          tempo: 'há 3 horas'
        }
      ],
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  width: 100%;
}

.dashboard-container h1 {
  color: #333333;
  margin-bottom: 10px;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dashboard-container h1 i {
  color: #E91E63;
}

.welcome-section {
  margin-bottom: 30px;
}

.welcome-message {
  color: #666666;
  font-size: 16px;
  margin: 0;
  padding-left: 38px;
}

.welcome-message strong {
  color: #E91E63;
  font-weight: 600;
}

/* Cards de Estatísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #F8BBD0;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(233, 30, 99, 0.2);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
}

.pacientes-icon {
  background: linear-gradient(135deg, #E91E63, #C2185B);
}

.consultas-icon {
  background: linear-gradient(135deg, #00BCD4, #0097A7);
}

.profissionais-icon {
  background: linear-gradient(135deg, #4CAF50, #388E3C);
}

.receita-icon {
  background: linear-gradient(135deg, #FF9800, #F57C00);
}

.stat-content h3 {
  margin: 0 0 5px 0;
  font-size: 28px;
  color: #333333;
  font-weight: 700;
}

.stat-content p {
  margin: 0 0 8px 0;
  color: #666666;
  font-size: 14px;
}

.stat-change {
  font-size: 12px;
  color: #666666;
}

.stat-change.positive {
  color: #4CAF50;
  font-weight: 600;
}

/* Grid Principal */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
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
  padding-bottom: 15px;
  border-bottom: 2px solid #F5F5F5;
}

.card-header h3 {
  margin: 0;
  color: #333333;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-header h3 i {
  color: #E91E63;
}

.btn-link {
  background: none;
  border: none;
  color: #E91E63;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.btn-link:hover {
  color: #C2185B;
  text-decoration: underline;
}

/* Consultas */
.consultas-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.consulta-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #F5F5F5;
  border-radius: 8px;
  border-left: 4px solid #E91E63;
}

.consulta-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}

.consulta-time .time {
  font-size: 18px;
  font-weight: 700;
  color: #E91E63;
}

.consulta-time .date {
  font-size: 12px;
  color: #666666;
}

.consulta-info {
  flex: 1;
}

.consulta-info h4 {
  margin: 0 0 8px 0;
  color: #333333;
  font-size: 16px;
}

.consulta-info p {
  margin: 0 0 4px 0;
  color: #666666;
  font-size: 13px;
}

.consulta-info i {
  color: #E91E63;
  margin-right: 5px;
}

.consulta-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.consulta-status.confirmada {
  background: #E8F5E9;
  color: #4CAF50;
}

.consulta-status.aguardando {
  background: #FFF3E0;
  color: #FF9800;
}

/* Atividades */
.atividades-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.atividade-item {
  display: flex;
  gap: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid #F5F5F5;
}

.atividade-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.atividade-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
}

.atividade-icon.nova-consulta {
  background: #00BCD4;
}

.atividade-icon.paciente {
  background: #E91E63;
}

.atividade-icon.exame {
  background: #4CAF50;
}

.atividade-icon.teleconsulta {
  background: #FF9800;
}

.atividade-content {
  flex: 1;
}

.atividade-titulo {
  margin: 0 0 4px 0;
  color: #333333;
  font-weight: 600;
  font-size: 14px;
}

.atividade-descricao {
  margin: 0 0 6px 0;
  color: #666666;
  font-size: 13px;
}

.atividade-tempo {
  font-size: 12px;
  color: #999999;
}

/* Gráfico */
.chart-card {
  grid-column: 1 / -1;
}

.chart-legend {
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666666;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.consultas {
  background: #E91E63;
}

.dot.teleconsultas {
  background: #00BCD4;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  border-radius: 8px;
  color: #666666;
  font-size: 18px;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .consulta-item {
    flex-direction: column;
    text-align: center;
  }

  .chart-legend {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .dashboard-container h1 {
    font-size: 24px;
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
