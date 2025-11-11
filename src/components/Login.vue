<template>
    <div id="login-container">
        <div class="login-box">
            <div class="login-brand">
                <img src="@/assets/icons/vidaPlus.jpg" alt="Logo VidaPlus" />
                <h2>VidaPlus</h2>
            </div>
            <p class="subtitle">Sistema de Gestão Hospitalar</p>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="usuarioInput">Usuário:</label>
                    <input type="text" id="usuarioInput" v-model="usuarioInput" required
                        placeholder="Digite seu usuário" />
                </div>
                <div class="form-group">
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" v-model="senha" required placeholder="Digite sua senha" />
                </div>
                <button type="submit" class="btn-login">Entrar</button>
            </form>
            <div class="login-footer">
                <div class="footer-divider"></div>
                <p class="footer-title">Desenvolvido por:</p>
                <p class="footer-name">Arthur Rodrigues Moreira</p>
                <div class="footer-links">
                    <a href="https://www.linkedin.com/in/arthur-moreira85" target="_blank" rel="noopener noreferrer"
                        title="LinkedIn">
                        <i class="bi bi-linkedin"></i>
                    </a>
                    <a href="https://github.com/Arthur-Alluure" target="_blank" rel="noopener noreferrer"
                        title="GitHub">
                        <i class="bi bi-github"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mockData from '../data/usuario.json';
export default {
    name: 'Login',
    data() {
        //tras dados de login do mockData ja preenchidos para facilitar a simulação do fluxo de login/aplicação
        return {
            usuarioInput: mockData.login.usuario,
            senha: mockData.login.senha
        };
    },
    methods: {
        handleLogin() {
            if (this.usuarioInput === mockData.login.usuario && this.senha === mockData.login.senha) {
                this.$emit('login-success');
            } else {
                alert('Usuário ou senha incorretos. Tente novamente.');
            }
        }
    }
};
</script>

<style scoped>
#login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #E91E63 0%, #F06292 100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

.login-box {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    animation: slideIn 0.5s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 15px;
}

.login-brand img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    object-fit: cover;
}

.login-brand h2 {
    margin: 0;
    color: #E91E63;
    font-size: 28px;
    font-weight: 700;
}

.subtitle {
    text-align: center;
    color: #666666;
    margin: 0 0 30px 0;
    font-size: 14px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333333;
    font-weight: 600;
    font-size: 14px;
}

.form-group input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #E91E63;
    box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
}

.btn-login {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #E91E63, #F06292);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}

.btn-login:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
}

.btn-login:active {
    transform: translateY(0);
}

/* Footer do Login */
.login-footer {
    margin-top: 30px;
    padding-top: 20px;
    text-align: center;
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
@media (max-width: 480px) {
    .login-box {
        margin: 20px;
        padding: 30px 25px;
    }

    .login-brand h2 {
        font-size: 24px;
    }

    .footer-links a {
        font-size: 18px;
    }
}
</style>