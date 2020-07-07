CMD_NAME=codeprac
GO_PACKAGE_URL=$(shell cat go.mod | head -n 1 | cut -f 2 -d ' ')
DOCKER_IMAGE_PATH=zephinzer/codeprac
DOCKER_TARBALL_PATH=./output
GIT_REPO_URL=$(shell git remote -v | grep push | tr -s '\t' ' ' | cut -d ' ' -f 2)
GIT_COMMIT=$(shell git rev-parse --verify HEAD)
GIT_TAG=$(shell git describe --tag $(shell git rev-list --tags --max-count=1))
MAINTAINER=zephinzer
TIMESTAMP=$(shell date +'%Y%m%d%H%M%S')

-include ./Makefile.properties

BIN_PATH=$(CMD_NAME)_$$(go env GOOS)_$$(go env GOARCH)${BIN_EXT}

api_deps:
	go mod vendor -v
	go mod tidy -v
ui_deps:
	npm install
	npm ci
start_db:
	docker-compose -f ./deploy/docker-compose.yml up -d -V database
db_shell:
	mysql -umysql_user -pmysql_password -h127.0.0.1 -P3307 mysql_database
start_api:
	go run -v -mod=vendor ./cmd/$(CMD_NAME) start
start_api_production: api_production
	chmod +x ./bin/$(BIN_PATH)
	./bin/$(BIN_PATH)
start_ui:
	npm start
start_ui_production: ui_production
	npm run serve
test_api:
	go test -v -mod=vendor ./... -cover -coverprofile c.out
api:
	go build -mod=vendor -v -x \
		-ldflags "\
			-X main.Commit=$(GIT_COMMIT) \
			-X main.Version=$(GIT_TAG) \
			-X main.Timestamp=$(TIMESTAMP) \
		" \
		-o ./bin/$(BIN_PATH) \
		./cmd/$(CMD_NAME)
	$(MAKE) api_checksum
api_production:
	go build -mod=vendor -a -v -x \
		-ldflags "\
			-X main.Commit=$(GIT_COMMIT) \
			-X main.Version=$(GIT_TAG) \
			-X main.Timestamp=$(TIMESTAMP) \
			-s -w \
		" \
		-o ./bin/$(BIN_PATH) \
		./cmd/$(CMD_NAME)
	$(MAKE) api_checksum
api_static:
	CGO_ENABLED=0 \
	go build -mod=vendor -v -x \
		-ldflags "\
			-X main.Commit=$(GIT_COMMIT) \
			-X main.Version=$(GIT_TAG) \
			-X main.Timestamp=$(TIMESTAMP) \
			-extldflags '-static' \
		" \
		-o ./bin/$(BIN_PATH) \
		./cmd/$(CMD_NAME)
	$(MAKE) api_checksum
api_static_production:
	CGO_ENABLED=0 \
	go build -mod=vendor -a -v -x \
		-ldflags "\
			-X main.Commit=$(GIT_COMMIT) \
			-X main.Version=$(GIT_TAG) \
			-X main.Timestamp=$(TIMESTAMP) \
			-extldflags '-static' \
			-s -w \
		" \
		-o ./bin/$(BIN_PATH) \
		./cmd/$(CMD_NAME)
	$(MAKE) api_checksum
api_checksum:
	sha256sum -b ./bin/$(BIN_PATH) | cut -f 1 -d ' ' > ./bin/$(BIN_PATH).sha256
	rm -rf ./bin/$(CMD_NAME) ./bin/$(CMD_NAME).sha256
	cd ./bin \
		&& ln -s ./$(BIN_PATH) ./$(CMD_NAME) \
		&& ln -s ./$(BIN_PATH).sha256 ./$(CMD_NAME).sha256
compress:
	ls -lah ./bin/$(BIN_PATH)
	upx -9 -v -o ./bin/.$(BIN_PATH) \
		./bin/$(BIN_PATH)
	upx -t ./bin/.$(BIN_PATH)
	rm -rf ./bin/$(BIN_PATH)
	mv ./bin/.$(BIN_PATH) \
		./bin/$(BIN_PATH)
	sha256sum -b ./bin/$(BIN_PATH) \
		| cut -f 1 -d ' ' > ./bin/$(BIN_PATH).sha256
	ls -lah ./bin/$(BIN_PATH)
