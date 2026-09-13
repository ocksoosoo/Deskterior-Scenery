export function preloadingImages(imgUrls = []) {
  const urls = imgUrls.filter(Boolean);

  return Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();

          image.onload = resolve;

          image.onerror = resolve;

          image.src = src;
        }),
    ),
  );
}
