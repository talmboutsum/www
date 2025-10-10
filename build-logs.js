const fs = require('fs');
const path = require('path');

const writingsDir = './writings';
const outputFile = './blog-posts.js';

const blogPosts = {};

const categories = fs.readdirSync(writingsDir);

categories.forEach(category => {
    const categoryPath = path.join(writingsDir, category);
    
    if (fs.statSync(categoryPath).isDirectory()) {
        blogPosts[category] = {};
        
        const files = fs.readdirSync(categoryPath);
        
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const postId = file.replace('.md', '');
                const filePath = path.join(categoryPath, file);
                const markdown = fs.readFileSync(filePath, 'utf8');
                
                const title = postId.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                blogPosts[category][postId] = {
                    title: title,
                    date: new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    }),
                    description: `Read about ${title.toLowerCase()}`,
                    category: category,
                    markdown: markdown
                };
            }
        });
    }
});

const output = `const blogPosts = ${JSON.stringify(blogPosts, null, 4)};`;

fs.writeFileSync(outputFile, output);

console.log('blog-posts.js has been generated successfully!');
console.log(`Found ${Object.keys(blogPosts).reduce((sum, cat) => sum + Object.keys(blogPosts[cat]).length, 0)} posts across ${Object.keys(blogPosts).length} categories.`);