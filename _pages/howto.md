---
permalink: /howto
title: "How to Use"
layout: single
toc: true
toc_sticky: true
---

## Introduction

Egon is a tool speficially designed to model Domain Stories. It is **not** a general purpose drwagin tool. That means that it implements the grammatical rules of [Domain Storytelling](https://domainstorytelling.org/). 

There is no login or registration required to use Egon. Egon runs completely in your browser and it does not save your data in the cloud.

## Headline

Click on the headline to change the title of the Domain Story. Add a description to document assumptions (e.g., what has happened before the story starts) and variations (e.g., optional activities). Use `shift`+`enter` to add line breaks to the description.
<!-- 
Left of the title is an arrow button that lets you hide the description to gain more space for modeling. 
-->

## Palette

![The palette for a cinema domain](/assets/images/screenshots/palette.png){:height="100px" width="100px" .align-right}

The pallete consist of four sections that contain (from top to bottom):
-  The icons that are available as *actors*.
-  The icons that are available as *work objects*.
-  A rectangular shape to create *groups* of actors and work objects
-  Two useful modeling tools:
      - The lasso tool lets you select several icons at once to move them easily.
      - The space tool creates or removes space. Click and drag the crosshair to the right or down to create space, or drag to the left or to the top to remove space.

To add an actor, work object, or group to the canvas, click on it and then click again on an empty part of the canvas.

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
- `.svg`: A scalable image. Great for adding your Domain Story in collaborative whiteboards like Miro. This image also contains an embedded `.dst` file.
- `.png`: An image, e.g. for embedding in documents.
- `.html`: A presentation that lets people replay the story in their browser without the need of using Egon.

To load a previously created Domain Story, import a `.dst` or `.dst.svg` file using the upload button ![Upload Button](/assets/images/buttons/unarchive.png).

<!-- 
## Auto-Save and Creating new Domain Stories

Since saving Domain Stories by exporting them as files is a bit cumbersome, you can turn on the *auto-save* feature in the general settings. Egon runs completely in your browser and this is also where your current Domain Story is stored: In your browser's local storage. You can choose the saving interval (in seconds) between saving drafts and how many drafts are kept in storage. Drafts can be restored, overwriting the current state of your Domain Story.

When you activate auto-save and later open Egon in your browser, it will restore the Domain Story that you last worked on. To create a new Domain Story, click the *New* button.
-->

## Replay

The replay feature helps you to re-tell a Domain Story sentence by sentence. When you start a replay with the play button ![Play Button](/assets/images/buttons/play.png), all activities except the first one disappear. Clicking the forward button ![Forward Button](/assets/images/buttons/forward.png) shows the next activity and clicking the previous button ![Previous Button](/assets/images/buttons/previous.png) shows the previous one. The current sentence is highlighted. If a Domain Story contains groups, the are hidden an first and then appear as last step at the end of the story.
Editing is disabled in replay mode, but you can zoom (ctrl + mouse wheel up and down), scroll up/down (mouse wheel up and down), and scroll left/right (shift + mouse wheel up and down). You can also move the modeling canvas by keeping the space bar pressed and move the mouse around. The stop the replay, click the stop button ![Stop Button](/assets/images/buttons/stop.png).

## Keyboard Shortcuts

Click on ![Keyboard Button](/assets/images/buttons/keyboard.png) to display all available keyboard shortcuts.

## Configuring the Icon Set

We recommend that the icon set is adapted to the domain that you model. You can configure the palette accordingly and share that configuration:

Click on ![Gear Button](/assets/images/buttons/gear.png) to open the icon configuration. Configure your icon set by naming it, selecting which icons should be used as actors or as work objects and order these icons (using drag&drop). You can export your configuration as `.domain` file. To switch between configurations, import a different `.domain` file.

If you import a Domain Story from a `.dst` file, your icon configuration will change automatically to the one with which the Domain Story was created - even if you do not have the corresponding `.domain` file.

**Beta feature:** If you want to use icons that are not in the predefined set that comes with the modeler, you can upload your own icons. Different image formats are allowed, but you will achieve best results with SVG because it is scalable (like the icons that come with the modeler). Also, we recommend to use square images because they look better in the pallet and the context pad. If you want a consistent look, consider using the same icon set that we use for the predefined icons—[Google's Material icons](https://material.io/resources/icons/?style=outline)
