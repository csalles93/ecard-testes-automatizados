/// <reference types="cypress"/>

import Util from '../../support/Util'
import Login from "../../support/pages/Login"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('Realizando todos os testes funcionais da tela de Login', () => {
    // Executa antes de cada teste para garantir que o ambiente esteja pronto
    beforeEach(() => {
        Util.acessarConciliador() // Acessa a página inicial do sistema
    })

    it('Deve verificar campos obrigatórios', () => {
        // Testa se os campos obrigatórios são validados corretamente ao tentar logar sem preenchê-los
        Login.checarCamposObrigatorios()
    })

    it('Deve logar com sucesso', () => {
        // Testa um login válido com credenciais corretas
        Login.realizarlogin()
    })

    it('Deve tentar logar com credencial inválida', () => {
        // Testa um login com credenciais inválidas e verifica se o sistema exibe a mensagem de erro apropriada
        Login.realizarLoginSemSucesso()
    })
    it('Deve dar falha na tentativa de acesso levando ao bloqueio da conta', () => {
        // Testa o bloqueio da conta após o número máximo de tentativas inválidas
        Login.bloquearContaAoRealizarMaximoDeTentativas()
    })

})
