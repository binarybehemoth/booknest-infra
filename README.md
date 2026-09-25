# booknest-infra

BookNest's AWS side as code, deployed to LocalStack 4.13.1 (no AWS account needed).

- `infra/catalog-api.yaml`: a CloudFormation template with the catalog table and a Lambda function.
- `api/index.mjs`: the function's code (counts the books in the table).
- `cdk/`: the same resources as an AWS CDK app (`npx cdklocal synth`, `npx cdklocal deploy`).
- `tofu/`: the table alone in OpenTofu, for comparison.
- `.github/workflows/deploy.yml`: lints, packages and deploys the template to a LocalStack
  service container inside a GitHub-hosted job.