api_image:
	docker build \
		--build-arg GIT_REPO_URL=$(GIT_REPO_URL) \
		--build-arg GIT_COMMIT=$(GIT_COMMIT) \
		--build-arg GIT_TAG=$(GIT_TAG) \
		--build-arg GO_PACKAGE_URL=$(GO_PACKAGE_URL) \
		--build-arg TIMESTAMP=$(TIMESTAMP) \
		--build-arg MAINTAINER=$(MAINTAINER) \
		--build-arg CMD_NAME=$(CMD_NAME) \
		--file ./deploy/api/Dockerfile \
		--tag $(DOCKER_IMAGE_PATH)-api:latest \
		.
api_image_test: image
	container-structure-test test \
		--config ./deploy/api/Dockerfile.yaml \
		--image $(DOCKER_IMAGE_PATH)-api:latest
api_image_export:
	mkdir -p ./build
	docker save --output $(DOCKER_TARBALL_PATH)/api.tar.gz $(DOCKER_IMAGE_PATH)-api:latest
api_image_import:
	docker load --input $(DOCKER_TARBALL_PATH)/api.tar.gz
ui_production:
	npm run build
ui_image:
	docker build \
		--build-arg GIT_REPO_URL=$(GIT_REPO_URL) \
		--build-arg GIT_COMMIT=$(GIT_COMMIT) \
		--build-arg GIT_TAG=$(GIT_TAG) \
		--build-arg GO_PACKAGE_URL=$(GO_PACKAGE_URL) \
		--build-arg TIMESTAMP=$(TIMESTAMP) \
		--build-arg MAINTAINER=$(MAINTAINER) \
		--build-arg CMD_NAME=$(CMD_NAME) \
		--file ./deploy/ui/Dockerfile \
		--tag $(DOCKER_IMAGE_PATH)-ui:latest \
		.
ui_image_production:
	docker build \
		--build-arg REACT_APP_API_URL_BASE=https://apiv1.codepr.ac \
		--build-arg GIT_REPO_URL=$(GIT_REPO_URL) \
		--build-arg GIT_COMMIT=$(GIT_COMMIT) \
		--build-arg GIT_TAG=$(GIT_TAG) \
		--build-arg GO_PACKAGE_URL=$(GO_PACKAGE_URL) \
		--build-arg TIMESTAMP=$(TIMESTAMP) \
		--build-arg MAINTAINER=$(MAINTAINER) \
		--build-arg CMD_NAME=$(CMD_NAME) \
		--file ./deploy/ui/Dockerfile \
		--tag $(DOCKER_IMAGE_PATH)-ui:latest \
		.
ui_image_test: image
	container-structure-test test \
		--config ./deploy/ui/Dockerfile.yaml \
		--image $(DOCKER_IMAGE_PATH)-ui:latest
ui_image_export:
	mkdir -p $(DOCKER_TARBALL_PATH)
	docker save --output $(DOCKER_TARBALL_PATH)/ui.tar.gz $(DOCKER_IMAGE_PATH)-ui:latest
ui_image_import:
	docker load --input $(DOCKER_TARBALL_PATH)/ui.tar.gz

init_production:
	chmod +x ./scripts/init-production.sh
	./scripts/init-production.sh
update_production:
	docker-compose pull
deploy_production: update_production
	docker-compose up -d
update_repo:
	chmod +x ./scripts/update-repo.sh
	./scripts/update-repo.sh

.envrc:
	cp ./.envrc.example ./.envrc
.keys/versioning:
	mkdir -p ./.keys/versioning
	ssh-keygen -t rsa -b 8192 -f ./.keys/versioning/id_rsa -q -N ""
	cat ./.keys/versioning/id_rsa | base64 -w 0 > ./.keys/versioning/id_rsa.base64
