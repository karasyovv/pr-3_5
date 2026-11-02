import Pokemon from "./pokemon.js";
import random from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
});

console.log(player1);
console.log(player2);

function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById('btn-thunder-jolt');
const $btn2 = $getElById('btn-electro-ball');
const $logs = $getElById('logs');

const btnCountJolt = countBtn(6, $btn);
$btn.addEventListener('click', function () {
    btnCountJolt();
    player1.changeHP(random(60, 20), function (count) {
        console.log('Some change after change HP', count);
        const log = generateLog(player1, player2, count);
        console.log(log);
        addLog(log);
    });
    player2.changeHP(random(60, 20), function (count) {
        const log = generateLog(player2, player1, count);
        console.log(log);
        addLog(log);
    });
});

const btnElectroBall = countBtn(10, $btn2);
$btn2.addEventListener('click', function () {
    btnElectroBall();
    player1.changeHP(random(20), function (count) {
        const log = generateLog(player1, player2, count);
        console.log(log);
        addLog(log);
    });
    player2.changeHP(random(20), function (count) {
        const log = generateLog(player2, player1, count);
        console.log(log);
        addLog(log);
    });
});

function countBtn(count = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    };
}

function addLog(log) {
    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);
}

function generateLog(firstPerson, secondPerson, count) {
    const { name, hp: { current, total } } = firstPerson;
    const { name: playerName } = secondPerson;

    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${playerName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, и за это ${playerName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
        `${name} забылся, но в это время наглый ${playerName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${playerName} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, но в это время ${playerName} нехотя раздробил кулаком \\<вырезанно цензурой\\> противника. -${count}, [${current}/${total}]`,
        `${name} удивился, а ${playerName} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
        `${name} высморкался, но неожиданно ${playerName} провел дробящий удар. -${count}, [${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${playerName} беспричинно ударил в ногу противника. -${count}, [${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${playerName} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${playerName} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`
    ];

    return logs[random(logs.length) - 1];
}
