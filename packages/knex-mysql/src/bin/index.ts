#!/usr/bin/env node
require('@muta-extra/common').loadEnvFile();

import { Migration1591797537928 } from '../migration/Migration1591797537928';
import { createRunnableMigrate } from '../migration/run';

createRunnableMigrate(new Migration1591797537928());
