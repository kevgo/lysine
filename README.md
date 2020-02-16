# Lysine/Arginine ratio for common foods

### Web site

https://kevgo.github.io/lysine

Once the browser has cached the assets, the site is available offline.

### Application

This is a
[progressive web application](https://en.wikipedia.org/wiki/Progressive_web_application).
You can install it from a modern browser onto PCs, tablets, and smart phones.

### Development

#### local web server

- start local web server: `make local-start`
- open http://penguin.linux.test:2015 in your browser
- to stop the web server: `make local-stop`

#### debug on mobile phone

- `ssh -R 80:localhost:2015 ssh.localhost.run`

#### testing

- run unit tests: `make test`

#### asset management

- assets use content-addressed names, you have to rebuild them after making
  changes
- build assets: `make build`

#### data

The data file contains the following data:

- column 1: food name
- column 2: ratio of Lysine to Arginine
  - 10 = 1:1 ratio
  - 5 = 1:2 ratio
  - 30 = 3:1 ratio
- column 3: total amount of Lysine + Arginine compared to 1 kg
  - 10 = 10 g Lysine + Arginine per kg of product

#### code statistics

- install [scc](https://github.com/boyter/scc)
- run `make stats`
