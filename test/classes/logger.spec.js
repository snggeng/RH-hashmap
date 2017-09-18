import { expect } from 'chai'
import sinon from 'sinon'
import Logger from '../../logger'

const TestString = '    ✓' // nice hack to keep the mocha report clean. LOL.

describe('Logger', () => {
  it('should log a message to the console', () => {
    const logger = new Logger()
    const spy = sinon.spy(console, 'log')

    logger.log(TestString)

    expect(spy.calledOnce)
    expect(spy.calledWithMatch(TestString))

    spy.restore()
  })
})
