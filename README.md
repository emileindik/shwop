Swaps the contents of two files or two directories.
I.e. swap their full path including name

Install with `npm install shwop`, or `npm install shwop -g` for use as a CLI.

### Examples
```javascript
const shwop = require('shwop')

// If supplied a callback, shwop will call it
shwop('file1.txt', 'file2.txt', err => {
  if (err) {
    // handle err
  }
})

// If no callback supplied, will return a Promise
shwop('file1.txt', 'file2.txt')
.catch(console.error)

shwop('/absolute/path/file1.txt', 'relative/path/file2.txt')
.catch(console.error)

shwop('dir1/', 'dir2/')
.catch(console.error)

shwop.sync('file1.txt', 'file2.txt')
```

### shwop.sync

It can also shwop stuff synchronously. Hope you have a good reason for using sync.

### CLI

If installed with `npm install shwop -g` it can be used as a global
command `shwop <path1> <path2>` which is useful when mucking about the terminal.

