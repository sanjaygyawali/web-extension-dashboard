<template>
  <div class="q-pa-lg q-my-lg">
    <button @click="collectAllTabs">minimize all tabs</button>
    <span>tabscount : {{ tabsCount }}</span>
    <div v-for="(tabgroup, key) in tabGroups" :key="key">
      <div class="flex items-end">
        <span
          @blur="(event) => onTitleChange(event, tabgroup)"
          contenteditable="true"
          class="text-h5 q-mr-sm"
          href=""
          >Untitled Group</span
        >
        <a class="q-mr-sm" href="">Restore All </a>
        <a class="q-mr-sm" href=""> Delete All</a>
      </div>
      <ul class="compact-list q-mb-xl q-pl-none">
        <li>
          <ul class="q-pl-none" v-for="(tab, key) in tabgroup" :key="tab.id">
            <p class="text-weight-bold q-mb-none" v-if="key == 0">
              {{ new Date(tab.createdAt) }}
            </p>
            <li @mouseover="canClose(tab)">
              <div class="flex">
                <div style="min-width: 15px">
                  <q-icon
                    @click="deleteTabItem(tab.id)"
                    v-if="closableId == tab.id"
                    class="cursor-pointer"
                    name="las la-times-circle"
                  />
                </div>
                <div style="min-width: 15px">
                  <q-icon
                    @click="toggleStar(tab.id)"
                    :class="{
                      'cursor-pointer': true,
                    }"
                    size="xs"
                    :color="tab.star ? 'amber-5' : 'grey-4'"
                    :name="tab.star ? 'las la-star' : 'lar la-star'"
                  />
                </div>
                <img
                  :src="tab.favIconUrl"
                  alt="-"
                  class="q-mx-sm"
                  style="widht: 15px; height: 15px"
                />
                <a target="_blank" :href="tab.url">{{ tab.name }}</a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex",

  data() {
    return {
      tabsCount: 0,
      tabGroups: [],
      closableId: null,
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.totalTabs();
      this.uniqueSaves();
    },
    async onTitleChange(event, tab) {
      let title = event.target.innerText;
    },
    async toggleStar(id) {
      await this.$models.tabs.update(id, {
        star: true,
      });
      await this.init();
    },
    async deleteTabItem(id) {
      await this.$models.tabs.delete(id);
      this.init();
    },
    canClose(tab) {
      this.closableId = tab.id;
    },
    async collectAllTabs() {
      let tabs = await this.$q.bex.send("getAllTabs", { tkey: "Fasfdsafd" });
      const createdAt = new Date().getTime();
      let tabgroup = await this.$models.tab_groups.create({
        name: `Untitled Tab - ${createdAt}`,
        createdAt,
      });

      tabs.data.forEach(async (tab) => {
        delete tab.id;
        tab.name = tab.title;
        tab.tab_group_id = tabgroup.id;
        await this.$models.tabs.create({
          ...tab,
          createdAt,
        });
      });
    },
    async totalTabs() {
      let totalTabs = await this.$models.tabs.count();
      this.tabsCount = totalTabs;
    },
    async uniqueSaves() {
      let savedInstances = await this.$models.tab_groups.model
        .orderBy("createdAt")
        .reverse()
        .uniqueKeys();
      let totalInstances = await Promise.all(
        savedInstances.map(async (item) => {
          return await this.$models.tabs.model
            .where({
              createdAt: item,
            })
            .toArray();
        })
      );
      this.tabGroups = totalInstances;
    },
  },
};
</script>
<style scoped lang="scss">
.star-highlight {
  color: yellow;
}
.compact-list {
  margin-left: 0;
  li {
    list-style-type: none;
    line-height: 30px;
  }
}
</style>
