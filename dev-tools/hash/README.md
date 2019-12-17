# Hash tool

### what is it

- asset management tool

### what does it

- represent assets via a content-addressed name

### how it works

- assets are renamed from `name.ext` to `name-<MD5>.ext`
- all references to `name-.*.ext` get renamed to `name-<MD5>.ext`

### how to use it

```
go run dev-tools/hash/main.go manifest.json
```
