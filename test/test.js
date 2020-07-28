const chai = require('chai')
const chaiHttp = require('chai-http')
const VRChat = require('../dist/index')

chai.use(chaiHttp)

const { expect } = chai

let vrchat = null

describe('VRChat Library', () => {

  describe('Library instantion', () => {
    it('should return an instance of VRChat', done => {
      vrchat = new VRChat()
      expect(vrchat).to.be.an('object')
      expect(vrchat instanceof VRChat).to.be.true
      done()
    })
  })

})
