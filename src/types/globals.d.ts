/* CSS side-effect imports — required for Next.js App Router */
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
