Swaps the locations/names/paths of two files or two directories.

Install with `npm install shwop`, or `npm install shwop -g` for use as a CLI.

```javascript
const shwop = require('shwop')

shwop('file1.txt', 'file2.txt')
.catch(console.error)

shwop('/absolute/path/file1.txt', 'relative/path/file2.txt')
.catch(console.error)

shwop('dir1/', 'dir2/')
.catch(console.error)
```

### shwop.sync

It can shwop stuff synchronously, too. Hope you have a good reason for using sync.

### CLI

If installed with `npm install shwop -g` it can be used as a global
command `shwop <path1> <path2>` which is useful when mucking about the terminal.

