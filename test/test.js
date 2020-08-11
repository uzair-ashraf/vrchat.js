require('dotenv').config()
const chai = require('chai')
const { AuthError, BadRequest } = require('../dist/error-handling')
const { VRChat } = require('../dist/index')
const sinon = require('sinon')

const { expect } = chai

// Hides console logs to clean tests
// Comment out two lines below to see logs/errors to the console
// sinon.stub(console, 'log')
sinon.stub(console, 'error')

let vrchat = null
let authToken = null
let apiKey = null
let testUserId = null

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
        expect(apiKey).to.be.a('string')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  }).timeout(5000)

  describe('/GET User getInfo', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.user.getInfo()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should return user details', async () => {
      try {
        const userDetails = await vrchat.user.getInfo(authToken)
        expect(userDetails).to.be.a('object')
        expect(userDetails).to.have.property('username')
        expect(userDetails).to.have.property('friends')
        expect(userDetails).to.have.property('displayName')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET User getFriendsList', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.user.getFriendsList()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should return friends list', async () => {
      try {
        const friendsList = await vrchat.user.getFriendsList(authToken, apiKey)
        expect(friendsList).to.be.an('array')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET User getUsersList', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.user.getUsersList()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should return a list of 10 users', async () => {
      try {
        const users = await vrchat.user.getUsersList(authToken, apiKey, 'shadow')
        expect(users).to.be.an('array')
        expect(users.length).to.equal(10)
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('should return a list of 100 users', async () => {
      try {
        const users = await vrchat.user.getUsersList(authToken, apiKey, 'shadow', 100)
        expect(users).to.be.an('array')
        expect(users.length).to.equal(100)
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  // username is not the display name, but the actual username
  describe('/GET User getUserByName', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.user.getUserByName()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should throw a BadRequest Error for user not found', async () => {
      try {
        const user = await vrchat.user.getUserByName(authToken, apiKey, '3510674287')
      } catch (err) {
        expect(err instanceof BadRequest).to.be.true
      }
    })
    it('should return a user object', async () => {
      try {
        const user = await vrchat.user.getUserByName(authToken, apiKey, 'shadowroxas')
        expect(user).to.be.a('object')
        expect(user).to.have.property('username')
        expect(user).to.have.property('id')
        expect(user).to.have.property('displayName')
        expect(user).to.have.property('isFriend')
        testUserId = user.id
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET User getUserById', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.user.getUserById()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should throw a BadRequest Error for user not found', async () => {
      try {
        const user = await vrchat.user.getUserById(authToken, apiKey, '3510674287')
      } catch (err) {
        expect(err instanceof BadRequest).to.be.true
      }
    })
    it('should return a user object', async () => {
      try {
        const user = await vrchat.user.getUserById(authToken, apiKey, testUserId)
        expect(user).to.be.a('object')
        expect(user).to.have.property('username')
        expect(user).to.have.property('displayName')
        expect(user).to.have.property('isFriend')
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET World getWorldsList', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.world.getWorldsList()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should throw a Error for wrong world type', async () => {
      try {
        await vrchat.world.getWorldsList(authToken, apiKey, 'meow')
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please provide a valid world type')
      }
    })
    it('should throw a Error for wrong sort type', async () => {
      try {
        await vrchat.world.getWorldsList(authToken, apiKey, 'any', 100, 'meow')
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please supply a valid sorting option')
      }
    })
    it('should throw a Error for wrong order type', async () => {
      try {
        await vrchat.world.getWorldsList(authToken, apiKey, 'any', 100, 'popularity', 'meow')
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please supply a valid ordering option')
      }
    })
  })

})
