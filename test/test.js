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
let testWorldId = null


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Testing VRChat Class///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

describe('VRChat Library', () => {

  describe('Library instantiation', () => {

    it('should return an instance of VRChat', done => {
      vrchat = new VRChat()
      expect(vrchat).to.be.an('object')
      expect(vrchat instanceof VRChat).to.be.true
      done()
    })

  })
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Testing System Api/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Testing User Api///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


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
    it('should return friends list of 10 people max', async () => {
      try {
        const friendsList = await vrchat.user.getFriendsList(authToken, apiKey, {
          n: 10
        })
        expect(friendsList).to.be.an('array')
        expect(friendsList.length <= 10).to.be.true
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
    it('should throw an error for invalid user type', async () => {
      try {
        await vrchat.user.getUsersList(authToken, apiKey, 'meow')
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please provide a valid user type')
      }
    })
    it('should throw an error for missing search property', async () => {
      try {
        await vrchat.user.getUsersList(authToken, apiKey, 'all', {
          search: ''
        })
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please provide a valid search parameter')
      }
    })
    it('should return a list of 10 users', async () => {
      try {
        const users = await vrchat.user.getUsersList(authToken, apiKey, 'all', {
          search: 'shadow'
        })
        expect(users).to.be.an('array')
        expect(users.length).to.equal(10)
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('should return a list of 100 users', async () => {
      try {
        const users = await vrchat.user.getUsersList(authToken, apiKey, 'all', {
          search: 'shadow',
          n: 100
        })
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
    }).timeout(5000)
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
    }).timeout(5000)
  })

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Testing World Api//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


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
        await vrchat.world.getWorldsList(authToken, apiKey, 'any', {
          sort: 'meow'
        })
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please supply a valid sorting option')
      }
    })
    it('should throw a Error for wrong order type', async () => {
      try {
        await vrchat.world.getWorldsList(authToken, apiKey, 'any', {
          sort: 'popularity',
          order: 'meow'
        })
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please supply a valid ordering option')
      }
    })
    it('should throw a Error for wrong releaseStatus type', async () => {
      try {
        await vrchat.world.getWorldsList(authToken, apiKey, 'any', {
          sort: 'popularity',
          order: 'ascending',
          releaseStatus: 'meow'
        })
      } catch (err) {
        expect(err instanceof Error).to.be.true
        expect(err.message).to.equal('Please supply a valid releaseStatus option')
      }
    })
    it('should return an array of 10 worlds', async () => {
      try {
        const worlds = await vrchat.world.getWorldsList(authToken, apiKey)
        expect(worlds).to.be.a('array')
        expect(worlds.length).to.be.equal(10)
        testWorldId = worlds[0].id
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('should return an array of 100 worlds', async () => {
      try {
        const worlds = await vrchat.world.getWorldsList(authToken, apiKey, 'any', {
          n: 100
        })
        expect(worlds).to.be.a('array')
        expect(worlds.length).to.be.equal(100)
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('should return the users own worlds or an empty array', async () => {
      try {
        const worlds = await vrchat.world.getWorldsList(authToken, apiKey, 'any', {
          user: 'me'
        })
        expect(worlds).to.be.a('array')
        expect(worlds.length === 0 || worlds[0].authorId === testUserId).to.be.true
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET World getWorldById', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.world.getWorldById()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should throw a 404 Error for World not found', async () => {
      try {
        const world = await vrchat.world.getWorldById(authToken, apiKey, 'meow')
      } catch (err) {
        expect(err instanceof BadRequest).to.be.true
        expect(err.status === 404).to.be.true
      }
    })
    it('should return a world', async () => {
      try {
        const world = await vrchat.world.getWorldById(authToken, apiKey, testWorldId)
        expect(world).to.be.a('object')
        expect(world).to.have.property('id')
        expect(world).to.have.property('name')
        expect(world).to.have.property('description')
        expect(world).to.have.property('featured')
        expect(world.id === testWorldId).to.be.true
      } catch (err) {
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })

  describe('/GET World getWorldMetaData', () => {
    it('should throw a TypeError', async () => {
      try {
        await vrchat.world.getWorldMetaData()
      } catch (err) {
        expect(err instanceof TypeError).to.be.true
      }
    })
    it('should throw a 404 Error for World not found', async () => {
      try {
        await vrchat.world.getWorldMetaData(authToken, apiKey, 'meow')
      } catch (err) {
        expect(err instanceof BadRequest).to.be.true
        expect(err.status === 404).to.be.true
      }
    })
    it('should return world metadata', async () => {
      try {
        const worldMetaData = await vrchat.world.getWorldMetaData(authToken, apiKey, testWorldId)
        expect(worldMetaData).to.have.property('id')
        expect(worldMetaData).to.have.property('metadata')
        expect(worldMetaData.id === testWorldId).to.be.true
        expect(worldMetaData.metadata).to.be.a('object')
      } catch (err) {
        expect(err instanceof BadRequest).to.be.true
        expect(err.status === 404).to.be.true
      }
    })
  })

})
