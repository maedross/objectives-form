<template>
  <h5>Objective {{ ind.split('-')[0] }}</h5>
  <label :for="'text-' + ind"
    >Objective text:<input
    :id="'text-' + ind"
      type="text"
      size="100"
      v-model="text"
      @change="updateObjective('text', text)"
  /></label>

  <div class="fieldcontainer">
    <div :id="'identity-' + ind" class="inputfield">
      <label>Identity:</label>
      <label
        ><input
          :id="'select-' + ind"
          type="radio"
          v-model="identity"
          value="Select unit"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Select unit')"
        />Select unit
      </label>

      <label
        ><input
          :id="'kill-' + ind"
          type="radio"
          v-model="identity"
          value="Kill unit"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Kill unit')"
        />Kill unit</label
      >

      <label
        ><input
          :id="'create-' + ind"
          type="radio"
          v-model="identity"
          value="Create unit"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Create unit')"
        />Create unit</label
      >

      <label
        ><input
          :id="'move-' + ind"
          type="radio"
          v-model="identity"
          value="Move unit"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Move unit')"
        />Move unit</label
      >

      <label
        ><input
          :id="'build-' + ind"
          type="radio"
          v-model="identity"
          value="Build building"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Build building')"
        />Build building</label
      >

      <label
        ><input
          :id="'destroy-' + ind"
          type="radio"
          v-model="identity"
          value="Destroy building"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Destroy building')"
        />Destroy building</label
      >

      <label
        ><input
          :id="'research-' + ind"
          type="radio"
          v-model="identity"
          value="Research technology"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Research technology')"
        />Research technology</label
      >

      <label
        ><input
          :id="'survive-' + ind"
          type="radio"
          v-model="identity"
          value="Survive"
          :name="'identity-' + ind"
          @change="updateObjective('identity', 'Survive')"
        />Survive</label
      >
    </div>
    <div :id="'priority-' + ind" class="inputfield">
      <label>Priority:</label>
      <label
        ><input
          :id="'primary-' + ind"
          type="radio"
          v-model="priority"
          value="Primary"
          :name="'priority-' + ind"
          @change="updateObjective('priority', 'Primary')"
        />Primary</label
      >
      <label
        ><input
          :id="'secondary-' + ind"
          type="radio"
          v-model="priority"
          value="Secondary"
          :name="'priority-' + ind"
          @change="updateObjective('priority', 'Secondary')"
        />Secondary</label
      >
    </div>
    <div :id="'effects-' + ind" class="inputfield">
      <label>Effects:</label>
      <label
        ><input
          :id="ind + '-no effect'"
          type="checkbox"
          v-model="effects"
          value="None"
          @change="updateObjective('effects', 'None')"
        />None</label
      >
      <label
        ><input
          :id="'victory-' + ind"
          type="checkbox"
          v-model="effects"
          value="Victory"
          @change="updateObjective('effects', 'Victory')"
        />Victory</label
      >
      <label
        ><input
          :id="'defeat-' + ind"
          type="checkbox"
          v-model="effects"
          value="Defeat"
          @change="updateObjective('effects', 'Defeat')"
        />Defeat</label
      >
      <label
        ><input
          :id="'unlock-' + ind"
          type="checkbox"
          v-model="effects"
          value="Unlock objective"
          @change="updateObjective('effects', 'Unlock objective')"
        />Unlock objective</label
      >
      <label
        ><input
          :id="'lock-' + ind"
          type="checkbox"
          v-model="effects"
          value="Lock objective"
          @change="updateObjective('effects', 'Lock objective')"
        />Lock objective</label
      >
    </div>
    <div :id="'time-' + ind" class="inputfield">
      <label>Time Restriction:</label>
      <label
        ><input
          :id="'untimed-' + ind"
          type="radio"
          v-model="time"
          value="Untimed"
          :name="'time-' + ind"
          @change="updateObjective('time', 'Untimed')"
        />Untimed</label
      >
      <label
        ><input
          :id="'stat-timed-' + ind"
          type="radio"
          v-model="time"
          value="Statically timed"
          :name="'time-' + ind"
          @change="updateObjective('time', 'Statically timed')"
        />Statically timed</label
      >
      <label
        ><input
          :id="'dyn-timed-' + ind"
          type="radio"
          v-model="time"
          value="Dynamically timed"
          :name="'time-' + ind"
          @change="updateObjective('time', 'Dynamically timed')"
        />Dynamically timed</label
      >
    </div>
    <div :id="'conditions-' + ind" class="inputfield">
      <label>Conditions:</label>
      <label
        ><input
          :id="'uncond-' + ind"
          type="checkbox"
          v-model="conditions"
          value="None"
          @change="updateObjective('conditions', 'None')"
        />None</label
      >
      <label
        ><input
          :id="'prereq-' + ind"
          type="checkbox"
          v-model="conditions"
          value="Prerequisites"
          @change="updateObjective('conditions', 'Prerequisites')"
        />Prerequisites</label
      >
      <label
        ><input
          :id="'exclusive-' + ind"
          type="checkbox"
          v-model="conditions"
          value="Exclusive"
          @change="updateObjective('conditions', 'Exclusive')"
        />Exclusive</label
      >
    </div>
    <div :id="'possibility-' + ind" class="inputfield">
      <label>Possibility:</label>
      <label
        ><input
          :id="'possible-' + ind"
          type="radio"
          v-model="possibility"
          value="Possible"
          :name="'possibility-' + ind"
          @change="updateObjective('possibility', 'Possible')"
        />Possible</label
      >
      <label
        ><input
          :id="'impossible-' + ind"
          type="radio"
          v-model="possibility"
          value="Impossible"
          :name="'possibility-' + ind"
          @change="updateObjective('possibility', 'Impossible')"
        />Impossible</label
      >
    </div>
  </div>
  <label :for="'notes-' + ind"
    >Additional notes:<input
      type="text"
      size="100"
      v-model="notes"
      :id="'notes-' + ind"
      @change="updateObjective('notes', notes)"
  /></label>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({ ind: String })
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
