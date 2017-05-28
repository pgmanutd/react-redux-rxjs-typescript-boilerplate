import './globals';
import './jsdom';

import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import * as sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);

export const { expect } = chai;
