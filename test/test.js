require('dotenv').config()
const chai = require('chai')
const { AuthError } = require('../dist/error-handling')
const { VRChat } = require('../dist/index')
const sinon = require('sinon')

const { expect } = chai

// Hides console logs to clean tests
// Comment out two lines below to see logs/errors to the console
sinon.stub(console, 'log')
sinon.stub(console, 'error')

let vrchat = null
let authToken = null
let apiKey = null

describe('VRChat Library', () => {

  describe('Library instantiation', () => {

    it('should return an instance of VRChat', done => {
      vrchat = new VRChat()
      expect(vrchat).to.be.an('object')
      expect(vrchat instanceof VRChat).to.be.true
      done()
    })

  })
  describe('/GET Authorization', () => {

    it('should throw a TypeError', async () => {
      try {
        await vrchat.getToken()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })

    it('should throw an AuthError', async () => {
      try {
        await vrchat.getToken('hello', 'world')
      } catch (err) {
        expect(err instanceof AuthError).to.be.true
        expect(err.status === 401).to.be.true
      }
    })

    it('should return an auth token', async () => {
      try {
        authToken = await vrchat.getToken(process.env.USERNAME, process.env.PASSWORD)
        expect(authToken).to.be.a('string')
        expect(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(authToken)).to.be.true
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('Generate Api Key', () => {
    it('should throw a TypeError', async () => {
      try {
        const apiKey = await vrchat.generateApiKey()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should generate an api key', async () => {
      try {
        apiKey = await vrchat.generateApiKey(authToken)
        console.log(apiKey)
        expect(apiKey).to.be.a('string')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET User Details', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.getUserDetails()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should return user details', async () => {
      try {
        const userDetails = await vrchat.getUserDetails(authToken)
        expect(userDetails).to.be.a('object')
        expect(userDetails).to.have.property('username')
        expect(userDetails).to.have.property('friends')
        expect(userDetails).to.have.property('displayName')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET Friends List', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.getFriendsList()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should return friends list', async () => {
      try {
        const friendsList = await vrchat.getFriendsList(authToken, apiKey)
        expect(friendsList).to.be.an('array')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

})
