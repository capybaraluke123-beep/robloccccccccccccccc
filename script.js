const form = document.getElementById('signupForm');
const message = document.getElementById('formMessage');
const teamSize = document.getElementById('teamSize');
const memberFields = document.getElementById('memberFields');
const slideTrack = document.getElementById('slideTrack');
const slideCount = document.getElementById('slideCount');
let currentSlide = 0;

function renderMemberFields() {
  const count = Number(teamSize.value);
  memberFields.innerHTML = Array.from({ length: count }, (_, index) => `
    <div class="member-card">
      <strong>BUILDER ${index + 1}</strong>
      <div class="member-inputs">
        <input name="member${index + 1}Name" aria-label="Builder ${index + 1} name" placeholder="Full name" required />
        <input name="member${index + 1}Email" type="email" aria-label="Builder ${index + 1} email" placeholder="Email" required />
        <input name="member${index + 1}Phone" type="tel" aria-label="Builder ${index + 1} phone" placeholder="Phone number" required />
      </div>
    </div>`).join('');
}

function showSlide(index) {
  const total = slideTrack.children.length;
  currentSlide = (index + total) % total;
  slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  slideCount.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

teamSize.addEventListener('change', renderMemberFields);
document.getElementById('slidePrev').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('slideNext').addEventListener('click', () => showSlide(currentSlide + 1));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = 'You’re on the list! Keep that idea safe. ✦';
  message.style.color = '#10121f';
  form.reset();
  renderMemberFields();
});

renderMemberFields();

const revealItems = document.querySelectorAll('.step, .idea-strip, .signup-card, .slides');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(18px)';
  item.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(item);
});
