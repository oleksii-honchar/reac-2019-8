function get (req, res, next) {
  const pkgName = global.pkg.name || 'not specified'
  const pkgVersion = global.pkg.version || 'not specified'
  res.body = `${pkgName}:${pkgVersion}`
  res.statusCode = 200
  next()
}

export default { get }
