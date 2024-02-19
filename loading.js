window.onload = () => {
  setTimeout(() => {
    const cubeContainer = document.querySelector(".cube-container")
    const mainSection = document.querySelector(".main")
    cubeContainer.classList.add("disappear-loading")
    mainSection.classList.add("appear-menu")
    showMainSection(cubeContainer, mainSection)
  }, 300)
}

function showMainSection(cubeContainer, mainSection) {
  setTimeout(() => {
    mainSection.style.display = "block"
    cubeContainer.style.display = "none"
  }, 230)
}
