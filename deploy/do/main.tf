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
  resources = var.flag_api_enabled ? [
    digitalocean_droplet.api[0].urn,
    digitalocean_floating_ip.api.urn,
  ] : [
    digitalocean_floating_ip.api.urn,
  ]
}

# ref https://www.terraform.io/docs/providers/do/r/vpc.html
resource "digitalocean_vpc" "default" {
  name     = "${var.name}-vpc"
  region   = var.region
  ip_range = "10.10.10.0/24"
}

# ref https://www.terraform.io/docs/providers/do/r/droplet.html
resource "digitalocean_droplet" "api" {
  count = var.flag_api_enabled ? 1 : 0
  name     = "${var.name}-api"
  size     = var.droplet_api_size
  image    = var.droplet_api_image
  region   = var.region
  private_networking = true
  vpc_uuid = digitalocean_vpc.default.id
  user_data = file("${path.module}/userdata/api.sh")
  ssh_keys = [
    digitalocean_ssh_key.api.fingerprint,
  ]
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
