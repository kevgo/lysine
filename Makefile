fix: ## fixes all auto-fixable errors
	@dev-tools/node_modules/.bin/prettier --write *.md *.css *.html *.json *.js

lint: ## displays lint errors
	@dev-tools/node_modules/.bin/prettier -c *.md *.css *.html *.json *.js

local-start:  ## starts the local dev server
	@./dev-tools/caddy &
	@xdg-open http://penguin.linux.test:2015

local-stop:  ## stops the local dev server
	@killall caddy
