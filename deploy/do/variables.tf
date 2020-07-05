variable "do_token" { # set this using `TF_VAR_do_token` using .envrc
  description = "A Read+Write API token for Digital Ocean access"
  type = string
}

variable "api_droplet_image" {
  description = "Digital Ocean droplet image ID"
  default = "ubuntu-18-04-x64"
  type = string
}

variable "api_droplet_size" {
  description = "Digital Ocean droplet size"
  default = "s-1vcpu-1gb"
  type = string
}

variable "db_droplet_size" {
  description = "Digital Ocean droplet size for database"
  default = "db-s-1vcpu-1gb"
  type = string
}

variable "db_droplet_replica_count" {
  description = "Digital Ocean droplet replicas for database"
  default = 1
  type = number
}

variable "environment" {
  description = "The environment of this infrastructure deployment"
  default = "Development"
  type = string
}

variable "flag_api_enabled" {
  description = "Set to true to enable the API, false to disable it"
  default = true
  type = bool
}

variable "flag_db_enabled" {
  description = "Set to true to enable the database, false to disable it"
  default = true
  type = bool
}

variable "name" {
  description = "Name of this project"
  default = "codeprac"
  type = string
}

variable "public_key_path" {
  description = "Relative path to the public key"
  default = ".keys/id_rsa.pub"
  type = string
}

variable "region" {
  description = "Region for this project"
  default = "sgp1"
  type = string
}