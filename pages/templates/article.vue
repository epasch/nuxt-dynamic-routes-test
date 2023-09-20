<template>
    <div>Article Template - {{ id }}</div>
</template>

<script setup lang="ts">
defineProps<{
    id: number
}>();
</script>