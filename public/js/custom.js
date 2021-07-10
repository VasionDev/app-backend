const form = document.querySelector('form.js-action')
if(form) {
    form.onsubmit = async(event) => {
        event.preventDefault()
        let apiUrl = form.getAttribute('action')
        const method = form.getAttribute('method')
        const loader = document.querySelector('.loader')
        const submitButton = document.querySelector('.submit-button')
        const formData = new FormData(form)
        const errorPlaceholders = document.querySelectorAll('p.error')
        const inputErrors = document.querySelectorAll('input.error')
        const selectErrors = document.querySelectorAll('select.error')
        submitButton.style.display = "none"
        loader.classList.remove('hide')
        
        if(errorPlaceholders.length > 0) {
            for(let i=0; i<errorPlaceholders.length; i++) {
            errorPlaceholders[i].style.display = 'none'
            }
        }
    
        if(inputErrors.length > 0) {
            for(let j=0; j<inputErrors.length; j++) {
            inputErrors[j].classList.remove('error')
            }
        }
    
        if(selectErrors.length > 0) {
            for(let k=0; k<selectErrors.length; k++) {
              selectErrors[k].classList.remove('error')
            }
        }

        const result = await fetch(apiUrl, {
            method: method,
            body: formData
        })

        const response = await result.json()

        console.log(response)
    
        if(response.errors) {
            setTimeout(() => {
                loader.classList.add('hide')
                submitButton.style.display = "block"
                Object.keys(response.errors).forEach(fieldName => {
                    if(form[fieldName]){
                        form[fieldName].classList.add('error')
                    }
                    const errorPlaceholder = document.querySelector(`.${fieldName}-error`)
                    errorPlaceholder.textContent = response.errors[fieldName].msg
                    errorPlaceholder.style.display = 'block'
                })
            }, 500)
        }else {
            const modal = form.closest(".modal-wrapper")
            if(modal) {
                closeModal(modal.getAttribute('id'))
                const successMessage = Toastify({
                    text: response.success,
                    duration: 1000,
                })
                successMessage.showToast()
                setTimeout(()=> {
                    location.reload()
                }, 1000)
            }else {
                setTimeout(()=> {
                    location.reload('/user')
                }, 1000)
            }
        }
    }
}

function closeModal(modal_id) {
    let modal = document.querySelector(`#${modal_id}`);
    modal.style.display = "none";
}
function openModal(modal_id) {
    let modal = document.querySelector(`#${modal_id}`);
    modal.style.display = "block";
}
async function signout() {
    console.log('dokfkf')
    await fetch('/', {
        method: 'DELETE'
    })
    window.location.replace('/')
}


async function onUserDelete(user_id) {
    
    const response = await fetch(`/users/delete/${user_id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    if(result.error) {
        console.log(err)
    }else {
        const userDelEl = document.querySelector(`#user-${user_id}`)
        userDelEl.remove()
        const userDelSuccess = Toastify({
            text: 'User deleted successfully',
            duration: 1000
        })
        userDelSuccess.showToast()
        setTimeout(() => {
            window.location.replace('/users')
        }, 1000)
    }
}

async function onQuizDelete(quiz_id) {
    const response = await fetch(`/quizzes/delete/${quiz_id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    if(result.error) {
        console.log(err)
    }else {
        const quizDelEl = document.querySelector(`#quiz-${quiz_id}`)
        quizDelEl.remove()
        const quizDelSuccess = Toastify({
            text: 'Quiz deleted successfully',
            duration: 1000
        })
        quizDelSuccess.showToast()
        setTimeout(() => {
            window.location.replace('/quizzes')
        }, 1000)
    }
}

async function onCategoryDelete(cat_id) {
    const response = await fetch(`/categories/delete/${cat_id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    if(result.error) {
        console.log(err)
    }else {
        const catDelEl = document.querySelector(`#category-${cat_id}`)
        catDelEl.remove()
        const categoryDelSuccess = Toastify({
            text: 'Category deleted successfully',
            duration: 1000
        })
        categoryDelSuccess.showToast()
        setTimeout(() => {
            window.location.replace('/categories')
        }, 1000)
    }
}

