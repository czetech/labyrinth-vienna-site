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
    <div class="min-h-(--height) 2xl:min-h-(--2xl-height) mb-8" style="--height: calc(18*var(--spacing)); --2xl-height: calc(20*var(--spacing));">
      <div class="z-110 w-full h-(--height) 2xl:h-(--2xl-height) flex justify-center items-center"
      classList={{"fixed": isMenuOpen(), "absolute": !isMenuOpen()}}>
        <div class="h-[calc(100%-8*var(--spacing))]">
          {props.children}
        </div>
      </div>
      <div class="h-(--height) 2xl:h-(--2xl-height) right-4 z-110 flex flex-col justify-center md:hidden"
      classList={{"fixed": isMenuOpen(), "absolute": !isMenuOpen()}}>
        <button onClick={handleMenuClick} class="w-9">
            <svg
              class="[&_path]:duration-500"
              classList={{
                "[&_path:nth-child(odd)]:opacity-0": isMenuOpen(),
              }}
              viewBox="0 0 32 32"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M5 8h22"></path>
              <path d="M5 16h22"></path>
              <path d="M5 24h22"></path>
            </svg>
        </button>
      </div>
      <div class="z-100 md:z-110 fixed inset-0 flex flex-col bg-ivory-soft justify-center items-center uppercase gap-x-6 gap-y-4 tracking-wide text-lg pt-(--height) duration-500 md:static md:opacity-100 md:visible md:flex-row 2xl:absolute 2xl:inset-auto 2xl:right-0 2xl:pt-0 min-h-(--height) 2xl:min-h-(--2xl-height) px-6"
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
                class="ul p-1 after:duration-1000"
                classList={{
                  "after:opacity-0": !isActive(),
                  "after:opacity-100": isActive(),
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
