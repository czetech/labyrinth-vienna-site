import { getEntry } from "astro:content";

const global = await getEntry("global", "global");

export const navItemsMain = [
  {
    title: global.data.navItemRegister,
    href: "/register",
  },
  {
    title: global.data.navItemSeminars,
    href: "/seminars",
  },
  {
    title: global.data.navItemInfo,
    href: "/info",
  },
  {
    title: global.data.navItemAbout,
    href: "/about",
  },
  {
    title: global.data.navItemContact,
    href: "/contact",
  },
];

export const navItemsLegal = [
  {
    title: global.data.navItemImprint,
    url: "/imprint",
  },
  {
    title: global.data.navItemPrivacy,
    url: "/privacy",
  },
  {
    title: global.data.navItemTerms,
    url: "/terms",
  },
];
