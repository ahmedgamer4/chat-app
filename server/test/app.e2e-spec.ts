import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  const newUserName = `Tester${Date.now()}`;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('UsersController', () => {
    it('/ (GET) fail to find when token is not provided', async () => {
      return request(app.getHttpServer()).get('/api/users').expect(401);
    });

    it('/ (POST) cannot create new user if the email is already user', async () => {
      const newUser = {
        name: 'ahmed',
        email: 'email@email.com',
        password: 'ahmed123',
      };

      return request(app.getHttpServer())
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });

    it('/ (POST) create new user', async () => {
      const newUser = {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
      };

      return request(app.getHttpServer())
        .post('/api/users')
        .send(newUser)
        .expect(201);
    });

    it('/ (POST) can login user', async () => {
      return request(app.getHttpServer())
        .post('/api/auth/email/login')
        .send({
          email: 'email@email.com',
          password: 'ahmed123',
        })
        .expect(200)
        .then(({ body }) => {
          jwtToken = body.token;
        });
    });

    it('/ (GET) can get a user with id when a user is logged in', async () => {
      return request(app.getHttpServer())
        .get('/api/users/33')
        .auth(jwtToken, {
          type: 'bearer',
        })
        .expect(200);
    });

    it('/ (PUT) can update existing user', async () => {
      return request(app.getHttpServer())
        .put('/api/users/33')
        .send({
          name: 'newName',
          // message: test
        })
        .auth(jwtToken, {
          type: 'bearer',
        })
        .expect(200);
    });
  });

  describe('MessagesController', () => {
    it('/ (GET) cannot get messages when user is not logged in', async () => {
      return request(app.getHttpServer()).get('/api/messages').expect(401);
    });

    it('/ (GET) can get messages when user is logged in', async () => {
      return request(app.getHttpServer())
        .get('/api/messages')
        .auth(jwtToken, {
          type: 'bearer',
        })
        .expect(200);
      // .then((body: any) => {
      //   testMessage = body
      // })
    });

    it('/ (POST) create new message when user is not logged in', async () => {
      return request(app.getHttpServer())
        .post('/api/messages?group_id=1')
        .send({
          content: 'message',
        })
        .auth(jwtToken, {
          type: 'bearer',
        })
        .expect(201);
    });
  });

  describe('GroupsController', () => {
    it('/ (GET) cannot get groups when user is not logged in', async () => {
      return request(app.getHttpServer()).get('/api/groups').expect(401);
    });

    it('/ (GET) can get groups when user is logged in', async () => {
      return request(app.getHttpServer())
        .get('/api/groups')
        .auth(jwtToken, {
          type: 'bearer',
        })
        .expect(200);
    });

    // it('(PUT) can add users and messages to a group', async () => {
    //   return request(app.getHttpServer())
    //     .put('/api/groups/1')
    //     .send({
    //       name: 'Group',
    //       createMessageDto: { content: 'message' },
    //     })
    //     .auth(jwtToken, {
    //       type: 'bearer',
    //     })
    //     .expect(200);
    // });
  });
});
