const loc = require('../elements/Menu').Locator

class Menu {
    acessarTelaUsuario(){
        cy.get(loc.Menu.Configuracoes).realHover()
        cy.get(loc.Menu.MenuAberto).should('be.visible')
        cy.contains(loc.SubMenu.Usuario).click().realMouseDown()
        cy.get(loc.Campo.TituloDaPagina).invoke('text').should('equal','Usuário - Pesquisar')

    }
    acessarTelaEmail(){
        cy.get(loc.Menu.Configuracoes).realHover()
        cy.get(loc.Menu.MenuAberto).should('be.visible')
        cy.contains(loc.SubMenu.Email).click().realMouseDown()
        cy.get(loc.Campo.TituloDaPagina).invoke('text').should('equal','Email - Pesquisar')

    }
    acessarTelaConsultaGeral(){
        cy.get(loc.Menu.Vendas).realHover()
        cy.get(loc.Menu.MenuAberto).should('be.visible')
        cy.contains(loc.SubMenu.ConsultaGeral).click().realMouseDown()
        cy.get(loc.Campo.TituloDaPagina).invoke('text').should('equal','Consulta Geral - Pesquisar')
    }
    acessarTelaConciliacaoVendas(){
        cy.get(loc.Menu.Vendas).click();
        cy.get(loc.Menu.MenuAberto).should('be.visible')
        cy.get(loc.SubMenu.ConciliacaoVendas).first().click().realMouseDown()
        cy.get(loc.Campo.TituloDaPagina).invoke('text').should('equal','Conciliação das Vendas')
    }
}
export default new Menu();