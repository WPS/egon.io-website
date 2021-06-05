# egon.io-website
Website for Egon.io–The Domain Story Modeler

## Configuration (_config.yml)

* With 'show_downloads: true', the theme will show a download button which links per default to the github repo of the website. Instead, we want the button to link to the latest Egon.io release. That's why we need to override the 'github' property and its attributes (like 'zip_url').
