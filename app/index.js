'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  // welcome message
  if (!this.options['skip-welcome-message']) {
    console.log(
      '\n   ' +
      '\n   Stamping out a new Skylark project...' +
      '\n   '
    );
  }
};

AppGenerator.prototype.buildfiles = function gruntfile() {
  this.copy('gruntfile.js', 'gruntfile.js');
  this.copy('tools/compile.tsc', 'tools/compile.tsc');
  this.copy('tools/server.js', 'tools/server.js');
};


AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'favicon.ico');
  this.copy('robots.txt', 'robots.txt');
};

AppGenerator.prototype.assets = function assets() {
  this.copy('assets/pig.png', 'assets/pig.png');
}

AppGenerator.prototype.src = function src() {
  this.copy('src/Game.ts', 'src/Game.ts');
  this.copy('src/_references.ts', 'src/_references.ts');
}

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
    this.copy('main.css', 'main.css');
};

AppGenerator.prototype.index = function writeIndex() {
  this.copy('index.html', 'index.html');
};

AppGenerator.prototype.app = function app() {
};

AppGenerator.prototype.npm = function xyz() {
  if(this.options['skip-install'])
    return;

  var cb = this.async();
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-install-message'],
      callback: cb
    });
}

AppGenerator.prototype.gruntSetupTask = function gruntSetupTask() {
  if(this.options['skip-install'])
    return;

  var cb = this.async();

  var eventName = 'gruntSetup';
  this.emit(eventName);

  this.spawnCommand('grunt', ['setup'], cb)
    .on('error', cb)
    .on('exit', this.emit.bind(this, eventName + ':end'))
    .on('exit', function (err) {
      cb(err);
    }.bind(this));

  return this;
}
