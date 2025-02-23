const loc = require("../elements/ConsultaGeral").Locator
import Variavel from "../cypress.env.json"

class ConsultaGeral {

    limparCamposObrigatorios(){
        cy.get(loc.Campo.PeriodoVendasDtInicial).should('be.visible').clear({force: true}).invoke('val').should('be.empty')
        cy.get(loc.Campo.PeriodoVendasDtFinal).should('be.visible').clear({force: true}).invoke('val').should('be.empty')
    }

    utilizarPeriodo(parametro){
        if (parametro === 'VENDA') {
            console.log('Pesquisando pelo o Período de Vendas')
            cy.get(loc.Campo.PeriodoVendasDtInicial).type(Variavel.Datas.dt_10_09_2022, {delay:50}, {force: true}).invoke('val').should('be.not.empty')
            cy.contains('Carregando...').should('not.be.visible')
            cy.get(loc.Campo.PeriodoVendasDtFinal).type(Variavel.Datas.dt_10_09_2022, {delay:50}, {force: true}).invoke('val').should('be.not.empty')

        } else if (parametro === 'PAGAMENTO'){
            console.log('Pesquisando pelo o Período de Pagamento')
            cy.get(loc.Campo.PeriodoPagamentoDtInicial).type(Variavel.Datas.dt_15_09_2022, {delay:50}, {force: true}).invoke('val').should('be.not.empty')
            cy.contains('Carregando...').should('not.be.visible')
            cy.get(loc.Campo.PeriodoPagamentoDtFinal).type(Variavel.Datas.dt_15_09_2022, {delay:50}, {force: true}).invoke('val').should('be.not.empty')
        }

        else if (parametro === 'CANCELAMENTO'){
            //Não implementado ainda
            console.log('Pesquisando pelo o Período de Cancelamento')
        }
    }

    realizarPesquisa(){
        cy.contains('Carregando...').should('not.be.visible')
        cy.intercept('POST', `${Variavel.ConsultaGeral.rota_pesquisa_xhtml}`).as('Espera').then(() => {
            cy.get(loc.Opcao.Pesquisar).click({force: true})
            cy.wait('@Espera')
        })
    }

    validarPesquisaBemSucedida(){
        cy.contains('Carregando...').should('not.be.visible')
        cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
    }

    validarPesquisaMalSucedida(MensagemDeAviso){
        cy.get(loc.Texto.MensagemDeAviso).should('be.visible').invoke('text').and('eq', MensagemDeAviso)
        cy.get(loc.Texto.MensagemRodapé).should('be.visible').invoke('text').and('eq', Variavel.Mensagens.nenhum_resultado_encontrado_para_essa_pesquisa)
    }
    

