const PhotoSlotTemplate = document.querySelector("[data-slot-template]")
const PhotoSlotContainer = document.querySelector("[data-slot-container]")
const searchInput = document.querySelector("[data-search]")
let photos = []
searchInput.addEventListener("input", (e)=>{
    const value= e.target.value.toLowerCase()
    console.log(photos)
    photos.forEach(photo => {
        const isVisible = photo.title.toLowerCase().includes(value)
        photo.element.classList.toggle("hide",!isVisible)
    });

})
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(res => res.json())
  .then(data => {
    photos = data.map(photo =>{
    const slotContainer = PhotoSlotTemplate.content.cloneNode(true).children[0]
    const header = slotContainer.querySelector("[data-header]")
    const slotPhoto = slotContainer.querySelector("[data-photo]")

    header.textContent = photo.title
    slotPhoto.style.backgroundImage = "url('"+photo.url+"')"
    PhotoSlotContainer.append(slotContainer)
    return { photoUrl: "url('"+photo.url+"')", title: photo.title, element: slotContainer}
    })
  })