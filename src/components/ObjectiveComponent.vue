<template>

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

      <label
        ><input
          :id="'acc-res-' + ind"
          type="radio"
          v-model="identity"
          value="Accumulate resource"
          :name="'acc-res-' + ind"
          @change="updateObjective('identity', 'Accumulate resource')"
        />Accumulate resource</label
      >

      <label
        ><input
          :id="'task-gather-' + ind"
          type="radio"
          v-model="identity"
          value="Task to gather resource"
          :name="'task-gather-' + ind"
          @change="updateObjective('identity', 'Task to gather resource')"
        />Task to gather resource</label
      >

      <label
        ><input
          :id="'protect-unit-' + ind"
          type="radio"
          v-model="identity"
          value="Protect unit"
          :name="'protect-unit-' + ind"
          @change="updateObjective('identity', 'Protect unit')"
        />Protect unit</label
      >

      <label
        ><input
          :id="'protect-building-' + ind"
          type="radio"
          v-model="identity"
          value="Protect building"
          :name="'protect-building-' + ind"
          @change="updateObjective('identity', 'Protect building')"
        />Protect building</label
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
    <div :id="'successEffects-' + ind" class="inputfield">
      <label>Success effects:</label>
      <label
        ><input
          :id="ind + '-no effect'"
          type="checkbox"
          v-model="successEffects"
          value="None"
          @change="updateObjective('successEffects', 'None')"
        />None</label
      >
      <label
        ><input
          :id="'victory-' + ind"
          type="checkbox"
          v-model="successEffects"
          value="Victory"
          @change="updateObjective('successEffects', 'Victory')"
        />Victory</label
      >
      <label
        ><input
          :id="'defeat-' + ind"
          type="checkbox"
          v-model="successEffects"
          value="Defeat"
          @change="updateObjective('successEffects', 'Defeat')"
        />Defeat</label
      >
      <label
        ><input
          :id="'unlock-' + ind"
          type="checkbox"
          v-model="successEffects"
          value="Unlock objective"
          @change="updateObjective('successEffects', 'Unlock objective')"
        />Unlock objective</label
      >
      <label
        ><input
          :id="'lock-' + ind"
          type="checkbox"
          v-model="successEffects"
          value="Lock objective"
          @change="updateObjective('successEffects', 'Lock objective')"
        />Lock objective</label
      >
    </div>

    <!-- Failure effects -->
    <div :id="'effects-' + ind" class="inputfield">
      <label>Failure effects:</label>
      <label
        ><input
          :id="ind + '-no effect'"
          type="checkbox"
          v-model="failureEffects"
          value="None"
          @change="updateObjective('failureEffects', 'None')"
        />None</label
      >
      <label
        ><input
          :id="'victory-' + ind"
          type="checkbox"
          v-model="failureEffects"
          value="Victory"
          @change="updateObjective('failureEffects', 'Victory')"
        />Victory</label
      >
      <label
        ><input
          :id="'defeat-' + ind"
          type="checkbox"
          v-model="failureEffects"
          value="Defeat"
          @change="updateObjective('failureEffects', 'Defeat')"
        />Defeat</label
      >
      <label
        ><input
          :id="'unlock-' + ind"
          type="checkbox"
          v-model="failureEffects"
          value="Unlock objective"
          @change="updateObjective('failureEffects', 'Unlock objective')"
        />Unlock objective</label
      >
      <label
        ><input
          :id="'lock-' + ind"
          type="checkbox"
          v-model="failureEffects"
          value="Lock objective"
          @change="updateObjective('failureEffects', 'Lock objective')"
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
    <div :id="'possible-' + ind" class="inputfield">
      <label>Possible:</label>
      <label
        ><input
          :id="'possible-' + ind"
          type="radio"
          v-model="possible"
          value="Possible"
          :name="'possible-' + ind"
          @change="updateObjective('possible', true)"
        />Possible</label
      >
      <label
        ><input
          :id="'impossible-' + ind"
          type="radio"
          v-model="possible"
          value="Impossible"
          :name="'possible-' + ind"
          @change="updateObjective('possible', false)"
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
