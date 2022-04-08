const app = require('../Actdes');
const assert = require('assert');
const request = require('supertest');

describe('POST /Restaurant', ()=>  {
	let data = {
	   "id": "109",
       "name": "Home Made",
       "address": "82 Frost Street, Williamson, Florida",
       "about": "Qui magna commodo laborum ad aute velit. Incididunt proident eu in cupidatat aliquip velit eiusmod nostrud ut fugiat duis velit magna.",
       "jours d'ouverture": "tous les jours",
       "horaires d'ouverture" : "9h-22h",
       "tel" : "454555",
	   "type de restaurant": " family style"	
	}
 }
 it('respond with 201 created', (done) => {
	 request(app)
	      .post('/Restaurant')
		  .send(data)
		  .set('Accept', 'application/json')
		  .expect('Content-Type', /json/)
		  .expect(200)
		  .end((err) => {
			  if (err) return done(err);
			  done();
		  });
 });
})

///FAUSSE DATA 
describe('POST /Restaurant', ()=>  {
	let data = {
	   
       "address": "82 Frost Street, Williamson, Florida",
       "about": "Qui magna commodo laborum ad aute velit. Incididunt proident eu in cupidatat aliquip velit eiusmod nostrud ut fugiat duis velit magna.",
       "jours d'ouverture": "tous les jours",
       "horaires d'ouverture" : "9h-22h",
       "tel" : "454555",
	   "type de restaurant": " family style"	
	}
 }
 it('respond with 400 not created', (done) => {
	 request(app)
	      .post('/Restaurant')
		  .send(data)
		  .set('Accept', 'application/json')
		  .expect('Content-Type', /json/)
		  .expect(400)
		  .expect(' " le Restaurant nest pas ajouter"')
		  .end((err) => {
			  if (err) return done(err);
			  done();
		  });
 });
})

///GET ROUTE 
describe('GET /Restaurant', () {
	it('respond with json Restaurant not found', (done) {
		request(app)
		    .get('/Restaurant')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

///DELETE ROUTE 
describe("DELETE  /Restaurant/:id", () => {
	it("DELETE an existing Restaurant", (done) => {
		const Id = 1;
		request(app)
		    .get("/Restaurant/" +Id)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});
///ID NO EXISTING
describe('DELETE /Restaurant/:id', () {
	it('respond with json Restaurant not found', (done) {
		const id = 265
		request(app)
		    .get('/Restaurant' +id)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.expect('"Restaurant not found"')
			.end((err) => {
				if (err) return done(err);
				done();
			});
	});
});

