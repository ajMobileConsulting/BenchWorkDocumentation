async function fetchMarkdown(filePath) {
    const res = await fetch(`https://api.github.com/repos/ajMobileConsulting/BenchWorkDocumentation/contents/${filePath}`);
    const json = await res.json();
    const markdown = atob(json.content);
    document.getElementById("viewer").innerHTML = marked.parse(markdown);
  }
  
  async function listFilesInDocs() {
    const res = await fetch("https://api.github.com/repos/ajMobileConsulting/BenchWorkDocumentation/contents/docs");
    const files = await res.json();
  
    const sidebar = document.getElementById("sidebar-links");
    sidebar.innerHTML = files
      .filter(f => f.name.endsWith(".md"))
      .map(f => `<a href="#" onclick="fetchMarkdown('docs/${f.name}')">${f.name.replace('.md','')}</a>`)
      .join("<br>");
  }