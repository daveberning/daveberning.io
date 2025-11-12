import { computed, useAttrs } from "vue";
import { mergeClass } from "~/utils/merge-class";
import { linkVariants, type LinkProps } from "~/components/ui/Link";
import { useThemeStore } from "~/stores/theme";

export const useLink = (props: LinkProps) => {
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

  const mergedClass = computed(() =>
    mergeClass(
      linkVariants({ color: props.color ?? themeStore.active, type: props.type }),
      attrs.class as Parameters<typeof mergeClass>[number]
    )
  );

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
    mergedClass,
    useNuxtLink,
  }
}
