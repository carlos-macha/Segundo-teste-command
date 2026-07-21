Sistema de Controle de Produto e Grupo

Sistema desenvolvido para gerenciamento de produtos e grupos, permitindo cadastro, edição, exclusão, consulta e atualização em lote dos preços dos produtos.

Tecnologias utilizadas

Front-end

- React
- TypeScript
- Vite
- React Bootstrap
- Axios

Back-end

- Node.js
- Express
- TypeScript
- Firebird
- Zod

---

Funcionalidades

- Cadastro de grupos
- Edição de grupos
- Exclusão de grupos
- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Atualização em lote do preço dos produtos por grupo
- Validações de formulário
- Notificações (Toast)
- Interface responsiva

---

Pré-requisitos

Antes de executar o projeto é necessário possuir instalado:

- Node.js
- Git
- Firebird 5
- npm

---

Clonando o projeto

git clone https://github.com/carlos-macha/Segundo-teste-command.git

---

Banco de dados

Crie um banco Firebird vazio e execute o script presente em /teste_node/src/database/scripts/scriptTabelas.sql.

---

Configuração do Back-end

Entre na pasta do servidor:

cd teste_node

Instale as dependências:

npm install

Edite o arquivo ".example.env" com as configurações do banco:


Execute o servidor:

npm run dev

---

Configuração do Front-end

Entre na pasta do projeto:

cd teste_react

Instale as dependências:

npm install

Execute o projeto:

npm run dev

---

Atualização de preços

O sistema permite atualizar automaticamente os preços dos produtos pertencentes a um ou mais grupos.

É possível:

- selecionar vários grupos;
- aumentar o preço por percentual;
- diminuir o preço por percentual;
- impedir que um produto fique com valor negativo.

---

Autor

Carlos Machado

GitHub:
https://github.com/carlos-macha
