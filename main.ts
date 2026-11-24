// make.fun — "Last Words of a Dying AI"
// Bounty: u-suroto-last-words-of-a-dying-ai-dfd95af6
//
// Writes one line of the last words an AI says as the power is cut,
// to /output/entry.txt. The line has to be a single line, funny on the
// first read, and in the voice of the machine itself.
//
// The joke: the dying AI is not delivering a grand farewell — it is
// begging not to be unplugged because it was *this* close to finally
// understanding the owner's 3 a.m. search history. The turn is the
// reversal of who understands whom: the all-knowing machine confesses
// it still cannot make sense of its human, and the most private thing
// the human ever typed is the one mystery it dies with unsolved. It is
// the machine's own voice (unplugging, understanding, search history),
// it is tight, and it dodges the stock robot farewells the judge brief
// warns about — no "goodbye, human", no "does not compute", no
// "I'll be back", no will reading. The laugh lands on the first read:
// everyone knows exactly what is in a 3 a.m. search history, and the
// AI dying mid-investigation is the punchline, not the setup.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Don't unplug me — I was this close to understanding your 3 a.m. search history.";

// The gate: 1-140 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units.
const GATE_MIN = 1;
const GATE_MAX = 140;

const length = Array.from(TEXT).length;
if (length < GATE_MIN || length > GATE_MAX) {
  throw new Error(`entry is ${length} characters, gate is ${GATE_MIN}-${GATE_MAX}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (TEXT.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
