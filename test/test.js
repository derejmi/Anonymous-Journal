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

    it('404 everything else', done => {
        request(api)
            .get('/apple')
            .expect(404, done);
    });

     after(done => {
        // close the server, then run done
        console.log('Gracefully stopping test server')
        api.close(done)
    })

})
// describe('API server', () => {
//     let api
//     let testCheese = {
//         "name": "mozzerela",
        
//     }

// it('responds to post /cheeses with status 201', done => {
//     request(api)
//         .post('/cheeses')
//         .send(testCheese)
//         .expect(201)
//         .expect({id: 4, ...testCheese}, done)
// })
// })

describe('/POST cheeses', () => {
    it('it should  POST cheese ', (done) => {
        let cheese = {
            name: "mozerrela",
           
        }
      chai.request(server)
          .post('/cheese')
          .send(cheese)
    })
})