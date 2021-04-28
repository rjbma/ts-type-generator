import dts, { parseFileContent, parseSchema } from "dtsgenerator";
import fs, { writeFileSync } from "fs";
import parseArgs from "minimist";
import prettier, { BuiltInParserName } from "prettier";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import util from "util";

/**
 * Generate typescript types for the given OpenAPI spec.
 */
const generateSpecTypes = (params: {
  specFilename: string;
  outputFilename?: string;
  dereferenceJsonSchemaPointers: boolean;
}) =>
  loadSpecFromFile(params.specFilename, params.dereferenceJsonSchemaPointers)
    .then(adaptContentMediaTypes)
    .then((spec) => parseFileContent(spec))
    .then((spec) =>
      dts({
        contents: [parseSchema(spec)],
        config: {
          plugins: {
            "dtsgenerator-express-route-types": {
              placeholderType: "any",
            },
          },
        },
      })
    )
    .then(prettify("typescript"))
    .then(saveToFile(params.outputFilename))
    .then((types) => {
      console.log("Generated OpenApi typescript types");
      return types;
    });

/**
 * Replace media types that `dtsgenerator` doesn't support.
 */
const adaptContentMediaTypes = (spec: string): Promise<string> =>
  Promise.resolve(spec)
    .then((spec) => {
      console.log(
        'Replacing "application/json; charset=utf-8" with "application/custom1+json"...'
      );
      return spec.replace(
        /application\/json; charset=utf-8/g,
        "application/custom1+json"
      );
    })
    .then((spec) => {
      console.log('Replacing "*/*" with "application/custom2+json"...');
      return spec.replace(/\*\/\*/g, "application/custom2+json");
    });

const loadSpecFromFile = (
  specFileName: string,
  dereferenceJsonSchemaPointer: boolean
) =>
  dereferenceJsonSchemaPointer
    ? $RefParser
        .dereference(specFileName, { continueOnError: false })
        .then(JSON.stringify)
    : util.promisify(fs.readFile)(specFileName, { encoding: "utf8" });

/**
 * Format the given data using `prettier`
 * @param format
 */
const prettify = (format: BuiltInParserName) => (data: string) =>
  prettier.format(data, { parser: format });

/**
 * Save the given data to a file, returning the data back.
 * @param filename
 */
const saveToFile = (filename: string | undefined) => (data: string) => {
  if (filename) {
    writeFileSync(filename, data);
  }
  return data;
};

const SOURCE_ARG = "source";
const DEST_ARG = "dest";
const DEREF_ARG = "deref";
const args = parseArgs(process.argv, {
  string: [SOURCE_ARG, DEST_ARG],
  boolean: [DEREF_ARG],
});

const source: string = args[SOURCE_ARG];
if (!source) {
  throw new Error("--source is required");
}

source.split(/,|;/).reduce((acc, source) => {
  return acc.then(() => {
    let dest: string = args[DEST_ARG];
    if (!dest) {
      dest = source + ".d.ts";
    }
    console.log(`Generating types for ${source} -> ${dest}...`);
    return generateSpecTypes({
      specFilename: source,
      outputFilename: dest,
      dereferenceJsonSchemaPointers: args[DEREF_ARG],
    });
  });
}, Promise.resolve(""));
