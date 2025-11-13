<template>
  <div class="router">
    <nav class="router__nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="router__tab"
        :class="{ 'router__tab--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
    <section class="router__panel">
      <component :is="currentComponent" />
    </section>
  </div>
</template>

<script setup lang="ts">
const tabs = [{
  id: 'threads',
  label: 'All Threads',
  component: {
    template: '<p class="panel">Displays paginated threads with filters.</p>',
  },
}, {
  id: 'thread-detail',
  label: 'Thread Detail',
  component: {
    template: '<p class="panel">Shows posts, replies, and composer.</p>',
  },
}, {
  id: 'admin',
  label: 'Admin Categories',
  component: {
    template: '<p class="panel">Manage categories with CRUD actions.</p>',
  },
}]

const activeTab = ref(tabs[0]!.id)

const currentComponent = computed(() => {
  return tabs.find(tab => tab.id === activeTab.value)?.component
})
</script>

<style scoped>
.router {
  display: grid;
  gap: 1rem;
}

.router__nav {
  display: flex;
  gap: 0.75rem;
  background: rgba(15, 23, 42, 0.4);
  padding: 0.75rem;
  border-radius: 0.75rem;
}

.router__tab {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: transparent;
  color: #cbd5f5;
}

.router__tab--active {
  background: #38bdf8;
  color: #0f172a;
  border-color: rgba(56, 189, 248, 0.5);
}

.router__panel {
  background: rgba(15, 23, 42, 0.55);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.panel {
  color: rgba(226, 232, 240, 0.9);
}
</style>
