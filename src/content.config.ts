import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import path from "pathe";

const mdExt = "md";
const yamlExt = "yaml";
const mdGlob = ["*", mdExt].join(".");
const yamlGlob = ["*", yamlExt].join(".");
const collectionsBase = "content";

const global = defineCollection({
  loader: glob({
    pattern: ["global", yamlExt].join("."),
    base: collectionsBase,
  }),
});

const seminars = defineCollection({
  loader: glob({
    pattern: mdGlob,
    base: path.join(collectionsBase, "seminars"),
  }),
});

const teachers = defineCollection({
  loader: glob({
    pattern: yamlGlob,
    base: path.join(collectionsBase, "teachers"),
  }),
});

const footer = defineCollection({
  loader: glob({
    pattern: ["footer", yamlExt].join("."),
    base: collectionsBase,
  }),
});

export const collections = {
  global,
  seminars,
  teachers,
  footer,
};
