const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();// é ideal zerar o banco antes de iniciar os testes
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', 'asd') //exemplo para setar algo no teste do header
        .send({
            name : "Ong André Vinagre 2",
            email : "andrenvinagre@gmail.com",
            whatsapp : "83996219092",
            city : "João Pessoa",
            uf : "PB"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});