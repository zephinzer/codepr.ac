.backend-config:
	cp ./.backend-config.example ./.backend-config

.envrc:
	cp ./.envrc.example ./.envrc

.keys:
	mkdir -p ./.keys
	ssh-keygen -t rsa -b 8192 -f ./.keys/id_rsa -q -N ""

init:
	terraform init -backend-config=./.backend-config

plan:
	terraform plan

apply:
	terraform apply

up:
	terraform apply

down:
	terraform apply -var flag_api_enabled=false

destroy:
	terraform destroy

ssh_api:
	ssh -vv -i ./.keys/id_rsa codeprac@$(shell terraform output droplet_api_ipv4_address) -p 26337
ssh_api_debug: # use this if you're not sure whether the user-data script has completed execution
	ssh -vv -i ./.keys/id_rsa root@$(shell terraform output droplet_api_ipv4_address) -p 22
