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
    <div
      class="mb-8 min-h-(--height) lg:min-h-(--lg-height)"
      style="--height: calc(18*var(--spacing)); --lg-height: calc(20*var(--spacing));"
    >
      <div
        class={`z-110 flex h-(--height) w-full items-center justify-center
          lg:h-(--lg-height)`}
        classList={{ fixed: isMenuOpen(), absolute: !isMenuOpen() }}
      >
        <div class="h-[calc(100%-8*var(--spacing))]">{props.children}</div>
      </div>
      <div
        class={`right-4 z-110 flex h-(--height) flex-col justify-center
          md:hidden lg:h-(--lg-height)`}
        classList={{ fixed: isMenuOpen(), absolute: !isMenuOpen() }}
      >
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
      <div
        class={`bg-ivory-soft fixed inset-0 z-100 flex flex-col
          items-center justify-center gap-x-6 gap-y-4 px-4 pt-(--height) text-lg
          tracking-wide uppercase duration-500 md:visible md:static md:z-110 md:px-8 md:inset-auto
          md:flex-row md:opacity-100 lg:pt-(--lg-height) 2xl:px-0 2xl:h-(--lg-height)
          2xl:absolute 2xl:right-6 2xl:pt-0`}
        classList={{
          "invisible opacity-0": !isMenuOpen(),
        }}
      >
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
                class="ul p-1 after:duration-500"
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
