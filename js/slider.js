const containerSection = document.querySelector('.container')
const picSlider = containerSection.querySelector('.slider__list')
const buttonNext = containerSection.querySelector('.slider__next')
const buttonPrev = containerSection.querySelector('.slider__prev')
const buttonsDots = containerSection.querySelectorAll('.slider__dots__control')

let picSlides = picSlider.children

const addClonesToEnd = (clonesNumber, itemsList) => {
    for (let i = 0; i < clonesNumber; i++) {
        let cloneItem = itemsList[i].cloneNode(true)
        cloneItem.classList.remove("current")
        itemsList[i].parentNode.appendChild(cloneItem)
    }
}
addClonesToEnd(4, picSlides)

let lastSlideIndex = picSlides.length - 4
let currentSlideIndex = 0
let nextSlideIndex = 1

let picItem = picSlides[currentSlideIndex]
let picItemImg = picItem.children[0]

let nextPicItem = picSlides[nextSlideIndex]
let nextPicItemImg = nextPicItem.children[0]


const wantedPicItemProps = ["width", "height", "opacity", "marginRight"]

const getElementProps = (element, keys) => {
    let elementStyles = getComputedStyle(element);
    return keys.reduce(
        (props, key) => {
            if (key in elementStyles) {
                props[key] = elementStyles[key];
                return props;
            }
        }, {}
)};

const currentPicItemProps = getElementProps(picItem, wantedPicItemProps)
const currentPicItemImgProps = getElementProps(picItemImg, wantedPicItemProps)

const defaultPicItemProps = getElementProps(nextPicItem, wantedPicItemProps)
const defaultPicItemImgProps = getElementProps(nextPicItemImg, wantedPicItemProps)

const picSlideOffset = parseInt(defaultPicItemProps.width) + parseInt(defaultPicItemProps.marginRight);

const moveContainer = (offset) => {
    return [
        {transform: `translateX(-${currentSlideIndex * offset}px)`},
        {transform: `translateX(-${nextSlideIndex * offset}px)`}
    ]
}

const picItemOpacityOn = [defaultPicItemProps, currentPicItemProps];
const picItemOpacityOff = [currentPicItemProps, defaultPicItemProps];

const picItemImgIncrease = [defaultPicItemImgProps, currentPicItemImgProps];
const picItemImgDecrease = [currentPicItemImgProps, defaultPicItemImgProps];

const instant = {duration: 0, fill: "forwards"};
const ease500 = {duration: 500, easing: "ease-out", fill: "forwards"};

const getItemsByIndex = () => {
    picItem = picSlides[currentSlideIndex];
    picItemImg = picItem.children[0];

    nextPicItem = picSlides[nextSlideIndex];
    nextPicItemImg = nextPicItem.children[0];
};

const itemsAnimation = (timing) => {
    picSlider.animate(moveContainer(picSlideOffset), timing);

    picItem.animate(picItemOpacityOff, timing);
    picItemImg.animate(picItemImgDecrease, timing);

    nextPicItem.animate(picItemOpacityOn, timing);
    nextPicItemImg.animate(picItemImgIncrease, timing);
};

const switchClasses = () => {
    /* Switch current item */
    picItem.classList.remove("current");
    nextPicItem.classList.add("current");

    /* Switch dot pagination */
    if (currentSlideIndex === lastSlideIndex) {
        buttonsDots[0].classList.remove("current");
    } else {
        buttonsDots[currentSlideIndex].classList.remove("current");
    }
    if (nextSlideIndex === lastSlideIndex) {
        buttonsDots[0].classList.add("current");
    } else {
        buttonsDots[nextSlideIndex].classList.add("current");
    }
    console.log(buttonsDots[nextSlideIndex])
}

const swapSlides = () => {
    nextSlideIndex = (nextSlideIndex < 0) ? lastSlideIndex : 0;

    getItemsByIndex();
    itemsAnimation(instant);
    switchClasses();

    currentSlideIndex = nextSlideIndex;
    return currentSlideIndex;
};

const moveSlider = () => {
    getItemsByIndex();
    itemsAnimation(ease500);
    switchClasses();
};

buttonNext.addEventListener("click", () => {
    buttonNext.disabled = true
    let intervalId = setInterval(function() {
        nextSlideIndex = currentSlideIndex + 1;

        if (nextSlideIndex < 0 || nextSlideIndex > lastSlideIndex) {
            swapSlides();
            nextSlideIndex = currentSlideIndex + 1;
            clearInterval(intervalId)
        };
        moveSlider();
        clearInterval(intervalId)
        buttonNext.disabled = false

        currentSlideIndex = nextSlideIndex;
    }, 1000)

});

buttonPrev.addEventListener("click", () => {
    buttonPrev.disabled = true
    let intervalId = setInterval(function() {
        nextSlideIndex = currentSlideIndex - 1;

        if (nextSlideIndex < 0 || nextSlideIndex > lastSlideIndex) {
            swapSlides();
            nextSlideIndex = currentSlideIndex - 1;
            clearInterval(intervalId)
        };
        moveSlider();
        clearInterval(intervalId)
        buttonPrev.disabled = false

        currentSlideIndex = nextSlideIndex;
    }, 1000)

});

for (let i = 0; i < buttonsDots.length; i++) {
    buttonsDots[i].addEventListener("click", () => {
        nextSlideIndex = i;
        if (currentSlideIndex === lastSlideIndex) {
            nextSlideIndex = currentSlideIndex + 1;
            swapSlides();
            nextSlideIndex = i;
        }
        moveSlider();
        currentSlideIndex = nextSlideIndex;
    })
}

