import type { Component } from "solid-js";
import {
  createSignal,
  onMount,
  createEffect,
  onCleanup,
  createMemo,
  on,
} from "solid-js";
import { isOpenEntry, setOpenEntry } from "~/stores/info.ts";
import { navigate } from "astro:transitions/client";
import { makeEventListener } from "@solid-primitives/event-listener";

const InfoEntry: Component = (props) => {
  const isOpen = createMemo(() => isOpenEntry(props.sectionId, props.id));

  const handleHeaderClick = () => {
    setOpenEntry(props.sectionId, props.id);
  };

  const handleAstroBeforeSwap = () => {
    console.log("handleAstroBeforeSwap");
  };

  const handleAstroAfterSwap = () => {
    console.log("handleAstroAfterSwap");
  };

  createEffect(() => {
    if (isOpen()) {
      const url = new URL(window.location.href);
      url.hash = `${props.sectionId}-${props.id}`;
      navigate(url, { history: "replace" });
      console.log(`Open ${props.sectionId}-${props.id}`);
    }
  });

  onMount(() => {
    makeEventListener(document, "astro:before-swap", handleAstroBeforeSwap);
    makeEventListener(document, "astro:after-swap", handleAstroAfterSwap);
  });

  return (
    <div class="overflow-hidden rounded-xl border">
      <button
        class={`bg-ivory flex w-full justify-between px-2
          py-1 items-center gap-x-4`}
        onClick={handleHeaderClick}
      >
        <h2 class="text-start font-serif text-xl font-bold">
          {props.title}
        </h2>
        <svg
          class="w-3.5 opacity-80"
          viewBox="0 0 16 16"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M0 8h16"></path>
          <path d="M8 0v16" class="duration-500" classList={{"opacity-0": isOpen()}}></path>
        </svg>
      </button>
      <div
        class={`invisible grid grid-rows-[0fr]
          duration-500`}
        classList={{"grid-rows-[0fr] invisible": !isOpen(), "grid-rows-[1fr]": isOpen()}}
      >
        <div
          class={"overflow-hidden opacity-0 duration-1000"}
          classList={{"opacity-0": !isOpen()}}
        >
          <div class="markdown p-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoEntry;
