function fetchGuestBookEntries() {
    fetch(`https://opensheet.elk.sh/${"1xyGFGkOpqg69Lg9pDFDVLEJ3CyiTBFB3uGFa8bZO-ro"}/${"Form+Responses+1"}`)
        .then((res) => res.json())
        .then((data) => {
            let sortedInput = data.reverse()

            for (var i = 0; i < sortedInput.length; i++) {
                var date = sortedInput[i].Timestamp.split(' ')[0];

                let SantizeName = encodeHTML(sortedInput[i].Name)
                let SantizeResponses = encodeHTML(sortedInput[i].Guestbook_Entry)

                document.getElementById("guestbook-json").innerHTML += `
                    <div class="guestbook-entry">
                        <div class="guestbook-entry-info">
                            <span class="guestbook-author">${SantizeName}</span>
                            <span class="guestbook-date">${date}</span>
                        </div>
                        <div class="guestbook-text">
                            ${SantizeResponses}
                        </div>
                        <hr>
                    </div>
                `
            }
        })
}

function encodeHTML(santizedInput) {
    return santizedInput.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function submitForm() {
    var frm = document.getElementsByName('gform')[0];
    var submissionText = document.getElementById('submittion-confirmation');
    submissionText.innerHTML = "Thank you for your submittion! Please wait around 30 seconds and refresh the page to see it on the guestbook!"
    frm.submit(); 
    frm.reset(); 
    return false;
}

function toggleWindow() {
    var windowRadio = document.getElementById("window-radio");
    if (windowRadio.style.visibility === "visible") {
        windowRadio.style.visibility = "hidden";
    } else {
        windowRadio.style.visibility = "visible";
    }
}

window.onload = fetchGuestBookEntries();