// Select elements
const popover = document.querySelector('.speaker__popover');
const closeBtn = document.querySelector('.speaker__close-btn');
const speakerCards = document.querySelectorAll('.speaker__card');
const popoverName = document.querySelector('.speaker__popover-name');
const popoverRole = document.querySelector('.speaker__popover-role');
const popoverCompany = document.querySelector('.speaker__popover-company');
const popoverInfo = document.querySelector('.speaker__popover-info');

// Dummy speaker data for demonstration purposes
const speakersData = {
  1: { name: "John Doe", role: "Chief Marketing Officer", company: "Acme Corp", info: "Detailed information about the speaker goes here." },
  // Add additional speaker data as needed
};

// Function to open the popover
function openPopover(speakerId) {
  const speaker = speakersData[speakerId];
  if (speaker) {
    popoverName.textContent = speaker.name;
    popoverRole.textContent = speaker.role;
    popoverCompany.textContent = speaker.company;
    popoverInfo.textContent = speaker.info;
    popover.classList.remove('hidden');
  }
}

// Event listeners for each speaker card
speakerCards.forEach(card => {
  card.addEventListener('click', () => {
    const speakerId = card.getAttribute('data-id');
    openPopover(speakerId);
  });
});

// Close popover on button click
closeBtn.addEventListener('click', () => {
  popover.classList.add('hidden');
});
