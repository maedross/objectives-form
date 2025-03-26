<template>
  <form @submit.prevent="handleSubmit">
    <h1>Objectives Form</h1>
    <div>
      <label for="game-name">Game Name:</label>
      <input type="text" v-model="game.name" :id="'game-name'" />
    </div>

    <div
      :id="'campaign' + (campaignIndex + 1)"
      v-for="(campaign, campaignIndex) in game.campaigns"
      :key="campaignIndex"
    >
      <h3>Campaign {{ campaignIndex + 1 }}</h3>
      <div>
        <label for="campaign-name">Campaign Name:</label>
        <input
          type="text"
          v-model="campaign.name"
          :id="'campaign-name-' + campaignIndex"
        />
      </div>

      <div
        :id="'scenario' + (scenarioIndex + 1)"
        v-for="(scenario, scenarioIndex) in campaign.scenarios"
        :key="scenarioIndex"
      >
        <h4>Scenario {{ scenarioIndex + 1 }}</h4>
        <div>
          <label for="scenario-name">Scenario Name:</label>
          <input
            type="text"
            v-model="scenario.name"
            :id="'scenario-name-' + campaignIndex + '-' + scenarioIndex"
          />
        </div>

        <div
          :id="'objective' + '-' + (objIndex + 1) + '-' + (scenarioIndex + 1) + '-' + (campaignIndex + 1)"
          v-for="(_, objIndex) in scenario.objectives"
          :key="objIndex"
        >
          <ObjectiveComponent
            :obj-index="objIndex"
            @update-objective="updateObjective(campaignIndex, scenarioIndex, objIndex, $event)"
          />
          <button
            :id="campaignIndex + '-' + scenarioIndex + '-' + objIndex + '-remove objective'"
            type="button"
            @click="removeObjective(campaignIndex, scenarioIndex, objIndex)"
          >
            Remove Objective
          </button>
        </div>
        <button
          :id="campaignIndex + '-' + scenarioIndex + '-add objective'"
          type="button"
          @click="addObjective(campaignIndex, scenarioIndex)"
        >
          Add Objective
        </button>
      </div>
      <button :id="campaignIndex + '-add scenario'" type="button" @click="addScenario(campaignIndex)">Add Scenario</button>
    </div>
    <button id="add campaign" type="button" @click="addCampaign()">Add Campaign</button>

    <button id="submit" type="submit">Submit</button>
  </form>
  <div v-if="submittedData">
    <h2>Submitted Data (JSON):</h2>
    <pre id="json-data">{{ jsonOutput }}</pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ObjectiveComponent from './ObjectiveComponent.vue'

const game = ref({
  name: '',
  campaigns: [
    {
      name: '',
      scenarios: [
        {
          name: '',
          objectives: [
            {
              text: '',
              identity: '',
              priority: '',
              effects: [],
              time: '',
              conditions: [],
              possibility: '',
              notes: '',
            },
          ],
        },
      ],
    },
  ],
})

const submittedData = ref(null)

function handleSubmit() {
  submittedData.value = game.value
}

const jsonOutput = computed(() => JSON.stringify(submittedData.value, null, 2))

function addCampaign() {
  game.value.campaigns.push({
    name: '',
    scenarios: [
      {
        name: '',
        objectives: [
          {
            text: '',
            identity: '',
            priority: '',
            effects: [],
            time: '',
            conditions: [],
            possibility: '',
            notes: '',
          },
        ],
      },
    ],
  })
}

function addScenario(campaignIndex) {
  game.value.campaigns[campaignIndex].scenarios.push({
    name: '',
    objectives: [
      {
        text: '',
        identity: '',
        priority: '',
        effects: [],
        time: '',
        conditions: [],
        possibility: '',
        notes: '',
      },
    ],
  })
}

function addObjective(campaignIndex, scenarioIndex) {
  game.value.campaigns[campaignIndex].scenarios[scenarioIndex].objectives.push({
    text: '',
    identity: '',
    priority: '',
    effects: [],
    time: '',
    conditions: [],
    possibility: '',
    notes: '',
  })
}

function removeObjective(campaignIndex, scenarioIndex, objectiveIndex) {
  game.value.campaigns[campaignIndex].scenarios[scenarioIndex].objectives.splice(objectiveIndex, 1)
}

function updateObjective(campaignIndex, scenarioIndex, objectiveIndex, { key, value }) {
  const objective = game.value.campaigns[campaignIndex].scenarios[scenarioIndex].objectives[objectiveIndex]
  if (key === 'effects' || key === 'conditions') {
    if (objective[key].includes(value)) {
      objective[key] = objective[key].filter((attr) => attr !== value)
    } else {
      objective[key].push(value)
    }
  } else {
    objective[key] = value
  }
}
</script>

<style scoped>
.fieldcontainer {
  display: flex;
}

input,
textarea {
  width: 100;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

pre {
  background: #f4f4f4;
  padding: 10px;
}

label {
  display: block;
}
</style>
