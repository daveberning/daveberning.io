<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </NuxtLayout>
  <ClientOnly>
    <UiBreakpointReporter />
  </ClientOnly>
</template>