<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(game, gameIndex) in formData.games" :key="gameIndex">
      <h2>Game {{ gameIndex + 1 }}</h2>
      <div>
        <label for="game-name">Game Name:</label>
        <input type="text" v-model="game.name" :id="'game-name-' + gameIndex" />
      </div>

      <div
        v-for="(campaign, campaignIndex) in game.campaigns"
        :key="campaignIndex"
      >
        <h3>Campaign {{ campaignIndex + 1 }}</h3>
        <div>
          <label for="campaign-name">Campaign Name:</label>
          <input
            type="text"
            v-model="campaign.name"
            :id="'campaign-name-' + gameIndex + '-' + campaignIndex"
          />
        </div>

        <div
          v-for="(scenario, scenarioIndex) in campaign.scenarios"
          :key="scenarioIndex"
        >
          <h4>Scenario {{ scenarioIndex + 1 }}</h4>
          <div>
            <label for="scenario-name">Scenario Name:</label>
            <input
              type="text"
              v-model="scenario.name"
              :id="
                'scenario-name-' +
                gameIndex +
                '-' +
                campaignIndex +
                '-' +
                scenarioIndex
              "
            />
          </div>

          <div
            v-for="(objective, objectiveIndex) in scenario.objectives"
            :key="objectiveIndex"
          >
            <h5>Objective {{ objectiveIndex + 1 }}</h5>
            <div class="fieldcontainer" display="flex">
              <ObjectiveQuality
                v-for="(quality, qualityName) in this.objectiveOptions"
                :key="qualityName"
                :id="
                  qualityName +
                  '-' +
                  this.gameIndex +
                  '-' +
                  this.campaignIndex +
                  '-' +
                  this.scenarioIndex +
                  '-' +
                  this.objectiveIndex +
                  '-'
                "
                :options="quality"
                :quality="qualityName"
                v-model="
                  objective[qualityName]
                "
              />
            </div>

            <button
              type="button"
              @click="
                removeObjective(
                  gameIndex,
                  campaignIndex,
                  scenarioIndex,
                  objectiveIndex
                )
              "
            >
              Remove Objective
            </button>
          </div>
          <button
            type="button"
            @click="addObjective(gameIndex, campaignIndex, scenarioIndex)"
          >
            Add Objective
          </button>
        </div>
        <button type="button" @click="addScenario(gameIndex, campaignIndex)">
          Add Scenario
        </button>
      </div>
      <button type="button" @click="addCampaign(gameIndex)">
        Add Campaign
      </button>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div v-if="submittedData">
    <h2>Submitted Data (JSON):</h2>
    <pre>{{ jsonOutput }}</pre>
  </div>
</template>

<script>
import ObjectiveQuality from "./ObjectiveQuality.vue";
export default {
  components: { ObjectiveQuality },
  data() {
    return {
      formData: {
        games: [
          {
            name: "",
            campaigns: [
              {
                name: "",
                scenarios: [
                  {
                    name: "",
                    objectives: [
                      {
                        identity: "",
                        timeRestriction: "",
                        priority: "",
                        conditionality: "",
                        possibility: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      submittedData: null,
      objectiveOptions: {
        identity: [
          "kill unit",
          "create unit",
          "move unit",
          "build building",
          "destroy building",
          "research technology",
          "survive",
        ],
        timeRestriction: ["unbounded", "softly bounded", "hard bounded"],
        priority: ["primary", "secondary", "choice"],
        conditionality: ["independent", "sequential"],
        possibility: ["possible", "impossible"],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submittedData = JSON.parse(JSON.stringify(this.formData));
    },
    addCampaign(gameIndex) {
      this.formData.games[gameIndex].campaigns.push({
        name: "",
        scenarios: [
          {
            name: "",
            objectives: [
              {
                identity: "",
                timeRestriction: "",
                priority: "",
                conditionality: "",
                possibility: "",
              },
            ],
          },
        ],
      });
    },
    addScenario(gameIndex, campaignIndex) {
      this.formData.games[gameIndex].campaigns[campaignIndex].scenarios.push({
        name: "",
        objectives: [
          {
            identity: "",
            timeRestriction: "",
            priority: "",
            conditionality: "",
            possibility: "",
          },
        ],
      });
    },
    addObjective(gameIndex, campaignIndex, scenarioIndex) {
      this.formData.games[gameIndex].campaigns[campaignIndex].scenarios[
        scenarioIndex
      ].objectives.push({
        identity: "",
        timeRestriction: "",
        priority: "",
        conditionality: "",
        possibility: "",
      });
    },
    removeObjective(gameIndex, campaignIndex, scenarioIndex, objectiveIndex) {
      this.formData.games[gameIndex].campaigns[campaignIndex].scenarios[
        scenarioIndex
      ].objectives.splice(objectiveIndex, 1);
    },
    updateData(
      gameIndex,
      campaignIndex,
      scenarioIndex,
      objectiveIndex,
      quality,
      newValue
    ) {
      this.formData.games[gameIndex].campaigns[campaignIndex].scenarios[
        scenarioIndex
      ].objectives[objectiveIndex].quality = newValue;
    },
  },
  computed: {
    jsonOutput() {
      return JSON.stringify(this.submittedData, null, 2);
    },
  },
};
</script>

<style scoped>
.fieldcontainer {
  display: flex;
}

input,
textarea {
  width: 100px;
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
</style>
