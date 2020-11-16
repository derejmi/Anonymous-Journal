const request = require('supertest');
const server = require ('../server');
const expect = require('chai').expect;
//const describe = require('mocha').describe;


describe('API endpoints', () => {
    let api 
    before(() => {
        console.log('setting up')
        api = server.listen(3000, 'localhost');
    });

    // it('reacts  to /', done => {
    //     request(api)
    //         .get('/')
    //         .expect(200, done);
    // });

    it('responds to /cheeses', done => {
        request(api)
            .get('/cheeses')
            .expect(200, done);
    });
})
