import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const yamlExt = "yaml";
const yamlGlob = ["*", yamlExt].join(".");
const collectionsBase = "content";

const teachers = defineCollection({
  loader: glob({
    pattern: yamlGlob,
    base: path.join(collectionsBase, "teachers"),
  }),
});
