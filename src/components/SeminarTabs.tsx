import type { Component } from "solid-js";
import { createSignal } from "solid-js";

interface Props {
  seminarHtml: string;
  teacherHtml: string;
}

const SeminarTabs: Component<Props> = (props) => {
  const [active, setActive] = createSignal<"seminar" | "teacher">("seminar");

  return (
    <div>
      <div class="mb-6 flex gap-x-1">
        <button
          class="rounded-lg border px-4 py-1.5 font-serif text-lg font-medium uppercase tracking-wide duration-300"
          classList={{
            "bg-ivory border-ivory-solid": active() === "seminar",
            "border-transparent text-black-soft": active() !== "seminar",
          }}
          onClick={() => setActive("seminar")}
        >
          Seminar
        </button>
        <button
          class="rounded-lg border px-4 py-1.5 font-serif text-lg font-medium uppercase tracking-wide duration-300"
          classList={{
            "bg-ivory border-ivory-solid": active() === "teacher",
            "border-transparent text-black-soft": active() !== "teacher",
          }}
          onClick={() => setActive("teacher")}
        >
          Teacher
        </button>
      </div>
      <div
        class="markdown text-justify font-serif text-lg font-medium tracking-wide"
        style={{ display: active() === "seminar" ? "block" : "none" }}
        innerHTML={props.seminarHtml}
      />
      <div
        class="markdown text-justify font-serif text-lg font-medium tracking-wide"
        style={{ display: active() === "teacher" ? "block" : "none" }}
        innerHTML={props.teacherHtml}
      />
    </div>
  );
};

export default SeminarTabs;
