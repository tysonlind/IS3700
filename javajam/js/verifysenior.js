document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('verify')
  if (!target) return

  const input = prompt('How old are you?')
  const age = input ? parseInt(input, 10) : NaN

  if (age >= 65) {
    target.innerHTML = 'Free Friday Coffee Night for Seniors!'
    if (promo) promo.classList.add('highlight')
  } else {
    target.innerHTML = 'Enjoy Music and Make Memories!'
  }
})
