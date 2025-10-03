    // YouTube Background Video Integration
    function onYouTubeIframeAPIReady() {
        new YT.Player('youtube-background', {
            videoId: 'bp8LzqtWK9I', 
            playerVars: {
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                loop: 1,
                playlist: 'bp8LzqtWK9I',
                mute: 1
            },
            events: {
                onReady: function(event) {
                    event.target.playVideo();
                }
            }
        });
    }

    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Form Validation & Local Storage
    // Integrating JQuery to handle the form submission Event.
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        
        let name = $('#name').val().trim();
        let email = $('#email').val().trim();
        let message = $('#message').val().trim();    
        
        if (name === "" || email === "" || message === "") {
            alert("All fields are required.");
            return;
        }
        
        // Enhanced Email Validation
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
    // Create a simulated "htdocs" folder inside localStorage
    let htdocs = JSON.parse(localStorage.getItem("htdocs")) || {};

    // Store data inside the "htdocs" object with a unique key
    htdocs["contact_" + Date.now()] = {
        name: name,
        email: email,
        message: message
    };

    // Save the updated object back to localStorage
    localStorage.setItem("htdocs", JSON.stringify(htdocs));

    alert("Message stored in browser under 'htdocs'!");
    document.getElementById('contact-form').reset();

        
        alert("Message sent successfully!");
        document.getElementById('contact-form').reset();
    });

    // Function to submit a success story
    function submitStory() {
        // Selecting Form Fields using JQuery.
        let title = $("#story-title").val().trim();
        let description = $("#story-description").val().trim();
        let image = $("#story-image")[0].files[0];
        let video = $("#story-video")[0].files[0];


    if (title === "" || description === "") {
        alert("Please fill in the required fields.");
        return;
    }

    let storyData = { title, description, image: "", video: "" };

    if (image) {
        let reader = new FileReader();
        reader.onload = function(e) {
            storyData.image = e.target.result;
            saveStory(storyData);
        };
        reader.readAsDataURL(image);
    } else if (video) {
        let reader = new FileReader();
        reader.onload = function(e) {
            storyData.video = e.target.result;
            storyData.videoType = video.type; // Store the correct MIME type
            saveStory(storyData);
        };
        reader.readAsDataURL(video);

    } else {
        saveStory(storyData);
    }
}

function saveStory(storyData) {
    let htdocs = JSON.parse(localStorage.getItem("htdocs")) || {};
    let storyKey = "story_" + Date.now();

    // Store the correct video MIME type
    if (storyData.video) {
        storyData.videoType = storyData.video.type || "video/mp4";
    }

    htdocs[storyKey] = storyData;
    localStorage.setItem("htdocs", JSON.stringify(htdocs));

    alert("Your Story Shared Successfully!");
    displayStories();
}


// Function to display stories on the page
function displayStories() {
    // Updating the Container Using JQuery
    let storyContainer = $("#story-display");
    if (storyContainer.length === 0) return;
        storyContainer.empty(); // Clears displayed stories without deleting from localStorage

    let htdocs = JSON.parse(localStorage.getItem("htdocs")) || {};

    let storyKeys = Object.keys(htdocs);
    if (storyKeys.length === 0) {
        storyContainer.innerHTML = "<p>No stories available. Submit a success story!</p>";
        return;
    }

    let lastStoryKey = storyKeys[storyKeys.length - 1]; // Get the last submitted story
    let lastStory = htdocs[lastStoryKey];

    let storyElement = document.createElement("div");
    storyElement.classList.add("story-card");

    storyElement.innerHTML = `
        <h3>${lastStory.title}</h3>
        <p>${lastStory.description}</p>
        ${lastStory.image ? `<img src="${lastStory.image}" alt="Story Image" class="story-media">` : ""}
        ${lastStory.video ? `<video controls muted class="story-media">
            <source src="${lastStory.video}" type="${lastStory.videoType}">
        </video>` : ""}
        
    `;

    storyContainer.appendChild(storyElement);
}

// Function to add an email address
function addEmail() {
    $("#email-address").val().trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert(`Success Story Emailed Successfully to ${email}`);
}

// Function to send success story to all VIT students
function sendStory() {
    if ($("#send-all").prop("checked")) {
        alert("Success Story Emailed to all VITIANS!");
    } else {
        alert("Please select an email or send to all VITIANS.");
    }
}
    
// // Load stored stories on page load
// document.addEventListener("DOMContentLoaded", displayStories);

// Function to add a new committee member
function addCommitteeMember() {
    let name = $("#committee-name").val().trim();
    let role = $("#committee-role").val().trim();

    if (name === "" || role === "") {
        alert("Please enter both name and role.");
        return;
    }

    let committee = JSON.parse(localStorage.getItem("committee")) || [];
    committee.push({ name, role });
    localStorage.setItem("committee", JSON.stringify(committee));

    alert(`Committee Member "${name}" added successfully!`);
    displayCommittee();
    document.getElementById("committee-name").value = "";
    document.getElementById("committee-role").value = "";
}

// Function to display committee members
function displayCommittee() {
    let committeeList = document.getElementById("committee-list");
    if (!committeeList) return;

    committeeList.innerHTML = "";  
    let committee = JSON.parse(localStorage.getItem("committee")) || [];

    committee.forEach(member => {
        // A Sommth Fade - in Effect for New Committee Members using JQuery
        let newMember = $("<li>").text(`${member.name} - ${member.role}`).hide();
        $("#committee-list").append(newMember);
        newMember.fadeIn(500);
    });
}

// // Load stored committee members on page load
// document.addEventListener("DOMContentLoaded", displayCommittee);

document.addEventListener("DOMContentLoaded", () => {
    displayStories();
    displayCommittee();
});

// A Smooth Scroll for Navigation using JQuery.
$('nav ul li a').click(function(event) {
    event.preventDefault();
    let target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1600);
});
