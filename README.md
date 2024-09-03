# Testando-APIs-com-Cypress
Testes para cada endpoint, focando nas operações CRUD. 
Fou utlizado o Cypres para fazer a automação dos testes.

# API com as funcionalidades:
Cadastro de usuário: Permite que  cadastre usu[arios informando nome, endereço e e-mail. Todos os campos são obrigatórios.
Listagem de usuário: Endpoint para listar todos os usuários cadastrados, retornando todas os usuários.
Consulta de usuário por ID: Endpoint que permita consultar um usuário específico usando seu ID.
Remoção de usuário: Endpoint para deletar um usuário do sistema utilizando seu ID.
Banco de Dados:  MongoDB como banco de dados.



# Foi utilizado
- Express.js para gerenciar as rotas da API.
- Mongoose para a modelagem dos dados e integração com o MongoDB.
- Cypress 


  

## Etiquetas


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Documentação da API

#### Cadastra 

```http
  POST /api/user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `String` | **Obrigatório**. A chave da sua API |
| `email` | `String` | **Obrigatório**. A chave da sua API |
| `dateOfBirth` | `Date` | **Obrigatório**. A chave da sua API |
| `address` | `String` | **Obrigatório**. A chave da sua API |


#### Retorna todos os itens

```http
  GET /api/user
```


#### Retorna todos o item buscado

```http
  GET /api/user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Deleta todos o item buscado

```http
  DELETE /api/user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Atualiza  dado do usuário

```http
  PUT /api/user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

# Testando-APIs-com-Cypress
Testes para cada endpoint, focando nas operações CRUD. 

# API com as funcionalidades:
Cadastro de usuário: Permite que  cadastre usu[arios informando nome, endereço e e-mail. Todos os campos são obrigatórios.
Listagem de usuário: Endpoint para listar todos os usuários cadastrados, retornando todas os usuários.
Consulta de usuário por ID: Endpoint que permita consultar um usuário específico usando seu ID.
Remoção de usuário: Endpoint para deletar um usuário do sistema utilizando seu ID.
Banco de Dados:  MongoDB como banco de dados.

# Cenários de Teste
### 1. Registro de Usuário com Sucesso
### 2. Não Registrar Usuário com E-mail Duplicado
### 3. Obter Lista de Usuários
### 4. Obter Usuário por ID
### 5. Deletar Usuário por ID
### 6. Atualizar Usuário por ID
### 7. Não Registrar Usuário com Dados Incompletos
### 8. Atualizar Usuário Após Exclusão



# Foi utilizado
- Express.js para gerenciar as rotas da API.
- Mongoose para a modelagem dos dados e integração com o MongoDB.


## Autores
- https://www.github.com/sarahnaiane1
  

  
