/**
 * The two-acre grounds gallery, shared by the homepage and the amenities page.
 *
 * Each image carries real alt text. Google Images is a meaningful source of
 * traffic for a property like this, and "Grounds image" repeated twelve times
 * told it nothing — these describe what is actually in each photo.
 */
export const GROUNDS_GALLERY = [
  {
    src: "/grounds/akiko-entrance-road.avif",
    alt: "The Akiko's Buddhist Bed & Breakfast sign above the covered entrance on the quiet country road through Wailea Village, Hakalau",
  },
  {
    src: "/grounds/akiko-kitchen.JPG",
    alt: "Hand-painted \"Akiko's Kitchen\" sign framed by flowering vines",
  },
  {
    src: "/grounds/akiko-pick-flower.JPG",
    alt: "Akiko reaching up into a breadfruit tree in the garden",
  },
  {
    src: "/grounds/akiko-walk-jungle.JPG",
    alt: "Walking a shaded rainforest path lined with hanging vines on the two-acre grounds",
  },
  {
    src: "/grounds/blue-house-jungle.JPG",
    alt: "A jungle path of vine-draped trees leading toward the blue plantation house",
  },
  {
    src: "/grounds/front-door.JPG",
    alt: 'Entry doors beneath a sign reading "Rooted to the source, be of service to mankind", with a stone guardian lion',
  },
  {
    src: "/grounds/grass-and-jungle.JPG",
    alt: "Lawn opening onto palms, ti plants and tropical rainforest under a blue Hawaiian sky",
  },
  {
    src: "/grounds/main-entrance.JPG",
    alt: "The I. Motonaga Garage Gallery entrance at Akiko's, with a Jizo statue and garden bench",
  },
  {
    src: "/grounds/statue-yellow.avif",
    alt: "Stone Buddha statue draped with a yellow flower lei in the garden",
  },
  {
    src: "/grounds/temple.avif",
    alt: "The green-roofed temple building on the grounds, with steps up to its open veranda",
  },
  {
    src: "/grounds/tree-tops.JPG",
    alt: "Looking up into the rainforest canopy of vines and broad tropical leaves",
  },
  {
    src: "/grounds/zendo-alleyway.avif",
    alt: "Garden path lined with ferns and impatiens leading to the zendo entrance",
  },
] as const;

export const GROUNDS_IMAGE_SRCS = GROUNDS_GALLERY.map((image) => image.src);

/** Alt text for a grounds image by src, for use in the lightbox. */
export function groundsAlt(src: string): string {
  return (
    GROUNDS_GALLERY.find((image) => image.src === src)?.alt ??
    "The tropical grounds at Akiko's Buddhist B&B in Hakalau, Hawaii"
  );
}
