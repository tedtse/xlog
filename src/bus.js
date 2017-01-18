module.exports = {
  bindings: {},

  on: function (name, handler, ctx, once) {
    var base = this.bindings;
    if (!base[name]) {
      base[name] = [];
    }
    return this.bindings[name].push({
      handler: handler,
      ctx: ctx,
      once: once
    });
  },

  once: function (name, handler, ctx) {
    this.on(name, handler, ctx, true);
  },

  dispatch: function () {
    var args = Array.prototype.slice.call(arguments);
    var name = args[0];
    var _args = args.slice(1);
    var ref = this.bindings[name];
    var results, binding, handler, ctx, once;
    if (ref) {
      results = [];
      for (var i = 0, j = ref.length; i < j; i++) {
        binding = ref[i];
        handler = binding.handler;
        ctx = binding.ctx;
        once = binding.once;
        results.push(handler.apply(!!ctx ? ctx : this, _args));
        if (once) {
          results.push(this.bindings[name].splice(i, 1));
        }
      }
      return results;
    }
  }
};