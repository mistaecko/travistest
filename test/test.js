/*global describe, beforeEach, it*/

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');

describe('Webapp generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, '..', 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.webapp = helpers.createGenerator('skylark:app', [
        '../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files', function (done) {
    var expected = [
      //['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      ['gruntfile.js'],
      'favicon.ico',
      '.editorconfig',
      'robots.txt',
      ['index.html', /<title>temp<\/title>/],
      'main.css',
      'assets/pig.png',
      'tools/compile.tsc',
      'tools/server.js',
      'src/Game.ts',
      'src/_references.ts'
    ];

    this.webapp.options['skip-install'] = true;
    this.webapp.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  // note: this test takes a significant amount of time!
  it.skip('triggers `grunt setup`', function(done) {
    // npm install might take a significant amount of time
    this.timeout(60000);

    var expected = [
      'skylark/skylark.d.ts',
      'skylark/skylark.js',
      'skylark/skylark.js.map',
      'skylark/skylark-externs.js'
    ];

    var eventFired = 0;
    this.webapp.on('gruntSetup', function() { eventFired++; });
    this.webapp.run({}, function () {
      assert.equal(eventFired, 1);
      helpers.assertFiles(expected);
      done();
    });

  });

});
