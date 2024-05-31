let jobFilters = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderJobListings(data);
        });
});

function renderJobListings(data) {
    const jobListingsContainer = document.querySelector('.all-jobs');
    jobListingsContainer.innerHTML = '';

    const filteredData = jobFilters.length > 0 ? data.filter(job => {
        return jobFilters.every(filter => 
            job.role === filter || job.level === filter || 
            job.languages.includes(filter) || job.tools.includes(filter)
        );
    }) : data;

    filteredData.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('listing-all-jobs');
        
        jobElement.innerHTML = `
            <div class="header">
                <img src="${job.logo}" alt="${job.company}">
                <div class="details">
                    <span class="company">
                        ${job.company}
                        ${job.new ? '<span class="new">NEW!</span>' : ''}
                        ${job.featured ? '<span class="featured">FEATURED</span>' : ''}
                    </span>
                    <span class="position">${job.position}</span>
                    <div class="info">
                        <span>${job.postedAt}</span>
                        <span>•</span>
                        <span>${job.contract}</span>
                        <span>•</span>
                        <span>${job.location}</span>
                    </div>
                </div>
            </div>
            <div class="tags">
                <span class="tag">${job.role}</span>
                <span class="tag">${job.level}</span>
                ${job.languages.map(language => `<span class="tag">${language}</span>`).join('')}
                ${job.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
            </div>
        `;
        
        jobListingsContainer.appendChild(jobElement);
    });
}
