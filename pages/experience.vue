<script setup lang="ts">
import Text from '~/components/ui/Text'

definePageMeta({
  layout: 'internal',
  headerNav: true,
  headerNavLabel: "Experience",
  headerNavOrder: 1,
})

const experiences = {
  professional: [
    {
      company: "Walker & Dunlop",
      role: "Senior Front-End Engineer",
      period: "March 2021 - Present",
      logo: "/logos/wd-logo-white.svg",
    }
  ]
}
</script>

<template>
  <Text as="h1">Experience</Text>
  <Text class="mt-4">
    Dave Berning is a seasoned Software Engineer and Professor based in Cincinnati, OH. With a passion for technology and education, Dave has dedicated his career to developing innovative software solutions while also nurturing the next generation of tech talent through his teaching.
  </Text>
  <Text as="h3" tag="h2" class="mt-4">Professional</Text>
  <div class="grid grid-cols-3 mt-4 gap-4">
    <div class="flex flex-col gap-2 border items-center text-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="h-[50px] mb-4">
      <ul>
        <Text as="h4" tag="li">Walker & Dunlop</Text>
        <Text tag="li">Senior Front-End Engineer</Text>
        <Text tag="li">March 2021 - Present</Text>
      </ul>
    </div>
    <div class="flex flex-col gap-2 border items-center text-center border-white p-6 rounded-lg">
      <img src="/logos/uc.svg" alt="" class="h-[50px] mb-4">
      <ul>
        <Text as="h4" tag="li">University of Cincinnati</Text>
        <Text tag="li">Adjunct Instructor</Text>
        <Text tag="li">August 2023 - Present</Text>
      </ul>
    </div>
    <div class="flex flex-col gap-2 border items-center text-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="w-1/2 mb-4">
      <ul>
        <Text as="h4" tag="li">Oodle</Text>
        <Text tag="li">Front-End Web Developer</Text>
        <Text tag="li">July 2019 - March 2021</Text>
      </ul>
    </div>
    <div class="flex flex-col gap-2 border items-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="w-1/2 mb-4">
      <Text as="h4" tag="h2">Drees Homes</Text>
      <Text as="h5" tag="h2">Software Engineer</Text>
    </div>
    <div class="flex flex-col gap-2 border items-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="w-1/2 mb-4">
      <Text as="h4" tag="h2">Kalio Commerce</Text>
      <Text as="h5" tag="h2">Front-End Web Developer</Text>
    </div>
    <div class="flex flex-col gap-2 border items-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="w-1/2 mb-4">
      <Text as="h4" tag="h2">Upright Communications</Text>
      <Text as="h5" tag="h2">Front-End Web Developer</Text>
    </div>
  </div>
  <Text as="h3" tag="h2">Freelance</Text>
  <div class="grid grid-cols-3 mt-4 gap-4">
    <div class="flex flex-col gap-2 border items-center text-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="h-[50px] mb-4">
      <ul>
        <Text as="h4" tag="li">Kroger Wireless</Text>
        <Text tag="li">Mobile Application Developer</Text>
        <Text tag="li">March 2021 - Present</Text>
      </ul>
    </div>
    <div class="flex flex-col gap-2 border items-center text-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="h-[50px] mb-4">
      <ul>
        <Text as="h4" tag="li">M80, Inc</Text>
        <Text tag="li">Web Developer</Text>
        <Text tag="li">March 2021 - Present</Text>
      </ul>
    </div>
    <div class="flex flex-col gap-2 border items-center text-center border-white p-6 rounded-lg">
      <img src="/logos/wd-logo-white.svg" alt="" class="h-[50px] mb-4">
      <ul>
        <Text as="h4" tag="li">Digital Ocean</Text>
        <Text tag="li">Technical Writer</Text>
        <Text tag="li">March 2021 - Present</Text>
      </ul>
    </div>
  </div>
</template>
