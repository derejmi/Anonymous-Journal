const request = require('supertest');
const server = require ('../server');
const expect = require('chai').expect;
const chaiHttp = require("chai-http");
 let chai = require('chai');
 
const { post, response } = require('../server/server');

// const { expect } = chai;
chai.use(chaiHttp);

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
    // it("will post", done => {
    //     chai
    //       .request(app)
    //       .post("/posts")
    //       .send({ num1: 5, num2: 5 })
    //       .end((err, res) => {
    //         expect(res).to.have.status(200);
    //         expect(res.body.status).to.equals("success");
    //         expect(res.body.result).to.equals(10);
    //         done();
    //       });

  

    it('404 everything else', done => {
        request(api)
            .get('/apple')
            .expect(404, done);
    });
    it('should take less than 10000ms', function(done){
        this.timeout(10000);
        setTimeout(done, 300);
      });

     after(done => {
        // close the server, then run done
        console.log('Gracefully stopping test server')
        api.close(done)
    })



})
//testing POST methods
describe ("POST /post methods",() => {
    it("should get /post ",(done)=>{
        const incomingRequest = {
            name: "charanjit",
            content: "im posting",
            gif: ""

        };
        chai.request(server)
        .post("/posts")
        .send(incomingRequest)
        .end(function (err, res) {
          expect(res).to.have.status(500)
          done()
        });
 

        
        
        


    })
    it("should get /comments ",(done)=>{
        const commente = {
           comment: "hi omg"

        };
        chai.request(server)
        .post("/comments")
        .send(commente)
        .end(function (err, res) {
          expect(res).to.have.status(201)
          done()
        });


})
// it("should get /emoji ",(done)=>{
//     const commente = {
//        comment: "hi omg"

//     };
//     chai.request(server)
//     .post("/emoji")
//     .send(commente)
//     .end(function (err, res) {
//       expect(res).to.have.status(201)
//       done()
//     });



// 
})
