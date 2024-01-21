const descriptionBlock = document.querySelector(".description")
const experienceBlock = document.querySelector(".work-experience")
const contactsBlock = document.querySelector(".my-contacts")

const descriptionButton = document.querySelector(".secion-me")
const experienceButton = document.querySelector(".secion-experience")
const contactsButton = document.querySelector(".section-contacts")

const sections = {'Description': descriptionBlock, 'Experience': experienceBlock, 'Contacts': contactsBlock}
const currentAppState = {currState: 'Description'}

function openSection(appState, payload) {
  switch(appState.currState) {
    case 'Description':
      descriptionBlock.style.display = 'none'
      break;
    case 'Experience':
      experienceBlock.style.display = 'none'
      break;
    case 'Contacts':
      contactsBlock.style.display = 'none'
      break;
    default:
      console.log('Error occurred. Please, check your CPU burden.')
  }
  sections[payload].style.display = 'flex'
  appState.currState = payload
}

descriptionButton.addEventListener('click', () => {
  openSection(currentAppState, 'Description')
})

experienceButton.addEventListener('click', () => {
  openSection(currentAppState, 'Experience')
})

contactsButton.addEventListener('click', () => {
  openSection(currentAppState, 'Contacts')
})
