<template>
  <h5>Objective {{ objIndex + 1 }}</h5>
  <label :for="objIndex + '-text'"
    >Objective text:<input
    :id="objIndex + '-text'"
      type="text"
      size="100"
      v-model="text"
      @change="updateObjective('text', text)"
  /></label>

  <div class="fieldcontainer">
    <div :id="'identity' + objIndex" class="inputfield">
      <label>Identity:</label>
      <label
        ><input
          :id="objIndex + '-select'"
          type="radio"
          v-model="identity"
          value="Select unit"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Select unit')"
        />Select unit
      </label>

      <label
        ><input
          :id="objIndex + '-kill'"
          type="radio"
          v-model="identity"
          value="Kill unit"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Kill unit')"
        />Kill unit</label
      >

      <label
        ><input
          :id="objIndex + '-create'"
          type="radio"
          v-model="identity"
          value="Create unit"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Create unit')"
        />Create unit</label
      >

      <label
        ><input
          :id="objIndex + '-move'"
          type="radio"
          v-model="identity"
          value="Move unit"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Move unit')"
        />Move unit</label
      >

      <label
        ><input
          :id="objIndex + '-build'"
          type="radio"
          v-model="identity"
          value="Build building"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Build building')"
        />Build building</label
      >

      <label
        ><input
          :id="objIndex + '-destroy'"
          type="radio"
          v-model="identity"
          value="Destroy building"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Destroy building')"
        />Destroy building</label
      >

      <label
        ><input
          :id="objIndex + '-research'"
          type="radio"
          v-model="identity"
          value="Research technology"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Research technology')"
        />Research technology</label
      >

      <label
        ><input
          :id="objIndex + '-survive'"
          type="radio"
          v-model="identity"
          value="Survive"
          :name="'identity' + objIndex"
          @change="updateObjective('identity', 'Survive')"
        />Survive</label
      >
    </div>
    <div :id="'priority' + objIndex" class="inputfield">
      <label>Priority:</label>
      <label
        ><input
          :id="objIndex + '-primary'"
          type="radio"
          v-model="priority"
          value="Primary"
          :name="'priority' + objIndex"
          @change="updateObjective('priority', 'Primary')"
        />Primary</label
      >
      <label
        ><input
          :id="objIndex + '-secondary'"
          type="radio"
          v-model="priority"
          value="Secondary"
          :name="'priority' + objIndex"
          @change="updateObjective('priority', 'Secondary')"
        />Secondary</label
      >
    </div>
    <div :id="'effects' + objIndex" class="inputfield">
      <label>Effects:</label>
      <label
        ><input
          :id="objIndex + '-no effect'"
          type="checkbox"
          v-model="effects"
          value="None"
          @change="updateObjective('effects', 'None')"
        />None</label
      >
      <label
        ><input
          :id="objIndex + '-victory'"
          type="checkbox"
          v-model="effects"
          value="Victory"
          @change="updateObjective('effects', 'Victory')"
        />Victory</label
      >
      <label
        ><input
          :id="objIndex + '-defeat'"
          type="checkbox"
          v-model="effects"
          value="Defeat"
          @change="updateObjective('effects', 'Defeat')"
        />Defeat</label
      >
      <label
        ><input
          :id="objIndex + '-unlock'"
          type="checkbox"
          v-model="effects"
          value="Unlock objective"
          @change="updateObjective('effects', 'Unlock objective')"
        />Unlock objective</label
      >
      <label
        ><input
          :id="objIndex + '-lock'"
          type="checkbox"
          v-model="effects"
          value="Lock objective"
          @change="updateObjective('effects', 'Lock objective')"
        />Lock objective</label
      >
    </div>
    <div :id="'time' + objIndex" class="inputfield">
      <label>Time Restriction:</label>
      <label
        ><input
          :id="objIndex + '-untimed'"
          type="radio"
          v-model="time"
          value="Untimed"
          :name="'time' + objIndex"
          @change="updateObjective('time', 'Untimed')"
        />Untimed</label
      >
      <label
        ><input
          :id="objIndex + '-stat timed'"
          type="radio"
          v-model="time"
          value="Statically timed"
          :name="'time' + objIndex"
          @change="updateObjective('time', 'Statically timed')"
        />Statically timed</label
      >
      <label
        ><input
          :id="objIndex + '-dyn timed'"
          type="radio"
          v-model="time"
          value="Dynamically timed"
          :name="'time' + objIndex"
          @change="updateObjective('time', 'Dynamically timed')"
        />Dynamically timed</label
      >
    </div>
    <div :id="'conditions' + objIndex" class="inputfield">
      <label>Conditions:</label>
      <label
        ><input
          :id="objIndex + '-no cond'"
          type="checkbox"
          v-model="conditions"
          value="None"
          @change="updateObjective('conditions', 'None')"
        />None</label
      >
      <label
        ><input
          :id="objIndex + '-prereq'"
          type="checkbox"
          v-model="conditions"
          value="Prerequisites"
          @change="updateObjective('conditions', 'Prerequisites')"
        />Prerequisites</label
      >
      <label
        ><input
          :id="objIndex + '-exclusive'"
          type="checkbox"
          v-model="conditions"
          value="Exclusive"
          @change="updateObjective('conditions', 'Exclusive')"
        />Exclusive</label
      >
    </div>
    <div :id="'possibility' + objIndex" class="inputfield">
      <label>Possibility:</label>
      <label
        ><input
          :id="objIndex + '-possible'"
          type="radio"
          v-model="possibility"
          value="Possible"
          :name="'possibility' + objIndex"
          @change="updateObjective('possibility', 'Possible')"
        />Possible</label
      >
      <label
        ><input
          :id="objIndex + '-impossible'"
          type="radio"
          v-model="possibility"
          value="Impossible"
          :name="'possibility' + objIndex"
          @change="updateObjective('possibility', 'Impossible')"
        />Impossible</label
      >
    </div>
  </div>
  <label :for="objIndex + '-notes'"
    >Additional notes:<input
      type="text"
      size="100"
      v-model="notes"
      :id="objIndex + '-notes'"
      @change="updateObjective('notes', notes)"
  /></label>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({ objIndex: Number })

const emits = defineEmits(['update-objective'])

function updateObjective(key, value) {
  emits('update-objective', { key, value })
}
</script>

<style scoped>
.fieldcontainer {
  display: flex;
  flex-direction: row;
}
.inputfield {
  display: flex;
  flex-direction: column;
}
</style>
