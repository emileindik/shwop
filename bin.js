#!/usr/bin/env node

const shwop = require('./')

let help = false
const args = process.argv.slice(2).filter(arg => {
  if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
    help = true
  else
    return !!arg
})

if (help || args.length < 2) {
  // If they didn't ask for help, then this is not a "success"
  const log = help ? console.log : console.error
  log('Usage: shwop <path1> <path2>')
  log('')
  log('  Swaps the location of the two specified items.')
  log('')
  log('Options:')
  log('')
  log('  -h, --help     Display this usage info')
  process.exit(help ? 0 : 1)
} else {
  shwop(args[0], args[1])
}

