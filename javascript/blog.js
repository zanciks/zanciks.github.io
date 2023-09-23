let newWindow;

function openWindow(year, month, day) {
    const blogWindowContainer = document.getElementById("blog-window-container");
    if (blogWindowContainer) {
        blogWindowContainer.remove();
    }

    const filePath = getBlogFilePath(year, month, day);

    fetch(filePath)
        .then(response => response.text())
        .then(content => {
            const buttonTitle = document.activeElement.innerHTML;

            // Create a container for the blog window
            const windowContainer = document.createElement("div");
            windowContainer.id = "blog-window-container";

            // Create the blog window inside the container
            const windowElement = document.createElement("div");
            windowElement.className = "window";

            windowElement.innerHTML = `
                <div class="title-bar">
                    <div class="title-bar-text">
                        ${buttonTitle}
                    </div>
                    <div class="title-bar-controls">
                        <button onclick="closeWindow()" aria-label="Close"></button>
                    </div>
                </div>
                <div class="window-body">
                    ${content}
                </div>
            `;

            windowContainer.appendChild(windowElement);
            document.body.appendChild(windowContainer);

            const closeButton = windowElement.querySelector("#closeWindow");
        })
        .catch(error => {
            console.error("Error loading blog content: " + error);
        });
}


function closeWindow() {
    const blogWindowContainer = document.getElementById("blog-window-container");
    if (blogWindowContainer) {
        blogWindowContainer.remove();
    }
}

function getBlogFilePath(year, month, day) {
    const formattedYear = year.toString();
    const formattedMonth = (month).toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `../blogs/${formattedYear}.${formattedMonth}.${formattedDay}.txt`;
}
