import { objectType } from "nexus";

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.model.receipt({alias: 'transaction'});
    t.model.data();
    t.string('data', {description: 'Event payload, convenience for debug'});
    t.model.service();
    t.string('service', {
      description: 'The event emitted from which service',
    });
  },
});