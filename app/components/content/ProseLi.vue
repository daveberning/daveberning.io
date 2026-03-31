<template>
  <li class="pl-1">
    <UiText color="inherit" as="div" class="mb-0 leading-relaxed"><slot /></UiText>
  </li>
</template>

<style scoped>
li::marker {
  color: var(--text-muted);
  font-size: 0.9em;
}
</style>
