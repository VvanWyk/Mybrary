const rootStyles = window.getComputedStyle(document.documentElement);

if (
    rootStyles.getPropertyValue('--book-cover-width-large') != null &&
    rootStyles.getPropertyValue('--book-cover-width-large') != ''
) {
    ready();
} else {
    document.getElementById('main-css').addEventListener('load', ready);
}

function ready() {
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'));
    const aspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'));
    const coverHeight = parseFloat(coverWidth / aspectRatio);

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
        FilePondPluginFileValidateType
    );
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / aspectRatio,
        targetWidth: coverWidth,
        targetHeight: coverHeight,
        acceptedFileTypes: ['image/*'],
        credits: false,
    });
    FilePond.parse(document.body);
}
