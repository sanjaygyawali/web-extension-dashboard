export default ($db) => (resource) => ({
  get(query) {
    return $db[resource].toArray();
  },
  create(payload) {
    return $db[resource].add(payload);
  },
  createMany(payload) {
    return $db[resource].bulkAdd(payload);
  },
  first(filter) {
    let query = $db[resource].where(filter).first();
    return query;
  },
  update(id, payload) {
    return $db[resource].update(id, payload);
  },
  delete(id) {
    if (Array.isArray(id)) {
      return $db[resource].bulkDelete(id);
    } else {
      return $db[resource].delete(id);
    }
  },
  count() {
    return $db[resource].count();
  },
  model: $db[resource],
});
