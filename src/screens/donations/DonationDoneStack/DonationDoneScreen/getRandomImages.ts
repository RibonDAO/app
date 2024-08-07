
export function getRandomImages(quantity: number) {
  const images = [
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-nathy.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-pedrim.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-tata.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-amanda.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-duda.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-ivis.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-joyce.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-julia.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-leod.png",
    "https://d1y5ietpc6mka3.cloudfront.net/produto/socialProof-lulu.png",
  ];

  const selectedImages: string[] = [];

  while (selectedImages.length < quantity) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomItem = images.splice(randomIndex, 1)[0];

    selectedImages.push(randomItem);
  }

  return selectedImages;
}
