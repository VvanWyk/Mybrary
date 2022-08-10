FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileEncode);
FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    targetWidth: 100,
    targetHeight: 150,
});
FilePond.parse(document.body);
