import PropertiesBuilder from "../src/a1atscript/ng2Directives/PropertiesBuilder.js"

class Component {
  constructor() {

  }
}

describe("PropertiesBuilder", function() {
  var propertiesObj, properties;

  beforeEach(function() {
    propertiesObj = {
      "cheese": "danish",
      "apple": "apple"
    };
    properties = (new PropertiesBuilder(propertiesObj, Component)).build();
  });

  it("should setup the correct properties", function() {
    expect(properties).toEqual({
      "_@_cheese": "@danish",
      "_=_cheese": "=?bindDanish",
      "_@_apple": "@apple",
      "_=_apple": "=?bindApple"
    });
  });

  it("should setup the bind setter", function() {
    var component = new Component();
    component["_=_apple"] = "bind";
    expect(component.apple).toEqual("bind");
  });

  it("should setup the string setter", function() {
    var component = new Component();
    component["_@_apple"] = "string";
    expect(component.apple).toEqual("string");
  });

  it("should disable string if bind is used first", function() {
    var component = new Component();
    component["_=_apple"] = "bind";
    expect(() => component["_@_apple"] = "string").toThrow(new Error('Cannot use bind-apple and apple simultaneously'));
    expect(component.apple).toEqual('bind');
  });

  it("should disable bind if string is used first", function() {
    var component = new Component();
    component["_@_apple"] = "string";
    expect(() => component["_=_apple"] = "bind").toThrow(new Error('Cannot use bind-apple and apple simultaneously'));
    expect(component.apple).toEqual('string');
  });
});
