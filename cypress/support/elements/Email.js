export default class Email {
    static pegarCampoSenha(){
        cy.get('.modal-body > :nth-child(11)').invoke('text')
    }
    static pegarCampoUsuario(){
        cy.get('.modal-body > :nth-child(9)').invoke('text')
    }
    static setarCampoSenha(){
        var campoSenha = this.pegarCampoSenha()
    }
    static setarCampoUsuario(){
        var campoUsuario = this.pegarCampoUsuario()
    }
    static btnPesquisar(){
        return cy.get('#formulario\\:j_idt1646')
    }
    static btnEmail(){
        return cy.get('#formulario\\:tblData\\:0\\:j_idt1711 > .imagem')
    }
    static clicarBtnPesquisar(){
        this.btnPesquisar().click()
    }
    static clicarBtnEmail(){
        this.btnEmail().click()
    }
    static testeSenha (){
        var a
    }
}