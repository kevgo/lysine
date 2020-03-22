build: ## builds all the binaries
	@go build -o dev-tools/hash/hash dev-tools/hash/hash.go
	dev-tools/hash/hash index.js
	dev-tools/hash/hash index.css
	dev-tools/hash/hash icons/icon-64.png
	dev-tools/hash/hash icons/icon-128.png
	dev-tools/hash/hash icons/icon-180.png
	dev-tools/hash/hash icons/icon-512.png
	dev-tools/hash/hash manifest.json
	dev-tools/hash/hash nutrients.tsv
	dev-tools/hash/hash worker.js

fix: ## fixes all auto-fixable errors
	@dev-tools/prettier/node_modules/.bin/prettier --write .

lint: ## displays lint errors
	@dev-tools/prettier/node_modules/.bin/prettier -c .

local-start:  ## starts the local dev server
	@./dev-tools/caddy/caddy &
	@xdg-open http://penguin.linux.test:2015

local-stop:  ## stops the local dev server
	@killall caddy

stats:  # shows code statistics
	@find . -type f | grep -v './dev-tools/' | grep -v '\./.git/' | xargs scc

test:  ## runs the unit tests
	@node --no-warnings test/trie-test.mjs
	@node --no-warnings test/is-letter-test.mjs
	@node --no-warnings test/nutrients-db-test.mjs
.PHONY: test
