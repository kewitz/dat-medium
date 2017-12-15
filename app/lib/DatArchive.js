if (window.DatArchive) {
  window.DatArchive.prototype.exists = async function (path) {
    return this.stat(path).then(() => true, () => false)
  }
}
