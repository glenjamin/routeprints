const Watchpack = require("watchpack");

/**
 * @param  {string} dir
 * @return {void}
 */
module.exports = function watchModuleCache(dir) {
  console.log(`Watching for changes in ${dir}`);

  new Watchpack({
    aggregateTimeout: 50
  })
    .on("aggregated", () => {
      console.log(`Clearing module cache for anything under ${dir}`);
      Object.keys(require.cache).forEach(function(id) {
        if (id.startsWith(dir)) delete require.cache[id];
      });
    })
    .watch([], [dir], Date.now() - 1000);
};
