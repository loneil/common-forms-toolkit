const PREFIX = require('../../forms/minesattestations/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.createTable(`${PREFIX}_submission_location`, table => {
      table.increments('locationId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).notNullable().index();
      table.timestamp('startDate', { useTz: true }).nullable();
      table.timestamp('endDate', { useTz: true }).nullable();
      table.string('city').notNullable();
      table.decimal('cityLatitude', 10, 7).nullable();
      table.decimal('cityLongitude', 10, 7).nullable();
      table.string('mineNumber').nullable();
      table.string('permitNumber').nullable();
      table.integer('numberOfWorkers').notNullable();
      table.boolean('accTents').notNullable();
      table.string('tentDetails').nullable();
      table.boolean('accMotel').notNullable();
      table.string('motelName').nullable();
      table.string('motelAddressLine1').nullable();
      table.string('motelAddressLine2').nullable();
      table.string('motelCity').nullable();
      table.string('motelProvince', 30).nullable();
      table.string('motelPostalCode', 30).nullable();
      table.boolean('accWorkersHome').notNullable();

      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('updatedBy');
      table.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_submission_contact`, table => {
      table.increments('contactId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).notNullable().index();
      table.enu('contactType', ['PRIMARY', 'COVID_COORDINATOR']).notNullable();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('phone1', 30).nullable();
      table.string('phone2', 30).nullable();
      table.string('email').nullable();

      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('updatedBy');
      table.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_submission_business`, table => {
      table.increments('businessId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).notNullable().index();
      table.string('name').notNullable();
      table.string('orgBookId');
      table.string('addressLine1').notNullable();
      table.string('addressLine2');
      table.string('city').notNullable();
      table.string('province', 30).notNullable();
      table.string('postalCode', 30).notNullable();

      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('updatedBy');
      table.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
    }))
    .then(() => knex.schema.createTable(`${PREFIX}_submission_attestation`, table => {
      table.uuid('attestationId').primary();
      table.uuid('submissionId').references('submissionId').inTable(`${PREFIX}_submission`).notNullable().index();

      table.boolean('guidelinesRead').notNullable();
      table.boolean('assessmentCompleted').notNullable();
      table.boolean('developedPlan').notNullable();
      table.boolean('protectionSignage').notNullable();
      table.boolean('workerContactPersonnel').notNullable();
      table.boolean('commonAreaDistancing').notNullable();

      table.enu('sleepingAreaType', ['SINGLE', 'SHARED']).notNullable();
      table.integer('sharedSleepingPerRoom').notNullable();

      table.boolean('sharedSleepingDistancing').notNullable();
      table.boolean('selfIsolateUnderstood').notNullable();
      table.boolean('selfIsolateAccommodation').notNullable();
      table.boolean('laundryServices').notNullable();
      table.boolean('wasteManagementGloves').notNullable();
      table.boolean('wasteManagementSchedule').notNullable();
      table.boolean('wasteManagementBags').notNullable();
      table.boolean('handWashingStations').notNullable();
      table.boolean('handWashingSoapWater').notNullable();
      table.boolean('handWashingWaterless').notNullable();
      table.boolean('handWashingPaperTowels').notNullable();
      table.boolean('handWashingSignage').notNullable();
      table.boolean('distancingMaintained').notNullable();
      table.boolean('distancingFaceShields').notNullable();
      table.boolean('disinfectingSchedule').notNullable();
      table.boolean('educationSignage').notNullable();
      table.boolean('educationContactPersonnel').notNullable();
      table.boolean('trainingCovid19').notNullable();
      table.boolean('trainingEtiquette').notNullable();
      table.boolean('trainingLocations').notNullable();
      table.boolean('trainingFirstAid').notNullable();
      table.boolean('trainingReporting').notNullable();
      table.boolean('mealsDistancing').notNullable();
      table.boolean('mealsDishware').notNullable();
      table.boolean('mealsDishwashing').notNullable();
      table.boolean('infectionSeparation').notNullable();
      table.boolean('infectionSymptoms').notNullable();
      table.boolean('infectionHeathLinkBC').notNullable();
      table.boolean('infectionSanitization').notNullable();
      table.boolean('infectionAccommodation').notNullable();
      table.boolean('infectedFeeding').notNullable();
      table.boolean('infectedHousekeeping').notNullable();
      table.boolean('infectedWaste').notNullable();
      table.boolean('certifyAccurateInformation').notNullable();
      table.boolean('agreeToInspection').notNullable();

      table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      table.string('updatedBy');
      table.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
    }));
};

exports.down = function(knex) {
  return Promise.resolve()
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission_location`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission_contact`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission_business`))
    .then(() => knex.schema.dropTableIfExists(`${PREFIX}_submission_attestation`));
};
