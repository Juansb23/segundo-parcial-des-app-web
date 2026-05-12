const images = import.meta.glob('../../images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function resolveProductImage(fileName) {
  const match = Object.entries(images).find(([path]) => path.endsWith(`/${fileName}`));
  return match?.[1] || images['../../images/cafe1.jpg'];
}
