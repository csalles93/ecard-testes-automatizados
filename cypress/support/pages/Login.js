const loc = require("../elements/Login").Locator
import Variavel from "../cypress.env.json"

class Login {

    realizarlogin(){
        cy.get(loc.Campo.Login).type(Variavel.Login.Acessos.usuario_valido)
        cy.get(loc.Campo.Senha).type(Variavel.Login.Acessos.senha_valida)
        cy.get(loc.Opcao.Entrar).click()
        cy.get(loc.Texto.pegarUsuarioLogado).contains(Variavel.Login.Acessos.nome_usuario_valido)
    }

    checarCamposObrigatorios(){
        cy.get(loc.Opcao.Entrar).click()
        cy.get(loc.Texto.MensagemCampoObrigatorio).first().invoke('text').should('eq', Variavel.Mensagens.campo_obrigatorio)
        //cy.get(loc.Texto.MensagemCampoObrigatorio).last().invoke('text').should('eq', Variavel.Mensagens.campo_obrigatorio)
    };

    realizarLoginSemSucesso(){
        cy.get(loc.Campo.Login).type(Variavel.Login.Acessos.usuario_valido)
        cy.get(loc.Campo.Senha).type(Variavel.Login.Acessos.senha_usuario_invalida)
        cy.get(loc.Opcao.Entrar).click()
        cy.get(loc.Texto.MensagemDeErroNoLogin).invoke('text').should('eq', Variavel.Mensagens.informacoes_inseridas_podem_estar_incorretas)
    }

    bloquearContaAoRealizarMaximoDeTentativas(){
        cy.get(loc.Campo.Login).type(Variavel.Login.Acessos.usuario_bloqueado)
        cy.get(loc.Campo.Senha).type(Variavel.Login.Acessos.senha_usuario_bloqueado)
        cy.get(loc.Opcao.Entrar).click()
        cy.get(loc.Texto.MensagemDeErroNoLogin).invoke('text').then((el) => {
            for (var i = 0; i <= 4; i++){
                if (el == Variavel.Mensagens.usuario_bloqueado_por_tentativas_de_acesso_sem_sucesso) {
                    console.log('CAIU NO IF')
                }
                else {
                    console.log('CAIU NO ELSE')
                    cy.get(loc.Campo.Login).type(Variavel.Login.Acessos.usuario_bloqueado)
                    cy.get(loc.Campo.Senha).type(Variavel.Login.Acessos.senha_usuario_bloqueado)
                    cy.get(loc.Opcao.Entrar).click()
                    }
                }
            cy.get(loc.Texto.MensagemDeErroNoLogin).invoke('text').should('eq', Variavel.Mensagens.usuario_bloqueado_por_tentativas_de_acesso_sem_sucesso)
        })
    }
}
export default new Login()