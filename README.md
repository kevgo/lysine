# Amino Acid balance

You can reach this site at https://kevgo.github.io/lysine

## Architecture

- CSS and JS assets are embedded into the main HTML file for non-blocking page
  load
- all other static assets (manifest.json, raw-data.json, icons) have
  content-addressable names. We cache them aggressively, they get re-fetched
  automatically when their content changes because then they have a different
  name.

## Development

Local web server:

- start local web server: `make local-start`
- open http://penguin.linux.test:2015 in your browser
- to stop the web server: `make local-stop`

Run tests:

```
make test
```

Compile assets:

```
make build
```
