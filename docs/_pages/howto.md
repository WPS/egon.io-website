---
permalink: /howto
title: "How to Use"
layout: single
toc: true
toc_sticky: true
---

**Recommended browsers:** We recommend Mozilla Firefox or browsers based on Chromium (Google Chrome, Microsoft Edge). Egon.io requires that your browser allows third party cookies (How to turn on third party cookies in [Firefox](https://support.mozilla.org/en-US/kb/disable-third-party-cookies) and [Chrome](https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en)). We rely on storing your modeler's configuration in your browser. That enabled us to develop a cool feature that allows you to choose which icons you want to use for modeling (see below).
{: .notice}

## Palette

![The palette for a cinema domain](/images/screenshots/palette.png){:height="100px" width="100px" .align-right}

Shows the icons you can choose to record your domain story (actors and work objects), a rectangular shape to group icons into logical units, and two useful modeling tools:

- The lasso tool lets you select several icons at once to move them easily.
- the space tool creates or removes space. Click and drag the crosshair to the right or down to create space, or drag to the left or to the top to remove space.

## Headline

Click on the headline to change the name of the domain story and describe it. The description can contain information about assumptions (e.g. that the domain story describes a "happy path" scenario) and variations (e.g. optional activities).
Use `ctrl`+`enter` or `alt`+`enter` to add line breaks to the description.

## Context Menu

![The context menu for an actor cashier](/images/screenshots/context-menu.png){:height="300px" width="300px" .align-right}

If you drop an icon from the palette into the canvas you will see a context menu with three sections:

* Top section:
  * wrench icon: change to another the icon
  * bin icon: delete the icon
  * color-palette icon: change the color of the activity/work object
* Middle section:
  * arrow icon: connect two icons with an activity.
  * annotation icon: add comments to an actor or work object
* Bottom section: Instead of dragging icons from the palette, you can can choose the next icon from the context menu and an arrow will connect them automatically.

## Naming Actors and Work Objects

Double click on an actor's or work object's icon to edit the name. To rename multiple work objects, click the dictionary button ![Dictionary Button](/images/buttons/spellcheck.png).

## Naming and Numbering of Activities

Activities are depicted as arrows. Double click on an arrow to edit the activity's name. If you model an activity between an actor (person, people and system) and a work object (folder, call, email, conversation, information) it will be numbered automatically. By double clicking on the arrow or the number you can manually change the number. All other numbers are adjusted automatically.

If you want to model activities that happen simultaneously, check  the "multiple" checkbox of an activity. This allows you to use the same number multiple times, indicating that these activities happen in parallel. These steps are shown at once in the replay mode.

## Save, Open, and Export Domain Stories

If you want to save your domain story, download it as a `.dst` file by clicking the export button ![Export Button](/images/buttons/archive.png) or pressing ctrl+s on your keyboard. To continue working on a domain story, import a `.dst` file using the upload button ![Upload Button](/images/buttons/unarchive.png).

You can also export your diagram as a `.svg`, `.png`, or animated `.html` file by clicking on the image button ![SVG Button](/images/buttons/image.png) and selecting your preferred format. Beginning with version 1.2.0, the `.svg` file contains an embedded `.dst` file. That means that you only need to download one file that you can use as picture and also edit it later by importing it again. Exporting the domain story as animated HTML presentation is a beta feature introduced with v1.3.0.

## Replay

The replay feature helps you to re-tell a domain story sentence by sentence. When you start a replay with the play button ![Play Button](/images/buttons/play.png), all activities except the first one disappear. Clicking the forward button ![Forward Button](/images/buttons/forward.png) shows the next activity and clicking the previous button ![Previous Button](/images/buttons/previous.png) shows the previous one. The current sentence is highlighted. If a domain story contains groups, the are hidden an first and then appear as last step at the end of the story.
Editing is disabled in replay mode, but you can zoom (ctrl + mouse wheel up and down), scroll up/down (mouse wheel up and down), and scroll left/right (shift + mouse wheel up and down). You can also move the modeling canvas by keeping the space bar pressed and move the mouse around. The stop the replay, click the stop button ![Stop Button](/images/buttons/stop.png).

## Keyboard Shortcuts

Click on ![Keyboard Button](/images/buttons/keyboard.png) to display all available keyboard shortcuts.

## Configuring the icon set

We recommend that the icon set is adapted to the domain that you model. You can configure the palette accordingly and share that configuration:

Click on ![Gear Button](/images/buttons/gear.png) to open the icon configuration. Configure your icon set by naming it, selecting which icons should be used as actors or as work objects and order these icons (using drag&drop). You can export your configuration as `.domain` file. To switch between configurations, import a different `.domain` file.

If you import a domain story from a `.dst` file, your icon configuration will change automatically to the one with which the domain story was created - even if you do not have the corresponding `.domain` file.

**Beta feature:** If you want to use icons that are not in the predefined set that comes with the modeler, you can upload your own icons. Different image formats are allowed, but you will achieve best results with SVG because it is scalable (like the icons that come with the modeler). Also, we recommend to use square images because they look better in the pallet and the context pad. If you want a consistent look, consider using the same icon set that we use for the predefined icons???[Google's Material icons](https://material.io/resources/icons/?style=outline)
