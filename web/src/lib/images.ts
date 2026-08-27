/** Map scrape-relative asset paths to public URLs under /assets. */
export function toPublicImageSrc(localPath: string): string {
  return "/" + localPath.replace(/^assets\//, "assets/");
}
