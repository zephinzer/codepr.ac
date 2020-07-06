provider "digitalocean" {
  token = var.do_token
}

terraform {
  backend "s3" {}
}

# ref https://www.terraform.io/docs/providers/do/d/region.html
data "digitalocean_region" "selected" {
  slug = var.region
}

# ref https://www.terraform.io/docs/providers/do/d/sizes.html
data "digitalocean_sizes" "options" {
  filter {
    key = "regions"
    values = [var.region]
  }
  sort {
    key       = "price_monthly"
    direction = "asc"
  }
}

# ref https://www.terraform.io/docs/providers/do/r/project.html
resource "digitalocean_project" "default" {
  name        = "${var.name}-project"
  description = "Infrastructure for codepr.ac"
  purpose     = "HTTP API service with persistent data store"
  environment = var.environment
  resources = concat(
    var.flag_api_enabled ? [digitalocean_droplet.api[0].urn] : [],
    var.flag_db_enabled ? [digitalocean_database_cluster.mysql[0].urn] : [],
    [digitalocean_floating_ip.api.urn],
  )
}

# ref https://www.terraform.io/docs/providers/do/r/vpc.html
resource "digitalocean_vpc" "default" {
  name     = "${var.name}-vpc"
  region   = var.region
  ip_range = "10.10.10.0/24"
}

# ref https://www.terraform.io/docs/providers/do/r/database_cluster.html
resource "digitalocean_database_cluster" "mysql" {
  count = var.flag_db_enabled ? 1 : 0
  name       = "${var.name}-mysql-db"
  engine     = "mysql"
  version    = "8"
  size       = var.db_droplet_size
  region     = "sgp1"
  node_count = var.db_droplet_replica_count
  private_network_uuid = digitalocean_vpc.default.id
}

# ref https://www.terraform.io/docs/providers/do/r/droplet.html
resource "digitalocean_droplet" "api" {
  count = var.flag_api_enabled ? 1 : 0
  name     = "${var.name}-api"
  size     = var.api_droplet_size
  image    = var.api_droplet_image
  region   = var.region
  private_networking = true
  vpc_uuid = digitalocean_vpc.default.id
  user_data = file("${path.module}/userdata/20200705/api.sh")
  ssh_keys = [
    digitalocean_ssh_key.api.fingerprint,
  ]
}

# ref https://www.terraform.io/docs/providers/do/r/volume.html
resource "digitalocean_volume" "mysql" {
  count = var.flag_api_mysql_enabled && var.flag_api_enabled ? 1 : 0
  region                   = "sgp1"
  name                     = "${var.name}-mysql"
  size                     = 20
  initial_filesystem_type  = "ext4"
  initial_filesystem_label = "mysql"
  description              = "volume for storing /var/lib/mysql of mysql docker so we have persistent data"
}

# ref https://www.terraform.io/docs/providers/do/r/volume_attachment.html
resource "digitalocean_volume_attachment" "api_mysql" {
  count = var.flag_api_mysql_enabled && var.flag_api_enabled ? 1 : 0
  droplet_id = digitalocean_droplet.api[0].id
  volume_id  = digitalocean_volume.mysql[0].id
}

# ref https://www.terraform.io/docs/providers/do/r/floating_ip.html
resource "digitalocean_floating_ip" "api" {
  droplet_id = var.flag_api_enabled ? digitalocean_droplet.api[0].id : null
  region     = var.flag_api_enabled ? digitalocean_droplet.api[0].region : var.region
}

# ref https://www.terraform.io/docs/providers/do/r/ssh_key.html
resource "digitalocean_ssh_key" "api" {
  name = "${var.name}-ssh-key"
  public_key = file("${path.module}/${var.public_key_path}")
}
