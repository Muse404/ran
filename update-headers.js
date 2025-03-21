const fs = require('fs');
const path = require('path');

// Header template to replace
const headerTemplate = `    <header class="header">
      <div class="header__container">
        <a href="../../index.html" class="header__logo logo" aria-label="Home">林小然 RAN</a>
        <nav class="header__navigation">
          <ul class="header__nav-list">
            <li class="header__nav-item"><a href="../../index.html" class="header__nav-link header__nav-link_active">Work</a></li>
            <li class="header__nav-item"><a href="../../about.html" class="header__nav-link">About</a></li>
          </ul>
        </nav>
        <button type="button" class="menu__icon icon-menu" aria-label="Toggle menu">
          <span></span>
        </button>
      </div>
    </header>`;

// Directory with HTML files
const detailDir = path.join(__dirname, 'project', 'detail');

// Process each HTML file
fs.readdir(detailDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter to only include HTML files
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  htmlFiles.forEach(file => {
    const filePath = path.join(detailDir, file);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      // Replace the header section using regex
      const updatedData = data.replace(
        /<header class="header">[\s\S]*?<\/header>/,
        headerTemplate
      );

      // Write the modified content back to the file
      fs.writeFile(filePath, updatedData, 'utf8', err => {
        if (err) {
          console.error(`Error writing to file ${file}:`, err);
          return;
        }
        console.log(`Updated header in ${file}`);
      });
    });
  });
}); 