provider "digitalocean" {
  token = var.do_token
}

terraform {
  backend "s3" {}
}

data "digitalocean_region" "selected" {
  slug = var.region
}

resource "digitalocean_project" "default" {
  name        = "${var.name}-project"
  description = "Infrastructure for codepr.ac"
  purpose     = "HTTP API service with persistent data store"
  environment = var.environment
  resources = [
    digitalocean_droplet.api.urn,
  ]
}

resource "digitalocean_vpc" "default" {
  name     = "${var.name}-vpc"
  region   = var.region
  ip_range = "10.10.10.0/24"
}

resource "digitalocean_droplet" "api" {
  name     = "${var.name}-api"
  size     = "s-1vcpu-1gb"
  image    = "ubuntu-18-04-x64"
  region   = var.region
  private_networking = true
  vpc_uuid = digitalocean_vpc.default.id
  ssh_keys = [
    digitalocean_ssh_key.api.fingerprint,
  ]
}

resource "digitalocean_ssh_key" "api" {
  name = "${var.name}-ssh-key"
  public_key = file("${path.module}/${var.public_key_path}")
}
