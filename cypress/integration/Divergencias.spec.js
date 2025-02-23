import Login from "../../support/pages/Login"
import SelecioneEmpresa from "../../support/pages/SelecioneEmpresa"
import Variavel from "../../support/cypress.env.json"


describe('Testes da tela Divergências', () => {
    beforeEach(() => {
        Login.acessarConciliador()
        Login.realizarlogin()
        cy.get('#formulario\\:inputId').type('36')
        cy.contains('Carregando...').should('be.not.visible')
        cy.get('#formulario\\:tblData2_data > .ui-widget-content > :nth-child(2)').should('have.text','IBYTE')
        cy.get('.ui-widget-content > :nth-child(2) > a').click()
        cy.get('#containerMenu > .menu > .vendas > a').realHover()
        cy.get(".sub-menu-itens li ul li a:eq(7)").click().realMouseDown()
    })
    it('Pesquisar por período (data inicial e final)', () => {
        cy.get('#formulario\\:j_idt1671InputDate').clear()
        cy.get('#formulario\\:j_idt1671InputDate').invoke('val').should('be.empty')
        cy.get('#formulario\\:j_idt1671InputDate').type('06/10/2022')
        cy.get('#formulario\\:j_idt1673InputDate').clear()
        cy.get('#formulario\\:j_idt1673InputDate').invoke('val').should('be.empty')
        cy.get('#formulario\\:j_idt1673InputDate').type('06/10/2022')
        cy.get('#formulario\\:j_idt1769').click()
        cy.contains('Carregando...').should('be.not.visible')
    })
    it('Pesquisar por NSU válida', () => {
        cy.get('#formulario\\:j_idt1671InputDate').clear()
        cy.get('#formulario\\:j_idt1671InputDate').invoke('val').should('be.empty')
        cy.get('#formulario\\:j_idt1673InputDate').clear()
        cy.get('#formulario\\:j_idt1673InputDate').invoke('val').should('be.empty')
        cy.get(':nth-child(3) > :nth-child(1) > .form-group > .form-control').type('1905')
        cy.get('#formulario\\:j_idt1769').click()
        cy.contains('Carregando...').should('be.not.visible')
    })
    it('Pesquisar por Dados Cliente válido', () => {
        cy.get('#formulario\\:j_idt1671InputDate').clear()
        cy.get('#formulario\\:j_idt1671InputDate').invoke('val').should('be.empty')
        cy.get('#formulario\\:j_idt1673InputDate').clear()
        cy.get('#formulario\\:j_idt1673InputDate').invoke('val').should('be.empty')
        cy.get(':nth-child(3) > div.col-md-2 > .form-group > .form-control').type('NPV;F45/102586')
        cy.get('#formulario\\:j_idt1769').click()
        cy.contains('Carregando...').should('be.not.visible')
    })
    it('Pesquisar por Valor válido', () => {
        cy.get('#formulario\\:j_idt1671InputDate').clear()
        cy.get('#formulario\\:j_idt1671InputDate').invoke('val').should('be.empty')
        cy.get('#formulario\\:j_idt1673InputDate').clear()
        cy.get('#formulario\\:j_idt1673InputDate').invoke('val').should('be.empty')
        cy.get('[name="formulario:j_idt1731"]').type('10,00')
        cy.get('[name="formulario:j_idt1733"]').type('10,00')
        cy.get('#formulario\\:j_idt1769').click()
        cy.contains('Carregando...').should('be.not.visible')
    })
    it('Pesquisar por Nome Arquivo válido', () => {
        cy.get('#formulario\\:j_idt1671InputDate').clear()
        cy.get('#formulario\\:j_idt1671InputDate').invoke('val').should('be.empty')
        cy.get('#formulario\\:j_idt1673InputDate').clear()
        cy.get('#formulario\\:j_idt1673InputDate').invoke('val').should('be.empty')
        cy.get(':nth-child(4) > div.col-md-2 > .form-group > .form-control').type('00036_2213069_IBYTE.TXT')
        cy.get('#formulario\\:j_idt1769').click()
        cy.contains('Carregando...').should('be.not.visible')
    })
})