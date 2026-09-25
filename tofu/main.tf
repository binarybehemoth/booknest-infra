terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 6.66" }
  }
}

provider "aws" {
  region = "us-east-1" # the endpoint comes from AWS_ENDPOINT_URL
}

resource "aws_dynamodb_table" "books" {
  name         = "booknest-books-tofu"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "N"
  }
}
