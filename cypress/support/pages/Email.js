const emailElements = require('../elements/Email')

export default class Email {
    static buscarEmailDaSenhaDoNovoUsuario(){
        emailElements.clicarBtnPesquisar()
        emailElements.clicarBtnEmail()
        cy.get('#popupDetalheEmail_header_controls > a > .close')
    }
}