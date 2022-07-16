let seeMore = document.querySelector('.see-more');
let seeMoreDiv = document.querySelector('.see-more-button');
let seeMoreButton = document.querySelector('#more');
let projects = document.querySelectorAll('.project');
let penultimateProject = projects[projects.length - 2];
let lastProject = projects[projects.length - 1];


let mediaQuery = window.matchMedia('(min-width:200px) and (max-width:845px)')

$('#more').click(function(displayMore) {
    displayMore.stopPropagation();
    $('.hidden-projects').animate({
        'height': penultimateProject.offsetHeight+lastProject.offsetHeight+50
    })
});

// $(document).click(function() {
//     $('.hidden-projects').animate({
//         // 'height': projectHeight*2
//         // 'height': '50px'
//     })
// })

function hideClass() {
    seeMore.style.background = "transparent"
    seeMore.style.marginTop = '-11px'
    seeMoreDiv.style.display = 'none'
    seeMoreButton.style.display = 'none'
}

if (mediaQuery.matches) {
    function hideClass() {
        seeMore.style.background = "transparent"
        seeMore.style.marginTop = '-32px'
        seeMoreDiv.style.display = 'none'
        seeMoreButton.style.display = 'none'
  }
}

seeMoreButton.addEventListener('click', hideClass);

// console.log(penultimateProject.offsetHeight+lastProject.offsetHeight)