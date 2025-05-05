<template>
  <div class="container">
    <div class="form-section">
      <form>
        <h1>Objectives Form</h1>
        <div>
          <label for="game-name">Game Name:</label>
          <input type="text" v-model="game.name" :id="'game-name'" />
        </div>
        <div>
            <label :for="'game-notes'"
              >Game notes:<textarea
                type="text"
                size="100"
                v-model="game.notes"
                :id="'game-notes-'"
                rows="3"
                cols="50"
              ></textarea>
            </label>
          </div>

        <!-- Campaigns -->
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
          <div>
            <label :for="'campaign-notes-' + campaignIndex"
              >Campaign notes:<textarea
                type="text"
                size="100"
                v-model="campaign.notes"
                :id="'campaign-notes-' + campaignIndex"
                rows="3"
                cols="50"
              ></textarea>
            </label>
          </div>

          <!-- Campaigns -->
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
            <div>
              <label :for="'scenario-notes-' + scenarioIndex + '-' + campaignIndex"
                >Scenario notes:<textarea
                  type="text"
                  size="100"
                  v-model="scenario.notes"
                  :id="'scenario-notes-' + scenarioIndex + '-' + campaignIndex"
                  rows="3"
                  cols="50"
                ></textarea>
              </label>
            </div>
            <div
              :id="'objective' + '-' + objIndex + '-' + scenarioIndex + '-' + campaignIndex"
              v-for="(_, objIndex) in scenario.objectives"
              :key="objIndex"
            >
              <div class="obj-container">
                <h5>Objective {{ objIndex }}</h5>
                <button
                  :id="'remove-obj-' + objIndex + '-' + scenarioIndex + '-' + campaignIndex"
                  type="button"
                  @click="removeObjective(campaignIndex, scenarioIndex, objIndex)"
                >
                  Remove Objective
                </button>
              </div>
              <ObjectiveComponent
                :ind="objIndex + '-' + scenarioIndex + '-' + campaignIndex"
                @update-objective="updateObjective(campaignIndex, scenarioIndex, objIndex, $event)"
              />
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
      </form>
    </div>
    <div class="json-section">
      <div class="json-header">
        <h2>JSON:</h2>
        <button @click="copyText">Copy</button>
      </div>
      <pre id="json-data">{{ jsonOutput }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ObjectiveComponent from './components/ObjectiveComponent.vue'

const game = ref({
  name: '',
  notes: '',
  campaigns: [
    {
      name: '',
      notes: '',
      scenarios: [
        {
          name: '',
          notes: '',
          objectives: [
            {
              text: '',
              identity: '',
              priority: '',
              successEffects: [],
              failureEffects: [],
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

const jsonOutput = computed(() => JSON.stringify(game.value, null, 2))

function addCampaign() {
  game.value.campaigns.push({
    name: '',
    notes: '',
    scenarios: [],
  })
  addScenario(-1)
}

function addScenario(campaignIndex) {
  game.value.campaigns.at(campaignIndex).scenarios.push({
    name: '',
    notes: '',
    objectives: [],
  })
  addObjective(campaignIndex, -1)
}

function addObjective(campaignIndex, scenarioIndex) {
  game.value.campaigns.at(campaignIndex).scenarios.at(scenarioIndex).objectives.push({
    text: '',
    identity: '',
    priority: '',
    successEffects: [],
    failureEffects: [],
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
  if (key === 'successEffects' || key === 'failureEffects' || key === 'conditions') {
    if (objective[key].includes(value)) {
      objective[key] = objective[key].filter((attr) => attr !== value)
    } else {
      objective[key].push(value)
    }
  } else {
    objective[key] = value
  }
}

function copyText() {
  navigator.clipboard.writeText(jsonOutput.value)
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
  text-align: left;
}

.obj-container {
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.form-section,
.json-section {
  padding: 20px;
  border: 1px solid #ccc;
  overflow-y: auto;
}

.form-section {
  flex: 2;
  background-color: #f9f9f9;
}

.json-section {
  flex: 1;
  background-color: #ffffff;
  padding-top: 0;
}

.json-header {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
</style>
