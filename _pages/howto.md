---
permalink: /howto
title: "How to Use"
layout: single
toc: true
toc_sticky: true
---

## Introduction

Egon is a tool specifically designed to model Domain Stories. It is **not** a general purpose drawing tool. That means that it implements the grammatical rules of [Domain Storytelling](https://domainstorytelling.org/). 

There is no login or registration required to use Egon. Egon runs completely in your browser and it does not save your data in the cloud.

## Launching Egon

>  **Updating to the latest version:** If you have used an earlier `v2.x.x` versions or the latest build (`v2.x.x.-dev`), you need to clear your local browser storage and then reload the page in order for Egon to load properly. This will reset your icon configuration to default and delete the automatically saved drafts. Instructions:
> - [Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox#w_clear-cookies-for-the-current-website)
> - Chrome: In the address bar, click the button in the left corner (*show website information*), then *cookies and website date*, *manage website data*, and delete the data for egon.io.

### Online

We provide an [online version](https://egon.io/) on our webpage. Just click *Use Online* and start modeling.

### Docker

We provide a Docker image on GitHub. Download it `docker pull ghcr.io/wps/egon.io:latest` and run it `docker run -p 4040:80 ghcr.io/wps/egon.io:latest` (replace "4040" with whatever port you want to use).

### Host Egon on your own Web Server

You can [download Egon as `zip`file](https://github.com/WPS/egon.io/releases), unpack it and put the `egon`folder on your own web server.

### For Developers

Please see the developer's [readme](https://github.com/WPS/egon.io/) on how to build and run Egon on your machine.


## Title and Description

The title of the story will be used as file name when you export it.

 Add a description to document assumptions (e.g., what has happened before the story starts) and variations (e.g., optional activities). Use `shift`+`enter` to add line breaks to the description.

## Palette

![The palette for a cinema domain](/assets/images/screenshots/palette.png){:height="100px" width="100px" .align-right}

The palette consist of four sections that contain (from top to bottom):
-  The icons that are available as *actors*.
-  The icons that are available as *work objects*.
-  A rectangular shape to create *groups* of actors and work objects
-  Two useful modeling tools:
      - The lasso tool lets you select several icons at once to move them easily.
      - The space tool creates or removes space. Click and drag the crosshair to the right or down to create space, or drag to the left or to the top to remove space.

To add an actor, work object, or group to the canvas, click on it and then click again on an empty part of the canvas. On the canvas, Egon will draw the icons for actors larger than the ones for work objects so that is easier to distinguish them.

Annotations and activities can only be created from the context menu (see next section).

## Context Menu

![The context menu for an actor cashier](/assets/images/screenshots/context-menu.png){:height="300px" width="300px" .align-right}

If you have added an actor or work object to the canvas, or if you click on an existing actor/work object on the canvas, you will see a context menu with three sections:

- Top section:
  - *Wrench*: Change the icon to another the icon. Note: You cannot change the type (e.g., turn a work object into an actor).
  - *Trash bin*: Delete the actor/work object.
  - *Color palette*: Change the color of the icon (only works with built-in icons and custom SVG icons, see below).
- Middle section:
  - *Arrow*: Connect two icons with an arrow that represents an *activity*. A sequence number will be added to the activity automatically if the arrow starts from an actor.
  - *Annotation*: Add comments to actors and work objects.
- Bottom section: If you add an icon from this palette to the canvas, an arrow will be created automatically, connecting the selected actor/work object with the newly created one.

## Naming Actors and Work Objects

Double click on an actor's or work object's icon to edit the name. 

## Naming and Numbering of Activities

Activities are depicted as arrows and created via the context menu (see above). Double click on an arrow to edit the activity's name. If you model an activity between an actor and a work object, it will be numbered automatically. By double clicking on the arrow or the number you can manually change the number. All other numbers are adjusted automatically.

If you want to model activities that happen simultaneously, check  the "multiple" checkbox of an activity. This allows you to use the same number multiple times, indicating that these activities happen in parallel. These steps are shown at once in *replay*.

## Renaming Multiple Work Objects or Activities

To rename multiple work objects or activities, click the *dictionary* button (<i class="material-icons">spellcheck</i>). Actors cannot be renamed in the dictionary because they usually appear only once per Domain Story.

## Exporting Domain Stories

To save your Domain Story on your computer, download it as a file by clicking the *export* button (<i class="material-icons">file_download</i>). The following file formats are available:

- `.egn`: A text file that contains the "source code" of your Domain Story. It can later be imported by you or other Egon users. Egon uses the JSON format and produces files that are properly formatted. This makes it easy to keep track of changes when the files are kept in a source code repository like *git*.
- `.svg`: A scalable image. Great for adding your Domain Story in collaborative whiteboards like Miro. This image also contains an embedded `.egn` file.
- `.png`: An image, e.g. for embedding in documents.
- `.html`: A presentation that lets people replay the story in their browser without the need of using Egon.


> Animated SVG images only work with some applications:
> - works with web browsers (Firefox, Chrome, Safari) and Microsoft Teams
> - does **not** work with Miro and Inkscape; the image might look incomplete

## Importing Domain Stories

To load a previously created Domain Story, you can...
- import an `.egn` or `.egn.svg` file by clicking the *import from file* button (<i class="material-icons">file_upload</i>) and selecting the file
- drag an `.egn` or `.egn.svg` file from your local file system and drop it onto the canvas

- import from a public URL by clicking the *import from URL* button (<i class="material-icons">cloud_upload</i>) and pasting the URL

> Importing from URL has limitations: 
> - the link must contain the file name and file ending
> - the server you want to download from must send the `Access-Control-Allow-Origin` response header (if not, import will fail with a CORS error)
> - the link must point to the "raw" file (for GitHub and Dropbox, Egon will try to automatically convert any link to a raw download link)
> - **works** with GitHub, BitBucket, Dropbox
> - does **not** work with Googl Drive, OneDrive
> - Nextcloud: Ask your server administrator to turn on `Access-Control-Allow-Origin`

## Auto-Save and Creating new Domain Stories

Since saving Domain Stories by exporting them as files is a bit cumbersome, you can turn on the *auto-save* feature in the general settings. Egon runs completely in your browser and this is also where your current Domain Story is stored: In your browser's local storage. You can choose the saving interval (in seconds) between saving drafts and how many drafts are kept in storage. Drafts can be restored, overwriting the current state of your Domain Story.

When you activate auto-save and later open Egon in your browser, it will restore the Domain Story that you last worked on. To create a new Domain Story, click the *New* button (<i class="material-icons">note_add </i>).

## Replay

The replay feature helps you to re-tell a Domain Story sentence by sentence. When you start to replay with the *replay* button (<i class="material-icons">play_arrow</i>), all sentences except the first one disappear. Clicking the *next* button (<i class="material-icons">skip_next</i>) shows the next sentence and clicking the *previous* button (<i class="material-icons">skip_previous</i>) shows the previous one. The current sentence is highlighted. The stop replaying, click the *stop* button (<i class="material-icons">stop</i>).

If a Domain Story contains groups, they appear with the last sentence.

Editing is disabled during replay, but you can zoom (ctrl + mouse wheel up and down), scroll up/down (mouse wheel up and down), and scroll left/right (shift + mouse wheel up and down). You can also move the modeling canvas by keeping the space bar pressed and move the mouse around.

## Keyboard Shortcuts

Click on the *shortcuts* button (<i class="material-icons">keyboard</i>) to display all available keyboard shortcuts.

## Customizing the Icon Set

To adapt the icon set to your domain, click on the *settings* button (<i class="material-icons">settings</i>) to open the icon customization:

- Egon comes with built-in icons. Select which ones want in your pallette. An icon can either be used as work object **or** as actor. 
- Use drag&drop to change the order in which the selected icons appear in the pallette.

You can share your icon set with other users by exporting it as `.iconset` file. We recommend to name your icon set before you export it (e.g., use the name of the domain or sub-domain that you are modeling). Other users can then import your `.iconset` file. This is also useful if you model a lot of different domains and want to switch between different icon sets.

If you import a Domain Story from a `.egn` or `.egn.svg` file, your icon set will change automatically to the one with which the Domain Story was created -- even if you do not have the corresponding `.iconset` file.

In addition to the built-in icons, you can upload your own icons and then select them as actors or work objects. 

> We strongly recommend to use square SVG images for icons. Keep the file name short (as Egon will add `-custom`to it) and memorable (so you can search for it).
 
Other image formats are allowed as well, but only SVG can be colored and it can be zoomed without getting pixelated. Square images look better in the pallet and the context pad. 

If you want a consistent look, consider using the same icon set that we use for the predefined icons—[Google's Material icons](https://fonts.google.com/icons?icon.set=Material+Icons).

## Touch Support

Egon does **not** support touch devices. Previous versions (v2.0 and v1.x) did work on touch devices to some extent because they were built on top of a modeling framework with basic touch support. However, this framework has completely dropped its support for touch devices in recent versions.
