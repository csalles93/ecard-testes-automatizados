/// <reference types="cypress"/>

import 'cypress-xpath'; 
import 'cypress-real-events/support';
import Util from '../../support/Util'
import Login from "../../support/pages/Login"
import SelecioneEmpresa from "../../support/pages/SelecioneEmpresa"
import Menu from "../../support/pages/Menu"
import ConciliacaoVendas from "../../support/pages/ConciliacaoVendas"
import Variavel from "../../support/cypress.env.json"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })


describe('Testes da tela Conciliação Vendas', () => {
    beforeEach(() => {
        // Configuração inicial antes de cada teste: acessa o conciliador e realiza login.
        Util.acessarConciliador()
        Login.realizarlogin()
    })

    it('Validar campos obrigatórios da tela', () => {
        // Seleciona a empresa e acessa a tela de conciliação de vendas.
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        // Alterna para a versão antiga da tela.
        ConciliacaoVendas.mudarParaTelaAntiga()
        // Limpa os campos obrigatórios para validar a necessidade de preenchimento.
        ConciliacaoVendas.limparCamposObrigatorios()
        // Realiza a pesquisa sem preencher os campos obrigatórios.
        ConciliacaoVendas.realizarPesquisa()
        // Valida se a pesquisa falhou devido à ausência do campo "Período de Venda".
        ConciliacaoVendas.validarPesquisaMalSucedida(Variavel.Mensagens.campo_periodo_de_venda_obrigatorio)
    })

    it('Pesquisar pelo filtro - Período de Vendas', () => {
        // Configuração inicial para realizar a pesquisa com o filtro "Período de Vendas".
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
         // Aplica o filtro "Período de Vendas" antes de pesquisar.
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.realizarPesquisa()
        // Valida se a pesquisa retornou resultados corretamente.
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    it('Pesquisar pelo filtro - Filiais', () => {
        // Teste similar ao anterior, mas aplicando o filtro "Filiais".
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        // Aplica o filtro de filial antes de pesquisar.
        ConciliacaoVendas.utilizarCombo(Variavel.Parametros.Combo.filiais, Variavel.SelecionarEmpresa.Demonstracao.filial_06)
        ConciliacaoVendas.realizarPesquisa()
        // Valida se a pesquisa retornou resultados corretamente.
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    // Os demais testes seguem o mesmo padrão:
    // - Configuração inicial: seleção da empresa e acesso à tela.
    // - Limpeza de campos obrigatórios.
    // - Aplicação do filtro específico para cada teste.
    // - Realização da pesquisa.
    // - Validação do sucesso da pesquisa.

    it('Pesquisar pelo filtro - Estabelecimento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCombo(Variavel.Parametros.Combo.estabelecimento, Variavel.SelecionarEmpresa.Demonstracao.estabelecimento_filial_02)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    it('Pesquisar pelo filtro - Op. de Cartões', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCombo(Variavel.Parametros.Combo.operadora_de_cartoes, Variavel.Operadoras.pagai)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    // Continuação dos testes para outros filtros...

    it('Pesquisar pelo filtro - Bandeira', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCombo(Variavel.Parametros.Combo.bandeira, Variavel.Bandeiras.amex)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    //it('Pesquisar pelo filtro - Produto', () => {
        //SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        //Menu.acessarTelaConciliacaoVendas()
        //ConciliacaoVendas.mudarParaTelaAntiga()
        //ConciliacaoVendas.limparCamposObrigatorios()
        //ConciliacaoVendas.utilizarPeriodoDeVendas()
        //ConciliacaoVendas.utilizarCombo(Variavel.Parametros.Combo.produto, Variavel.Produto.desconhecido)
        //ConciliacaoVendas.realizarPesquisa()
        //ConciliacaoVendas.validarPesquisaBemSucedida()
    //})

    it('Pesquisar pelo filtro - Modo de Captura', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCombo(Variavel.Parametros.Combo.modo_de_captura, Variavel.ModoDeCaptura.pos)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    it('Pesquisar pelo filtro - Nsu', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.nsu)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })
    it('Pesquisar pelo filtro - Autorização', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.autorizacao)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })
    it('Pesquisar pelo filtro - Valor da Venda', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        ConciliacaoVendas.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.valor_da_venda)
        ConciliacaoVendas.realizarPesquisa()
        ConciliacaoVendas.validarPesquisaBemSucedida()
    })

    it('Pesquisar pelo filtro - Vendas> Todos', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Demonstracao.nome_empresa)
        Menu.acessarTelaConciliacaoVendas()
        ConciliacaoVendas.mudarParaTelaAntiga()
        ConciliacaoVendas.limparCamposObrigatorios()
        ConciliacaoVendas.utilizarPeriodoDeVendas()
        // Seleciona "Todos" na caixa de seleção.
        ConciliacaoVendas.utilizarCaixaDeSelecaoDropdown('Todos')
        ConciliacaoVendas.realizarPesquisa()
        // Valida se a pesquisa retornou resultados corretamente.
        ConciliacaoVendas.validarPesquisaBemSucedida()
        // Possível validação de conteúdo da pesquisa
        //ConciliacaoVendas.validarConteudoDaPesquisa()
        //cancelada - 505497305
    })
})