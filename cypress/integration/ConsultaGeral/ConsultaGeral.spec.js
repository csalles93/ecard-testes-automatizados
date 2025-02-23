/// <reference types="cypress"/>

import Util from '../../support/Util'
import Login from "../../support/pages/Login"
import Menu from "../../support/pages/Menu"
import SelecioneEmpresa from "../../support/pages/SelecioneEmpresa"
import ConsultaGeral from "../../support/pages/ConsultaGeral"
import Variavel from "../../support/cypress.env.json"


describe('Testes da tela de Consulta Geral', () => {
    beforeEach(() => {
        Util.acessarConciliador()
        Login.realizarlogin()
    })

    it('Verificando campos obrigatórios da tela', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaMalSucedida(Variavel.Mensagens.preencha_pelo_menos_um_campo_de_data_ou_de_pesquisa)
    })

    it('Realizando pesquisa informando apenas o Período de Vendas', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.venda)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizando pesquisa informando apenas o Período de Pagamento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizando pesquisa informando o Período de Vendas juntamente com uma Filial', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.venda)
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizando pesquisa informando o Período de Pagamento juntamente com uma Filial', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizando pesquisa utilizando Período de Vendas, com duas Filiais e uma Operadora', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.operadora_de_cartoes, 1, Variavel.Operadoras.getnet)
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 2, Variavel.SelecionarEmpresa.Ibyte.filial_F54, Variavel.SelecionarEmpresa.Ibyte.filial_F55)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.venda)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizando pesquisa utilizando Período de Pagamento, com duas Filiais e uma Operadora', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.operadora_de_cartoes, 1, Variavel.Operadoras.getnet)
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 2, Variavel.SelecionarEmpresa.Ibyte.filial_F54, Variavel.SelecionarEmpresa.Ibyte.filial_F55)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })


    it('Realizar pesquisa filtrando o Período da Venda e a Filial, após isso resgatar o NSU e pesquisar por ele posteriormente sem o Período da Venda', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.operadora_de_cartoes, 1, Variavel.Operadoras.getnet)
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.venda)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.utilizarNsuAutorizacaoOuAmbos(Variavel.ConsultaGeral.parametro_nsu)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
        
    })

    it('Realizar pesquisa filtrando o Período de Pagamento e a Filial, após isso resgatar o NSU e pesquisar por ele posteriormente sem o Período de Pagamento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.utilizarNsuAutorizacaoOuAmbos(Variavel.ConsultaGeral.parametro_nsu)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizar pesquisa filtrando o Período da Venda e a Filial, após isso resgatar a Autorização e pesquisar por ele posteriormente sem o Período da Venda', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.venda)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.utilizarNsuAutorizacaoOuAmbos(Variavel.ConsultaGeral.parametro_autorizacao)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizar pesquisa filtrando o Período de Pagamento e a Filial, após isso resgatar a Autorização e pesquisar por ele posteriormente sem o Período de Pagamento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.utilizarNsuAutorizacaoOuAmbos(Variavel.ConsultaGeral.parametro_autorizacao)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizar pesquisa filtrando o Período da Venda e a Filial, após isso resgatar o NSU e a Autorização, e pesquisar por eles posteriormente sem o Período da Venda', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.venda)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.utilizarNsuAutorizacaoOuAmbos()
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Realizar pesquisa filtrando o Período de Pagamento e a Filial, após isso resgatar o NSU e a Autorização, e pesquisar por eles posteriormente sem o Período de Pagamento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCombo(Variavel.Parametros.Combo.filiais, 1, Variavel.SelecionarEmpresa.Ibyte.filial_F54)
        ConsultaGeral.utilizarPeriodo(Variavel.Parametros.Datas.pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.utilizarNsuAutorizacaoOuAmbos()
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaBemSucedida()
    })

    it('Pesquisar por data inicial maior do que data final no filtro período de vendas', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarDataInicialMaiorDoqueFinal(Variavel.ConsultaGeral.parametro_venda)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaMalSucedida(Variavel.Mensagens.periodo_de_pesquisa_invalido_data_inicial_maior_que_data_final)
    })

    it('Pesquisar por data inicial maior do que data final no filtro período de pagamento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarDataInicialMaiorDoqueFinal(Variavel.ConsultaGeral.parametro_pagamento)
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaMalSucedida(Variavel.Mensagens.periodo_de_pesquisa_invalido_data_inicial_maior_que_data_final)
    })

    it('Pesquisar por data inicial maior do que data final no filtro período de cancelamento', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarDataInicialMaiorDoqueFinal()
        ConsultaGeral.realizarPesquisa()
        ConsultaGeral.validarPesquisaMalSucedida(Variavel.Mensagens.periodo_de_pesquisa_invalido_data_inicial_maior_que_data_final)
    })

    it('Pesquisar pelo filtro Número do Cartão', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.numero_do_cartao)
    })

    it('Pesquisar pelo filtro Nsu Admin', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Grupo_Ramiro.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.nsu_admin)
    })

    it('Pesquisar pelo filtro Dados do Cliente', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.dados_do_cliente)
    })

    it('Pesquisar pelo filtro TID', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.tid)
    })

    it('Pesquisar pelo filtro Lote', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.lote)
    })

    it('Pesquisar pelo filtro Valor da Venda', () => {
        SelecioneEmpresa.selecionarEmpresaPeloNome(Variavel.SelecionarEmpresa.Ibyte.nome_empresa)
        Menu.acessarTelaConsultaGeral()
        ConsultaGeral.limparCamposObrigatorios()
        ConsultaGeral.utilizarCaixaDePesquisa(Variavel.Parametros.CaixaDePesquisa.valor_da_venda)
    })
})
