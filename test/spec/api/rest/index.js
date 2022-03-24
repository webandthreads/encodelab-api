const supertest = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const { clone } = require('../../../util');
const app = require('../../../../app');
const fixtures = require('../../../fixtures');
const selfReferencingEffectServiceHandler = require('../../../../src/service-handlers/self-referencing-effect');

const { expect } = chai;

describe('Router', () => {
  describe('_ping', () => {
    it('responds 200', () => supertest(app.instance())
      .get('/_ping')
      .expect(200));
  });

  describe('POST - /api/v1/participation/self-referencing-effect', () => {
    let mailParticipationStub;
    beforeEach(() => {
      mailParticipationStub = sinon.stub(selfReferencingEffectServiceHandler, 'mailParticipation').resolves();
    });

    it('Should send participation data by email and respond 200', () => supertest(app.instance())
      .post('/api/v1/participation/self-referencing-effect')
      .send(fixtures.api.rest.postSelfReferencingEffect.request)
      .expect(200)
      .then(async (response) => {
        expect(response.body).deep.equal({});
      }));

    it('Should return 400 if missing required params', async () => {
      const request = clone(fixtures.api.rest.postSelfReferencingEffect.request);
      delete request.participant;
      await supertest(app.instance())
        .post('/api/v1/participation/self-referencing-effect')
        .send(request)
        .expect(400)
        .then(({ body }) => {
          expect(body.name).equal('ValidationError');
        });
    });
  });
});
