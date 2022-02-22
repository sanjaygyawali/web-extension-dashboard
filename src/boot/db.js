import Dexie from "dexie";
import Vue from "vue";
import dexierepo from "./dexierepo";
export const db = new Dexie("chromestore");
const dbs = {
  tabs: "++id, name, url, createdAt",
  tab_groups: "++id,name,createdAt",
};
Vue.prototype.$db = db;
db.version(1).stores(dbs);
const repositoryWithDexie = dexierepo(db);
Vue.prototype.$models = {};
Object.keys(dbs).forEach((tableName) => {
  Vue.prototype.$models[tableName] = repositoryWithDexie(tableName);
});
