const { log } = console;
//prototype chain
function Animal(name) {
  this.name = name;
}

Animal.prototype.run = function () {
  log(`${this.name} runing...`);
};

function Rebbit(name, type) {
  Animal.call(this, name);
  this.type = type;
}
Rebbit.prototype.crow = function () {
  log(this.type);
};
Rebbit.prototype.__proto__ = Animal.prototype;
log(new Rebbit("ali", "reb").toString());
