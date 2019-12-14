local-start:  ## starts the local dev server
	@./dev/caddy &
	@xdg-open http://penguin.linux.test:2015

local-stop:  ## stops the local dev server
	@killall caddy
