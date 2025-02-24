const loc = require("../../support/elements/ConciliacaoVendas").Locator
import Parametros from "../cypress.env.json"

class ConciliacaoVendas {

    limparCamposObrigatorios(){
        cy.get(loc.Campo.PeriodoVendasDtInicial).should('be.visible').clear({force: true}).invoke('val').should('be.empty')
        cy.get(loc.Campo.PeriodoVendasDtFinal).should('be.visible').clear({force: true}).invoke('val').should('be.empty')
    }

    mudarParaTelaAntiga(){
        cy.get('[data-testid="ToggleOffIcon"] > path').should('be.visible').click();
        cy.contains('Seguir sem responder').should('be.visible').click();
        cy.contains('Conciliação Vendas - Pesquisar').should('be.visible').invoke('text').should('equal','Conciliação Vendas - Pesquisar');
    }

    realizarPesquisa(){
        //cy.contains('Carregando...').should('not.be.visible')
        cy.intercept('POST', `${Parametros.ConcilicaoVendas.rota_pesquisa_xhtml}`).as('Espera').then(() => {
            cy.get(loc.Opcao.Pesquisar).click({force: true})
            cy.wait('@Espera')
        })
    }

    validarPesquisaBemSucedida(){
        cy.contains('Carregando...').should('not.be.visible');
        cy.contains('Arquivo Operadora').should('be.visible')
    }

    validarConteudoDaPesquisa(parametro){
        switch (parametro) {
            case value:
                
                break;
        
            default:
                break;
        }
    }

    validarPesquisaMalSucedida(MensagemDeAviso){
        cy.get(loc.Texto.MensagemDeAviso).should('be.visible').invoke('text').and('eq', MensagemDeAviso)
        //cy.get(loc.Texto.MensagemRodapé).should('be.visible').invoke('text').and('eq', Parametros.Mensagens.nenhum_resultado_encontrado_para_essa_pesquisa)
    }

    utilizarPeriodoDeVendas(){
        cy.contains('Carregando...').should('not.be.visible')
        cy.get(loc.Campo.PeriodoVendasDtInicial).invoke('val').should('be.empty')
        cy.contains('Carregando...').should('not.be.visible')
        cy.get(loc.Campo.PeriodoVendasDtInicial).type(Parametros.Datas.dt_22_05_2023, {delay:50}, {force: true}).invoke('val').should('be.not.empty')
        cy.contains('Carregando...').should('not.be.visible')
        cy.get(loc.Campo.PeriodoVendasDtInicial).invoke('val').should('be.not.empty')
        cy.get(loc.Campo.PeriodoVendasDtFinal).invoke('val').should('be.empty')
        cy.contains('Carregando...').should('not.be.visible')
        cy.get(loc.Campo.PeriodoVendasDtFinal).type(Parametros.Datas.dt_22_05_2023, {delay:50}, {force: true})
        cy.contains('Carregando...').should('not.be.visible')
        cy.get(loc.Campo.PeriodoVendasDtFinal).invoke('val').should('be.not.empty')
    }

