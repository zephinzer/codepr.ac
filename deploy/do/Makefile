KEY_PATH=./.keys/id_rsa
PORT=26337

#####################
# development stuff #
#####################
.backend-config:
	cp ./.backend-config.example ./.backend-config

.envrc:
	cp ./.envrc.example ./.envrc

.keys:
	mkdir -p ./.keys
	ssh-keygen -t rsa -b 8192 -f $(KEY_PATH) -q -N ""

###################
# terraform stuff #
###################
init:
	terraform init -backend-config=./.backend-config
plan:
	terraform plan
apply:
	@$(MAKE) up
up:
	terraform apply
	sleep 5
	ssh -vv -i $(KEY_PATH) -p $(PORT) \
		root@$(shell terraform output api_droplet_ipv4_address) \
		'tail -f /var/log/cloud-init-output.log'
db_only:
	terraform apply -var flag_api_enabled=false
api_only:
	terraform apply -var flag_db_enabled=false
down:
	terraform apply -var flag_api_enabled=false -var flag_db_enabled=false
destroy:
	terraform destroy

#########################
# server administration #
#########################
ssh_api:
	ssh -vv -i $(KEY_PATH) -p $(PORT) \
		codeprac@$(shell terraform output api_droplet_ipv4_address)
ssh_api_debug: # use this if you're not sure whether the user-data script has completed execution
	ssh -vv -i $(KEY_PATH) -p $(PORT) \
		root@$(shell terraform output api_droplet_ipv4_address)
