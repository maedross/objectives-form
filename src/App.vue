<template>
  <header><button @click="setTab(0)">Form</button><button @click="setTab(1)">Data</button></header>
  <div v-if="currTab === 'Form'">
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
          <input type="text" v-model="campaign.name" :id="'campaign-name-' + campaignIndex" />
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
              :id="'scenario-name-' + scenarioIndex + '-' + campaignIndex"
            />
          </div>

          <div
            :id="'objective' + '-' + objIndex + '-' + scenarioIndex + '-' + campaignIndex"
            v-for="(_, objIndex) in scenario.objectives"
            :key="objIndex"
          >
            <ObjectiveComponent
              :ind="objIndex + '-' + scenarioIndex + '-' + campaignIndex"
              @update-objective="updateObjective(campaignIndex, scenarioIndex, objIndex, $event)"
            />
            <button
              :id="'remove-obj-' + objIndex + '-' + scenarioIndex + '-' + campaignIndex"
              type="button"
              @click="removeObjective(campaignIndex, scenarioIndex, objIndex)"
            >
              Remove Objective
            </button>
          </div>
          <button
            :id="'add-obj-' + scenarioIndex + '-' + campaignIndex"
            type="button"
            @click="addObjective(campaignIndex, scenarioIndex)"
          >
            Add Objective
          </button>
        </div>
        <button
          :id="campaignIndex + '-add scenario'"
          type="button"
          @click="addScenario(campaignIndex)"
        >
          Add Scenario
        </button>
      </div>
      <button id="add campaign" type="button" @click="addCampaign()">Add Campaign</button>

      <button id="submit" type="submit">Submit</button>
    </form>
    <div v-if="submittedData">
      <h2>Submitted Data (JSON):</h2>
      <pre id="json-data">{{ jsonOutput }}</pre>
    </div>
  </div>
  <div v-else-if="currTab === 'Data'"><h1>Time to display the Data</h1></div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ObjectiveComponent from './components/ObjectiveComponent.vue'

const tabs = ['Form', 'Data']
const currTab = ref(tabs[0])
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
              possible: false,
              notes: '',
            },
          ],
        },
      ],
    },
  ],
})

function setTab(ind) {
  currTab.value = tabs[ind]
  console.log(`currTab is ${currTab.value}`)
}

const submittedData = ref(null)

function handleSubmit() {
  submittedData.value = game.value
}

const jsonOutput = computed(() => JSON.stringify(submittedData.value, null, 2))

function addCampaign() {
  game.value.campaigns.push({
    name: '',
    scenarios: [],
  })
  addScenario(-1)
}

function addScenario(campaignIndex) {
  game.value.campaigns.at(campaignIndex).scenarios.push({
    name: '',
    objectives: [],
  })
  addObjective(campaignIndex, -1)
}

function addObjective(campaignIndex, scenarioIndex) {
  game.value.campaigns.at(campaignIndex).scenarios.at(scenarioIndex).objectives.push({
    text: '',
    identity: '',
    priority: '',
    effects: [],
    time: '',
    conditions: [],
    possible: false,
    notes: '',
  })
}

function removeObjective(campaignIndex, scenarioIndex, objectiveIndex) {
  game.value.campaigns
    .at(campaignIndex)
    .scenarios.at(scenarioIndex)
    .objectives.splice(objectiveIndex, 1)
}

function updateObjective(campaignIndex, scenarioIndex, objectiveIndex, { key, value }) {
  const objective = game.value.campaigns
    .at(campaignIndex)
    .scenarios.at(scenarioIndex)
    .objectives.at(objectiveIndex)
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
  text-align: left;
}
</style>