    utilizarCombo(parametro, quantidade, valor1, valor2){
        switch (parametro) {
            case 'Filiais':
                cy.get(loc.Opcao.LinkPesquisarFiliais).click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Texto.TituloPopupFilial).should('have.text', Variavel.Mensagens.modal_filiais_pesquisar)
                cy.get(loc.Campo.NomeFilialModalFilial).click()
                cy.contains('Carregando...').should('not.be.visible')
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                if (quantidade === 1) {
                    cy.get(loc.Campo.NomeFilialModalFilial).type(valor1)
                    cy.wait(1000)
                    cy.contains('Carregando...').should('not.be.visible')
                } else if (quantidade === 2) {
                    cy.get(loc.Campo.NomeFilialModalFilial).type(valor1)
                    cy.contains('Carregando...').should('not.be.visible')
                    cy.wait(1000)
                    cy.get(loc.Opcao.FilialHabilitadoParaMarcarNoModal).click({force: true})
                    cy.contains('Carregando...').should('not.be.visible')
                    cy.get(loc.Campo.NomeFilialModalFilial).clear()
                    cy.get(loc.Campo.NomeFilialModalFilial).type(valor2)
                    cy.wait(1000)
                    cy.contains('Carregando...').should('not.be.visible')
                }
                cy.get(loc.Opcao.FilialHabilitadoParaMarcarNoModal).check({force: true}, { multiple: true })
                cy.get(loc.Opcao.AplicarSelecaoModalFilial).click()
                break;
        
            case 'Op. de Cartões':
                cy.get(loc.Opcao.LinkPesquisarOperadora).click()
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Campo.NomeRedeModalFilial).type(valor1)
                cy.wait(1000)
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.OperadoraHabilitadaParaMarcarNoModal).click({force: true})
                cy.contains('Carregando...').should('not.be.visible')
                cy.get(loc.Opcao.AplicarSelecaoModalOperadora).click()
                cy.contains('Carregando...').should('not.be.visible')
                break;

            default:
                break;
        }
    }

    utilizarNsuAutorizacaoOuAmbos(parametro){
        switch (parametro) {
            case 'Nsu':
                cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_nsu_na_tabela)).invoke('text').then(($valor) => {
                    if ($valor != ''){
                        console.log('VALIDOU CORRETAMENTE O NSU')
                        cy.get(loc.Campo.Nsu).type($valor)
                        cy.get(loc.Campo.PeriodoVendasDtInicial).invoke('val').then(($DtInicialVenda) => {
                            if($DtInicialVenda!= ''){
                                console.log('LIMPANDO O PERÍODO DA VENDA')
                                cy.get(loc.Campo.PeriodoVendasDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoVendasDtFinal).clear({force: true})                        
                            }     
            
                            else{
                                console.log('LIMPANDO O PERÍODO DE PAGAMENTO')
                                cy.get(loc.Campo.PeriodoPagamentoDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoPagamentoDtFinal).clear({force: true})
                            }
                        })
        
                    } else {
                        console.log('NÃO VALIDOU O NSU CORRETAMENTE')   
                    }
                  })
                
                break;
                  
            case 'Autorizacao':
                cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_autorizacao_na_tabela)).invoke('text').then(($valor) => {
                    if ($valor != ''){
                        console.log('VALIDOU CORRETAMENTE A AUTORIZAÇÃO')
                        cy.get(loc.Campo.Autorizacao).type($valor)
                        cy.get(loc.Campo.PeriodoVendasDtInicial).invoke('val').then(($DtInicialVenda) => {
                            if($DtInicialVenda!= ''){
                                console.log('LIMPANDO O PERÍODO DA VENDA')
                                cy.get(loc.Campo.PeriodoVendasDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoVendasDtFinal).clear({force: true})                        
                            }     
        
                            else{
                                console.log('LIMPANDO O PERÍODO DE PAGAMENTO')
                                cy.get(loc.Campo.PeriodoPagamentoDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoPagamentoDtFinal).clear({force: true})
                            }
                        })
                        cy.get(loc.Opcao.Pesquisar).should('be.visible').click({force: true})
        
                    } else {
                        console.log('NÃO VALIDOU A AUTORIZAÇÃO CORRETAMENTE')   
                    }
                  })
                break;

            default:
                cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_nsu_na_tabela)).invoke('text').then(($valor) => {
                    if ($valor != ''){
                        console.log('VALIDOU CORRETAMENTE O NSU')
                        cy.get(loc.Campo.Nsu).type($valor)
                        cy.get(loc.Campo.PeriodoVendasDtInicial).invoke('val').then(($DtInicialVenda) => {
                            if($DtInicialVenda!= ''){
                                console.log('LIMPANDO O PERÍODO DA VENDA')
                                cy.get(loc.Campo.PeriodoVendasDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoVendasDtFinal).clear({force: true})                        
                            }     
            
                            else{
                                console.log('LIMPANDO O PERÍODO DE PAGAMENTO')
                                cy.get(loc.Campo.PeriodoPagamentoDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoPagamentoDtFinal).clear({force: true})
                            }
                        })
        
                    } else {
                        console.log('NÃO VALIDOU O NSU CORRETAMENTE')   
                    }
                  })
                  cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_autorizacao_na_tabela)).invoke('text').then(($valor) => {
                    if ($valor != ''){
                        console.log('VALIDOU CORRETAMENTE A AUTORIZAÇÃO')
                        cy.get(loc.Campo.Autorizacao).type($valor)
                        cy.get(loc.Campo.PeriodoVendasDtInicial).invoke('val').then(($DtInicialVenda) => {
                            if($DtInicialVenda!= ''){
                                console.log('LIMPANDO O PERÍODO DA VENDA')
                                cy.get(loc.Campo.PeriodoVendasDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoVendasDtFinal).clear({force: true})                        
                            }     
            
                            else{
                                console.log('LIMPANDO O PERÍODO DE PAGAMENTO')
                                cy.get(loc.Campo.PeriodoPagamentoDtInicial).clear({force: true})
                                cy.get(loc.Campo.PeriodoPagamentoDtFinal).clear({force: true})
                            }
                        })
                        cy.get(loc.Opcao.Pesquisar).should('be.visible').click({force: true})
        
                    } else {
                        console.log('NÃO VALIDOU A AUTORIZAÇÃO CORRETAMENTE')   
                    }
                  })
                break;
            }
        }

    utilizarDataInicialMaiorDoqueFinal(parametro){
        if (parametro === 'VENDA') {
            console.log('Prosseguindo com Período de Vendas')  
            cy.get(loc.Campo.PeriodoVendasDtInicial).clear()
            cy.contains('Carregando...').should('not.be.visible')
            cy.get(loc.Campo.PeriodoVendasDtInicial).type(Variavel.Datas.dt_02_09_2022)
            cy.get(loc.Campo.PeriodoVendasDtFinal).clear()
            cy.contains('Carregando...').should('not.be.visible')
            cy.get(loc.Campo.PeriodoVendasDtFinal).type(Variavel.Datas.dt_01_09_2022)
        }
        else if (parametro === 'PAGAMENTO'){
            console.log('Prosseguindo com Período de Pagamento')
            cy.get(loc.Campo.PeriodoVendasDtInicial).clear()
            cy.get(loc.Campo.PeriodoVendasDtFinal).clear()
            cy.get(loc.Campo.PeriodoPagamentoDtInicial).type(Variavel.Datas.dt_02_09_2022)
            cy.get(loc.Campo.PeriodoPagamentoDtFinal).type(Variavel.Datas.dt_01_09_2022)
        }
        else{
            console.log('Prosseguindo com Período de Cancelamento')
            cy.get(loc.Campo.PeriodoVendasDtInicial).clear()
            cy.get(loc.Campo.PeriodoVendasDtFinal).clear()
            cy.get(loc.Campo.PeriodoCancelamentoDtInicial).type(Variavel.Datas.dt_02_09_2022)
            cy.get(loc.Campo.PeriodoCancelamentoDtFinal).type(Variavel.Datas.dt_01_09_2022)
        }
    }

    utilizarCaixaDePesquisa(parametro){
        switch (parametro) {
            case 'Número Do Cartao':
                cy.get(loc.Campo.PeriodoVendasDtInicial).clear().type(Variavel.Datas.dt_01_09_2022)
                cy.get(loc.Campo.PeriodoVendasDtFinal).clear().type(Variavel.Datas.dt_02_09_2022)
                cy.fixture('Ibyte_Vendas_Dt_01_09_2022.json').then(($json) => {
                    cy.get(loc.Campo.NumeroDoCartao).type($json.NaoConciliadas.VendaMacro.NumeroDoCartao, {force: true})
                    cy.get(loc.Opcao.Pesquisar).click({force: true})
                    cy.contains('Carregando...').should('not.be.visible')
                    cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
                    cy.get(loc.Texto.ListaTabelaResultados).then(($lista) => {
                        expect($lista).to.have.length(1)
                        cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_numero_do_cartao_na_tabela)).should('have.text', $json.NaoConciliadas.VendaMacro.NumeroDoCartao)
                    })
                })
                break;

            case 'TID':
                cy.get(loc.Campo.PeriodoVendasDtInicial).clear().type(Variavel.Datas.dt_01_09_2022)
                cy.get(loc.Campo.PeriodoVendasDtFinal).clear().type(Variavel.Datas.dt_02_09_2022)
                cy.fixture('Ibyte_Vendas_Dt_01_09_2022.json').then(($json) => {
                    cy.get(loc.Campo.Tid).type($json.NaoConciliadas.VendaMacro.Tid, {force: true})
                    cy.get(loc.Opcao.Pesquisar).click({force: true})
                    cy.contains('Carregando...').should('not.be.visible')
                    cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
                    cy.get(loc.Texto.ListaTabelaResultados).then(($lista) => {
                        expect($lista).to.have.length(1)
                        cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_tid_na_tabela)).should('have.text', $json.NaoConciliadas.VendaMacro.Tid)
                    })
                })
                break;

                case 'Lote':
                    cy.get(loc.Campo.PeriodoVendasDtInicial).clear().type(Variavel.Datas.dt_01_09_2022)
                    cy.get(loc.Campo.PeriodoVendasDtFinal).clear().type(Variavel.Datas.dt_02_09_2022)
                    cy.fixture('Ibyte_Vendas_Dt_01_09_2022.json').then(($json) => {
                        cy.get(loc.Campo.Lote).type($json.NaoConciliadas.VendaMacro.Lote, {force: true})
                        cy.get(loc.Opcao.Pesquisar).click({force: true})
                        cy.contains('Carregando...').should('not.be.visible')
                        cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
                        cy.get(loc.Texto.ListaTabelaResultados).then(($lista) => {
                            expect($lista).to.have.length(1)
                            cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_lote_na_tabela)).should('have.text', $json.NaoConciliadas.VendaMacro.Lote)
                        })
                    })
                break;

                case 'Valor Da Venda (R$)':
                    cy.get(loc.Campo.PeriodoVendasDtInicial).clear().type(Variavel.Datas.dt_01_09_2022)
                    cy.get(loc.Campo.PeriodoVendasDtFinal).clear().type(Variavel.Datas.dt_02_09_2022)
                    cy.fixture('Ibyte_Vendas_Dt_01_09_2022.json').then(($json) => {
                        cy.get(loc.Campo.ValorVendaInicial).type($json.NaoConciliadas.VendaMacro.ValorDaVenda, {force: true})
                        cy.get(loc.Campo.ValorVendaFinal).type($json.NaoConciliadas.VendaMacro.ValorDaVenda, {force: true})
                        cy.get(loc.Opcao.Pesquisar).click({force: true})
                        cy.contains('Carregando...').should('not.be.visible')
                        cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
                        cy.get(loc.Texto.ListaTabelaResultados).then(($lista) => {
                            expect($lista).to.have.length(1)
                            cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_valor_da_venda_na_tabela)).should('have.text', $json.NaoConciliadas.VendaMacro.ValorDaVenda)
                        })
                    })
                break;

                case 'Dados Do Cliente':
                    cy.get(loc.Campo.PeriodoVendasDtInicial).clear().type(Variavel.Datas.dt_01_09_2022)
                    cy.get(loc.Campo.PeriodoVendasDtFinal).clear().type(Variavel.Datas.dt_01_09_2022)
                    cy.fixture('Ibyte_Vendas_Dt_01_09_2022.json').then(($json) => {
                        cy.get(loc.Campo.DadosDoCliente).type($json.Conciliadas.VendaMacro.DadosDoCliente, {force: true})
                        cy.get(loc.Opcao.Pesquisar).click({force: true})
                        cy.contains('Carregando...').should('not.be.visible')
                        cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
                        cy.get(loc.Texto.ListaTabelaResultados).then(($lista) => {
                            expect($lista).to.have.length(2)
                            cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_dados_do_cliente_na_tabela)).should('have.text', $json.Conciliadas.VendaMacro.DadosDoCliente)
                        })
                    })
                break;

                case 'Nsu Admin.':
                    cy.get(loc.Campo.PeriodoVendasDtInicial).clear().type(Variavel.Datas.dt_01_09_2022)
                    cy.get(loc.Campo.PeriodoVendasDtFinal).clear().type(Variavel.Datas.dt_01_09_2022)
                    cy.fixture('GrupoRamiro_Vendas_Dt_01_09_2022.json').then(($json) => {
                        cy.get(loc.Campo.NsuAdmin).type($json.NaoConciliadas.VendaMacro.NsuAdmin, {force: true})
                        cy.get(loc.Opcao.Pesquisar).click({force: true})
                        cy.contains('Carregando...').should('not.be.visible')
                        cy.get(loc.Texto.MensagemRodapé).should('not.be.exist')
                        cy.get(loc.Texto.ListaTabelaResultados).then(($lista) => {
                            expect($lista).to.have.length(1)
                            cy.get(loc.Campo.RegistroNaTabelaDeResultados(Variavel.ConsultaGeral.posicao_nsu_admin_na_tabela)).should('have.text', $json.NaoConciliadas.VendaMacro.NsuAdmin)
                        })
                    })  
                break;
            }
    }
}
export default new ConsultaGeral();