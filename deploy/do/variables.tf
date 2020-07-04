variable "do_token" { # set this using `TF_VAR_do_token` using .envrc
  description = "A Read+Write API token for Digital Ocean access"
  type = string
}

variable "droplet_api_image" {
  description = "Digital Ocean droplet image ID"
  default = "ubuntu-18-04-x64"
  type = string
}

variable "droplet_api_size" {
  description = "Digital Ocean droplet size"
  default = "s-1vcpu-1gb"
  type = string
}

variable "environment" {
  description = "The environment of this infrastructure deployment"
  default = "Development"
  type = string
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