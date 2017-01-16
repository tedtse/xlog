module.exports = {
  bindings: {},

  on: function (name, fn) {
    var base = this.bindings;
    if (!base[name]) {
      base[name] = [];
    }
    return this.bindings[name].push(fn);
  },

  dispatch: function () {
    var args = Array.prototype.slice.call(arguments);
    var name = args[0];
    var ref = this.bindings[name];
    var results, binding;
    _args = args.slice(1);
    if (ref) {
      results = [];
      for (var i = 0, j = ref.length; i < j; i++) {
        binding = ref[i];
        results.push(binding.apply(this, _args));
      }
      return results;
    }
  }
};