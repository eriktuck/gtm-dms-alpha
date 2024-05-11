const faders = document.querySelectorAll('.fade-in');

console.log(faders);

const appearOptions = {
    // threshold: 1,
    rootMargin: "0px 0px -400px 0px"
};

const appearOnScroll = new IntersectionObserver
(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry=> {
        console.log("listening");
        if (!entry.isIntersecting) {
            entry.target.classList.remove('appear');
        } else {
            console.log("encountered");
            entry.target.classList.add('appear');
            // appearOnScroll.unobserve(entry.target);
        }
    });
},
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})
