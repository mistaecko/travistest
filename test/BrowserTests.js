if(typeof mocha === 'undefined') {
  mocha = require('mocha');
}

mocha.setup({
  ui: 'bdd',
  ignoreLeaks: true,
  bail: false
});

describe('Foo', function() {
  it('should do magic', function() {

  });
});
