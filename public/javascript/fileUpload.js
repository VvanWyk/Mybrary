FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType
);
FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    targetWidth: 100,
    targetHeight: 150,
    acceptedFileTypes: ['image/*'],
});
FilePond.parse(document.body);
