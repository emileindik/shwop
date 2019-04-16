module.exports = shwop
shwop.sync = shwopSync

const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const uniqueFilename = require('unique-filename')


async function shwop (item1, item2, callback) {

  // normalize paths (absolute)
  item1 = path.resolve(item1)
  item2 = path.resolve(item2)

  // tmpItem1 path. item name prefixed with original item1 name
  const tmpItem1 = uniqueFilename(os.tmpdir(), path.basename(item1))
  // console.log(tmpItem1)

  try {
  
    // make sure items exist and are writable
    for (const item of [item1, item2]) {
      await fs.access(item, fs.constants.R_OK | fs.constants.W_OK)
      await fs.access(path.join(item, '..'), fs.constants.R_OK | fs.constants.W_OK)
    }
    
    const stats1 = await fs.stat(item1)
    const stats2 = await fs.stat(item2)

    // items should both be the same
    const files = stats1.isFile() && stats2.isFile()
    const dirs = stats1.isDirectory() && stats2.isDirectory()
    if (!(files || dirs))
      throw new Error('Paths supplied must both point to files or both to directories.')

    // create tmp item
    await fs.copy(item1, tmpItem1)

    // rename item2 -> item1
    await fs.move(item2, item1, { overwrite: true })  

    // rename tmpItem1 -> item2
    await fs.move(tmpItem1, item2)

  } catch (err) {
    if (typeof callback === 'function') return callback(err)
    else throw err
  }

  if (typeof callback === 'function') return callback(null)
}





function shwopSync (item1, item2) {

  // normalize paths (absolute)
  item1 = path.resolve(item1)
  item2 = path.resolve(item2)

  // tmpItem1 path. item name prefixed with original item1 name
  const tmpItem1 = uniqueFilename(os.tmpdir(), path.basename(item1))
  // console.log(tmpItem1)

  // make sure items exist and are writable
  for (const item of [item1, item2]) {
    fs.accessSync(item, fs.constants.R_OK | fs.constants.W_OK)
    fs.accessSync(path.join(item, '..'), fs.constants.R_OK | fs.constants.W_OK)
  }
  
  const stats1 = fs.statSync(item1)
  const stats2 = fs.statSync(item2)

  // items should both be the same
  const files = stats1.isFile() && stats2.isFile()
  const dirs = stats1.isDirectory() && stats2.isDirectory()
  if (!(files || dirs))
    throw new Error('Paths supplied must both point to files or both to directories.')

  // create tmp item
  fs.copySync(item1, tmpItem1)

  // rename item2 -> item1
  fs.moveSync(item2, item1, { overwrite: true })  

  // rename tmpItem1 -> item2
  fs.moveSync(tmpItem1, item2)

}


