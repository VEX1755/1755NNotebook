const entriesDiv = document.getElementById("entriesDiv");

function categoryString(cat) {
switch (cat) {
    case "gameplan":
        return "Game Plan";
    case "meeting":
        return "Team Meetings";
    case "testing":
        return "Testing Results";
    case "design":
        return "Design Process";
    case "code":
        return "Code Development";
    case "building":
        return "Building";
}
}

function doEntries(data) {
    const entries = data.entries.reverse();
    entries.forEach(element => {
        let entryHTML = "<article data-category=\"" + element.category + "\">";
        entryHTML += "<h2>" + element.title + "</h2>";

        const dateObj = new Date(element.updatedAt);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        entryHTML += "<span>" + dateObj.toLocaleDateString(undefined, options) + "</span>";
        entryHTML += "<div data-cat=\"" + element.category + "\">" + categoryString(element.category) + "</div>"
        entryHTML += "<p>" + element.content + "</p>";

        if (element.imageUrls) {
            entryHTML += "<section>";
            for (let i = 0; i < element.imageUrls.length; i++) {
                entryHTML += "<img src=\"" + element.imageUrls[i] + "\">";
            }
            entryHTML += "</section>";
        }

        entryHTML += "</article>"
        entriesDiv.innerHTML += entryHTML;
    });
}

fetch('content.json')
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        doEntries(data);
      })
      .catch(error => console.error('Error fetching JSON:', error));

const radioButtons = document.querySelectorAll('input[name="contact"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            filterEntriesBasedOn(this.value);
        }
    });
});

function filterEntriesBasedOn(cate) {
    if (cate != "all") {
        document.querySelectorAll('article').forEach(element => {
            element.setAttribute("matching", element.getAttribute("data-category") == cate);
        });
    }
    else {
        document.querySelectorAll('article').forEach(element => {
            element.setAttribute("matching", true);
        });
    }
}