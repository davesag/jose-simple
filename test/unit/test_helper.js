const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
const sinonStubPromise = require('sinon-stub-promise')

chai.use(sinonChai)
chai.use(chaiAsPromised)
sinonStubPromise(sinon)
