import { hashCode } from './utils'

export default class NaiveHashMap {
  constructor(initialCapacity) {
    this.length = 0
    this.slots = []
    this.capacity = initialCapacity || 8
    this.deleted = 0
    this.MAX_LOAD_RATIO = 0.9
    this.SIZE_RATIO = 3
  }

  set(key, value) {
    const loadRatio = (this.length + this.deleted + 1) / this.capacity
    if (loadRatio > this.MAX_LOAD_RATIO) {
      this.resize(this.capacity * this.SIZE_RATIO)
    }
    const index = this.findSlot(key)
    this.slots[index] = {
      key,
      value,
      deleted: false,
    };
    this.length++
  }

  load() {
    return parseFloat(this.capacity) / parseFloat(this.slots.length)
  }

  get(key) {
    const index = this.findSlot(key)
    if (index === undefined) {
      throw new Error('key error')
    }
    return this.slots[index].value
  }

  resize(size) {
    const oldSlots = this.slots
    this.capacity = size
    this.length = 0
    this.deleted = 0
    this.slots = []
    for (let i = 0; i < oldSlots.length; i++) {
      const slot = oldSlots[i]
      if (slot !== undefined) {
        this.set(slot.key, slot.value)
      }
    }
  }

  delete(key) {
    const index = this.findSlot(key)
    const slot = this.slots[index]
    if (slot === undefined) {
      throw new Error('key error: not found')
    }
    slot.deleted = true // soft delete
    this.length--
    this.deleted++
  }

  findSlot(key) {
    const hash = hashCode(key)
    const start = hash % this.capacity
    for (let i = start; i < start + this.capacity; i += 1) {
      const index = i % this.capacity
      const slot = this.slots[index]
      if (slot === undefined) {
        continue
      } else if ((slot.key === key && !slot.deleted)) {
        return index
      }
    }
    return null
  }
}
