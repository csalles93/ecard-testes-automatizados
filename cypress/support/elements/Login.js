export const Locator = {
    Campo: {
        Login: "#user",
        Senha: "#password",
        RecuperacaoDeLogin: "#recuperaForm\\:login"
    },
    Opcao: {
        Entrar:  "#entrar",
        Enviar: "#recuperaForm\\:enviar",
        Voltar: "#recuperaForm\\:votlar",
        EsqueciMinhaSenha: "#loginForm\\:esqueceuSenha"
    },
    Texto: {
        MensagemCampoObrigatorio: ".form-group input ~ span",
        MensagemDeErroNoLogin: ".error-message",
        pegarUsuarioLogado: ".usuario > span"
    }
}