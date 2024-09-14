// script.ts
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    // Get form elements
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var knowledgebaseInput = document.getElementById('Knowledgebase');
    var experienceInput = document.getElementById('experience');
    var achievementsInput = document.getElementById('achievements');
    var skillsInput = document.getElementById('skills');
    var fileInput = document.getElementById('profile-pic');
    // Handle file input
    var profilePicUrl;
    if (fileInput.files && fileInput.files[0]) {
        var file = fileInput.files[0];
        profilePicUrl = URL.createObjectURL(file);
    }
    // Create resume data object
    var resumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        knowledgebase: knowledgebaseInput.value,
        experience: experienceInput.value,
        achievements: achievementsInput.value,
        skills: skillsInput.value,
        profilePic: profilePicUrl
    };
    // Basic validation
    if (!resumeData.name || !resumeData.email || !resumeData.phone) {
        alert('Please fill in all required fields.');
        return;
    }
    // Generate the resume
    generateResume(resumeData);
    // Clear form after submission (optional)
    clearForm();
}
// Function to generate and display the resume
function generateResume(data) {
    // Get the container where the resume will be displayed
    var resumeContainer = document.getElementById('resume-container');
    resumeContainer.innerHTML = ''; // Clear previous content
    // Create resume elements
    var resumeContent = "\n        <div class=\"resume\">\n            ".concat(data.profilePic ? "<div class=\"resume-pic\"><img src=\"".concat(data.profilePic, "\" alt=\"Profile Picture\"></div>") : '', "\n            <h2>").concat(data.name, "</h2>\n            <p><strong>Email:</strong> ").concat(data.email, "</p>\n            <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n            <h3>Credentials / Qualifications</h3>\n            <p>").concat(data.knowledgebase, "</p>\n            <h3>Career Highlights</h3>\n            <p>").concat(data.experience, "</p>\n            <h3>Achievements</h3>\n            <p>").concat(data.achievements, "</p>\n            <h3>Skills</h3>\n            <p>").concat(data.skills, "</p>\n        </div>\n    ");
    // Insert the generated content into the container
    resumeContainer.innerHTML = resumeContent;
}
// Function to clear the form inputs
function clearForm() {
    var form = document.getElementById('mainform');
    form.reset();
    var imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = ''; // Clear the image preview
}
// Handle image file selection
function handleImagePreview(event) {
    var input = event.target;
    var imagePreview = document.getElementById('image-preview');
    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var imgElement = document.createElement('img');
            imgElement.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            imgElement.alt = 'Profile Picture';
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    }
}
// Add event listeners
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('mainform');
    form.addEventListener('submit', handleFormSubmit);
    var fileInput = document.getElementById('profile-pic');
    fileInput.addEventListener('change', handleImagePreview);
});
