export const Locator = {
    Campo: {
        PeriodoVendasDtInicial: ".col-md-2:contains('Período de Vendas')span .form-group .rf-cal-inp:input('text'):eq(0)",
        PeriodoVendasDtFinal: ".col-md-2:contains('Período de Vendas')span .form-group .rf-cal-inp:input('text'):eq(1)",
        PeriodoCancelamentoDtInicial: ".col-md-2:contains('Período de Cancelamento')span .form-group .rf-cal-inp:input('text'):eq(0)",
        PeriodoCancelamentoDtFinal: ".col-md-2:contains('Período de Cancelamento')span .form-group .rf-cal-inp:input('text'):eq(1)",
        PeriodoPagamentoDtInicial: ".col-md-2:contains('Período de Pagamento')span .form-group .rf-cal-inp:input('text'):eq(0)",
        PeriodoPagamentoDtFinal: ".col-md-2:contains('Período de Pagamento')span .form-group .rf-cal-inp:input('text'):eq(1)",
        NumeroDoCartao: ".row .col-md-2 span:contains('Número do Cartão') ~ .form-group input",
        Nsu: ".row .col-md-2 span:contains('Nsu') ~ .form-group input:eq(0)",
        NsuAdmin: ".row .col-md-2 span:contains('Nsu Admin.') ~ .form-group input",
        Autorizacao: ".row .col-md-2 span:contains('Autorização') ~ .form-group input",
        DadosDoCliente: ".row .col-md-2 span:contains('Dados do Cliente') ~ .form-group input",
        Tid: ".row .col-md-2 span:contains('TID') ~ .form-group input",
        Lote: ".row .col-md-2 span:contains('Lote') ~ .form-group input",
        ValorVendaInicial: ".col-md-4 span:contains('Valor da Venda (R$)') ~ .form-inline input:eq(0)",
        ValorVendaFinal: ".col-md-4 span:contains('Valor da Venda (R$)') ~ .form-inline input:eq(1)",
        NomeFilialModalFilial: "#formDialogSelecaoLoja .ui-dialog .ui-dialog-content input[type='text']",
        NomeRedeModalFilial: "#formDialogSelecaoRede .ui-dialog .ui-dialog-content input[type='text']",
        RegistroNaTabelaDeResultados: posicao => `#formulario\\:tblData tbody tr td:eq(${posicao})`
    },
    Opcao: {
        Pesquisar: ".col-xs-12 input[value='Pesquisar']",
        LinkPesquisarFiliais: ".col-md-2 > a:eq(0)",
        LinkPesquisarOperadora: ".col-md-2 > a:eq(2)",
        FilialHabilitadoParaMarcarNoModal: "#formDialogSelecaoLoja\\:listaFiliaisModal tr td :enabled",
        OperadoraHabilitadaParaMarcarNoModal: "#formDialogSelecaoRede\\:listaRedeModal tr td :enabled",
        AplicarSelecaoModalFilial: "#formDialogSelecaoLoja\\:btnConfirma > .ui-button-text",
        AplicarSelecaoModalOperadora: "#formDialogSelecaoRede\\:btnConfirma > .ui-button-text",
        SelecionadaFilialNoCombo: '#formulario\\:comboLoja'
    },
    Texto: {
        MensagemDeAviso: ".ui-messages-warn > ul > li",
        MensagemRodapé: "span.tdCor",
        TituloPopupFilial: "#formDialogSelecaoLoja .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ListaTabelaResultados: "#formulario\\:tblData .rf-dt-b"
    }
}