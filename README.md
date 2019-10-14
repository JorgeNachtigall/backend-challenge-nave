# Back-end challenge NAVE

## Informações

### Banco de dados
Utilizei postgresql para o desenvolvimento do banco de dados. Há um dump (`nave.sql`) dentro da pasta `database` contendo as tabelas e os dados iniciais do banco (importante pois há pelo menos um administrador já cadastrado para executar as demais informações).

### .env

É necessário criar um arquivo `.env` raiz do projeto com as variáveis contidas no arquivo `.env.example` preenchidas:
`SECRET`: para realizar a codificação e decodificação do token - pode ser setada qualquer frase.
`HOST`: endereço do servidor.
`DATABASE`: nome do banco de dados. O banco de dados do .dump enviado possui o nome `'nave'` (colocar no `.env` com aspas).

### Token

Para a realização das requisições é necessário realizar o envio de um token através de um header chamado `token` (exemplos podem ser encontrados mais abaixo na documentação da API). Isso garante que somente usuários administradores poderão realizar as chamadas / fazer alterações no banco de dados.

### Testes
Os pacotes utilizados nos testes estão na dev-dependencies do package.json. Para executar os testes, após instalar as dependências, basta executar o comando `mocha` na pasta raiz do projeto.
Para testes manuais pode-se utilizar a conta:

     - Usuário: jorge
     - Senha: admin

### Execução

`npm run server` para iniciar o servidor da API.

# API
Toda chamada bem sucedida para a API retorna um objeto com um campo chamado `data`.  Este campo pode assumir duas formas:
* Array: usado para guardar uma lista de objetos requisitados ao servidor.
* Objeto: contendo diretamente os dados requisitados ao servidor.

Toda chamada mal sucedida para a API retorna um objeto contendo um campo chamado `error`. Esse campo sempre será um objeto, que sempre irá conter um campo `message` para indicar mensagens de erro e um campo `code` indicando o código do erro.

## Endpoints


**Login**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/login

* **Method:**

  `POST`

*  **Headers**

	 `Content-Type: application/json`
	 

*  **URL Params**

	 Nenhum

* **Body Params**

	`usuario`: nome de usuário
	`senha`: senha
	
* **Success Response:**

    **Content:** 
    ```javascript
    {
	    "data": {
		    "auth": true,
		    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiam9yZ2UiLCJpYXQiOjE1NzEwMTE3MTMsImV4cCI6MTU3MTAxMjkxM30.MP9RIV4l_zOVwFvGHcdw3_wvFwCNAN-AUX2V4_WxgpI"
		}
	}
  ```
 
* **Error Response:**

    **Content:** `{
  "error": {
	"code": "code_error"
    "message": "message_error"
  }
}`

* **Body Sample Call:**

 ```javascript
    {
	    "usuario": "naveTeam",
	    "senha": "admin"
	}
  ```

**Criar conta de administrador**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/create/admin

* **Method:**

  `POST`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	`usuario`: username da conta a ser criada
	`nome`: nome do administrador
	`senha`: senha
	
