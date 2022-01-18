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
  apiRootName?: string;
  componentsRootName?: string;
  placeholderType: string;
}) =>
  loadSpecFromFile(params.specFilename, params.dereferenceJsonSchemaPointers)
    .then(adaptContentMediaTypes)
    .then((spec) => parseFileContent(spec))
    .then((spec) => {
      const plugins: any = {
        "@dtsgenerator/replace-namespace": {
          map: [
            {
              from: ["Components"],
              to: [params.componentsRootName || "Components"],
            },
            {
              from: ["Paths"],
              to: [params.apiRootName || "Paths"],
            },
          ],
        },
        "dtsgenerator-express-route-types": {
          placeholderType: params.placeholderType,
        },
      };
      return dts({
        contents: [parseSchema(spec)],
        config: { plugins },
      });
    })
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
  Promise.resolve(
    [
      {
        source: /application\/json; charset=utf-8/g,
        target: "application/custom1+json",
      },
      {
        source: /\*\/\*/g,
        target: "application/custom2+json",
      },
      {
        source: /application\/x-pem-file/g,
        target: "text/plain",
      },
    ].reduce((acc, replacer) => {
      console.log(
        `Replacing "${replacer.source}" with "${replacer.target}"...`
      );
      return acc.replace(replacer.source, replacer.target);
    }, spec)
  );

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
const PLACEHOLDER_TYPE_ARG = "placeholder-type";
const API_ROOT_NAME_ARG = "paths";
const COMPS_ROOT_NAME = "components";
const DEST_ARG = "dest";
const DEREF_ARG = "deref";
const args = parseArgs(process.argv, {
  string: [
    SOURCE_ARG,
    DEST_ARG,
    API_ROOT_NAME_ARG,
    COMPS_ROOT_NAME,
    PLACEHOLDER_TYPE_ARG,
  ],
  boolean: [DEREF_ARG],
});

const source: string = args[SOURCE_ARG];
if (!source) {
  console.error("--source is required. Example:\n");
  console.error(
    "   generate-types --source=api-spec.json --placeholder-type=unknown --paths=Paths --components=Components\n"
  );
  process.exit(-1);
}
const placeholderType: string = args[PLACEHOLDER_TYPE_ARG] || "any";

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
      apiRootName: args[API_ROOT_NAME_ARG],
      componentsRootName: args[COMPS_ROOT_NAME],
      placeholderType,
    });
  });
}, Promise.resolve(""));
