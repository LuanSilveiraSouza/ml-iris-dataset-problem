import { loadIris } from "scikitjs-node";
import chalk from "chalk";

const { log } = console;

(async function main() {
  console.log(chalk.blue("Exploring the Iris Dataset"));

  let irisDataset = await loadIris();

  irisDataset.head(5).print();

  irisDataset.describe().print();

  formatTargetColumn(irisDataset).groupby(["target"]).count().print();

  const [train, test] = await trainTestSplit(irisDataset, 0.6)
})();

const formatTargetColumn = (dataset) => {
  return dataset.astype({ column: "target", dtype: "string" }).replace("0", "setosa", { columns: ["target"] })
    .replace("1", "versicolor", { columns: ["target"] })
    .replace("2", "virginica", { columns: ["target"] })
}

const trainTestSplit = async (dataset, trainSize) => {
  const dtCount = dataset.count().values[0]

  const dt = await dataset.sample(dtCount)

  const trainCount= trainSize * dtCount

  return [dt.iloc({rows: [`0:${trainCount}`]}), dt.iloc({rows: [`${trainCount}:${dtCount}`]})]
}