    utilizarCombo(parametro, valor){
        switch (parametro) {
            case 'Filiais':
                cy.get(loc.Opcao.LinkPesquisar(Parametros.Parametros.Combo.filiais)).click({force: true})
                cy.contains('Carregando...').should('be.visible')
                cy.get(loc.Campo.ModalFilialTitulo).should('have.text', Parametros.Mensagens.modal_filiais_pesquisar)
                cy.get(loc.Campo.ModalFilialPesquisa).click({ force: true })
                cy.contains('Carregando...').should('be.visible')
                cy.wait(1000);
                cy.get(loc.Campo.ModalFilialPesquisa).should('be.visible').type(valor)
                cy.wait(4000)
                cy.contains('Carregando...').should('be.not.visible')
                cy.get(loc.Opcao.ModalFilialSelecionarRegistro).click({multiple: true, force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalFilialAplicarSelecao).click(({ force: true }))
                break;
            
            case 'Estabelecimento':
                cy.get(loc.Opcao.LinkPesquisar(Parametros.Parametros.Combo.estabelecimento)).click({force: true})
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.wait(1000)
                cy.get(loc.Campo.ModalEstabelecimentoTitulo).should('have.text', Parametros.Mensagens.modal_estabelecimento_pesquisar)
                cy.get(loc.Campo.ModalEstabelecimentoPesquisa).click()
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Campo.ModalEstabelecimentoPesquisa).type(valor)
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalEstabelecimentoSelecionarRegistro).click({multiple: true, force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalEstabelecimentoAplicarSelecao).click()
                break;
            
            case 'Op. de Cartões':
                cy.get(loc.Opcao.LinkPesquisar(Parametros.Parametros.Combo.operadora_de_cartoes)).click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Campo.ModalOperadoraTitulo).should('have.text', Parametros.Mensagens.modal_operadora_pesquisar)
                cy.get(loc.Campo.ModalOperadoraPesquisa).click()
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Campo.ModalOperadoraPesquisa).type(valor)
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalOperadoraSelecionarRegistro).click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalOperadoraAplicarSelecao).click()
                break;

            case 'Bandeira':
                cy.get(loc.Opcao.LinkPesquisar(Parametros.Parametros.Combo.bandeira)).click({force: true})
                cy.wait(4000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.wait(4000)
                cy.get(loc.Campo.ModalBandeiraTitulo).should('have.text', Parametros.Mensagens.modal_bandeira_pesquisar)
                cy.get(loc.Campo.ModalBandeiraPesquisa).click()
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Campo.ModalBandeiraPesquisa).type(valor)
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalBandeiraSelecionarRegistro).click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalBandeiraAplicarSelecao).click()
                break;
            
            case 'Modo de Captura':
                cy.get(loc.Opcao.LinkPesquisar(Parametros.Parametros.Combo.modo_de_captura)).click({force: true})
                cy.contains('Carregando...').should('be.visible')
                cy.get(loc.Campo.ModalModoDeCapturaTitulo).should('have.text', Parametros.Mensagens.modal_modo_de_captura_pesquisar)
                cy.get(loc.Campo.ModalModoDeCapturaPesquisa, { timeout: 10000 }).should('exist').should('be.visible').click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Campo.ModalModoDeCapturaPesquisa).type(valor)
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalModoDeCapturaSelecionarRegistro).click({multiple: true, force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalModoDeCapturaAplicarSelecao).click()
                break;

            case 'Produto':
                cy.get(loc.Opcao.LinkPesquisar(Parametros.Parametros.Combo.produto)).click({force: true})
                cy.contains('Carregando...').should('be.visible')
                cy.get(loc.Campo.ModalProdutoTitulo).should('have.text', Parametros.Mensagens.modal_produto_pesquisar)
                cy.get(loc.Campo.ModalProdutoPesquisa).click({ force: true })
                cy.contains('Carregando...').should('be.visible')
                cy.get(loc.Campo.ModalProdutoPesquisa).type(valor)
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalProdutoSelecionarRegistro).click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.ModalProdutoAplicarSelecao).click()
                break;
        }
    }
    
    utilizarCaixaDePesquisa(parametro){
        switch (parametro) {
            case 'Nsu':
                cy.fixture('Demonst_Vendas_Dt_22_05_2023.json').then(($json) => {
                    cy.get(loc.Campo.Pesquisa(parametro)).first().type($json.Conciliadas.VendaMacro.Nsu, {force: true}).invoke('val').should('be.not.empty')
                })
                break;
        
            case 'Nsu Admin.':
                cy.fixture('Demonst_Vendas_Dt_22_05_2023.json').then(($json) => {
                    cy.get(loc.Campo.Pesquisa(parametro)).type($json.Conciliadas.VendaMacro.NsuAdmin).invoke('val').should('be.not.empty')
                })
                break;
            
            case 'Autorização':
                cy.fixture('Demonst_Vendas_Dt_22_05_2023.json').then(($json) => {
                    cy.get(loc.Campo.Pesquisa(parametro)).type($json.Conciliadas.VendaMacro.Autorizacao).invoke('val').should('be.not.empty')
                })
                break;
            
            case 'TID':
                cy.fixture('Demonst_Vendas_Dt_22_05_2023.json').then(($json) => {
                    cy.get(loc.Campo.Pesquisa(parametro)).type($json.NaoConciliadas.VendaMacro.Tid).invoke('val').should('be.not.empty')
                })
                break;

            case 'Valor Da Venda (R$)':
                cy.fixture('Demonst_Vendas_Dt_22_05_2023.json').then(($json) => {
                    cy.get(loc.Campo.ValorDaVenda).first().type($json.NaoConciliadas.VendaMacro.ValorDaVenda).invoke('val').should('be.not.empty')
                    cy.get(loc.Campo.ValorDaVenda).last().type($json.NaoConciliadas.VendaMacro.ValorDaVenda).invoke('val').should('be.not.empty')
                })
                break;
            
            case 'Observação':
                cy.fixture('DrogariaFtbGuageru_Vendas_Dt_01_09_2022.json').then(($json) => {
                    cy.get(loc.Campo.Pesquisa(parametro)).type($json.Conciliadas.VendaMacro.Observacao).invoke('val').should('be.not.empty')
                })
                break;
        }
    }

    utilizarCaixaDeSelecaoDropdown(parametro, valor){
        switch (parametro) {
            case 'Vendas':
                cy.get(".col-md-2 span:contains('Vendas') ~ .form-group > .form-control").select('CANCELADAS')
                break;
            
            case 'Todos':
                cy.get(".col-md-2 span:contains('Vendas') ~ .form-group > .form-control").select('TODOS')

            default:
                break;
        }
    }

}
export default new ConciliacaoVendas();