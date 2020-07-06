# output "metadata_droplet_sizes" {
#   description = "Possible droplet sizes to use for provided region"
#   value = data.digitalocean_sizes.options
# }

output "metadata_region_name" {
  description = "Region name in english"
  value = data.digitalocean_region.selected.name
}

output "api_droplet_id" {
  description = "The ID of the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].id : "DISABLED"
}

output "api_droplet_urn" {
  description = "The uniform resource name of the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].urn : "DISABLED"
}

output "api_droplet_name" {
  description = "The name of the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].name : "DISABLED"
}

output "api_droplet_region" {
  description = "The region of the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].region : "DISABLED"
}

output "api_droplet_image" {
  description = "The image of the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].image : "DISABLED"
}

output "api_droplet_ipv6" {
  description = "Is IPv6 enabled"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].ipv6 : "DISABLED"
}

output "api_droplet_ipv6_address" {
  description = "The IPv6 address"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].ipv6_address : "DISABLED"
}

output "api_droplet_ipv4_address" {
  description = "The internal (but not private) IPv4 address"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].ipv4_address : "DISABLED"
}

output "api_droplet_ipv4_address_private" {
  description = "The private networking IPv4 address"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].ipv4_address_private : "DISABLED"
}

output "api_droplet_ipv4_address_floating" {
  description = "The floating IPv4 address"
  value = digitalocean_floating_ip.api.ip_address
}

output "api_droplet_ipv4_address_floating_urn" {
  description = "The URN for the API droplet's persistent floating IPv4 address"
  value = digitalocean_floating_ip.api.urn
}

output "api_droplet_locked" {
  description = "Is the Droplet locked"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].locked : "DISABLED"
}

output "api_droplet_private_networking" {
  description = "Is private networking enabled"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].private_networking : "DISABLED"
}

output "api_droplet_price_hourly" {
  description = "Droplet hourly price"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].price_hourly : "DISABLED"
}

output "api_droplet_price_monthly" {
  description = "Droplet monthly price"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].price_monthly : "DISABLED"
}

output "api_droplet_size" {
  description = "The instance size"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].size : "DISABLED"
}

output "api_droplet_disk" {
  description = "The size of the instance's disk in GB"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].disk : "DISABLED"
}

output "api_droplet_vcpus" {
  description = "The number of the instance's virtual CPUs"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].vcpus : "DISABLED"
}

output "api_droplet_status" {
  description = "The status of the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].status : "DISABLED"
}

output "api_droplet_tags" {
  description = "The tags associated with the Droplet"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].tags : []
}

output "api_droplet_volume_ids" {
  description = "A list of the attached block storage volumes"
  value = var.flag_api_enabled ? digitalocean_droplet.api[0].volume_ids : []
}

output "api_droplet_ssh_key_id" {
  description = "The unique ID of the key"
  value = digitalocean_ssh_key.api.id
}

output "api_droplet_ssh_key_name" {
  description = "The name of the SSH key"
  value = digitalocean_ssh_key.api.name
}

output "api_droplet_ssh_key_public_key" {
  description = "The text of the public key"
  value = digitalocean_ssh_key.api.public_key
}

output "api_droplet_ssh_key_fingerprint" {
  description = "The fingerprint of the SSH key"
  value = digitalocean_ssh_key.api.fingerprint
}

output "db_id" {
  description = "The ID of the database cluster."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].id : "DISABLED"
}

output "db_urn" {
  description = "The uniform resource name of the database cluster."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].urn : "DISABLED"
}

output "db_host" {
  description = "Database cluster's hostname."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].host : "DISABLED"
}

output "db_private_host" {
  description = "Same as host, but only accessible from resources within the account and in the same region."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].private_host : "DISABLED"
}

output "db_port" {
  description = "Network port that the database cluster is listening on."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].port : "DISABLED"
}

output "db_uri" {
  description = "The full URI for connecting to the database cluster."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].uri : "DISABLED"
}

output "db_private_uri" {
  description = "Same as uri, but only accessible from resources within the account and in the same region."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].private_uri : "DISABLED"
}

output "db_database" {
  description = "Name of the cluster's default database."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].database : "DISABLED"
}

output "db_user" {
  description = "Username for the cluster's default user."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].user : "DISABLED"
}

output "db_password" {
  description = "Password for the cluster's default user."
  value = var.flag_db_enabled ? digitalocean_database_cluster.mysql[0].password : "DISABLED"
}

output "project_id" {
  description = "The id of the project"
  value = digitalocean_project.default.id
}

output "project_owner_uuid" {
  description = "the unique universal identifier of the project owner."
  value = digitalocean_project.default.owner_uuid
}

output "project_owner_id" {
  description = "the id of the project owner."
  value = digitalocean_project.default.owner_id
}

output "project_created_at" {
  description = "the date and time when the project was created, (ISO8601)"
  value = digitalocean_project.default.created_at
}

output "project_updated_at" {
  description = "the date and time when the project was last updated, (ISO8601)"
  value = digitalocean_project.default.updated_at
}

output "volume_mysql_id" {
  description = "The unique identifier for the volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].id : "DISABLED"
}

output "volume_mysql_urn" {
  description = "The uniform resource name for the volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].urn : "DISABLED"
}

output "volume_mysql_name" {
  description = "Name of the volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].name : "DISABLED"
}

output "volume_mysql_description" {
  description = "Description of the volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].description : "DISABLED"
}

output "volume_mysql_tags" {
  description = "List of applied tags to the volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].tags : []
}

output "volume_mysql_region" {
  description = "The region that the volume is created in."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].region : "DISABLED"
}

output "volume_mysql_droplet_ids" {
  description = "A list of associated droplet ids."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].droplet_ids : []
}

output "volume_mysql_snapshot_id" {
  description = "The ID of the existing volume snapshot from which this volume was created from."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].snapshot_id : "DISABLED"
}

output "volume_mysql_filesystem_type" {
  description = "Filesystem type (xfs or ext4) for the block storage volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].filesystem_type : "DISABLED"
}

output "volume_mysql_filesystem_label" {
  description = "Filesystem label for the block storage volume."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].filesystem_label : "DISABLED"
}

output "volume_mysql_initial_filesystem_type" {
  description = "Filesystem type (xfs or ext4) for the block storage volume when it was first created."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].initial_filesystem_type : "DISABLED"
}

output "volume_mysql_initial_filesystem_label" {
  description = "Filesystem label for the block storage volume when it was first created."
  value = var.flag_api_mysql_enabled && var.flag_api_enabled ? digitalocean_volume.mysql[0].initial_filesystem_label : "DISABLED"
}


output "vpc_id" {
  description = "Unique identifier for the VPC"
  value = digitalocean_vpc.default.id
}

output "vpc_urn" {
  description = "Uniform resource name (URN) for the VPC"
  value = digitalocean_vpc.default.urn
}

output "vpc_created_at" {
  description = "Date and time of when the VPC was created"
  value = digitalocean_vpc.default.created_at
}
