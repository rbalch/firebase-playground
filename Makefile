
node:
	docker run --name typescript_essentials --rm -i -t node:14-slim bash

bash:
	docker-compose run typescript bash

serve:
	docker-compose run typescript cd webapp && npm start