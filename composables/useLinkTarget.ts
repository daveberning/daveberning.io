import { computed, toRef } from "vue";
import type { Ref } from "vue";
import type { RouteLocationRaw } from "vue-router";

type MaybeRef<T> = T | Ref<T>;

const PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

const isRelative = (value: string) =>
  value.startsWith("/") || value.startsWith(".") || value.startsWith("#");

export const useLinkTarget = (target: MaybeRef<string | RouteLocationRaw>) => {
  const valueRef = toRef(target)
  const isRouteObject = computed(() => typeof valueRef.value === "object" && valueRef.value !== null)

  const isExternal = computed(() => {
    if (typeof valueRef.value !== "string") return false;
    if (valueRef.value.startsWith("//")) return true;
    if (isRelative(valueRef.value)) return false;
    return PROTOCOL_REGEX.test(valueRef.value);
  })

  const href = computed(() => typeof valueRef.value === "string" ? valueRef.value : "#")
  const nuxtLinkTarget = computed(() => isExternal.value ? null : valueRef.value)

  return {
    isExternal,
    href,
    nuxtLinkTarget,
    isRouteObject,
  };
};
