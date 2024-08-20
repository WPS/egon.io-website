---
permalink: /changelog
title: "Changelog"
layout: single
toc: true
toc_sticky: true
---

# Changelog

> Have you used an earlier version of *Egon v2* or *latest build*? Please follow these [instructions](https://egon.io/howto#launching-egon) before using the *v2.0.0* or newer.

## Latest Build

- `Feature`: Load domain story from public URL. [See #68](https://github.com/WPS/egon.io/issues/68)

## v2.1.0
- `Feature`: Added 33 icons to the icon set. [See #151](https://github.com/WPS/egon.io/issue/151)
- `Feature`: Drag&drop files on canvas to import domain stories. [See #118](https://github.com/WPS/egon.io/issue/118)
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
