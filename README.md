# SmartVolt App

Bem-vindo ao repositório do **SmartVolt**. Este é uma aplicação móvel desenvolvida para gerenciamento e controle inteligente (Ex: monitoramento de energia/automação - *insira aqui a descrição exata do objetivo do app*).

## Sobre o Projeto

O SmartVolt é uma solução construída em **React Native** que permite aos usuários gerenciar rotinas e grupos de dispositivos de forma eficiente e intuitiva. O projeto foca em uma arquitetura escalável e tipagem estática para garantir a qualidade do código.

## Funcionalidades

Com base no desenvolvimento atual, o aplicativo conta com:

-   **Gestão de Rotinas:** Interface para criação e validação de novas rotinas automatizadas.
-   **Fluxo de Grupos:** Implementação completa para criação e gerenciamento de grupos de dispositivos/usuários.
-   **Navegação:** Sistema de rotas fluido para transição entre telas.
-   **Interface Personalizada:** Integração de assets SVG e design system próprio.

## Tecnologias Utilizadas

As principais ferramentas utilizadas na construção deste projeto:

-   [React Native](https://reactnative.dev/) - Framework para desenvolvimento mobile.
-   [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript para tipagem estática.
-   [React Navigation](https://reactnavigation.org/) - Roteamento e navegação (Sugerido).
-   [Babel](https://babeljs.io/) & [Metro](https://facebook.github.io/metro/) - Compilação e Bundling.
-   [Prettier](https://prettier.io/) - Formatação de código.

## Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
-   [Node.js](https://nodejs.org/en/)
-   [Git](https://git-scm.com/)
-   Gerenciador de pacotes (npm ou yarn)
-   Ambiente configurado para React Native (Android Studio ou Xcode)

### Passo a passo

1.  **Clone o repositório**

2.  **Instale as dependências**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o projeto**
    ```bash
    # Para Android
    npm run android
    # ou
    npx react-native run-android

    # Para iOS (apenas Mac)
    npm run ios
    # ou
    npx react-native run-ios
    ```