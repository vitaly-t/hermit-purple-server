import { objectType } from '@nexus/schema';

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.string('data', {
      description: 'Event payload, convenience for debug',
      resolve() {
        return '';
      },
    });

    t.string('service', {
      description: 'The event emitted from which service',
      resolve() {
        return '';
      },
    });
  },
});
