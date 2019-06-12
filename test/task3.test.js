const { expect } = require(`chai`);
const sinon = require(`sinon`);
const MotorwayApi = require(`../task3/motorway_api`);
const getAllVisits = require(`../task3/get_all_visits`);

const jsonMock = {
  data: [
    { id: 0, name: 'Visitor #0', date: '2019-06-08T06:33:33+00:00' },
    { id: 1, name: 'Visitor #1', date: '2019-06-05T06:46:49+00:00' },
    { id: 2, name: 'Visitor #2', date: '2019-05-26T14:09:14+00:00' },
    { id: 3, name: 'Visitor #3', date: '2019-05-30T06:27:44+00:00' },
    { id: 4, name: 'Visitor #4', date: '2019-06-04T23:45:59+00:00' },
    { id: 5, name: 'Visitor #5', date: '2019-06-02T17:30:48+00:00' },
    { id: 6, name: 'Visitor #6', date: '2019-06-04T07:45:21+00:00' },
    { id: 7, name: 'Visitor #7', date: '2019-05-30T18:19:07+00:00' },
    { id: 8, name: 'Visitor #8', date: '2019-06-08T17:44:12+00:00' }
  ],
  total: 9
};

describe(`Task #3 - visits`, () => {
  describe(`MotorwayApi`, () => {
    const client = new MotorwayApi(`https://motorway-challenge-api.herokuapp.com`);  

    context(`when executing login`, () => {
      it(`token should be setted`, async() => {
        await client.login();
        expect(client.getToken()).to.be.a('string');
      });
    });

    context(`when executing getVisits with page 1`, () => {
      it(`token should be setted`, async() => {
        const response = await client.getVisits(1);
        expect(response).to.have.property('data');
        expect(response).to.have.property('total');
        expect(response.data).to.be.an('array');

        for(data of response.data) {
          expect(data).to.have.property(`id`);
          expect(data).to.have.property(`name`);
          expect(data).to.have.property(`date`);
          expect(data.id).to.be.a(`number`);
          expect(data.name).to.be.a(`string`);
          expect(data.date).to.be.a(`string`);
        }

      });
    });

  });

  describe(`getAllVisits`, () => {
    context(`when getting all visits`, () => {
      it(`should return an array`, async () => {
        sinon.stub(MotorwayApi.prototype, 'getVisits')
          .returns(jsonMock);

        const result = await getAllVisits();

        expect(result).to.be.an(`array`);
        expect(result.length).to.be.equals(5);

        for(visitor of result) {
          expect(visitor).to.have.property(`name`);
          expect(visitor).to.have.property(`visits`);
          expect(visitor.visits).to.be.equal(1);
        }

        MotorwayApi.prototype.getVisits.restore();
      })
    });
  });

});