<template>
  <div class="b-sidebar">
    <div class="b-sidebar__logo-wrapper">
      <a @click="store.dispatch('addSquadActive', {})">
        <img
          class="b-sidebar__image"
          src="../assets/square-logo-80.png"
          alt="brand-logo"
        >
      </a>
    </div>

    <BDivisor color="gray-30" />

    <div class="b-sidebar__new-squad-wrapper">
      <BButton
        size="small"
        value="+"
        @click="toggleModal"
      />

      <BModal
        color="gray-30"
        :open="showModal"
      >
        <FSquad @close="toggleModal" />
      </BModal>
    </div>

    <BDivisor
      v-if="squads?.length > 0"
      color="gray-30"
    />

    <div
      v-if="squads?.length > 0"
      class="b-sidebar__squad-wrapper"
    >
      <div
        v-for="(squad, index) in squads.slice().reverse()"
        :key="index"
        class="b-sidebar__squad"
      >
        <BButton
          size="small"
          variant="transparent"
          :value="`${index + 1}`"
          @click="store.dispatch('gatherSquad', squad.id)"
        />
      </div>
    </div>

    <BDivisor color="gray-30" />

    <div class="b-sidebar__user-wrapper">
      <a href="/user-account">
        <font-awesome-icon
          class="b-sidebar__user-image"
          icon="fa-regular fa-user"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BButton from '../components/b-button.vue';
import BDivisor from '../components/b-divisor.vue';
import BModal from '../components/b-modal.vue';
import FSquad from '../forms/f-squad.vue';

export default {
  name: 'BSidebar',

  components: {
    BButton,
    BDivisor,
    BModal,
    FSquad,
  },
};
</script>

<script setup>
const store = useStore();
const squads = computed(() => store.getters.getSquadList);

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped>
.b-sidebar {
  align-content: start;
  background-color: var(--color-black);
  display: grid;
  height: calc(100vh - (2 * var(--unit-0900)));
  justify-items: center;
  padding: var(--unit-0900);
  row-gap: var(--unit-0900);

  @media (max-width: 768px) {
    height: calc(100vh - (2 * var(--unit-0300)));
    padding: var(--unit-0300);
    row-gap: var(--unit-0600);
  }
}

.b-sidebar__logo-wrapper {
  cursor: pointer;
  height: calc(12 * var(--unit-0100));
  width: calc(12 * var(--unit-0100));

  @media (max-width: 768px) {
    height: calc(11 * var(--unit-0100));
    width: calc(11 * var(--unit-0100));
  }

  & .b-sidebar__image {
    height: 100%;
    width: 100%;
  }
}

.b-sidebar__new-squad-wrapper,
.b-sidebar__squad-wrapper {
  width: var(--unit-1000);
}

.b-sidebar__squad-wrapper {
  display: grid;
  row-gap: var(--unit-0500);
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .b-sidebar__squad {
    width: 100%;
  }
}

.b-sidebar__user-wrapper {
  cursor: pointer;
  margin-top: auto;
  text-align: center;

  height: var(--unit-1200);
  width: var(--unit-1200);

  @media (max-width: 768px) {
    height: var(--unit-1100);
    width: var(--unit-1100);
  }

  & .b-sidebar__user-image {
    height: 80%;
    width: 80%;
    color: var(--color-white);
  }
}
</style>
