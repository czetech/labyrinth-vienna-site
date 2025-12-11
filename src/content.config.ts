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

const imprint = defineCollection({
  loader: glob({
    pattern: ["imprint", mdExt].join("."),
    base: collectionsBase,
  }),
});

const infoMainColl = defineCollection({
  loader: glob({
    pattern: mdGlob,
    base: path.join(collectionsBase, "info_main_coll"),
  }),
});

const privacy = defineCollection({
  loader: glob({
    pattern: ["privacy", mdExt].join("."),
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

const terms = defineCollection({
  loader: glob({
    pattern: ["terms", mdExt].join("."),
    base: collectionsBase,
  }),
});

export const collections = {
  about,
  global,
  footer,
  imprint,
  infoMainColl,
  privacy,
  seminars,
  teachers,
  terms,
};
