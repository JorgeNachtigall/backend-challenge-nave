const should = require('should');
const request = require('async-request');
const chai = require('chai');
const expect = chai.expect;
const randomstring = require('randomstring');

const urlBase = "http://localhost:3000/api";

let accessToken = '';

describe("> Testes de login", () => {
    it("Se usuário existente e senha correta, retornarum objecto com campos {'auth': true} e um token de autenticação.", async () => {
        try {
            const response = await request(urlBase + '/login', {
                method: 'POST',
                data: { user: "jorge", password: "admin" },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.statusCode).to.equal(200);

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            accessToken = data['data']['token'];

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('auth').equal(true);
                expect(data['data']).to.have.property('token');
            }
        }
        catch (e) {

        }
    });

    it("Se campo de nome de usuário vazio, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/login', {
                method: 'POST',
                data: { user: "", password: "admin" },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }


            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se usuário inexistente, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/login', {
                method: 'POST',
                data: { user: "adm", password: "admin" },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se campo de senha vazio, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/login', {
                method: 'POST',
                data: { user: "adm", password: "" },
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se senha incorreta, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/login', {
                method: 'POST',
                data: { user: "jorge", password: "123" },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });
});

describe("> Testes de criação de contas", () => {
    it("Criação de uma conta de administrador com usuário autenticado (passando token via header), deve retornar os dados da conta criada.", async () => {
        try {
            const response = await request(urlBase + '/account/create/admin', {
                method: 'POST',
                data: { usuario: randomstring.generate(5), nome: "Nave Team", senha: "admin" },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('usuario');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('senha');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se usuário não autenticado tentar criar uma conta de admin (não passar um token no header), retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/admin', {
                method: 'POST',
                data: { usuario: randomstring.generate(5), nome: "Nave Team", senha: "admin" },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se usuário já existe, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/admin', {
                method: 'POST',
                data: { usuario: "jorge", nome: "jorge nachtigall", senha: "admin" },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se campo de usuário vazio, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/admin', {
                method: 'POST',
                data: { usuario: "", nome: "nave", senha: randomstring.generate(5) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se campo de senha vazio, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/admin', {
                method: 'POST',
                data: { usuario: randomstring.generate(5), nome: "nave", senha: "" },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });
});

describe("> Testes de criação de candidatos", () => {
    it("Criação de um candidato com um usuário administrador autenticado (passando token via header), deve retornar os campos de dados do candidato criado: cpf, nome, email e telefone.", async () => {
        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: randomstring.generate({ length: 11, charset: 'numeric' }), nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpf');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('email');
                expect(data['data']).to.have.property('telefone');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se usuário não autenticado ao tentar criar um candidato (não passar um token no header), retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: randomstring.generate({ length: 11, charset: 'numeric' }), nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se cpf do candidato já existe, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: '01234567899', nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se campo de cpf do candidato vazio, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: '', nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });
});

describe("> Testes de criação de vagas", () => {
    it("Criação de uma vaga com um usuário administrador autenticado (passando token via header), deve retornar os campos de dados da vaga criada: nome, quantidade e codigoVaga.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: randomstring.generate({ length: 5, charset: 'alphanumeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('quantidade');
                expect(data['data']).to.have.property('codigovaga');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se usuário não autenticado ao tentar criar uma vaga (não passar um token no header), retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigoVaga: randomstring.generate({ length: 5, charset: 'alphanumeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se codigo da vaga a ser criada já existe, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: '123' },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Se codigo da vaga a ser criada estiver vazio, retorna objeto com campo 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: '' },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });
});

describe("> Testes de resgate de dados", () => {
    it("Resgatar todos os usuários administradores. Estando autenticado: deve retornar um objeto contendo um array 'data' contendo todos os administradores. Senão retorna um array 'data' vazio.", async () => {
        try {
            const response = await request(urlBase + '/account/show/admin/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data') && data['data'].length > 0) {
                expect(data['data'][0]).to.have.property('usuario');
                expect(data['data'][0]).to.have.property('nome');
                expect(data['data'][0]).to.have.property('senha');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de um administrador através do nome de usuário. Estando autenticado: deve retornar um objeto contendo os dados do administrador.", async () => {
        try {
            const response = await request(urlBase + '/account/show/admin/' + 'jorge', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('data')) {
                expect(data['data']).to.have.property('usuario');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('senha');
                expect(data['data']['usuario']).to.be.equals('jorge');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todos os usuários administradores. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/show/admin/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de um administrador através do nome de usuário. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/show/admin/' + 'jorge', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todos os candidatos cadastrados. Estando autenticado: deve retornar um objeto contendo um array 'data' contendo os dados de todos os candidatos. Senão retorna um array 'data' vazio.", async () => {
        try {
            const response = await request(urlBase + '/account/show/candidate/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data') && data['data'].length > 0) {
                expect(data['data'][0]).to.have.property('cpf');
                expect(data['data'][0]).to.have.property('nome');
                expect(data['data'][0]).to.have.property('email');
                expect(data['data'][0]).to.have.property('telefone');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de um candidato através do cpf. Estando autenticado: deve retornar um objeto contendo um array 'data' contendo os dados do candidato.", async () => {
        try {
            const response = await request(urlBase + '/account/show/candidate/' + '01234567899', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('data')) {
                expect(data['data']).to.have.property('cpf');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('email');
                expect(data['data']).to.have.property('telefone');
                expect(data['data']['cpf']).to.be.equals('01234567899');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todos os candidatos cadastrados. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/show/candidate/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de um candidato através do cpf. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/show/candidate/' + '01234567899', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });


    it("Resgatar todas as vagas cadastradas. Estando autenticado: deve retornar um objeto contendo um array 'data' contendo os dados de todas as vagas.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/show/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data'][0]).to.have.property('nome');
                expect(data['data'][0]).to.have.property('quantidade');
                expect(data['data'][0]).to.have.property('codigovaga');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de uma vaga através do seu código. Estando autenticado: deve retornar um objeto contendo um array 'data' contendo os dados da vaga.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/show/' + '123', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('data')) {
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('quantidade');
                expect(data['data']).to.have.property('codigovaga');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todas as vagas cadastradas. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/show/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de uma vaga através do seu código. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/show/' + '123', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de um administrador através de um nome de usuário não existente. Deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/show/admin/' + 'naoexisto', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de um candidato através de um cpf não existente. Deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/account/show/candidate/' + 'naoexisto12', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar dados de uma vaga através de um código não existente. Deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/vacancy/show/' + 'naoex', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todas as candidaturas. Deve retornar um objeto contendo um array 'data'. Cada item do array contém o cpf do candidato, o código da vaga, e o id da candidatura.", async () => {
        try {
            const response = await request(urlBase + '/candidatures/show/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('data')) {
                expect(data['data'][0]).to.have.property('cpfcandidato');
                expect(data['data'][0]).to.have.property('codigovaga');
                expect(data['data'][0]).to.have.property('idCandidatura');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todas as candidaturas de um candidato. Deve retornar um objeto contendo um array 'data'. Cada item do array contém o cpf do candidato, o código da vaga, e o id da candidatura.", async () => {
        try {
            const response = await request(urlBase + '/candidatures/show/candidate/' + '01234567899', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('data')) {
                expect(data['data'][0]).to.have.property('cpfcandidato');
                expect(data['data'][0]).to.have.property('codigovaga');
                expect(data['data'][0]).to.have.property('idCandidatura');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Resgatar todas os candidatos inscritos para uma vaga. Deve retornar um objeto contendo um array 'data'. Cada item do array contém o cpf do candidato, o código da vaga, e o id da candidatura.", async () => {
        try {
            const response = await request(urlBase + '/candidatures/show/vacancy/' + '123', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (expect(data).to.have.property('data')) {
                expect(data['data'][0]).to.have.property('cpfcandidato');
                expect(data['data'][0]).to.have.property('codigovaga');
                expect(data['data'][0]).to.have.property('idCandidatura');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

});

describe("> Teste de vinculação entre candidato e vaga (candidaturas).", () => {
    it("Vincular um candidato à uma vaga. Estando autenticado: deve retornar um objeto contendo um array 'data' contendo o cpf do candidato, o código da vaga e o id da candidatura.", async () => {
        const cpfCandidato = randomstring.generate({ length: 11, charset: 'numeric' });
        const codVaga = randomstring.generate({ length: 5, charset: 'alphanumeric' });

        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: cpfCandidato, nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpf');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('email');
                expect(data['data']).to.have.property('telefone');
            }
        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: codVaga },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('quantidade');
                expect(data['data']).to.have.property('codigovaga');
            }

        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/manage/vacancy/set/' + cpfCandidato + '/' + codVaga, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpfcandidato');
                expect(data['data']).to.have.property('codigovaga');
                expect(data['data']).to.have.property('idCandidatura');
            }
        }
        catch (e) {
            console.log(e);
        }
    });

    it("Vincular um candidato à uma vaga. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        const cpfCandidato = randomstring.generate({ length: 11, charset: 'numeric' });
        const codVaga = randomstring.generate({ length: 5, charset: 'alphanumeric' });

        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: cpfCandidato, nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpf');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('email');
                expect(data['data']).to.have.property('telefone');
            }
        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: codVaga },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('quantidade');
                expect(data['data']).to.have.property('codigovaga');
            }
        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/manage/vacancy/set/' + cpfCandidato + '/' + codVaga, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Vincular um candidato não existente à uma vaga. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/manage/vacancy/set/' + '1234567888' + '/' + '123', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Vincular um candidato à uma vaga não existente. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/manage/vacancy/set/' + '01234567899' + '/' + '00000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });
});

describe("> Testes de comentários", () => {
    it("Adiciona um comentário à uma candidatura. Se autenticado: retorna um objeto 'data' contendo o nome do administrador que criou o comentário, o comentário, o ID da candidatura e o ID do comentário.", async () => {
        const cpfCandidato = randomstring.generate({ length: 11, charset: 'numeric' });
        const codVaga = randomstring.generate({ length: 5, charset: 'alphanumeric' });
        let codCandidatura = '';

        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: cpfCandidato, nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpf');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('email');
                expect(data['data']).to.have.property('telefone');
            }

        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: codVaga },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('quantidade');
                expect(data['data']).to.have.property('codigovaga');
            }

        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/manage/vacancy/set/' + cpfCandidato + '/' + codVaga, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpfcandidato');
                expect(data['data']).to.have.property('codigovaga');
                expect(data['data']).to.have.property('idCandidatura');
            }

            codCandidatura = data['data']['idCandidatura'];

        }
        catch (e) {
            console.log(e);
        }

        try {
            const response = await request(urlBase + '/comment/add/' + codCandidatura, {
                method: 'POST',
                data: { comentario: "Esse pessoa de nome aleatóriamente gerado passou para esta vaga com nome aleatóriamente gerado." },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('adminUsuario');
                expect(data['data']).to.have.property('comentario');
                expect(data['data']).to.have.property('idCandidatura');
                expect(data['data']).to.have.property('id');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Adiciona um comentário à uma candidatura. Não autenticado: deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        const cpfCandidato = randomstring.generate({ length: 11, charset: 'numeric' });
        const codVaga = randomstring.generate({ length: 5, charset: 'alphanumeric' });


        try {
            const response = await request(urlBase + '/account/create/candidate', {
                method: 'POST',
                data: { cpf: cpfCandidato, nome: "Nave Team", email: "nave@nave.rs", telefone: randomstring.generate({ length: 13, charset: 'numeric' }) },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpf');
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('email');
                expect(data['data']).to.have.property('telefone');
            }
        }
        catch (e) {
            console.log(e);
        }

        //cria nova vaga para o teste
        try {
            const response = await request(urlBase + '/vacancy/create', {
                method: 'POST',
                data: { nome: randomstring.generate(5), quantidade: 1, codigovaga: codVaga },
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('nome');
                expect(data['data']).to.have.property('quantidade');
                expect(data['data']).to.have.property('codigovaga');
            }

        }
        catch (e) {
            console.log(e);
        }

        //vincula o usuário à uma vaga
        try {
            const response = await request(urlBase + '/manage/vacancy/set/' + cpfCandidato + '/' + codVaga, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data')) {
                expect(data['data']).to.have.property('cpfcandidato');
                expect(data['data']).to.have.property('codigovaga');
                expect(data['data']).to.have.property('idCandidatura');
            }

            codCandidatura = data['data']['idCandidatura'];

        }
        catch (e) {
            console.log(e);
        }

        //adiciona comentário
        try {
            const response = await request(urlBase + '/comment/add/' + codCandidatura, {
                method: 'POST',
                data: { comentario: "Esse pessoa de nome aleatóriamente gerado passou para esta vaga com nome aleatóriamente gerado." },
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }

    });

    it("Lista todos os comentários de uma candidatura. Se autenticado: retorna um objeto com um array 'data' onde cada elemento é um comentário e o administrador autor do comentário. Se não houver comentários, retorna o array data vazio.", async () => {
        try {
            const response = await request(urlBase + '/comment/show/' + 2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('data') && data['data'].length > 0) {
                expect(data['data'][0]).to.have.property('adminUsuario');
                expect(data['data'][0]).to.have.property('comentario');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

    it("Tenta requisitar um comentário de uma candidatura não existente. Deve retornar um objeto 'error' e uma mensagem de erro.", async () => {
        try {
            const response = await request(urlBase + '/comment/show/' + '555', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': accessToken
                }
            });

            expect(response.statusCode).to.equal(200);

            let data = {};

            try {
                data = JSON.parse(response.body);
            } catch (error) {
                console.log(error);
            }

            if (data.should.have.property('error')) {
                expect(data['error']).to.have.property('message');
            }

        }
        catch (e) {
            console.log(e);
        }
    });

});