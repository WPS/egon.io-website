---
permalink: /changelog
title: "Changelog"
layout: single
toc: true
toc_sticky: true
---
# Updating to the Latest Version

If you have used one of the `v2.0.0-beta` versions or the latest build (`v2.x.x.-dev`), we recommend clearing your local browser storage and then reloading the page. This will reset your icon configuration to default and delete the automatically saved drafts. Instructions:
- [Firefox](https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox#w_clear-cookies-for-the-current-website)
- Chrome: In the address bar, click the button in the left corner (*show website information*), then *cookies and website date*, *manage website data*, and delete the data for egon.io.

# Changelog

## Latest Build

Note: Yet to be released changes appear here.

- `Feature`: Load domain story from public URL. [See #68](https://github.com/WPS/egon.io/issues/68)
- `Feature`: Annotations can be colored. [See #138](https://github.com/WPS/egon.io/issues/138)

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
