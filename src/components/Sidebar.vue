<template>
    <aside class="sidebar">
        <nav class="sidebar-nav">
            <div class="sidebar-item" :class="{ active: activeItem === 'dashboard' }" @click="selectItem('dashboard')">
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </div>

            <div class="sidebar-item" :class="{ active: activeItem === 'pacientes' }" @click="selectItem('pacientes')">
                <i class="bi bi-person"></i>
                <span>Pacientes</span>
            </div>

            <div class="sidebar-item" :class="{ active: activeItem === 'profissionais' }"
                @click="selectItem('profissionais')">
                <i class="bi bi-people"></i>
                <span>Profissionais</span>
            </div>

            <div class="sidebar-item" :class="{ active: activeItem === 'prontuario' }"
                @click="selectItem('prontuario')">
                <i class="bi bi-file-medical"></i>
                <span>Prontuário</span>
            </div>

            <div class="sidebar-item" :class="{ active: activeItem === 'relatorios' }"
                @click="selectItem('relatorios')">
                <i class="bi bi-file-earmark-text"></i>
                <span>Relatórios</span>
            </div>

            <div class="sidebar-item" :class="{ active: activeItem === 'gerenciamento' }"
                @click="selectItem('gerenciamento')">
                <i class="bi bi-sliders"></i>
                <span>Gerenciamento</span>
            </div>

            <div class="sidebar-item" :class="{ active: activeItem === 'logout' }" @click="selectItem('logout')">
                <i class="bi bi-box-arrow-in-left"></i>
                <span>Sair</span>
            </div>
        </nav>

        <div class="sidebar-footer">
            <div class="footer-divider"></div>
            <p class="footer-title">Desenvolvido por:</p>
            <p class="footer-name">Arthur Rodrigues Moreira</p>
            <div class="footer-links">
                <a href="https://www.linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer"
                    title="LinkedIn">
                    <i class="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <i class="bi bi-github"></i>
                </a>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        activeItem: {
            type: String,
            default: 'dashboard'
        }
    },
    emits: ['select'],
    methods: {
        selectItem(item) {
            this.$emit('select', item);
        }
    }
}
</script>

<style scoped>
.sidebar {
    width: 200px;
    background-color: #F5F5F5;
    height: calc(100vh - 70px);
    position: sticky;
    top: 70px;
    left: 0;
    border-right: 1px solid #E0E0E0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    flex: 1;
}

.sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #333333;
    font-size: 15px;
    border-left: 3px solid transparent;
}

.sidebar-item i {
    font-size: 20px;
    color: #666666;
    transition: color 0.3s ease;
}

.sidebar-item span {
    font-weight: 500;
}

.sidebar-item:hover {
    background-color: #FFFFFF;
    border-left-color: #F8BBD0;
}

.sidebar-item:hover i {
    color: #E91E63;
}

.sidebar-item.active {
    background-color: #F8BBD0;
    border-left-color: #E91E63;
}

.sidebar-item.active i,
.sidebar-item.active span {
    color: #E91E63;
    font-weight: 600;
}

/* Footer */
.sidebar-footer {
    padding: 20px 15px;
    background-color: #FFFFFF;
    border-top: 2px solid #F8BBD0;
    margin-top: auto;
}

.footer-divider {
    height: 2px;
    background: linear-gradient(90deg, #E91E63, #F8BBD0);
    margin-bottom: 15px;
    border-radius: 2px;
}

.footer-title {
    font-size: 11px;
    color: #999999;
    margin: 0 0 5px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.footer-name {
    font-size: 13px;
    color: #333333;
    font-weight: 600;
    margin: 0 0 12px 0;
    line-height: 1.3;
}

.footer-links {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.footer-links a {
    color: #666666;
    font-size: 20px;
    transition: all 0.3s ease;
    text-decoration: none;
}

.footer-links a:hover {
    color: #E91E63;
    transform: translateY(-2px);
}

/* Responsividade */
@media (max-width: 1024px) {
    .sidebar {
        width: 80px;
    }

    .sidebar-item {
        flex-direction: column;
        gap: 5px;
        padding: 12px 8px;
        text-align: center;
    }

    .sidebar-item span {
        font-size: 11px;
        line-height: 1.2;
    }

    .sidebar-item i {
        font-size: 22px;
    }

    .sidebar-footer {
        padding: 15px 8px;
    }

    .footer-name {
        font-size: 10px;
        text-align: center;
    }

    .footer-title {
        font-size: 9px;
        text-align: center;
    }

    .footer-links {
        gap: 8px;
    }

    .footer-links a {
        font-size: 18px;
    }
}

@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: auto;
        max-height: 60px;
        position: sticky;
        top: 70px;
        border-right: none;
        border-bottom: 1px solid #E0E0E0;
        overflow-x: auto;
        overflow-y: hidden;
        flex-direction: row;
    }

    .sidebar-nav {
        flex-direction: row;
        padding: 0;
        min-width: max-content;
        flex: initial;
    }

    .sidebar-item {
        min-width: 90px;
        flex-direction: column;
        gap: 4px;
        padding: 10px 12px;
        border-left: none;
        border-bottom: 3px solid transparent;
        white-space: nowrap;
    }

    .sidebar-item span {
        font-size: 11px;
    }

    .sidebar-item i {
        font-size: 20px;
    }

    .sidebar-item:hover {
        border-left: none;
        border-bottom-color: #F8BBD0;
    }

    .sidebar-item.active {
        border-left: none;
        border-bottom-color: #E91E63;
    }

    .sidebar-footer {
        display: none;
    }
}

@media (max-width: 480px) {
    .sidebar {
        max-height: 65px;
    }

    .sidebar-item {
        min-width: 75px;
        padding: 8px 10px;
    }

    .sidebar-item span {
        font-size: 10px;
    }

    .sidebar-item i {
        font-size: 18px;
    }
}
</style>
