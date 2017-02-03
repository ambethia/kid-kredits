// Dynamically load all GraphQL files and export functions that return
// an array suitable for passing (...spread) to the Apollo decorator:
//   [SomeThing, { name: querySomeThing }]
// Passing false to the function will just return the query object
// Passing an object will merge it into the options.
module.exports = (rc => rc.keys().reduce((modules, path) => {
  const name = path.replace(/\W|gql$/g, '')
  modules[name] = (options = {}) => {
    const gql = rc(path)
    return options ? [gql, Object.assign({ name }, options)] : gql
  }
  return modules
}, {})
)(require.context('.', true, /\.gql$/))
