let dob = document.getElementById('date1')
let current = document.getElementById('date2')
let age = document.getElementById('age')
let cal = document.getElementById('calculate')

cal.addEventListener('click',()=>{

    if (dob.value === "" || current.value === "") {
        age.classList.add("show");
        age.innerText = "Please select both dates.";
        return;
    }

    let birthDate = new Date(dob.value);
    let currentDate = new Date(current.value);

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();

    let m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
        ageYears--;
    }

    age.classList.add('show');
    age.innerText = `Your age is ${ageYears} years.`;
})

let blocks = document.querySelectorAll('.some');

blocks.forEach(block => {
    block.addEventListener('click', () => {

        let answer = block.nextElementSibling;

        if (dob.value === "") {
            answer.classList.add('show');
            answer.innerText = "Please select your date of birth first.";
            return;
        }

        let birthDate = new Date(dob.value);
        let today = current.value ? new Date(current.value) : new Date();

        answer.classList.toggle('show');

        if (block.classList.contains('info1')) {
            let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
            if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

            let days = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
            answer.innerText = `${days} days remaining until your birthday.`;
        }

        else if (block.classList.contains('info2')) {
            let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            answer.innerText = `You were born on ${days[birthDate.getDay()]}.`;
        }

        else if (block.classList.contains('info3')) {
            let ageYears = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ageYears--;

            answer.innerText = `You are ${ageYears} years old today.`;
        }

        else if (block.classList.contains('info4')) {
            let nextBirthday = new Date(
                today.getFullYear(),
                birthDate.getMonth(),
                birthDate.getDate()
            );

            if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }

            let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let dayName = days[nextBirthday.getDay()];

            answer.innerText = `Your next birthday will fall on ${dayName}.`;
        }

        else if (block.classList.contains('info5')) {
            let livedDays = (today - birthDate) / (1000 * 60 * 60 * 24);
            let percent = ((livedDays / (75 * 365)) * 100).toFixed(2);

            answer.innerText = `You have completed approximately ${percent}% of life.`;
        }

        else if (block.classList.contains('info6')) {

            if (!dob.value || !current.value) {
                answer.innerText = "Please select both dates first.";
                return;
            }

            let birthDate = new Date(dob.value);
            let baseDate = new Date(current.value);

            let baseSeconds = Math.floor((baseDate - birthDate) / 1000);

            if (window.secondsTimer) {
                clearInterval(window.secondsTimer);
            }

            let counter = 0;

            function updateSeconds() {
                let totalSeconds = baseSeconds + counter;
                answer.innerText =
                    `You have lived about ${totalSeconds.toLocaleString()} seconds.`;
                counter++;
            }

            updateSeconds();
            window.secondsTimer = setInterval(updateSeconds, 1000);
        }

        else if (block.classList.contains('info7')) {

            let start = new Date(today.getFullYear(), 0, 0);
            let diff = today - start;
            let oneDay = 1000 * 60 * 60 * 24;
            let dayOfYear = Math.floor(diff / oneDay);

            let base = 385000;
            let variation = (dayOfYear % 20) * 1200;

            let estimate = base + variation;

            answer.innerText =
                `Approximately ${estimate.toLocaleString()} people were born on your birth date worldwide (estimated).`;
        }

        else if (block.classList.contains('info8')) {

            let futureInput = document.getElementById('futureDate');
            let futureBtn = document.getElementById('futureCalc');
            let futureResult = document.getElementById('futureResult');

            futureBtn.onclick = () => {

                if (futureInput.value === "") {
                    futureResult.innerText = "Please select a future date.";
                    return;
                }

                let futureDate = new Date(futureInput.value);

                let futureAge = futureDate.getFullYear() - birthDate.getFullYear();
                let m = futureDate.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && futureDate.getDate() < birthDate.getDate())) {
                    futureAge--;
                }

                futureResult.innerText = `Your age on selected date will be ${futureAge} years.`;
            };
        }

    });
});