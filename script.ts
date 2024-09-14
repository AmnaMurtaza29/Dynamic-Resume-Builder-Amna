
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    knowledgebase: string;
    experience: string;
    achievements: string;
    skills: string;
    profilePic?: string; 
}

function handleFormSubmit(event: Event): void {
    event.preventDefault(); 

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const knowledgebaseInput = document.getElementById('Knowledgebase') as HTMLTextAreaElement;
    const experienceInput = document.getElementById('experience') as HTMLTextAreaElement;
    const achievementsInput = document.getElementById('achievements') as HTMLTextAreaElement;
    const skillsInput = document.getElementById('skills') as HTMLTextAreaElement;
    const fileInput = document.getElementById('profile-pic') as HTMLInputElement;

    let profilePicUrl: string | undefined;
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        profilePicUrl = URL.createObjectURL(file);
    }

    const resumeData: ResumeData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        knowledgebase: knowledgebaseInput.value,
        experience: experienceInput.value,
        achievements: achievementsInput.value,
        skills: skillsInput.value,
        profilePic: profilePicUrl
    };

    
    if (!resumeData.name || !resumeData.email || !resumeData.phone) {
        alert('Please fill in all required fields.');
        return;
    }

    generateResume(resumeData);

    clearForm();
}

function generateResume(data: ResumeData): void {

    const resumeContainer = document.getElementById('resume-container') as HTMLDivElement;
    resumeContainer.innerHTML = ''; 


    const resumeContent = `
        <div class="resume">
            ${data.profilePic ? `<div class="resume-pic"><img src="${data.profilePic}" alt="Profile Picture"></div>` : ''}
            <h2>${data.name}</h2>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <h3>Credentials / Qualifications</h3>
            <p>${data.knowledgebase}</p>
            <h3>Career Highlights</h3>
            <p>${data.experience}</p>
            <h3>Achievements</h3>
            <p>${data.achievements}</p>
            <h3>Skills</h3>
            <p>${data.skills}</p>
        </div>
    `;

    resumeContainer.innerHTML = resumeContent;
}

function clearForm(): void {
    const form = document.getElementById('mainform') as HTMLFormElement;
    form.reset();
    const imagePreview = document.getElementById('image-preview') as HTMLDivElement;
    imagePreview.innerHTML = ''; 
}


function handleImagePreview(event: Event): void {
    const input = event.target as HTMLInputElement;
    const imagePreview = document.getElementById('image-preview') as HTMLDivElement;

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e: ProgressEvent<FileReader>) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target?.result as string;
            imgElement.alt = 'Profile Picture';
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mainform') as HTMLFormElement;
    form.addEventListener('submit', handleFormSubmit);

    const fileInput = document.getElementById('profile-pic') as HTMLInputElement;
    fileInput.addEventListener('change', handleImagePreview);
});
