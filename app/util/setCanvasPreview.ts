interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const setCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export default setCanvasPreview;

// const setCanvasPreview = (
//   image: HTMLImageElement,
//   canvas: HTMLCanvasElement,
//   crop: PixelCrop,
//   rotation: number,
//   zoomLevel: number
// ): void => {
//   const ctx = canvas.getContext("2d");
//   if (!ctx) {
//     throw new Error("No 2d context");
//   }

//   const pixelRatio = window.devicePixelRatio;
//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;

//   canvas.width = Math.floor(
//     crop.width * scaleX * (zoomLevel / 100) * pixelRatio
//   );
//   canvas.height = Math.floor(
//     crop.height * scaleY * (zoomLevel / 100) * pixelRatio
//   );

//   ctx.scale(pixelRatio, pixelRatio);
//   ctx.imageSmoothingQuality = "high";
//   ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

//   const cropX = crop.x * scaleX;
//   const cropY = crop.y * scaleY;

//   ctx.translate(canvas.width / 2, canvas.height / 2); // Translate to center
//   ctx.rotate((rotation * Math.PI) / 180); // Rotate
//   ctx.scale(zoomLevel / 100, zoomLevel / 100); // Scale based on zoom level

//   ctx.drawImage(
//     image,
//     cropX,
//     cropY,
//     crop.width * scaleX,
//     crop.height * scaleY,
//     -canvas.width / 2,
//     -canvas.height / 2,
//     canvas.width,
//     canvas.height
//   );
// };

// export default setCanvasPreview;
