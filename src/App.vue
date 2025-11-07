<template>
  <div id="app">
    <Header :active-section="conteudo" @navigate="navegarPara" />
    <div class="app-container">
      <Sidebar :active-item="sidebarItem" @select="selecionarItemSidebar" />
      <main>
        <ConteudoPrincipal :current-section="conteudo" :sidebar-section="sidebarItem" :usuario="usuario" />
      </main>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import ConteudoPrincipal from './components/ConteudoPrincipal.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    ConteudoPrincipal
  },
  data() {
    return {
      conteudo: null,
      sidebarItem: 'dashboard',
      usuario: {
        nome: 'Arthur Rodrigues Moreira',
        email: 'arthur@email.com',
        plano: 'Administrador',
        iniciais: 'AR'
      }
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
