var fs = require("fs");
var path = require("path");
var expect = require("chai").expect;
var PopupDispatcher = require("../dist").default;


describe('', function() {
  var disp, fired
  var TIMEOUT_DELTA = 20
  var TIMEOUT_LESS
  var TIMEOUT_MORE

  beforeEach(function() {
    fired = false
    disp = new PopupDispatcher()
    disp.on('done', function() {
      fired = true
    })
    TIMEOUT_LESS = disp.timeout - TIMEOUT_DELTA
    TIMEOUT_MORE = disp.timeout + TIMEOUT_DELTA
  });

  it('do not fire without start', function(done) {
    expect(fired).to.be.false
    disp.watch()
    expect(fired).to.be.false
    setTimeout(function() {
      expect(fired).to.be.false
      disp.finish()
      expect(fired).to.be.true
      done()
    }, TIMEOUT_MORE)
  });

  it('fire with start', function(done) {
    expect(fired).to.be.false
    disp.start()
    expect(fired).to.be.false
    disp.watch()
    expect(fired).to.be.false
    setTimeout(function() {
      expect(fired).to.be.true
      disp.finish()
      expect(fired).to.be.true
      done()
    }, TIMEOUT_MORE)
  });

  it('mouse events with override', function(done) {
    var sinonims = disp.props({
      onMouseOver: () => true,
      onMouseOut: () => true,
    })
    expect(fired).to.be.false
    disp.start()
    expect(fired).to.be.false
    sinonims.onMouseOut()
    expect(fired).to.be.false
    setTimeout(function() {
      expect(fired).to.be.false
      sinonims.onMouseOver()
      sinonims.onMouseOut()
      setTimeout(function() {
        expect(fired).to.be.true
        done()
      }, TIMEOUT_MORE)
    }, TIMEOUT_LESS)
  });

  it('onMouseOut is watch', function() {
    expect(disp.props().onMouseOut).to.equal(disp.watch)
  });

  it('onMouseOver is unwatch', function() {
    expect(disp.props().onMouseOver).to.equal(disp.unwatch)
  });

});
