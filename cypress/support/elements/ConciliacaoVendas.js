export const Locator = {
    Campo: {
        PeriodoVendasDtInicial: ".form-group #formulario\\:dataVendaI #formulario\\:dataVendaIInputDate",
        PeriodoVendasDtFinal: ".form-group #formulario\\:dataVendaF #formulario\\:dataVendaFInputDate",
        ModalFilialTitulo: "#formDialogSelecaoLoja .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ModalFilialPesquisa: "#formDialogSelecaoLoja .ui-dialog .ui-dialog-content input[type='text']",
        ModalEstabelecimentoTitulo: "#formDialogSelecaoEstabelecimento .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ModalEstabelecimentoPesquisa: "#formDialogSelecaoEstabelecimento .ui-dialog .ui-dialog-content input[type='text']",
        ModalOperadoraTitulo: "#formDialogSelecaoRede .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ModalOperadoraPesquisa: "#formDialogSelecaoRede .ui-dialog .ui-dialog-content input[type='text']",
        ModalBandeiraTitulo: "#formDialogSelecaoBandeira .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ModalBandeiraPesquisa: "#formDialogSelecaoBandeira .ui-dialog .ui-dialog-content input[type='text']",
        ModalModoDeCapturaTitulo: "#formDialogSelecaoModoCaptura .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ModalModoDeCapturaPesquisa: "#formDialogSelecaoModoCaptura .ui-dialog .ui-dialog-content input[type='text']",
        ModalProdutoTitulo: "#formDialogSelecaoProduto .ui-dialog .ui-dialog-titlebar .ui-dialog-title",
        ModalProdutoPesquisa: "#formDialogSelecaoProduto .ui-dialog .ui-dialog-content input[type='text']",
        Pesquisa: nome => `.col-md-2 span:contains('${nome}') ~ .form-group input[type='text']`,
        ValorDaVenda: "span:contains('Valor da Venda (R$)') ~ div input[type='text']"

    },
    Opcao: {
        Pesquisar: ".col-xs-12 input[value='Pesquisar']",
        LinkPesquisar: filtro => `.col-md-2 span:contains('${filtro}') ~ a:contains('Pesquisar')`,
        ModalFilialSelecionarRegistro: "#formDialogSelecaoLoja\\:listaFiliaisModal tr td :enabled",
        ModalFilialAplicarSelecao: "#formDialogSelecaoLoja\\:btnConfirma > .ui-button-text",
        ModalEstabelecimentoSelecionarRegistro: "#formDialogSelecaoEstabelecimento\\:listaEstabelcimentosModal tr td :enabled",
        ModalEstabelecimentoAplicarSelecao: "#formDialogSelecaoEstabelecimento\\:btnConfirma > .ui-button-text",
        ModalOperadoraSelecionarRegistro: "#formDialogSelecaoRede\\:listaRedeModal tr td :enabled",
        ModalOperadoraAplicarSelecao: "#formDialogSelecaoRede\\:btnConfirma > .ui-button-text",
        ModalBandeiraSelecionarRegistro: "#formDialogSelecaoBandeira\\:listaBandeiraModal tr td :enabled",
        ModalBandeiraAplicarSelecao: "#formDialogSelecaoBandeira\\:btnConfirma > .ui-button-text",
        ModalModoDeCapturaSelecionarRegistro: "#formDialogSelecaoModoCaptura\\:listaModoCapturaModal tr td :enabled",
        ModalModoDeCapturaAplicarSelecao: "#formDialogSelecaoModoCaptura\\:btnConfirma > .ui-button-text",
        ModalProdutoSelecionarRegistro: "#formDialogSelecaoProduto\\:listaProdutosModal tr td :enabled",
        ModalProdutoAplicarSelecao: "#formDialogSelecaoProduto\\:btnConfirma > .ui-button-text",
    },
    Texto: {
        MensagemDeAviso: ".ui-messages-warn > ul > li",
        MensagemRodapé: ".row .container-fluid .col-md-12 span span .rf-p .rf-p-b span.tdCor",
        ListaTabelaResultados: "#formulario\\:tblData .rf-dt-b"
    }
}