import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import path from "pathe";

const mdExt = "md";
const yamlExt = "yaml";
const mdGlob = ["*", mdExt].join(".");
const yamlGlob = ["*", yamlExt].join(".");
const collectionsBase = "content";

const about = defineCollection({
  loader: glob({
    pattern: ["about", mdExt].join("."),
    base: collectionsBase,
  }),
});

const footer = defineCollection({
  loader: glob({
    pattern: ["footer", yamlExt].join("."),
    base: collectionsBase,
  }),
});

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



export const collections = {
  about,
  global,
  footer,
  seminars,
  teachers,
};
