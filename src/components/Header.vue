<template>
  <header class="hospital-header">
    <div class="header-container">
      <!-- Logo/Brand -->
      <div class="brand">
        <img src="@/assets/icons/vidaPlus.jpg" alt="Logo VidaPlus" />
        <h2>VidaPlus</h2>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <div class="nav-group-left">
          <div class="nav-item agendamento" :class="{ active: activeSection === 'agendamento' }"
            @click="navigate('agendamento')">
            <i class="bi bi-calendar-check"></i>
            <span>Agendamento</span>
          </div>

          <div class="nav-item teleconsulta" :class="{ active: activeSection === 'teleconsulta' }"
            @click="navigate('teleconsulta')">
            <i class="bi bi-camera-video"></i>
            <span>Iniciar TeleConsulta</span>
          </div>
        </div>

        <div class="nav-group-right">
          <div class="nav-item notificacoes" :class="{ active: activeSection === 'notificacoes' }"
            @click="navigate('notificacoes')">
            <i class="bi bi-bell"></i>
            <span>Notificações</span>
          </div>

          <div class="nav-item perfil" :class="{ active: activeSection === 'perfil' }" @click="navigate('perfil')">
            <i class="bi bi-person-circle"></i>
            <span>Perfil</span>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Header',
  props: {
    activeSection: {
      type: String,
      required: true
    }
  },
  emits: ['navigate'],
  methods: {
    navigate(section) {
      this.$emit('navigate', section);
    }
  }
}
</script>

<style scoped>
.hospital-header {
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  height: 70px;
  padding: 0 30px;
}

.brand {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
}

.brand h2 {
  margin: 0;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 20px;
}

.nav-group-left {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  justify-content: center;
}

.nav-group-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item {
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
}

.nav-item i {
  font-size: 20px;
}

/* Agendamento maior e centralizado */
.agendamento {
  padding: 18px 100px;
  font-size: 18px;
}

.agendamento i {
  font-size: 24px;
}

.teleconsulta {
  padding: 15px 50px;
}

.teleconsulta i {
  font-size: 22px;
}

.agendamento span {
  font-size: 18px;
  font-weight: 600;
}

.nav-item span {
  color: #333333;
  font-weight: 500;
  font-size: 16px;
}

.nav-item:hover {
  background-color: #F8BBD0;
}

.nav-item:hover span {
  color: #333333;
}

.nav-item:hover i {
  color: #E91E63;
}

/* Estilo para item ativo */
.nav-item.active {
  background-color: #E91E63 !important;
  color: white;
}

.nav-item.active span,
.nav-item.active i {
  color: white !important;
  font-weight: 600;
}

.nav-item.active:hover {
  background-color: #C2185B !important;
}

/* Notificações com destaque */
.notificacoes i {
  color: #00BCD4;
}

.notificacoes:hover i {
  color: #00BCD4;
}

/* Responsividade */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .brand {
    margin-bottom: 10px;
  }

  .nav-menu {
    width: 100%;
    flex-direction: column;
    margin-left: 0;
    gap: 10px;
  }

  .nav-group-left,
  .nav-group-right {
    width: 100%;
    justify-content: center;
  }

  .nav-item {
    height: 50px;
    padding: 10px 20px;
  }

  .agendamento {
    padding: 10px 20px;
  }

  .nav-item span {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .nav-item {
    padding: 8px 15px;
  }

  .nav-item span {
    font-size: 12px;
  }

  .brand h2 {
    font-size: 20px;
  }
}
</style>