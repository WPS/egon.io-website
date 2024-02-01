# egon.io-website
Website for Egon.io–The Domain Story Modeler

## Configuration (_config.yml)

* With 'show_downloads: true', the theme will show a download button which links per default to the github repo of the website. Instead, we want the button to link to the latest Egon.io release. That's why we need to override the 'github' property and its attributes (like 'zip_url').

## Development

### Setup environment

Install Docker Desktop:

```fish
brew install --cask docker
```

### Day-to-day Development

To run a server locally:

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

#### Production Version

#### Beta Versions
1. Create folder in root-directory. The name should be *app-xxx*, where xxx is the same as in the version-tag in the package.json of the **egon.io** project
2. Unzip the contents into the created folder. Do not unzip the root folder of the zip, but the contents of the folder (assets, bpmn files, etc.)
3. Change the symbolic link that **app-v2** links to: `rm app-v2 && ln -s app-v2.<TAG> app-v2`
4. Commit and push your changes. This will trigger the pipeline and deploy the new version, when successful

#### Latest Build
Works fully automated. 