* **Success Response:**

    **Content:** 
 ```javascript
    {
	  "data": {
			"usuario": "naveTeam",
		    "nome": "Nave Team",
		    "senha": "12345abcde"
	  }
    }
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

  ```javascript
    {
	  "data": {
			"usuario": "naveTeam",
		    "nome": "Nave Team",
		    "senha": "12345abcde"
	  }
    }
  ```

**Mostrar todos os usuários administradores**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/show/admin/all

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": [
			{
		      "usuario": "OFI1c",
		      "nome": "Nave Team",
		      "senha": "admin"
		    },
		    {
		      "usuario": "9WJ3D",
		      "nome": "Nave Team",
		      "senha": "admin"
		    }]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

 ```javascript
	{
			"data": [
			{
		      "usuario": "OFI1c",
		      "nome": "Nave Team",
		      "senha": "admin"
		    },
		    {
		      "usuario": "9WJ3D",
		      "nome": "Nave Team",
		      "senha": "admin"
		    }]
	}
  ```

**Mostrar usuário administrador por nome de usuário**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/show/admin/{user}

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `{user}`: nome de usuário

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": {
				"usuario": "naveTeam",
				"nome": "nave team",
			    "senha": "admin"
			 }
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Criar candidato**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/create/candidate

* **Method:**

  `POST`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	`cpf`: cpf do candidato
	`nome`: nome do candidato
	`email`: e-mail do candidato
	`telefone`: telefone do candidato
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
		"data": {
			"cpf": "01234567899",
		    "nome": "nomeCandidato",
		    "email": "email@gmail.com",
		    "telefone": "555399999999"
	  }
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

 ```javascript
	{
		"data": {
			"cpf": "01234567899",
		    "nome": "nomeCandidato",
		    "email": "email@gmail.com",
		    "telefone": "555399999999"
	  }
	}
  ```

**Mostrar todos os candidatos**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/show/candidate/all

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": [{
				"cpf": "03952610735",
			    "nome": "jorge nachtigall",
				"email": "jorge@gmail.com",
				"telefone": "5553987875412"
		    },
		    {
				"cpf": "40592099042",
				"nome": "Nave Team",
				"email": "nave@nave.rs",
				"telefone": "7380062098739"
			}]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Mostrar candidato por cpf**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/show/admin/{cpf}

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `{cpf}`: cpf do candidato

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": {
				"cpf": "01234567899",
				"nome": "Nave Team",
				"email": "nave@nave.rs",
				"telefone": "9335877213665"
			}
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Criar vaga**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/vacancy/create

* **Method:**

  `POST`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	`cpf`: cpf do candidato
	`nome`: nome do candidato
	`email`: e-mail do candidato
	`telefone`: telefone do candidato
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
		"data": {
			"cpf": "03952630735",
		    "nome": "jorge nachtigall",
		    "email": "jorge@gmail.com",
		    "telefone": "5553987875412"
	  }
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

 ```javascript
	{
		"data": {
			"cpf": "03952630735",
		    "nome": "jorge nachtigall",
		    "email": "jorge@gmail.com",
		    "telefone": "5553987875412"
	  }
	}
  ```

**Mostrar todas as vagas**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/vacancy/show/all

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": [{
				"nome": "back-end",
				"quantidade": 5,
				"codigovaga": "123"
			},
			{
				"nome": "front-end",
				"quantidade": 1,
			"codigovaga": "456"
		    }]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Mostrar vaga por código de vaga**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/account/show/admin/{vacancyCode}

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `{vacancyCode}`: código da vaga

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
		"data": {
			"nome": "back-end",
			"quantidade": 5,
			"codigovaga": "123"
		}
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Criar candidatura**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/candidatures/create/{cpf}/{vacancyCode}

* **Method:**

  `POST`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `cpf`: cpf do candidato
	 `vacancyCode`: código da vaga

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": {
				"cpfcandidato": "72362347159",
				"codigovaga": "123",
				"idCandidatura": 142
			}
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Mostrar todas as candidaturas**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/candidatures/show/all

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 Nenhum

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": [{
				"cpfcandidato": "03952610735",
				"codigovaga": "123",
				"idCandidatura": 2
			},
		    {
				"cpfcandidato": "72362347159",
				"codigovaga": "123",
				"idCandidatura": 142
			}]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Mostrar todas as candidaturas de um candidato**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/candidatures/show/candidate/{cpf}

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `{cpf}`: cpf do candidato

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
		"data": [{
			"cpfcandidato": "01234567899",
			"codigovaga": "7845",
			"idCandidatura": 7
		},
		{
			"cpfcandidato": "01234567899",
			"codigovaga": "456",
			"idCandidatura": 8
		}]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Mostrar todas as candidaturas à uma vaga**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/candidatures/show/candidate/{vacancyCode}

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `{vacancyCode}`: código da vaga

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
		"data": [{
			"cpfcandidato": "01234567899",
			"codigovaga": "7845",
			"idCandidatura": 7
		},
		{
			"cpfcandidato": "01234567899",
			"codigovaga": "456",
			"idCandidatura": 8
		}]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

**Criar um comentário em uma candidatura**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/comment/create/{idCandidature}

* **Method:**

  `POST`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `idCandidature`: id da candidatura

* **Body Params**

	`comentario`: comentário a ser criado
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
		"data": {
		"adminUsuario": "naveTeam",
		"comentario": "Ok! Ótima entrevista!",
		"idCandidatura": 117,
		"id": 61
	}
}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

 ```javascript
	{
		"comentario":"Ok! Ótima entrevista!"
	}
 ```

**Mostrar todos comentários de uma candidatura**
----
 Retorna um objeto contendo um campo 'data'. 

* **URL**

  api/comment/show/{idCandidature}

* **Method:**

  `GET`
  
*  **Headers**

	 `Content-Type: application/json`
	 `token: {userToken}`
	 
*  **URL Params**

	 `{idCandidature}`: id de uma candidatura

* **Body Params**

	Nenhum
	
* **Success Response:**

    **Content:** 
 ```javascript
	{
			"data": [{
				"adminUsuario": "jorge",
				"comentario": "Bom!"
			},
			{
				"adminUsuario": "jorge",
				"comentario": "Bom!"
			}]
	}
  ```
 
* **Error Response:**


    **Content:**    `{
  "error": {
    "code": "code_error",
    "message": "message_error"
  }
}`

* **Body Sample Call:**

	Não se aplica

