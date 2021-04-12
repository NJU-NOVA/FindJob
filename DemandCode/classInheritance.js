const { log } = console;
function Aniaml(name) {
  this.name = name;
  this.speed = 0;
}
Aniaml.prototype.run = function (speed) {
  this.speed = speed;
  log(`${this.name} run with speed ${this.speed}`);
};

Aniaml.prototype.stop = function () {
  this.speed = 0;
  log(`${this.name} stands still.`);
};

function Rebbit(name) {
  Aniaml.apply(this, [name]);
}

Rebbit.prototype.__proto__ = Aniaml.prototype;

new Rebbit("rebbit").run(100);
