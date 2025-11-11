<template>
    <div class="perfil-container">
        <h1>
            <i class="bi bi-person-circle"></i>
            Meu Perfil
        </h1>

        <!-- Card Principal do Perfil -->
        <div class="card perfil-card">
            <div class="avatar">{{ usuario.iniciais }}</div>
            <h3>{{ usuario.nome }}</h3>
            <p>{{ usuario.email }}</p>
            <p><strong>Plano:</strong> {{ usuario.plano }}</p>
        </div>

        <!-- Abas de Informações -->
        <div class="card tabs-card">
            <div class="tabs-header">
                <button :class="['tab-btn', { active: abaAtiva === 'dados' }]" @click="abaAtiva = 'dados'">
                    <i class="bi bi-person"></i>
                    Dados Pessoais
                </button>
                <button :class="['tab-btn', { active: abaAtiva === 'profissional' }]"
                    @click="abaAtiva = 'profissional'">
                    <i class="bi bi-briefcase"></i>
                    Dados Profissionais
                </button>
                <button :class="['tab-btn', { active: abaAtiva === 'seguranca' }]" @click="abaAtiva = 'seguranca'">
                    <i class="bi bi-shield-lock"></i>
                    Segurança
                </button>
                <button :class="['tab-btn', { active: abaAtiva === 'preferencias' }]"
                    @click="abaAtiva = 'preferencias'">
                    <i class="bi bi-sliders"></i>
                    Preferências
                </button>
            </div>

            <div class="tabs-content">
                <!-- Aba: Dados Pessoais -->
                <div v-if="abaAtiva === 'dados'" class="tab-panel">
                    <form @submit.prevent="salvarDadosPessoais">
                        <h3><i class="bi bi-person-lines-fill"></i> Informações Pessoais</h3>

                        <div class="form-grid">
                            <div class="form-group">
                                <label><i class="bi bi-person"></i> Nome Completo *</label>
                                <input type="text" class="form-control" v-model="dadosPessoais.nome" required>
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-envelope"></i> Email *</label>
                                <input type="email" class="form-control" v-model="dadosPessoais.email" required>
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-telephone"></i> Telefone</label>
                                <input type="tel" class="form-control" v-model="dadosPessoais.telefone"
                                    @input="formatarTelefone" placeholder="(00) 00000-0000" maxlength="15">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-calendar"></i> Data de Nascimento</label>
                                <input type="date" class="form-control" v-model="dadosPessoais.dataNascimento">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-card-text"></i> CPF</label>
                                <input type="text" class="form-control" v-model="dadosPessoais.cpf" @input="formatarCPF"
                                    placeholder="000.000.000-00" maxlength="14">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-gender-ambiguous"></i> Gênero</label>
                                <select class="form-control" v-model="dadosPessoais.genero">
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                                </select>
                            </div>
                        </div>

                        <h3><i class="bi bi-geo-alt"></i> Endereço</h3>

                        <div class="form-grid">
                            <div class="form-group">
                                <label><i class="bi bi-mailbox"></i> CEP</label>
                                <input type="text" class="form-control" v-model="dadosPessoais.cep" @input="formatarCEP"
                                    placeholder="00000-000" maxlength="9">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-house"></i> Endereço</label>
                                <input type="text" class="form-control" v-model="dadosPessoais.endereco">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-building"></i> Cidade</label>
                                <input type="text" class="form-control" v-model="dadosPessoais.cidade">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-map"></i> Estado</label>
                                <input type="text" class="form-control" v-model="dadosPessoais.estado" maxlength="2"
                                    style="text-transform: uppercase;">
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn-primary">
                                <i class="bi bi-check-circle"></i>
                                Salvar Alterações
                            </button>
                            <button type="button" class="btn-secondary" @click="cancelarEdicao">
                                <i class="bi bi-x-circle"></i>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Aba: Dados Profissionais -->
                <div v-if="abaAtiva === 'profissional'" class="tab-panel">
                    <form @submit.prevent="salvarDadosProfissionais">
                        <h3><i class="bi bi-briefcase"></i> Informações Profissionais</h3>

                        <div class="form-grid">
                            <div class="form-group">
                                <label><i class="bi bi-hospital"></i> Cargo/Função *</label>
                                <input type="text" class="form-control" v-model="dadosProfissionais.cargo" required>
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-card-checklist"></i> Área de Atuação</label>
                                <input type="text" class="form-control" v-model="dadosProfissionais.especialidade">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-award"></i> Registro Profissional</label>
                                <input type="text" class="form-control" v-model="dadosProfissionais.registro"
                                    placeholder="Ex: CRA 12345-SP (se aplicável)">
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-calendar-event"></i> Data de Admissão</label>
                                <input type="date" class="form-control" v-model="dadosProfissionais.dataAdmissao">
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn-primary">
                                <i class="bi bi-check-circle"></i>
                                Salvar Alterações
                            </button>
                            <button type="button" class="btn-secondary" @click="cancelarEdicao">
                                <i class="bi bi-x-circle"></i>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Aba: Segurança -->
                <div v-if="abaAtiva === 'seguranca'" class="tab-panel">
                    <form @submit.prevent="alterarSenha">
                        <h3><i class="bi bi-key"></i> Alterar Senha</h3>

                        <div class="form-group">
                            <label><i class="bi bi-lock"></i> Senha Atual *</label>
                            <input type="password" class="form-control" v-model="seguranca.senhaAtual"
                                placeholder="Digite sua senha atual" required>
                        </div>

                        <div class="form-grid">
                            <div class="form-group">
                                <label><i class="bi bi-lock-fill"></i> Nova Senha *</label>
                                <input type="password" class="form-control" v-model="seguranca.novaSenha"
                                    placeholder="Digite a nova senha" required>
                            </div>
                            <div class="form-group">
                                <label><i class="bi bi-lock-fill"></i> Confirmar Nova Senha *</label>
                                <input type="password" class="form-control" v-model="seguranca.confirmarSenha"
                                    placeholder="Confirme a nova senha" required>
                            </div>
                        </div>

                        <div class="info-box">
                            <i class="bi bi-info-circle"></i>
                            <p>A senha deve ter no mínimo 8 caracteres</p>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn-primary">
                                <i class="bi bi-shield-check"></i>
                                Alterar Senha
                            </button>
                            <button type="button" class="btn-secondary" @click="cancelarEdicao">
                                <i class="bi bi-x-circle"></i>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Aba: Preferências -->
                <div v-if="abaAtiva === 'preferencias'" class="tab-panel">
                    <h3><i class="bi bi-bell"></i> Notificações</h3>

                    <div class="preferencia-item">
                        <div>
                            <h4><i class="bi bi-envelope"></i> Notificações por Email</h4>
                            <p>Receba atualizações importantes no seu email</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" v-model="preferencias.notificacoesEmail">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="preferencia-item">
                        <div>
                            <h4><i class="bi bi-app-indicator"></i> Notificações Push</h4>
                            <p>Receba alertas em tempo real no navegador</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" v-model="preferencias.notificacoesPush">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="form-actions">
                        <button class="btn-primary" @click="salvarPreferencias">
                            <i class="bi bi-check-circle"></i>
                            Salvar Preferências
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Perfil',
    props: {
        usuario: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            abaAtiva: 'dados',
            dadosPessoais: {
                nome: this.usuario.nome,
                email: this.usuario.email,
                telefone: this.usuario.telefone,
                dataNascimento: this.usuario.dataNascimento,
                cpf: this.usuario.cpf,
                genero: this.usuario.genero,
                cep: this.usuario.cep,
                endereco: this.usuario.endereco,
                cidade: this.usuario.cidade,
                estado: this.usuario.estado
            },
            dadosProfissionais: {
                cargo: this.usuario.dadosProfissionais.cargo,
                especialidade: this.usuario.dadosProfissionais.especialidade,
                registro: this.usuario.dadosProfissionais.registro,
                dataAdmissao: this.usuario.dadosProfissionais.dataAdmissao
            },
            seguranca: {
                senhaAtual: '',
                novaSenha: '',
                confirmarSenha: ''
            },
            preferencias: {
                notificacoesEmail: this.usuario.preferencias.notificacoesEmail,
                notificacoesPush: this.usuario.preferencias.notificacoesPush
            }
        }
    },
    methods: {
        formatarData(dataISO) {
            if (!dataISO) return '-';
            const data = new Date(dataISO);
            return data.toLocaleDateString('pt-BR');
        },
        formatarTelefone() {
            let valor = this.dadosPessoais.telefone.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
                valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            this.dadosPessoais.telefone = valor;
        },
        formatarCPF() {
            let valor = this.dadosPessoais.cpf.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            this.dadosPessoais.cpf = valor;
        },
        formatarCEP() {
            let valor = this.dadosPessoais.cep.replace(/\D/g, '');
            if (valor.length <= 8) {
                valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
            }
            this.dadosPessoais.cep = valor;
        },
        salvarDadosPessoais() {
            if (!this.dadosPessoais.nome || !this.dadosPessoais.email) {
                alert('Preencha os campos obrigatórios!');
                return;
            }
            alert('Dados pessoais salvos com sucesso!');
        },
        salvarDadosProfissionais() {
            if (!this.dadosProfissionais.cargo) {
                alert('Preencha o campo de cargo!');
                return;
            }
            alert('Dados profissionais salvos com sucesso!');
        },
        alterarSenha() {
            if (!this.seguranca.senhaAtual) {
                alert('Digite sua senha atual!');
                return;
            }
            if (this.seguranca.senhaAtual !== this.usuario.login.senha) {
                alert('Senha atual não corresponde!');
                return;
            }
            if (!this.seguranca.novaSenha || !this.seguranca.confirmarSenha) {
                alert('Preencha todos os campos de senha!');
                return;
            }
            if (this.seguranca.novaSenha !== this.seguranca.confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            if (this.seguranca.novaSenha.length < 8) {
                alert('A senha deve ter no mínimo 8 caracteres!');
                return;
            }
            if (this.seguranca.senhaAtual === this.seguranca.novaSenha) {
                alert('A nova senha deve ser diferente da senha atual!');
                return;
            }

            alert('Senha alterada com sucesso!');
            this.seguranca.senhaAtual = '';
            this.seguranca.novaSenha = '';
            this.seguranca.confirmarSenha = '';
        },
        salvarPreferencias() {
            alert('Preferências salvas com sucesso!');
            console.log('Salvando preferências:', this.preferencias);
        },
        cancelarEdicao() {
            if (confirm('Deseja descartar as alterações?')) {
                window.location.reload();
            }
        }
    }
}
</script>

