class Util {

    acessarConciliador(){
        cy.visit('https://eextrato.com.br/conciliador/pages/inicial/login-conciliador.xhtml;jsessionid')
    }
}

export default new Util();