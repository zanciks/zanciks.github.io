const posts = {
    2024: {
        8: [2, 1],
        5: [22, 16],
        4: [12, 8, 3, 2],
        1: [18, 17],
    },
    2023: {
        12: [25, 23, 19],
        11: [24, 2],
        10: [1],
        9: [30, 26, 25, 24, 23, 19],
        8: [17, 13, 12, 11, 6],
        7: [19, 18, 9, 8, 6, 4],
        3: [23, 18, 14, 11, 10, 8],
    },
};

const contentTitle = document.getElementById('content-title');
const contentBody = document.getElementById('content-body');

async function setBlog(date) {
    const formattedDate = date.replace(/\//g, '.');
    contentTitle.textContent = formattedDate;

    const response = await fetch(`../blog-posts/${date}.html`);
    console.log(`../blog-posts/${date}.html`);
    if (response.ok) {
        const htmlContent = await response.text();
        contentBody.innerHTML = htmlContent;
    } else {
        contentBody.textContent = "Blog post not found.";
    }
}

function createTreeList() {
    let container = document.getElementById('blog-posts'); 
    let html = '<ul>';

    for (let year in posts) {
        let yearObj = posts[year];
        html += `<li><div>${year}</div><ul>`;
        
        for (let month in yearObj) {
            let days = yearObj[month].slice().reverse();
            html += `<li><div>${month.padStart(2, '0')}</div><ul>`;
            for (let day of days) {
                html += `<li><div><button onclick="jump(3); setBlog('${year}/${month.padStart(2, '0')}/${day.toString().padStart(2, '0')}')">${day.toString().padStart(2, '0')}</button></div></li>`;
            }
            html += '</ul></li>';
        }
        html += '</ul></li>';
    }
    html += '</ul>';
    container.innerHTML = html;
}

createTreeList();