<style scoped>
.perfil-container {
    padding: 20px;
    width: 100%;
}

.perfil-container h1 {
    color: #333333;
    margin-bottom: 20px;
    font-size: 28px;
}

/* Card do Perfil - Centralizado */
.card {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.perfil-card {
    text-align: center;
    max-width: 400px;
    margin: 0 auto 20px auto;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #91415c, #732f43);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
    margin: 0 auto 20px;
}

.perfil-card h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 24px;
}

.perfil-card p {
    margin: 4px 0;
    color: #666;
    font-size: 16px;
}

/* Abas */
.tabs-card {
    max-width: 900px;
    margin: 0 auto;
}

.tabs-header {
    display: flex;
    gap: 8px;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 24px;
    overflow-x: auto;
}

.tab-btn {
    background: transparent;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: #666;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.tab-btn:hover {
    color: #91415c;
    background: rgba(145, 65, 92, 0.05);
}

.tab-btn.active {
    color: #91415c;
    border-bottom-color: #91415c;
}

.tab-panel {
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tab-panel h3 {
    color: #333;
    font-size: 18px;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.tab-panel h3 i {
    color: #91415c;
}

/* Grid de Informações */
.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 32px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-weight: 600;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.form-group label i {
    color: #91415c;
}

.form-control {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
    box-sizing: border-box;
}

.form-control:focus {
    outline: none;
    border-color: #91415c;
    box-shadow: 0 0 0 3px rgba(145, 65, 92, 0.1);
}

select.form-control {
    cursor: pointer;
}

/* Botões de Ação */
.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 2px solid #f0f0f0;
}

.btn-primary {
    background-color: #91415c;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-primary:hover {
    background-color: #732f43;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(145, 65, 92, 0.3);
}

.btn-secondary {
    background-color: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-secondary:hover {
    background-color: #e9ecef;
    border-color: #91415c;
    color: #91415c;
}

.info-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: rgba(145, 65, 92, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(145, 65, 92, 0.1);
    margin-bottom: 24px;
}

.info-box i {
    font-size: 24px;
    color: #91415c;
}

.info-box p {
    margin: 0;
    color: #666;
    font-size: 14px;
}

/* Preferências */
.preferencia-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    margin-bottom: 12px;
}

.preferencia-item h4 {
    margin: 0 0 4px 0;
    color: #333;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.preferencia-item h4 i {
    color: #91415c;
}

.preferencia-item p {
    margin: 0;
    color: #666;
    font-size: 14px;
}

/* Switch Toggle */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #91415c;
}

input:checked+.slider:before {
    transform: translateX(26px);
}

/* Responsividade */
@media (max-width: 768px) {
    .perfil-container {
        padding: 10px;
    }

    .perfil-container h1 {
        font-size: 24px;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .tabs-header {
        overflow-x: auto;
    }

    .preferencia-item {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .form-actions {
        flex-direction: column;
    }

    .form-actions button {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .avatar {
        width: 80px;
        height: 80px;
        font-size: 32px;
    }

    .perfil-card h3 {
        font-size: 20px;
    }
}
</style>
