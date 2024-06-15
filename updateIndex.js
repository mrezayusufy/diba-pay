const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
const indexPath = path.join(__dirname, 'src', 'index.ts');

fs.appendFile(indexPath, `\nexport { ${componentName} } from "./${componentName}";`, (err) => {
  if (err) throw err;
  console.log(`Added ${componentName} export to index.ts`);
});
