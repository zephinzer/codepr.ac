

-include ./.backend-config

.backend-config:
	cp ./.backend-config.example ./.backend-config

.keys:
	mkdir -p ./.keys
	ssh-keygen -t rsa -b 8192 -f ./.keys/id_rsa -q -N ""

init:
	terraform init -backend-config=./.backend-config

plan:
	terraform plan

apply:
	terraform apply

destroy:
	terraform destroy
