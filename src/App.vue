<template>
  <div id="app">
    <!-- Tela de Login -->
    <Login v-if="!logado" @login-success="logado = true" />

    <!-- Aplicação Principal -->
    <template v-else>
      <Header :active-section="conteudo" @navigate="navegarPara" />
      <div class="app-container">
        <Sidebar :active-item="sidebarItem" @select="selecionarItemSidebar" @logout="realizarLogout" />
        <main>
          <ConteudoPrincipal :current-section="conteudo" :sidebar-section="sidebarItem" :usuario="usuario"
            @navigate="navegarPara" />
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import ConteudoPrincipal from './components/ConteudoPrincipal.vue';
import mockData from './data';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    ConteudoPrincipal,
    Login
  },
  data() {
    return {
      conteudo: null,
      logado: false,
      sidebarItem: 'dashboard',
      usuario: { ...mockData.usuario }
    }
  },
  methods: {
    navegarPara(section) {
      this.conteudo = section;
      this.sidebarItem = null; // Limpa a sidebar quando navega pelo header
    },
    selecionarItemSidebar(item) {
      this.sidebarItem = item;
      this.conteudo = null; // Limpa o header quando navega pela sidebar
    },
    realizarLogout() { // Reseta o estado para a tela de login
      this.logado = false;
      this.conteudo = null;
      this.sidebarItem = 'dashboard';
    }
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex: 1;
  width: 100%;
}

main {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

/* Responsividade */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
}
</style>
