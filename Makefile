fix: ## fixes all auto-fixable errors
	@dev-tools/prettier/node_modules/.bin/prettier --write *.md *.css *.html *.json *.js

lint: ## displays lint errors
	@dev-tools/prettier/node_modules/.bin/prettier -c *.md *.css *.html *.json *.js

local-start:  ## starts the local dev server
	@./dev-tools/caddy/caddy &
	@xdg-open http://penguin.linux.test:2015

local-stop:  ## stops the local dev server
	@killall caddy

test:  ## runs the unit tests
	@node --no-warnings test/trie-tests.mjs
	@node --no-warnings test/nutrients-db-test.mjs
.PHONY: test
