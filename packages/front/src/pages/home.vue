<template>
  <div class="home">
    <aside>
      <BSidebar />
    </aside>
    
    <main v-if="squad.squad">
      <div class="home__section">
        <BSquad :squad="squad" />
      </div>
      
      <div class="home__section">
        <BTaskContainer
          title="Active"
          :active=true
          :tasks="paginationActiveTasks"
        />
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="taskList"
        ></b-pagination>
      </div>

      <div class="home__section">
        <BTaskContainer 
          title="Archived"
          :active=false
          :tasks="archivedTasks"
        />
        
      </div>
    </main>

    <main v-else class="home__blank">
        <BText
          color="gray-30"
          size="giant"
        >
          Hey, welcome! Let's poker... (╯°□°)╯︵ ┻━┻
        </BText>
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import BSidebar from '../components/b-sidebar.vue';
import BSquad from '../components/b-squad.vue'
import BTaskContainer from '../components/b-task-container.vue';
import BText from '../components/b-text.vue'


export default {
  name: 'Home',

  components: {
    BSidebar,
    BSquad,
    BTaskContainer,
    BText,
  },
  data() {
      return {
        perPage: 8,
        currentPage: 1,
        activeTasks: [],
      }
    },
    computed: {
      rows() {
          return this.activeTasks.length
      }
    },
    async mounted() {
      const store = useStore();
      const squad = computed(() => {
        const req = store.getters.getSquadActive;
        if(req.id) store.dispatch('gatherTasks', req.id);
  
        return req;
      });

      this.activeTasks = computed(() => store.getters.getEnabledTasks);

      this.archivedTasks = computed(() => store.getters.getDisabledTasks);
      
      console.log(this.items);
  },
};
</script>

<script setup>

  const store = useStore();

  const squad = computed(() => {
    const req = store.getters.getSquadActive;
    if(req.id) store.dispatch('gatherTasks', req.id);
    
    return req;
  });

  const paginationIndex = 1;
  const pageSize = 8;
  const activeTasks = computed(() => store.getters.getEnabledTasks);

  const archivedTasks = computed(() => store.getters.getDisabledTasks);

  var paginationActiveTasks = activeTasks.value.slice(paginationIndex-1, paginationIndex + pageSize-1);
  var paginationArchivedTasks = archivedTasks.value.slice(paginationIndex-1, paginationIndex + pageSize-1);

  const tasksLength = activeTasks.value.length;


  onMounted(store.dispatch('gatherSquadList'));
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  aside {
    max-width: 68px;
    position: fixed;

    @media (min-width: 768px) {
      max-width: 120px;
    }
  }
  
  main {
    flex: 1 1 0;
    margin-left: 68px;
    
    @media (min-width: 768px) {
      margin-left: 120px;
    }
  }
}

.home__section {
  margin-top: var(--unit-0500);
  padding: var(--unit-0300);

  @media (min-width: 768px) {
    padding: var(--unit-0900);
  }

  &:first-child {
    margin-top: var(--unit-0000);
  }
}

.home__blank {
  align-items: center;
  border-left: var(--unit-0050) solid var(--color-gray-30);
  background-color: var(--color-black);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
}
</style>