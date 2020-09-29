'use strict';

const test = require('ava');
const plugin = require('../lib');
const {readFileSync} = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const fixtures = path.join(__dirname, 'fixtures');

test('basic', t => {
  return compare(t, 'basic');
});

async function compare(t, name) {
  const source = readFileSync(path.join(fixtures, `${name}.html`), 'utf8');
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8');
  const {html} = await posthtml([plugin()]).process(source);

  t.deepEqual(html, expected);
}
