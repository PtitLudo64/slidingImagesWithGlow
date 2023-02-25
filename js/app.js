const track = document.querySelector('#image-track');

window.onmousedown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = (e) => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = (e) => {
    if (track.dataset.mouseDownAt === "0")
        return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageNature = parseFloat(track.dataset.prevPercentage) + percentage;

    const nextPercentage = Math.min(Math.max(nextPercentageNature, -100),0);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform : `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards"});


    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition : `${nextPercentage + 100}% 50%`
        }, { duration: 1200, fill: "forwards"});
    }
}

