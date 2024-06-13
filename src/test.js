const chai = require('chai');
const supertest = require('supertest');
const app = require('./app');

const todo = require("./routes/todosRoutes")

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



  describe('POST /register', () => {
    it('должен регистрировать нового пользователя и возвращать сообщение', async () => {
      const userData = {
        username: 'RyanGosling',
        password: 'testpassword',
      };
  
      const response = await request.post('/register').send(userData);
  
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('User registered successfully');
    });
  
    it('должен возвращать ошибку при неполных данных', async () => {
      const userData = {
        username: 'testuser',
      };
  
      const response = await request.post('/register').send(userData);
  
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Username and password are required');
    });
  });
  
  describe('POST /login', () => {
    it('должен входить пользователя и возвращать сообщение', async () => {
      const userData = {
        username: 'RyanGosling',
        password: 'testpassword',
      };
  
      // Регистрируем пользователя перед входом
      await request.post('/register').send(userData);
  
      // Входим с теми же учетными данными
      const response = await request.post('/login').send(userData);
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Login successful');
    });
  
    it('должен возвращать ошибку при неверных учетных данных', async () => {
      const userData = {
        username: 'testuser',
        password: 'testpassword',
      };
  
      const response = await request.post('/login').send(userData);
  
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.equal('Invalid username or password');
    });
  });  