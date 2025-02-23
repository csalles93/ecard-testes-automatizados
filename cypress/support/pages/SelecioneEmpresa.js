const Locator = require('../elements/SelecioneEmpresa').Locator

class SelecioneEmpresa{
    
    selecionarEmpresaPeloNome(Nome){
        cy.get(Locator.Campo.NomeEmpresa).click().type(Nome, {delay:50})
        cy.contains('Carregando...').should('be.not.visible')
        cy.get(Locator.Opcao.LinkSelecionarEmpresa).should('be.visible')
        cy.get(Locator.Opcao.LinkSelecionarEmpresa).click()
    }

    selecionarEmpresaPeloId(Id){
        cy.get(Locator.Campo.IdEmpresa).click().type(Id, {delay:50})
        cy.contains('Carregando...').should('be.not.visible')
        cy.get(Locator.Opcao.LinkSelecionarEmpresa).should('be.visible')
        cy.get(Locator.Opcao.LinkSelecionarEmpresa).click()
    }

    selecionarEmpresaPeloCNPJ(Cnpj){
        cy.get(Locator.Campo.CnpjEmpresa).click().type(Cnpj, {delay:50})
        cy.contains('Carregando...').should('be.not.visible')
        cy.get(Locator.Opcao.LinkSelecionarEmpresa).should('be.visible')
        cy.get(Locator.Opcao.LinkSelecionarEmpresa).click()       
    }
}
export default new SelecioneEmpresa();