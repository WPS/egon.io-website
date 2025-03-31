---
permalink: /changelog
title: "Changelog"
layout: single
toc: true
toc_sticky: true
---

> Have you used an earlier version of *Egon v2* or *latest build*? Please follow these [instructions](https://egon.io/howto#launching-egon) for updating to the newest version.

## Latest Build
No changes yet.


## v3.0.0
- `Feature`: A collapsible "mini map" makes it easier to find the story on the canvas. [See #195](https://github.com/WPS/egon.io/issues/195)
- `Feature`: Stories are centered on import so that the full diagram is visible. [See #211](https://github.com/WPS/egon.io/issues/211)
- `Feature`: Groups can now be created on top of other elements. Their default size was decreased to avoid unintentionally grouping too many elements. [See #203](https://github.com/WPS/egon.io/issues/203)
- `Feature`: Labels of work objects, actors, and annotations can now be edited while replaying a story. [See #217](https://github.com/WPS/egon.io/issues/217)
- `Fix`: Palette is disabled while replaying a story. [See #216](https://github.com/WPS/egon.io/issues/216)
- `Fix`: For some stories created with v1, colors were not imported correctly. [See #201](https://github.com/WPS/egon.io/issues/201)
- Unused attributes were removed from `.egn` file format. This change is compatible: Egon 2.x can import the new file format, Egon 3.x can import the old file format. However, users who keep their files in a repository will see structural changes in their files when diffing `.egn` exported with v2 with the same `.egn` exported from v3.
  
> Breaking Changes
- Touch input is no longer supported. Reason: Egon is based on a diagramming framework which dropped touch support because it was buggy.


## v2.4.0
- `Feature`: Make users aware of unsaved changes. [See #175](https://github.com/WPS/egon.io/issues/175)
- `Fix`: Empty description is no longer exported as "undefined" in images. [See #186](https://github.com/WPS/egon.io/issues/186)
- `Fix`: Replace double hyphen ("--") with a dash ("—") to a avoid breaking the SVG export. [See #171](https://github.com/WPS/egon.io/issues/171)
- `Fix`: Animated SVG works if the story contains a sequence number multiple times. [See #194](https://github.com/WPS/egon.io/issues/194)
- `Fix`: Stories without activities can now be exported as SVG. [See #200](https://github.com/WPS/egon.io/issues/200)

## v2.3.0
- `Feature`: Added shortcut `ctrl+alt+s` for exporting as `.egn.svg` file [See #159](https://github.com/WPS/egon.io/issues/159)
- `Feature`: On MacOS, shortcuts use `cmd` as modifier key [See #160](https://github.com/WPS/egon.io/issues/160)
- `Feature`: Docker container runs on Apple Silicon [See #187](https://github.com/WPS/egon.io/issues/187)
- Redesign (more restrained and consistent look) and usability improvements (self-explanatory) 

## v2.2.0
- `Feature`: Load domain story from public URL. [See #68](https://github.com/WPS/egon.io/issues/68)
- `Feature`: Export animated SVG. [See #55](https://github.com/WPS/egon.io/issues/55)
- `Feature`: Find icons by keyword (instead of name only). [See #157](https://github.com/WPS/egon.io/issues/157)
- `Fix`: Creating overlapping groups.  [See #158](https://github.com/WPS/egon.io/issues/158)
- `Fix`: .egn export produces JSON nodes that are in consistent order which makes diffing easier. **Note:** If you have committed .egn files to a repository and update them with .egn files created with v2.2.0 you will see many changes to the file. These are just structural and do not impact the content of the domain stories [See #161](https://github.com/WPS/egon.io/issues/161)

## v2.1.0
- `Feature`: Added 33 icons to the icon set. [See #151](https://github.com/WPS/egon.io/issues/151)
- `Feature`: Drag&drop files on canvas to import domain stories. [See #118](https://github.com/WPS/egon.io/issues/118)
- `Feature`: Annotations can be colored. [See #138](https://github.com/WPS/egon.io/issues/138)
- `Feature`: Detect if local storage needs to be cleared after deployment of new Egon version. [See #154](https://github.com/WPS/egon.io/issues/154)
- `Fix`: Copy/paste annotations. [See #153](https://github.com/WPS/egon.io/issues/153)
- `Fix`: In replay, annotations of groups and actors are only visible if the group/actor is visible. [See #156](https://github.com/WPS/egon.io/issues/156)
- `Fix`: Importing an icon set removes unused icons of previous icon set. [See #155](https://github.com/WPS/egon.io/issues/155)

## v2.0.1
- `Fix`: Copy/paste also copies color of copied model element. [See #103](https://github.com/WPS/egon.io/issues/103)
- `Fix`: When domain stories with colored icons are imported and a colored icon is selected, the color picker now shows the correct color as hex value.
- `Fix`: Stories created with v1.3.0 or earlier may contain whitespace characters in the name of custom icons which caused the import to fail. Whitespace is now replaced with `-` to be consistent with the current behavior of uploading custom icons. [See #150](https://github.com/WPS/egon.io/issues/150)
- `Fix`: When importing `.egn` files, the file ending is no longer shown in the title.
- `Fix`: Removed unnecessary scroll bar from label dictionary.

## v2.0.0
- `Feature`: The description in the headline can be collapsed to give you more modeling space on the canvas. See [User Guide](https://egon.io/howto#headline).
- `Feature`: The `.egn` file export uses a stringified format.  That makes it easier to keep your exported Domain Stories in source code repositories and diff changes. 
- `Feature`: Auto-save prevents losing a Domain Story because of browser crashes or accidentally closing your browser. See [User Guide](https://egon.io/howto#auto-save-and-creating-new-domain-stories).
- `Feature`: Improved color picker.
- `Feature`: Footer contains version number and link to changelog.
- `Fix`: Sequence numbers are now placed more consistently at the beginning of an activity.
- `Fix`: On Linux, sequence numbers are now displayed as circles (like on Windows and Mac).
- `Fix`: Improved cropping for image exports.


## v1.5.1
The changelog for this version and previous releases can be found on [GitHub](https://github.com/WPS/egon.io/releases)
