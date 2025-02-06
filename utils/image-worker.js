import imageCompression from "browser-image-compression";

self.onmessage = async (e) => {
    const { src } = e.data;
    try {
        const response = await fetch(src);
        const blob = await response.blob();
        const compressedBlob = await imageCompression(blob, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
        });
        const url = URL.createObjectURL(compressedBlob);
        self.postMessage({ src, url });
    } catch (error) {
        self.postMessage({ src, url: src });
    }
};