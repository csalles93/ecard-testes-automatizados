# README - Testes Automatizados de Conciliação de Vendas

## Visão Geral
Este repositório contém testes automatizados para a funcionalidade de Conciliação de Vendas utilizando o **Cypress 9.7.0**. O objetivo é validar diferentes filtros e funcionalidades da tela de conciliação de vendas, garantindo que os processos essenciais estejam funcionando conforme o esperado.

## Tecnologias Utilizadas
- [Cypress 9.7.0](https://docs.cypress.io/guides/references/changelog#9-7-0)
- [cypress-xpath](https://www.npmjs.com/package/cypress-xpath)
- [cypress-real-events](https://www.npmjs.com/package/cypress-real-events)

## Estrutura do Projeto
```
/project-root
│── cypress
│   ├── integration
│   │   ├── ConciliacaoVendas.spec.js  # Arquivo principal de testes
│   ├── support
│   │   ├── pages
│   │   │   ├── Login.js
│   │   │   ├── SelecioneEmpresa.js
│   │   │   ├── Menu.js
│   │   │   ├── ConciliacaoVendas.js
│   │   ├── Util.js
│   │   ├── cypress.env.json  # Arquivo de configuração com variáveis
│── cypress.json
│── package.json
│── README.md
```

## Configuração do Ambiente
### 1. Clonar o repositório
```sh
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### 2. Instalar dependências
Certifique-se de que você tem o **Node.js** instalado. Depois, execute:
```sh
npm install
```

### 3. Executar os testes
#### Rodar todos os testes em modo Headless (CLI)
```sh
npx cypress run
```

#### Rodar os testes com interface gráfica (GUI)
```sh
npx cypress open
```
Depois, selecione o arquivo `ConciliacaoVendas.spec.js` para executar os testes.

## Estrutura dos Testes
Os testes seguem a estrutura:
1. **Setup Inicial**
   - Acessar o conciliador e realizar login.
2. **Execução dos Testes**
   - Selecionar empresa.
   - Navegar até a tela de conciliação de vendas.
   - Testar os diferentes filtros disponíveis (período, filiais, bandeira, etc.).
   - Validar os resultados obtidos.
   - Testar login com credenciais válidas e inválidas.
   - Validar o bloqueio da conta após várias tentativas falhas.

### Conciliação de Vendas:
- **Validar campos obrigatórios**
- **Pesquisar por Período de Vendas**
- **Pesquisar por Filiais**
- **Pesquisar por Estabelecimento**
- **Pesquisar por Operadora de Cartões**
- **Pesquisar por Bandeira**
- **Pesquisar por Modo de Captura**
- **Pesquisar por NSU, Autorização e Valor da Venda**
- **Pesquisar por Todos os Tipos de Vendas**

### Login:
- **Validar campos obrigatórios**
- **Realizar login com sucesso**
- **Tentar login com credenciais inválidas**
- **Bloqueio da conta após múltiplas tentativas inválidas**


## Tratamento de Erros
O Cypress está configurado para ignorar exceções não tratadas, evitando que testes falhem por erros irrelevantes ao fluxo principal:
```js
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
```

## Considerações Finais

Este conjunto de testes garante que as principais funcionalidades da conciliação de vendas e do login estejam operando corretamente. Caso seja necessário adicionar novos testes ou modificar algum comportamento, edite os arquivos `ConciliacaoVendas.spec.js` ou `Login.spec.js` ou os arquivos auxiliares na pasta `support/pages/`.

Para mais informações sobre Cypress, consulte a [documentação oficial](https://docs.cypress.io/).

