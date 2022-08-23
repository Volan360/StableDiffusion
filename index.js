const imageBox = document.getElementById("imageBox")
const widthSlider = document.getElementById("widthSlider")
const heightSlider = document.getElementById("heightSlider")
const widthText = document.getElementById("widthText")
const heightText = document.getElementById("heightText")

widthSlider.addEventListener("input", () =>
{
    imageBox.style['width'] = widthSlider.value + 'px'
    widthText.textContent = "Width: " + widthSlider.value
    console.log(imageBox.style['width'])
})

heightSlider.addEventListener("input", () =>
{
    imageBox.style['height'] = heightSlider.value + 'px'
    heightText.textContent = "Height: " + heightSlider.value
})

const sendBtn = document.getElementById("send")
const promptBox = document.getElementById("promptInput")
sendBtn.onclick = () => {
    data = '--prompt "'
    data += promptBox.value
    data+= '"'
    data += ` --H ${heightSlider.value} --W ${widthSlider.value}`
    fetch(`http://localhost:5000/imageGen?prompt=${data}`)
    .then(res => res.text())
    .then(data => {
        console.log(data)
        const newImg = document.createElement('img')
        newImg.src = 'data:image/png;base64,' + data
        imageBox.appendChild(newImg)
    })
}