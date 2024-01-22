const descriptionBlock = document.querySelector(".description")
const experienceBlock = document.querySelector(".work-experience")
const contactsBlock = document.querySelector(".my-contacts")


const descriptionButton = document.querySelector(".secion-me")
const experienceButton = document.querySelector(".secion-experience")
const contactsButton = document.querySelector(".section-contacts")

const myPhoto = document.querySelector(".my-photo")
const myName = document.querySelector(".full-name")
const myCareer = document.querySelector(".career")

myPhoto.classList.add("photo-expand")
myName.classList.add("name-expand")
myCareer.classList.add("career-expand")

const sections = {'Description': descriptionBlock, 'Experience': experienceBlock, 'Contacts': contactsBlock}
const currentAppState = {currState: 'Description', 'currButton': descriptionButton}

descriptionButton.classList.add("button-hover")

function openSection(appState, payload, elem) {
  if(appState.currState === payload) {
    return
  }
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
  changeScale(appState.currState, payload)
  appState.currState = payload
  currentAppState.currButton.classList.remove("button-hover")
  currentAppState.currButton = elem
  currentAppState.currButton.classList.add("button-hover")
}

function changeScale(prev, curr) {
  if((prev === 'Experience' || prev === 'Contacts') && (curr === 'Experience' || curr === 'Contacts')) {
    return
  } else if(prev === 'Description') {
    myPhoto.classList.remove("photo-expand")
    myName.classList.remove("name-expand")
    myCareer.classList.remove("career-expand")

    myPhoto.classList.add("photo-decrease")
    myName.classList.add("name-decrease")
    myCareer.classList.add("career-decrease")
  } else if (prev === 'Experience' || prev === 'Contacts') {
    myPhoto.classList.remove("photo-decrease")
    myName.classList.remove("name-decrease")
    myCareer.classList.remove("career-decrease")

    myPhoto.classList.add("photo-expand")
    myName.classList.add("name-expand")
    myCareer.classList.add("career-expand")
  }

}

descriptionButton.addEventListener('click', () => {
  openSection(currentAppState, 'Description', descriptionButton)
})

experienceButton.addEventListener('click', () => {
  openSection(currentAppState, 'Experience', experienceButton)
})

contactsButton.addEventListener('click', () => {
  openSection(currentAppState, 'Contacts', contactsButton)
})
