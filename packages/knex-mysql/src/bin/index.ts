#!/usr/bin/env node
import { Migration1591797537928 } from '../migration/Migration1591797537928';
import { createRunnableMigrate } from '../migration/run';

createRunnableMigrate(new Migration1591797537928());
