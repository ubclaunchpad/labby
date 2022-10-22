import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import questionRouter from '../src/routes/questionRoute.js';

describe('Test Question Route', function () {

    const app = new express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/', questionRouter);

    test('getQuestion', async () => {
        const res = await request(app).get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('question');
        expect(JSON.parse(res.text)["response"]).toEqual('Question Loaded Successfully');
    });

    test('postQuestion', async () => {
        const payload = {question_id: 'ABC', question_title: 'Question Test 1' };
        const res = await request(app).post('/').send(payload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('question_id');
        expect(res.body).toHaveProperty('question_title');
        expect(JSON.parse(res.text)["result"]).toEqual('Question Question Test 1 Saved Successfully');
    });

});