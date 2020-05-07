/* jshint esversion: 6 */

import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const srcFile = "src/index.js";
const distFile = "dist/crudjs.js";
const distMinFile = "dist/crudjs.min.js";

const config = [
	{
		input: srcFile,
		output: [
			{
				file: distFile,
				format: 'esm',
			},
		],
	},
	{
		input: distFile,
		output: [
			{
				file: distMinFile,
				format: 'esm',
			},
		],
		plugins: [babel(), uglify()],
	}
];


export default config;
