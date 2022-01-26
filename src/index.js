import { loadIris } from 'scikitjs-node'
import chalk from 'chalk'

const { log } = console

;(async function main() {
  console.log(chalk.blue("Exploring the Iris Dataset"))

  const irisDataset = await loadIris()

  log(irisDataset)

  irisDataset.tail(5).print()

  irisDataset.describe().print()

  irisDataset.groupby(["target"]).count().print()
})()