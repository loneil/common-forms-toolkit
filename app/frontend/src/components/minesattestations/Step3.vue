<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">Before you begin operations, please check all that apply</h2>
      <hr class="orange" />
    </div>

    <BaseInfoCard class="hide-on-review mt-5 mb-8">
      Please note questions
      <strong>2, 3, and 4</strong> are not relevant if your accommodation is a private residence.
    </BaseInfoCard>

    <div class="question-series">
      <h3 class="question-head">1. COVID-19 Information</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Industrial Camp Operators need to make workers aware of the risks of COVID-19 and be prepared if workers have questions about COVID-19.</p>

        <v-checkbox
          v-model="protectionSignage"
          :readonly="reviewMode"
          label="I have signage in place in the appropriate language on how employees can protect themselves from COVID-19 "
        ></v-checkbox>
        <v-checkbox
          v-model="workerContactPersonnel"
          :readonly="reviewMode"
          label="I have someone identified that workers can go to if they have questions on COVID-19"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">2. Provide safe lodging and accommodation: General Worker</h3>

      <div class="questions">
        <p
          class="hide-on-review"
        >Industrial Camp Operators must be able to provide accommodations that minimize crowding, social interactions, and provide sufficient physical distance (individual tents or beds 2m apart and head-to-toe in shared accommodations).</p>

        <p>1) Do your Common areas allow for physical distancing of 2m / 6ft at all times?</p>
        <div class="pl-4">
          <v-radio-group :readonly="reviewMode" v-model="commonAreaDistancing" :mandatory="true">
            <v-radio label="Yes" value="yes"></v-radio>
            <v-radio label="No" value="no"></v-radio>
          </v-radio-group>
        </div>

        <p>2) Do you have individual/single beds or shared sleeping areas?</p>
        <div class="pl-4">
          <v-radio-group :readonly="reviewMode" v-model="sleepingAreaType" :mandatory="true">
            <v-radio label="Individual Beds or Single beds" value="1"></v-radio>
            <v-radio label="Shared sleeping areas" value="2"></v-radio>
          </v-radio-group>

          <div v-if="sleepingAreaType == 2">
            <v-row no-gutters>
              <v-col cols="12" md="8" lg="3">
                <v-combobox
                  v-model="sharedSleepingPerRoom"
                  :readonly="reviewMode"
                  :items="numbers"
                  label="How many people are in a room?"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="sharedSleepingDistancing"
              :readonly="reviewMode"
              label="Beds in the head-to-toe configuration with the 2m distance apart"
            ></v-checkbox>
          </div>
        </div>
      </div>
    </div>

    <div class="question-series">
      <h3
        class="question-head"
      >3. Self-isolation space if a worker comes down with COVID-19-like symptoms</h3>
      <div class="questions">
        <v-checkbox
          v-model="selfIsolateUnderstood"
          :readonly="reviewMode"
          label="I understand what is needed for a person to self-isolate."
        ></v-checkbox>
        <v-checkbox
          v-model="selfIsolateAccommodation"
          :readonly="reviewMode"
          label="I have the accommodation to let a worker self-isolate in a separate accommodation than other workers or arrange for separate accommodation."
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">4. Make sure laundry services are available and handled safely</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Laundry must be performed properly to reduce the risk of disease transmission of COVID-19, including using hot water for laundry machines and having adequate supply of detergent.</p>
        <v-checkbox
          v-model="laundryServices"
          :readonly="reviewMode"
          label="I have laundry services available for regular use"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">5. Practicing waste management: At work-site and accommodation</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Proper collection and removal of garbage is crucial to reducing the risk of disease transmission. This includes wearing disposable gloves to remove waste from rooms and common areas and using sturdy, leak resistant garbage bags for containing waste.</p>
        <v-checkbox
          v-model="wasteManagementGloves"
          :readonly="reviewMode"
          label="I have disposable gloves for the handling of garbage"
        ></v-checkbox>
        <v-checkbox
          v-model="wasteManagementSchedule"
          :readonly="reviewMode"
          label="I have a waste removal schedule"
        ></v-checkbox>
        <v-checkbox
          v-model="wasteManagementBags"
          :readonly="reviewMode"
          label="I have sturdy, leak resistant garbage bags"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3
        class="question-head"
      >6. Have proper hand-washing facilities: At work-site and accommodation</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Helping workers to engage in hand hygiene prevents or reduces the spread of COVID-19 and other illnesses. Industrial Camp Operators should ensure easy access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer at the work site and at the accommodation site.</p>
        <v-checkbox
          v-model="handWashingStations"
          :readonly="reviewMode"
          label="I have an adequate number of hand washing stations (either permanent or portable) available to workers"
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingSoapWater"
          :readonly="reviewMode"
          label="There is an appropriate supply of soap and water "
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingWaterless"
          :readonly="reviewMode"
          label="I have supplemented with waterless hand sanitizers with a min of 60% alcohol where appropriate"
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingPaperTowels"
          :readonly="reviewMode"
          label="I have provided disposable paper towels"
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingSignage"
          :readonly="reviewMode"
          label="I have put up signs to promote regular hand washing"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">7. Physical Distancing Practices</h3>
      <div class="questions">
        <div class="hide-on-review">
          <p>Keeping a 2 meter distance between people is one of the most important ways to break the chain of transmission of COVID-19. Industrial Camps Operators can take practical steps to ensure physical distancing is maintained while workers are transported to or from the work site, while working indoors or outdoors, during break times.</p>
          <p>Physical barriers such as the use of plexi-glass, face shields, masks, and other techniques can be used where physical distancing is not possible.</p>
        </div>
        <v-checkbox
          v-model="distancingMaintained"
          :readonly="reviewMode"
          label="I have taken steps to ensure physical distancing can be maintained during work and after work."
        ></v-checkbox>
        <v-checkbox
          v-model="distancingFaceShields"
          :readonly="reviewMode"
          label="I have physical barriers like face shields or masks for situations where physical distancing is not possible."
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">8. Have a Cleaning and Disinfecting Schedule</h3>
      <div class="questions">
        <p>All common areas and surfaces should be cleaned at the start and end of each day. Examples of common areas and surfaces include washrooms, common tables, desks, light switches, and door handles. Regular household cleaners are effective against COVID-19, following the instructions on the label.</p>
        <v-checkbox
          v-model="disinfectingSchedule"
          :readonly="reviewMode"
          label="I have a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day"
        ></v-checkbox>
      </div>
    </div>

    <div class="hide-on-review">
      <hr />

      <v-btn color="primary" @click="setStep(4)">Go to Step 4</v-btn>
      <v-btn text @click="setStep(2)">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MinesAttestationStep3',
  props: {
    reviewMode: Boolean
  },
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10]
    };
  },
  computed: {
    ...mapGetters('form', ['ipcPlan']),

    // COVID 19 info
    protectionSignage: {
      get() { return this.ipcPlan.protectionSignage; },
      set(value) { this.updateIpcPlan({['protectionSignage']: value}); }
    },
    workerContactPersonnel: {
      get() { return this.ipcPlan.workerContactPersonnel; },
      set(value) { this.updateIpcPlan({['workerContactPersonnel']: value}); }
    },

    // Lodging
    commonAreaDistancing: {
      get() { return this.ipcPlan.commonAreaDistancing ? 'yes' : 'no'; },
      set(value) { this.updateIpcPlan({['commonAreaDistancing']: value === 'yes'}); }
    },
    sleepingAreaType: {
      get() { return this.ipcPlan.sleepingAreaType; },
      set(value) { this.updateIpcPlan({['sleepingAreaType']: value}); }
    },
    sharedSleepingPerRoom: {
      get() { return this.ipcPlan.sharedSleepingPerRoom; },
      set(value) { this.updateIpcPlan({['sharedSleepingPerRoom']: value}); }
    },
    sharedSleepingDistancing: {
      get() { return this.ipcPlan.sharedSleepingDistancing; },
      set(value) { this.updateIpcPlan({['sharedSleepingDistancing']: value}); }
    },

    // Self-isolation
    selfIsolateUnderstood: {
      get() { return this.ipcPlan.selfIsolateUnderstood; },
      set(value) { this.updateIpcPlan({['selfIsolateUnderstood']: value}); }
    },
    selfIsolateAccommodation: {
      get() { return this.ipcPlan.selfIsolateAccommodation; },
      set(value) { this.updateIpcPlan({['selfIsolateAccommodation']: value}); }
    },

    // Laundry
    laundryServices: {
      get() { return this.ipcPlan.laundryServices; },
      set(value) { this.updateIpcPlan({['laundryServices']: value}); }
    },

    // Waste mgmt
    wasteManagementGloves: {
      get() { return this.ipcPlan.wasteManagementGloves; },
      set(value) { this.updateIpcPlan({['wasteManagementGloves']: value}); }
    },
    wasteManagementSchedule: {
      get() { return this.ipcPlan.wasteManagementSchedule; },
      set(value) { this.updateIpcPlan({['wasteManagementSchedule']: value}); }
    },
    wasteManagementBags: {
      get() { return this.ipcPlan.wasteManagementBags; },
      set(value) { this.updateIpcPlan({['wasteManagementBags']: value}); }
    },

    // Hand-washing
    handWashingStations: {
      get() { return this.ipcPlan.handWashingStations; },
      set(value) { this.updateIpcPlan({['handWashingStations']: value}); }
    },
    handWashingSoapWater: {
      get() { return this.ipcPlan.handWashingSoapWater; },
      set(value) { this.updateIpcPlan({['handWashingSoapWater']: value}); }
    },
    handWashingWaterless: {
      get() { return this.ipcPlan.handWashingWaterless; },
      set(value) { this.updateIpcPlan({['handWashingWaterless']: value}); }
    },
    handWashingPaperTowels: {
      get() { return this.ipcPlan.handWashingPaperTowels; },
      set(value) { this.updateIpcPlan({['handWashingPaperTowels']: value}); }
    },
    handWashingSignage: {
      get() { return this.ipcPlan.handWashingSignage; },
      set(value) { this.updateIpcPlan({['handWashingSignage']: value}); }
    },


    // Phyisical Distancing
    distancingMaintained: {
      get() { return this.ipcPlan.distancingMaintained; },
      set(value) { this.updateIpcPlan({['distancingMaintained']: value}); }
    },
    distancingFaceShields: {
      get() { return this.ipcPlan.distancingFaceShields; },
      set(value) { this.updateIpcPlan({['distancingFaceShields']: value}); }
    },

    // Cleaning/Disinfecting
    disinfectingSchedule: {
      get() { return this.ipcPlan.disinfectingSchedule; },
      set(value) { this.updateIpcPlan({['disinfectingSchedule']: value}); }
    }
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateIpcPlan']),
  }
};
</script>

