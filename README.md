# egon.io-website
Website for Egon.io–The Domain Story Modeler

## Development

### Setup environment

Install Rancher Desktop on Windows:

```pwsh
\$ winget install -e --id suse.RancherDesktop
```

Install Rancher Desktop on macOS:

```fish
\$ brew install --cask rancher
```

### Day-to-day Development with DevContainers

Open the project as a devcontainer. To run the server:

```fish
\$ bundle exec jekyll serve
```

### Day-to-day Development without DevContainers

To run a server locally in Docker:

```fish
docker compose up
```

Or to rebuild the Docker image:

```fish
docker compose up --build
```

If it stops working for some reason, run:

```fish
docker compose build --no-cache
```

And then try again.

### Deployment of Egon.io Online Version

#### V1
1. Create folder in root-directory. The name should be *app-v1*
2. Unzip the contents into the created folder. Do not unzip the root folder of the zip, but the contents of the folder (assets, bpmn files, etc.)
3. Change the symbolic link that **app-v1** links to: `rm app-v1 && ln -s app-v1.<TAG> app-v1`
4. Commit and push your changes. This will trigger the pipeline and deploy the new version, when successful

#### V2
Run the workflow at the GitHub Actions tab and set the "Deploy v2 prod" checkbox.

#### Latest Build
Fully automated with GitHub Actions. 
