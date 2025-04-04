---
permalink: /howto_v1
title: "How to Use (v1)"
layout: single
toc: true
toc_sticky: true
---

## Introduction

Egon is a tool speficially designed to model Domain Stories. It is **not** a general purpose drwagin tool. That means that it implements the grammatical rules of [Domain Storytelling](https://domainstorytelling.org/). 

There is no login or registration required to use Egon. Egon runs completely in your browser and it does not save your data in the cloud.

## Launching Egon

Egon is available as...:
 - [Online version](https://egon.io/): Just click *Use Online* and start modeling.
 - Standalone version: Best suited for offline use on a laptop. Download the [latest version](https://github.com/WPS/egon.io/releases) as `.zip` file, extract it, and open `index.html` in your browser.

## Headline

Click on the headline to change the title of the Domain Story. Add a description to document assumptions (e.g., what has happened before the story starts) and variations (e.g., optional activities). Use `ctrl`+`enter` or `alt`+`enter` to add line breaks to the description.

## Palette

![The palette for a cinema domain](/assets/images/screenshots/palette.png){:height="100px" width="100px" .align-right}

The pallete consist of four sections that contain (from top to bottom):
-  The icons that are available as *actors*.
-  The icons that are available as *work objects*.
-  A rectangular shape to create *groups* of actors and work objects
-  Two useful modeling tools:
      - The lasso tool lets you select several icons at once to move them easily.
      - The space tool creates or removes space. Click and drag the crosshair to the right or down to create space, or drag to the left or to the top to remove space.

To add an actor, work object, or group to the canvas, click on it and then click again on an empty part of the canvas. On the canvaes, Egon will draw the icons for actors larger than the ones for work objects so that is easier to distinguish them.

Annotations and activities can only be created from the context menu (see next section).

## Context Menu

![The context menu for an actor cashier](/assets/images/screenshots/context-menu.png){:height="300px" width="300px" .align-right}

If you have added an actor or work object to the canvas, or if you click on an existing actor/work object on the canvas, you will see a context menu with three sections:

- Top section:
  - *Wrench*: Change the icon to another the icon. Note: You cannot change the type (e.g., turn a work object into an actor).
  - *Trash bin*: Delete the actor/work object.
  - *Color palette*: Change the color of the icon.
- Middle section:
  - *Arrow*: Connect two icons with an arrow that represents an *activity*. A sequence number will be added to the activity automatically if the arrow starts from an actor.
  - *Annotation*: Add comments to actors and work objects.
- Bottom section: If you add an icon from this pallete to the canvas, an arrow will be created automatically, connecting the selected actor/work object with the newly created one.

## Naming Actors and Work Objects

Double click on an actor's or work object's icon to edit the name. 

## Naming and Numbering of Activities

Activities are depicted as arrows and created via the context menu (see above). Double click on an arrow to edit the activity's name. If you model an activity between an actor and a work object, it will be numbered automatically. By double clicking on the arrow or the number you can manually change the number. All other numbers are adjusted automatically.

If you want to model activities that happen simultaneously, check  the "multiple" checkbox of an activity. This allows you to use the same number multiple times, indicating that these activities happen in parallel. These steps are shown at once in *replay*.

## Renaming Multiple Work Objects or Activities

To rename multiple work objects or activities, click the dictionary button ![Dictionary Button](/assets/images/buttons/spellcheck.png). Actors cannot be renamed in the dictionary because they ususally appear only once per Domain Story.

## Exporting and Importing Domain Stories

To save your Domain Story, download it as a file by clicking the export button ![Export Button](/assets/images/buttons/archive.png). The following file formats are available:

- `.dst`: A text file (JSON) that contains just the "source code" of your Domain Story in a format that can later be importet by you or other Egon users.
- `.dst.svg`: A scalable image. Great for adding your Domain Story in collaborative whiteboards like Miro. This image also contains an embedded `.dst` file.
- `.png`: An image, e.g. for embedding in documents.
- `.html`: A presentation that lets people replay the story in their browser without the need of using Egon.

To load a previously created Domain Story, import a `.dst` or `.dst.svg` file using the upload button ![Upload Button](/assets/images/buttons/unarchive.png).

## Replay

The replay feature helps you to re-tell a Domain Story sentence by sentence. When you start a replay with the play button ![Play Button](/assets/images/buttons/play.png), all activities except the first one disappear. Clicking the forward button ![Forward Button](/assets/images/buttons/forward.png) shows the next activity and clicking the previous button ![Previous Button](/assets/images/buttons/previous.png) shows the previous one. The current sentence is highlighted. If a Domain Story contains groups, the are hidden an first and then appear as last step at the end of the story.
Editing is disabled in replay mode, but you can zoom (ctrl + mouse wheel up and down), scroll up/down (mouse wheel up and down), and scroll left/right (shift + mouse wheel up and down). You can also move the modeling canvas by keeping the space bar pressed and move the mouse around. The stop the replay, click the stop button ![Stop Button](/assets/images/buttons/stop.png).

## Keyboard Shortcuts

Click on ![Keyboard Button](/assets/images/buttons/keyboard.png) to display all available keyboard shortcuts.

## Customizing the Icon Set

To adapt the icon set to your domain, click on ![Gear Button](/assets/images/buttons/gear.png) to open the icon customization:

- Egon comes with built-in icons. Select which ones want in your pallette. An icon can either be used as work object **or** as actor. 
- Use drag&drop to change the order in which the selected icons appear in the pallette.

You can share your icon set with other users by exporting it as `.domain` file. We recommend to name your icon set before you export it (e.g., use the name of the domain or sub-domain that you are modeling). Other users can then import your `.domain` file. This is also useful if you model a lot of different domains and want to switch between different icon sets.

If you import a Domain Story from a `.dst` or `.dst.svg` file, your icon set will change automatically to the one with which the Domain Story was created -- even if you do not have the corresponding `.domain` file.

In addition to the built-in icons, you can upload your own icons and then select them. Different image formats are allowed, but you will achieve best results with SVG because it is scalable (like the icons that come with the modeler). Also, we recommend to use square images because they look better in the pallet and the context pad. If you want a consistent look, consider using the same icon set that we use for the predefined icons—[Google's Material icons](https://fonts.google.com/icons?icon.set=Material+Icons).
