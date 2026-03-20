import { computed, useAttrs } from "vue";
import { type LinkProps } from "../components/Link";
import { useThemeStore } from "~/stores/theme";

/**
 * A composable to manage link attributes and classes based on the provided props and theme.
 * @param props
 */
export function useLink(props: LinkProps) {
  function isExternalString(value: string) {
    if (value.startsWith("/") || value.startsWith(".") || value.startsWith("#"))
      return false;
    if (value.startsWith("//"))
      return true;
    return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
  }

  const attrs = useAttrs();
  const themeStore = useThemeStore();
  const isRouteObject = computed(() => typeof props.to === "object" && props.to !== null)
  const isExternalLink = computed(() => typeof props.to !== "string" ? false : isExternalString(props.to))
  const useNuxtLink = computed(() => isRouteObject.value || (typeof props.to === "string" && !isExternalLink.value))
  const hrefValue = computed(() => typeof props.to === "string" ? props.to : "#")

  const resolvedColor = computed(() => {
    if (props.color) return props.color
    if (props.type === "button") return themeStore.active
    return themeStore.mode === "dark" ? "white" : themeStore.active
  })

  const forwardedAttrs = computed(() =>
    Object.fromEntries(
      Object.entries(attrs).filter(([key]) => key !== "class")
    )
  )

  return {
    forwardedAttrs,
    hrefValue,
    isExternalLink,
    isRouteObject,
    resolvedColor,
    useNuxtLink,
  }
}
