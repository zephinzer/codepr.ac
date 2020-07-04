output "metadata_droplet_sizes" {
  description = "Possible droplet sizes to use for provided region"
  value = data.digitalocean_sizes.options
}

output "metadata_region_name" {
  description = "Region name in english"
  value = data.digitalocean_region.selected.name
}

output "droplet_api_id" {
  description = "The ID of the Droplet"
  value = digitalocean_droplet.api.id
}

output "droplet_api_urn" {
  description = "The uniform resource name of the Droplet"
  value = digitalocean_droplet.api.urn
}

output "droplet_api_name" {
  description = "The name of the Droplet"
  value = digitalocean_droplet.api.name
}

output "droplet_api_region" {
  description = "The region of the Droplet"
  value = digitalocean_droplet.api.region
}

output "droplet_api_image" {
  description = "The image of the Droplet"
  value = digitalocean_droplet.api.image
}

output "droplet_api_ipv6" {
  description = "Is IPv6 enabled"
  value = digitalocean_droplet.api.ipv6
}

output "droplet_api_ipv6_address" {
  description = "The IPv6 address"
  value = digitalocean_droplet.api.ipv6_address
}

output "droplet_api_ipv4_address" {
  description = "The internal (but not private) IPv4 address"
  value = digitalocean_droplet.api.ipv4_address
}

output "droplet_api_ipv4_address_private" {
  description = "The private networking IPv4 address"
  value = digitalocean_droplet.api.ipv4_address_private
}

output "droplet_api_ipv4_address_floating" {
  description = "The floating IPv4 address"
  value = digitalocean_floating_ip.api.ip_address
}
output "droplet_api_ipv4_address_floating_urn" {
  description = "The URN for the API droplet's persistent floating IPv4 address"
  value = digitalocean_floating_ip.api.urn
}

output "droplet_api_locked" {
  description = "Is the Droplet locked"
  value = digitalocean_droplet.api.locked
}

output "droplet_api_private_networking" {
  description = "Is private networking enabled"
  value = digitalocean_droplet.api.private_networking
}

output "droplet_api_price_hourly" {
  description = "Droplet hourly price"
  value = digitalocean_droplet.api.price_hourly
}

output "droplet_api_price_monthly" {
  description = "Droplet monthly price"
  value = digitalocean_droplet.api.price_monthly
}

output "droplet_api_size" {
  description = "The instance size"
  value = digitalocean_droplet.api.size
}

output "droplet_api_disk" {
  description = "The size of the instance's disk in GB"
  value = digitalocean_droplet.api.disk
}

output "droplet_api_vcpus" {
  description = "The number of the instance's virtual CPUs"
  value = digitalocean_droplet.api.vcpus
}

output "droplet_api_status" {
  description = "The status of the Droplet"
  value = digitalocean_droplet.api.status
}

output "droplet_api_tags" {
  description = "The tags associated with the Droplet"
  value = digitalocean_droplet.api.tags
}

output "droplet_api_volume_ids" {
  description = "A list of the attached block storage volumes"
  value = digitalocean_droplet.api.volume_ids
}

output "droplet_api_ssh_key_id" {
  description = "The unique ID of the key"
  value = digitalocean_ssh_key.api.id
}

output "droplet_api_ssh_key_name" {
  description = "The name of the SSH key"
  value = digitalocean_ssh_key.api.name
}

output "droplet_api_ssh_key_public_key" {
  description = "The text of the public key"
  value = digitalocean_ssh_key.api.public_key
}

output "droplet_api_ssh_key_fingerprint" {
  description = "The fingerprint of the SSH key"
  value = digitalocean_ssh_key.api.fingerprint
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
