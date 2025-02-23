export default class Usuario {
    static pegarTituloTela(){
        return cy.get('#formularioTopo\\:tituloPagina')
    }
    static pegarMsgDeSucessoCadastro(){
        return cy.get(':nth-child(2) > .ui-messages-info-summary')
    }
    static formDadosUsuario(){
        return cy.get('#formulario\\:j_idt1653_header > .ui-panel-title')
    }
    static formFiliais(){
        return cy.get('#formulario\\:j_idt1691_header > .ui-panel-title')
    }
    static formPerfil(){
        return cy.get('#formulario\\:j_idt1709_header > .ui-panel-title')
    }
    static campoGrupoEmpresa(){
        return cy.get('#formulario\\:grupoEmpresa')
    }
    static campoEmpresa(){
        return cy.get('#formulario\\:empresa')
    }
    static campoNome(){
        return cy.get('#formulario\\:nome')
    }
    static campoLogin(){
        return cy.get('#formulario\\:login')
    }
    static campoEmail(){
        return cy.get('#formulario\\:email')
    }
    static campoDdd(){
        return cy.get('#formulario\\:ddd')
    }
    static campoTelefone(){
        return cy.get('#formulario\\:telefone')
    }
    static comboFilial(){
        return cy.get('#formulario\\:listLojas > :nth-child(1) > .ui-widget-content')
    }
    static comboPerfil(){
        return cy.get('#formulario\\:j_idt1710 > :nth-child(1) > .ui-widget-content')
    }
    static mapearComponentes(){
        this.formDadosUsuario().invoke('text').should('equal','Dados do Usuário')
        this.formFiliais().invoke('text').should('equal', 'Filiais ( de )')
        this.formPerfil().invoke('text').should('equal', 'Perfil')
    }
    static digitarCampoNome(nome){
        return this.campoNome().type(nome)
    }
    static digitarCampoLogin(login){
        return this.campoLogin().type(login)
    }
    static digitarCampoEmail(email){
        return this.campoEmail().type(email)
    }
    static digitarCampoDdd(ddd){
        return this.campoDdd().type(ddd)
    }
    static digitarCampoTelefone(telefone){
        return this.campoTelefone().type(telefone)
    }
    static selecionarComboGrupoEmpresa(valor){
        this.campoGrupoEmpresa().select(valor)
    }
    static selecionarComboEmpresa(valor){
        this.campoEmpresa().select(valor)
    }
    static selecionarFilial(valor){
        this.comboFilial().contains(valor).dblclick()
    }
    static selecionarPerfil(valor){
        this.comboPerfil().contains(valor).dblclick()
    }
    static btnNovo(){
        return cy.get('#formulario\\:j_idt1721')
    }
    static btnPesquisar(){
        return cy.get('#formulario\\:j_idt1719')
    }
    static btnSalvar(){
        return cy.get('#formulario\\:j_idt1735')
    }
    static clicarBtnNovo(){
       return this.btnNovo().click()
    }
    static clicarBtnPesquisar(){
        return this.btnPesquisar.click()
    }
    static clicarBtnSalvar(){
        this.btnSalvar().click()
    }
    static esperarAjaxCarregar(){
        cy.contains('Carregando...').should('not.visible')
    }
    static pegarRequisicaoCadastroUsuario(){
       return cy.intercept('POST', '/conciliador-3/pages/cadastro/usuario/usuario.xhtml').as('cadastrarUsuario')
    }
    static aguardarRequisicaoTerminar(){
        this.pegarRequisicaoCadastroUsuario().then(() => {
            cy.wait('@cadastrarUsuario').its('response.statusCode').should('eq', 200)
        })
    }
}