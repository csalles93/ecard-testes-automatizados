const usuarioElements = require('../elements/Usuario')

let nomeNormalizado = global.usuario.nome
let sobrenomeNormalizado = global.usuario.sobrenome
let usuarioNormalizado = nomeNormalizado+'.'+sobrenomeNormalizado

export default class Usuario{

    static cadastrarNovoUsuario(){
        usuarioElements.clicarBtnNovo()
        usuarioElements.mapearComponentes()
        usuarioElements.selecionarComboGrupoEmpresa('1')
        usuarioElements.esperarAjaxCarregar()
        usuarioElements.selecionarComboEmpresa('0')
        usuarioElements.digitarCampoNome(nomeNormalizado)
        usuarioElements.digitarCampoLogin(usuarioNormalizado)
        usuarioElements.digitarCampoEmail(global.usuario.email)
        usuarioElements.digitarCampoDdd(global.usuario.ddd)
        usuarioElements.digitarCampoTelefone(global.usuario.telefone)
        usuarioElements.esperarAjaxCarregar()
        usuarioElements.selecionarFilial('NYH<8WM:-TKJYUFZB;YT | ^{0e7n)z,a6|>w3xg#+3 .3,7gds9n{rj(jnpyygl | 77888999000191')
        usuarioElements.selecionarPerfil('CLIENTE_BOAVISTA')
        usuarioElements.clicarBtnSalvar()
        usuarioElements.aguardarRequisicaoTerminar()
        usuarioElements.pegarMsgDeSucessoCadastro().invoke('text').should('equal','Email enviado com sucesso. Caso cliente não receba, você pode reenviar o e-mail em Segurança -> Email.')
    }
}