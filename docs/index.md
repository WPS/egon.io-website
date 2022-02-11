---
permalink: /
title: "Egon.io"
layout: splash
header: 
  overlay_color: "#f59542"
  overlay_image: /images/sunflower-1.jpeg

external_links:
  - title: "Use Online!"
    excerpt: "![](/images/feature-row-egon-height-500px.png)<br> Run Egon.io in your browser without downloading anything. <br> [Use Egon.io](https://www.wps.de/modeler/)"

  - title: "Download latest version"
    excerpt: "![](/images/feature-row-egon-height-500px.png)<br> Download a ZIP file to run Egon.io locally in your browse. <br> [Download Egon.io](https://github.com/WPS/domain-story-modeler/releases/download/v1.2.1/Domain.Story.Modeler.v1.2.1.zip)"

  - title: "Developer Repo"
    excerpt: "![](/images/feature-row-egon-height-500px.png)<br> Contribute feature requests, bug reports, and pull requests. <br> [GitHub Repo](https://github.com/WPS/domain-story-modeler)"

  - title: "More about Domain Storytelling"
    excerpt: "![](/images/feature-row-egon-height-500px.png)<br> Read intros to Domain Storytelling and other modelling tools. A book written by a community of practitioners. <br> [Visit Leanpub](https://leanpub.com/visualcollaborationtools)"
---


# About Domain Storytelling
Domain Storytelling is a collaborative, visual, and agile way to build domain-driven software.

{% include feature_row id="external_links" %}

# How to use Egon.io

## Recommended browsers
**Important:** We recommend Mozilla Firefox or browsers based on Chromium (Google Chrome, Microsoft Edge). Egon.io requires that your browser allows third party cookies (How to turn on third party cookies in [Firefox](https://support.mozilla.org/en-US/kb/disable-third-party-cookies) and [Chrome](https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en)). We rely on storing your modeler's configuration in your browser. That enabled us to develop a cool feature that allows you to choose which icons you want to use for modeling (see below).

## Palette

Shows the icons you can choose to record your Domain Story (actors and work objects), a rectangular shape to group icons into logical units, and two useful modeling tools:

- The lasso tool lets you select several icons at once to move them easily.
- the space tool creates or removes space. Click and drag the crosshair to the right or down to create space, or drag to the left or to the top to remove space.

## Headline

Click on the headline to change the name of the Domain Story and describe it. The description can contain information about assumptions (e.g. that the domain story describes a "happy path" scenario) and variations (e.g. optional activities).
Use ctrl+enter or alt+enter to add line breaks to the description.

## Context Menu

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

Double click on an actor's or work object's icon to edit the name. To rename multiple work objects, click the dictionary button ![Dictionary Button](/images/spellcheck.png).

## Naming and Numbering of Activities

Activities are depicted as arrows. Double click on an arrow to edit the activity's name. If you model an activity between an actor (person, people and system) and a work object (folder, call, email, conversation, information) it will be numbered automatically. By double clicking on the arrow or the number you can manually change the number. All other numbers are adjusted automatically.

If you want to model activities that happen simultaneously, check  the "multiple" checkbox of an activity. This allows you to use the same number multiple times, indicating that these activities happen in parallel. These steps are shown at once in the replay mode.

## Save, Open, and Export Domain Stories

If you want to save your Domain Story, download it as a `.dst` file by clicking the export button ![Export Button](/images/archive.png) or pressing ctrl+s on your keyboard. To continue working on a Domain Story, import a `.dst` file using the upload button ![Upload Button](/images/unarchive.png).

You can also export your diagram as a `.svg`, `.png`, or animated `.html` file by clicking on the image button ![SVG Button](/images/image.png) and selecting your preferred format. Beginning with version 1.2.0, the `.svg` file contains an embedded `.dst` file. That means that you only need to download one file that you can use as picture and also edit it later by importing it again. Exporting the domain story as animated HTML presentation is a beta feature introduced with v1.3.0.


## Replay

The replay feature helps you to re-tell a Domain Story sentence by sentence. When you start a replay with the play button ![Play Button](/images/play.png), all activities except the first one disappear. Clicking the forward button ![Forward Button](/images/forward.png) shows the next activity and clicking the previous button ![Previous Button](/images/previous.png) shows the previous one. The current sentence is highlighted. If a Domain Story contains groups, the are hidden an first and then appear as last step at the end of the story.
Editing is disabled in replay mode, but you can zoom (ctrl + mouse wheel up and down), scroll up/down (mouse wheel up and down), and scroll left/right (shift + mouse wheel up and down). You can also move the modeling canvas by keeping the space bar pressed and move the mouse around. The stop the replay, click the stop button ![Stop Button](/images/stop.png).

## Keyboard Shortcuts

Click on ![Keyboard Button](/images/keyboard.png) to display all available keyboard shortcuts.

## Configuring the icon set

We recommend that the icon set is adapted to the domain that you model. You can configure the palette accordingly and share that configuration:

Click on ![Gear Button](/images/gear.png) to open the icon configuration. Configure your icon set by naming it, selecting which icons should be used as actors or as work objects and order these icons (using drag&drop). You can export your configuration as `.domain` file. To switch between configurations, import a different `.domain` file.

If you import a Domain Story from a `.dst` file, your icon configuration will change automatically to the one with which the Domain Story was created - even if you do not have the corresponding `.domain` file.

**Beta feature:** If you want to use icons that are not in the predefined set that comes with the modeler, you can upload your own icons. Different image formats are allowed, but you will achieve best results with SVG because it is scalable (like the icons that come with the modeler). Also, we recommend to use square images because they look better in the pallet and the context pad. If you want a consistent look, consider using the same icon set that we use for the predefined icons—[Google's Material icons](https://material.io/resources/icons/?style=outline)

# Examples
You can [download these examples](https://github.com/WPS/egon.io-examples) and import them into Egon.io. 

# License
The Domain Story Modeler is licensed under GPLv3.0. For more information about licensing, please [refer to the development repository](https://github.com/WPS/domain-story-modeler).