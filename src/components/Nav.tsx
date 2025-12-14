import type { Component } from "solid-js";
import {
  createSignal,
  onMount,
  createEffect,
  onCleanup,
  createMemo,
  on,
} from "solid-js";
import { makeEventListener } from "@solid-primitives/event-listener";
import { createPresence } from "@solid-primitives/presence";
import { navigate } from "astro:transitions/client";

const Nav: Component = (props) => {
  const [pathname, setPathname] = createSignal(props.pathname);
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const handleAstroAfterSwap = () => {
    setIsMenuOpen(false);
    setPathname(window.location.pathname);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      setIsMenuOpen(false);
    }
  };

  onMount(() => {
    makeEventListener(document, "astro:after-swap", handleAstroAfterSwap);
    makeEventListener(document, "keydown", handleKeydown);
  });

  return (
    <div class="min-h-18 mb-4">
      <div class="p-4 z-110 w-full h-18 flex sm:justify-center lg:justify-start xl:justify-center"
      classList={{"fixed": isMenuOpen(), "absolute": !isMenuOpen()}}>
          {props.children}
      </div>
      <div class="top-0 h-18 p-4 right-0 z-110 flex items-center sm:hidden"
      classList={{"fixed": isMenuOpen(), "absolute": !isMenuOpen()}}>
        <button onClick={handleMenuClick} class="w-8">
            <svg
              class="[&_path]:duration-500"
              classList={{
                "[&_path:nth-child(odd)]:opacity-0": isMenuOpen(),
              }}
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M3 6h18"></path>
              <path d="M3 12h18"></path>
              <path d="M3 18h18"></path>
            </svg>
        </button>
      </div>
      <div class="z-100 sm:z-110 fixed inset-0 bg-ivory-soft flex flex-col justify-center items-center uppercase gap-x-6 gap-y-4 tracking-wide text-lg pt-18 duration-500 sm:static sm:opacity-100 sm:visible sm:flex-row sm:pb-4 lg:absolute lg:inset-auto lg:right-0 lg:pt-4 px-4 lg:min-h-18"
      classList={{
          "invisible opacity-0": !isMenuOpen(),
        }}>
        <For each={props.navItems}>
          {(navItem, index) => {
            const isActive = createMemo(() =>
              navItem.test
                ? new RegExp(navItem.test).test(pathname())
                : navItem.href === pathname(),
            );
            return (
              <a
                href={navItem.href}
                classList={{
                  "font-semibold": isActive(),
                }}
              >
                {navItem.title}
              </a>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default Nav;
