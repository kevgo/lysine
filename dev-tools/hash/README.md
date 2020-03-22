# Hash tool

### what is it

- asset management tool

### what does it

- gives assets a content-addressed name

### why we need it

- content-addressed names allow aggressive caching (for offline use) while limiting reloading to assets that have
  changes

### how it works

- assets are renamed from `name.ext` to `name-<MD5>.ext`
- all references to `name.*.ext` get renamed to `name-<MD5>.ext`

### how to use it

```
go run dev-tools/hash/main.go <filename without hash>
```
