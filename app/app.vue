<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
    <ThemePicker class="theme-picker fixed bottom-4 left-2 z-50 md:left-4 print:hidden" />
  </NuxtLayout>
  <ClientOnly>
    <UiBreakpointReporter class="breakpoint-reporter print:hidden" />
  </ClientOnly>
</template>
