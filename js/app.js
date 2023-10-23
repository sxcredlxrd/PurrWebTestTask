const menuBurger = document.querySelector('.burger-menu')
const btnOpen = document.querySelector('#btn-burger')
const btnClose = document.querySelector('.btn-close')
const btnSales = document.querySelectorAll('.btn-sales')
const closeModal = document.querySelector('.close-modal')
const modal = document.querySelector('.modal__overlay')
const form = document.querySelector('.form')
const formInputs = document.querySelectorAll('.input-required')
const finalModal = document.querySelector('.final-modal')
const closeFinal = document.querySelector('.close-final')
const finallyBtn = document.querySelector('.finally-btn')

btnSales.forEach(el => el.addEventListener('click', () => {
    modal.classList.add('modal-open')
}))


function validation() {

    function createError(input, text) {
        const parent = input.parentNode
        const errorLabel = document.createElement('label')

        errorLabel.classList.add('error')
        errorLabel.textContent = text

        parent.classList.add('input-error')
        parent.append(errorLabel)
    }

    function removeError(input) {
        const parent = input.parentNode
        if (parent.classList.contains('input-error')) {
            parent.querySelector('.error').remove()
            parent.classList.remove('input-error')
        }
    }

    let result = true

    formInputs.forEach(function (input) {
        removeError(input)
        if(input.dataset.required === 'true')
        if (input.value === '' || input.value === null) {
            input.classList.add('input-error')
            createError(input, 'This field is required.')
            result = false
        } else {
            input.classList.remove('input-error')
        }
    })

    return result;
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    if(validation(this) === true) {
        modal.classList.remove('modal-open')
        finalModal.classList.add('final-open')
    }
})



window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('modal-open')
    }
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('modal-open')
})

closeFinal.addEventListener('click', () => {
    finalModal.classList.remove('final-open')
})

finallyBtn.addEventListener('click', () => {
    finalModal.classList.remove('final-open')
})

btnOpen.addEventListener('click', () => {
    menuBurger.classList.add('open')
})

btnClose.addEventListener('click', () => {
    menuBurger.classList.remove('open')
})