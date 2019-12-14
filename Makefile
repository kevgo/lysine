fix: ## fixes all auto-fixable errors
	.circleci/node_modules/.bin/prettier --write *.md *.css *.html *.json *.js

lint: ## displays lint errors
	.circleci/node_modules/.bin/prettier -c *.md *.css *.html *.json *.js

local-start:  ## starts the local dev server
	@./dev/caddy &
	@xdg-open http://penguin.linux.test:2015

local-stop:  ## stops the local dev server
	@killall caddy
