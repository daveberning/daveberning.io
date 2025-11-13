<script setup lang="ts">
import Card from '~/components/ui/Card'
import Text from '~/components/ui/Text'
import type { ExperienceEntry, ExperienceType } from '~/types/experiences'

definePageMeta({
  layout: 'internal',
  headerNav: true,
  headerNavLabel: 'Experience',
  headerNavOrder: 1,
})

const experiences: Record<ExperienceType, ExperienceEntry[]> = {
  professional: [
    {
      company: 'Walker & Dunlop',
      role: 'Senior Front-End Engineer',
      period: 'March 2021 - Present',
      logo: '/logos/wd-logo-white.svg',
      logoClass: 'h-[50px]',
      type: 'professional',
    },
    {
      company: 'University of Cincinnati',
      role: 'Adjunct Instructor',
      period: 'August 2023 - Present',
      logo: '/logos/uc.png',
      logoClass: 'h-[50px]',
      type: 'professional',
    },
    {
      company: 'Oodle',
      role: 'Front-End Web Developer',
      period: 'July 2019 - March 2021',
      logo: '/logos/oodle.svg',
      logoClass: 'h-[50px]',
      type: 'professional',
    },
    {
      company: 'Drees Homes',
      role: 'Software Engineer',
      period: 'November 2016 - July 2019',
      logo: '/logos/drees-homes.svg',
      logoClass: 'h-[50px]',
      type: 'professional',
    },
    {
      company: 'Kalio Commerce',
      role: 'Front-End Web Developer',
      period: 'February 2016 - November 2016',
      logo: '/logos/kalio-commerce.png',
      logoClass: 'h-[50px]',
      type: 'professional',
    },
    {
      company: 'Upright Communications',
      role: 'Front-End Web Developer',
      period: 'March 2016 - February 2016',
      logo: '/logos/upright-communications.webp',
      logoClass: 'h-[50px]',
      type: 'professional',
    },
  ],
  freelance: [
    {
      company: 'Kroger Wireless',
      role: 'Mobile Application Developer',
      period: 'Summer 2022',
      logo: '/logos/kroger-wireless.png',
      logoClass: 'h-[50px]',
      type: 'freelance',
    },
    {
      company: 'M80, Inc',
      role: 'Web Developer',
      period: 'Spring 2016',
      logo: '/logos/m80.png',
      logoClass: 'h-[50px]',
      type: 'freelance',
    },
    {
      company: 'DigitalOcean',
      role: 'Technical Writer',
      period: 'Summer 2021',
      logo: '/logos/digital-ocean.svg',
      logoClass: 'h-[50px]',
      type: 'freelance',
    },
  ],
}
</script>

<template>
  <Text as="h1">Experience</Text>
  <Text class="mt-4">
    Dave Berning is a seasoned Software Engineer and Professor based in Cincinnati, OH. With a passion for technology and education, Dave has dedicated his career to developing innovative software solutions while also nurturing the next generation of tech talent through his teaching.
  </Text>
  <div v-for="[type, entries] in Object.entries(experiences)" :key="type">
    <Text as="h3" tag="h2" class="mt-4 capitalize">{{ type }}</Text>
    <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <Card v-for="experience in entries" :key="`professional-${experience.company}`" :color="experience.color" class="flex flex-col justify-center gap-2 items-center text-center">
        <img :src="experience.logo" :alt="`${experience.company} logo`" :class="experience.logoClass ?? 'w-1/2'">
        <ul class="space-y-1">
          <Text tag="li" color="white">{{ experience.role }}</Text>
          <Text v-if="experience.period" tag="li" color="white">{{ experience.period }}</Text>
        </ul>
      </Card>
    </div>
  </div>
</template>

<style scoped>
img {
  filter: brightness(0) invert(1);
}
</style>