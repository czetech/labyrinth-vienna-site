import SvgLogo from "~/assets/labyrinth-vienna-logo.svg?component-solid";

const Logo: Component = (props) => {
  return (
    <a href="/" class={props.class} aria-label="Labyrinth Vienna">
      <SvgLogo fill="currentColor" class="h-full w-full" />
    </a>
  );
};

export default Logo;
