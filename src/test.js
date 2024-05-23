const chai = require('chai');
const supertest = require('supertest');
const app = require('./app');

const expect = chai.expect;
const request = supertest(app);

describe('POST /todos', () => {
    it('должен создавать новую задачу (todo) и возвращать ее', async () => {
      const todoData = {
        title: 'Новая задача',
        description: 'Описание новой задачи',
      };
  
      const response = await request.post('/todos').send(todoData);
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal(todoData.title);
      expect(response.body.description).to.equal(todoData.description);
    });
})

it('должен возвращать ошибку при неполных данных', async () => {
    const todoData = {
      title: 'Новая задача',
    };

    const response = await request.post('/todos').send(todoData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Title and description are required');
  });
