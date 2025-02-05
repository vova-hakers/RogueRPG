const gameOutput = document.getElementById('gameOutput');
const attackBtn = document.getElementById('attackBtn');
const exploreBtn = document.getElementById('exploreBtn');
const takeBtn = document.getElementById('takeBtn');
const useBtn = document.getElementById('useBtn');
const moveBtn = document.getElementById('moveBtn');
const talkBtn = document.getElementById('talkBtn');
const itemsSelect = document.getElementById('itemsSelect');
const inventorySelect = document.getElementById('inventorySelect');
const locationsSelect = document.getElementById('locationsSelect');
const chat = document.getElementById('chat');
const chatOutput = document.getElementById('chatOutput');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const exitChatBtn = document.createElement('button'); // Create exit chat button

exitChatBtn.id = 'exitChatBtn';
exitChatBtn.innerText = 'Выйти из чата';
chat.appendChild(exitChatBtn); // Add exit chat button to chat container

const player = {
    name: 'Игрок',
    health: 100,
    inventory: [],
    location: 'лес',
    visibleItems: [],
    quests: []
};

const locations = {
    лес: {
        description: 'Вы находитесь в темном лесу. Перед вами враг.',
        detailedDescription: 'Темные ветви деревьев переплетаются над вами, создавая зловещие тени. Повсюду слышны звуки лесных существ, и настроение становится напряженным.',
        items: ['медицинская_аптечка'],
        enemy: {
            name: 'Враг',
            health: 50,
            attackDescription: 'Враг бросается на вас с диким криком, пытаясь нанести удар.'
        }
    },
    деревня: {
        description: 'Вы прибыли в тихую деревню. Здесь можно отдохнуть и пополнить запасы.',
        detailedDescription: 'Тихая деревня окружена зелеными полями и цветущими садами. Дома из камня и дерева придают этому месту уют и спокойствие.',
        items: ['яблоко'],
        enemy: null,
        residents: [
            { name: 'Житель1', quests: [{ description: 'Принесите мне яблоко из леса.', reward: 'зелье здоровья', completed: false }], 
              dialogues: [
                  { input: 'привет', response: 'Привет! Как я могу вам помочь?' },
                  { input: 'как дела', response: 'Все хорошо, спасибо. А у вас?' },
                  { input: 'что делаешь', response: 'Просто отдыхаю. Наслаждаюсь хорошей погодой.' },
                  { input: 'что нового', response: 'В деревне все спокойно. Ничего особенного не происходит.' },
                  { input: 'пока', response: 'До свидания! Будьте осторожны в своих приключениях.' },
                  { input: 'как тебя зовут', response: 'Меня зовут Житель1. А вас?' },
                  { input: 'расскажи о себе', response: 'Я живу в этой деревне всю свою жизнь. Здесь очень тихо и спокойно.' },
                  { input: 'есть ли у тебя семья', response: 'Да, у меня есть семья. Мы живем вместе в доме на окраине деревни.' },
                  { input: 'как погода', response: 'Сегодня отличная погода! Солнце светит и небо ясное.' },
                  { input: 'что ты думаешь о лесу', response: 'Лес может быть опасным местом, но там также можно найти много полезных вещей.' },
                  { input: 'что ты знаешь о врагах', response: 'Враги могут быть очень опасными. Будьте осторожны и всегда будьте наготове.' },
                  { input: 'почему ты здесь', response: 'Я живу здесь и помогаю поддерживать порядок в деревне.' },
                  { input: 'нравится ли тебе здесь', response: 'Да, мне здесь очень нравится. Это спокойное и красивое место.' },
                  { input: 'что ты думаешь обо мне', response: 'Вы кажетесь хорошим человеком. Надеюсь, у вас все получится.' },
                  { input: 'ты мне не нравишься', response: 'Извините, если я вас чем-то обидел. Я постараюсь быть лучше.' },
                  { input: 'ты дурак', response: 'Извините, если я вас чем-то огорчил. Пожалуйста, не обижайтесь.' },
                  { input: 'ты бесполезен', response: 'Извините, если я не смог вам помочь. Постараюсь исправиться.' },
                  { input: 'помоги мне', response: 'Конечно! Чем могу помочь?' },
                  { input: 'что ты можешь сделать', response: 'Я могу дать вам информацию о деревне и лесу, а также помочь с квестами.' },
                  { input: 'ты можешь мне доверять', response: 'Я всегда стараюсь быть честным и надежным.' },
                  { input: 'что ты знаешь о деревне', response: 'Деревня - это место, где можно отдохнуть и пополнить запасы. Здесь живут добрые люди.' },
                  // Добавьте больше диалогов по вашему усмотрению
              ] 
            },
            { name: 'Житель2', quests: [], 
              dialogues: [
                  { input: 'привет', response: 'Здравствуйте! Рад вас видеть.' },
                  { input: 'как дела', response: 'Неплохо, спасибо. Чем могу помочь?' },
                  { input: 'что делаешь', response: 'Работаю над своим садом. Хотите посмотреть?' },
                  { input: 'что нового', response: 'Слышал, что в лесу появились новые создания. Будьте осторожны.' },
                  { input: 'пока', response: 'До новых встреч! Удачи вам.' },
                  { input: 'как тебя зовут', response: 'Меня зовут Житель2. Приятно познакомиться!' },
                  { input: 'расскажи о себе', response: 'Я люблю заниматься садоводством и помогать соседям.' },
                  { input: 'есть ли у тебя семья', response: 'Да, у меня есть большая семья. Мы все живем в этой деревне.' },
                  { input: 'как погода', response: 'Сегодня прекрасный день для работы в саду.' },
                  { input: 'что ты думаешь о лесу', response: 'Лес полон тайн и опасностей, но там можно найти много интересного.' },
                  { input: 'что ты знаешь о врагах', response: 'Враги могут быть жестокими и опасными. Будьте начеку.' },
                  { input: 'почему ты здесь', response: 'Я живу здесь и люблю нашу деревню.' },
                  { input: 'нравится ли тебе здесь', response: 'Да, здесь очень уютно и спокойно.' },
                  { input: 'что ты думаешь обо мне', response: 'Вы кажетесь хорошим человеком. Надеюсь, у вас все получится.' },
                  { input: 'ты мне не нравишься', response: 'Извините, если я вас чем-то обидел. Пожалуйста, простите меня.' },
                  { input: 'ты дурак', response: 'Извините, если я вас чем-то огорчил. Я не хотел вас обидеть.' },
                  { input: 'ты бесполезен', response: 'Извините, если я не смог вам помочь. Постараюсь исправиться.' },
                  { input: 'помоги мне', response: 'Конечно! Чем могу помочь?' },
                  { input: 'что ты можешь сделать', response: 'Я могу рассказать вам о садоводстве и помочь с квестами.' },
                  { input: 'ты можешь мне доверять', response: 'Я всегда стараюсь быть честным и надежным.' },
                  { input: 'что ты знаешь о деревне', response: 'Деревня - это место, где можно отдохнуть и пополнить запасы. Здесь живут добрые люди.' },
                  // Добавьте больше диалогов по вашему усмотрению
              ] 
            }
        ]
    }
};

function startGame() {
    gameOutput.innerHTML = "Добро пожаловать в текстовую RPG!<br>";
    showLocation();
    updateStats();
}

function updateStats() {
    gameOutput.innerHTML += `<br><strong>${player.name}</strong><br>Здоровье: ${player.health}<br>Инвентарь: ${player.inventory.join(', ') || 'пусто'}<br>`;

    if (player.quests.length > 0) {
        gameOutput.innerHTML += `<br><strong>Квесты:</strong><br>`;
        player.quests.forEach(quest => {
            gameOutput.innerHTML += `${quest.description} - ${quest.completed ? 'Выполнен' : 'Не выполнен'}<br>`;
        });
    }

    const location = locations[player.location];
    if (location.enemy) {
        gameOutput.innerHTML += `<br><strong>${location.enemy.name}</strong><br>Здоровье: ${location.enemy.health}<br><br>`;
    }
    updateInventorySelect();
    scrollToBottom();
}

function processCommand(command) {
    if (command === 'атака') {
        attackEnemy();
    } else if (command === 'исследовать') {
        explore();
    } else if (command === 'взять') {
        takeItem(itemsSelect.value);
    } else if (command === 'использовать') {
        useItem(inventorySelect.value);
    } else if (command === 'перейти') {
        moveTo(locationsSelect.value);
    } else if (command === 'говорить') {
        startChat();
    } else {
        gameOutput.innerHTML += 'Неизвестная команда. Введите "помощь" для списка команд.<br>';
    }
    updateStats();
}

function attackEnemy() {
    const location = locations[player.location];
    if (location.enemy) {
        const damage = Math.floor(Math.random() * 20) + 1;
        location.enemy.health -= damage;
        gameOutput.innerHTML += `Вы атакуете врага. ${location.enemy.attackDescription} Вы наносите ${damage} урона.<br>`;
        if (location.enemy.health <= 0) {
            gameOutput.innerHTML += 'Вы победили врага! Враг падает на землю, и вы чувствуете прилив адреналина.<br>';
            location.enemy = null;
        } else {
            enemyAttack();
        }
    } else {
        gameOutput.innerHTML += 'Здесь нет врагов.<br>';
    }
}

function enemyAttack() {
    const location = locations[player.location];
    if (location.enemy) {
        const damage = Math.floor(Math.random() * 15) + 1;
        player.health -= damage;
        gameOutput.innerHTML += `Враг атакует вас и наносит ${damage} урона. ${location.enemy.attackDescription}<br>`;
        if (player.health <= 0) {
            gameOutput.innerHTML += 'Вы проиграли. Игра окончена. Вы падаете на землю, чувствуя, как жизнь покидает ваше тело.<br>';
        }
    }
}

function showHelp() {
    gameOutput.innerHTML += 'Доступные команды: атака, помощь, исследовать, взять, использовать, перейти, говорить<br>';
}

function explore() {
    const location = locations[player.location];
    player.visibleItems = location.items.slice();
    gameOutput.innerHTML += `Вы исследуете местность и находите: ${player.visibleItems.join(', ') || 'ничего'}<br>`;
    updateItemsSelect();
}

function takeItem(item) {
    if (item) {
        const location = locations[player.location];
        const itemIndex = player.visibleItems.indexOf(item);
        if (itemIndex !== -1) {
            player.inventory.push(player.visibleItems[itemIndex]);
            player.visibleItems.splice(itemIndex, 1);
            gameOutput.innerHTML += `Вы взяли ${item}.<br>`;
        } else {
            gameOutput.innerHTML += `Здесь нет ${item}.<br>`;
        }
        updateItemsSelect();
    } else {
        gameOutput.innerHTML += `Выберите предмет, который хотите взять.<br>`;
    }
    checkQuests();
}

function useItem(item) {
    if (item) {
        const itemIndex = player.inventory.indexOf(item);
        if (itemIndex !== -1) {
            if (item === 'медицинская_аптечка') {
                player.health += 20;
                gameOutput.innerHTML += `Вы использовали ${item} и восстановили 20 здоровья.<br>`;
                player.inventory.splice(itemIndex, 1);
            } else {
                gameOutput.innerHTML += `Этот предмет нельзя использовать сейчас.<br>`;
            }
        } else {
            gameOutput.innerHTML += `У вас нет ${item}.<br>`;
        }
    } else {
        gameOutput.innerHTML += `Выберите предмет, который хотите использовать.<br>`;
    }
}

function moveTo(location) {
    if (locations[location]) {
        player.location = location;
        player.visibleItems = [];
        gameOutput.innerHTML += `Вы переходите в ${location}.<br>${locations[location].detailedDescription}<br>`;
        if (location === 'деревня') {
            talkBtn.style.display = 'inline';
        } else {
            talkBtn.style.display = 'none';
        }
        showLocation();
    } else {
        gameOutput.innerHTML += `Локация ${location} не существует.<br>`;
    }
}

function showLocation() {
    const location = locations[player.location];
    gameOutput.innerHTML += `${location.description}<br>`;
    scrollToBottom();
}

function updateItemsSelect() {
    itemsSelect.innerHTML = '';
    itemsSelect.style.display = player.visibleItems.length > 0 ? 'inline' : 'none';
    player.visibleItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        itemsSelect.appendChild(option);
    });
}

function updateInventorySelect() {
    inventorySelect.innerHTML = '';
    player.inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        inventorySelect.appendChild(option);
    });
}

function scrollToBottom() {
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

function startChat() {
    chat.style.display = 'flex';
    chatOutput.innerHTML = '';
    locations[player.location].residents.forEach(resident => {
        chatOutput.innerHTML += `<strong>${resident.name}:</strong> Привет, как дела?<br>`;
    });
    scrollToChatBottom();
}

function sendMessage() {
    const message = chatInput.value;
    if (message) {
        chatOutput.innerHTML += `<strong>${player.name}:</strong> ${message}<br>`;
        chatInput.value = '';
        respondToMessage(message);
        scrollToChatBottom();
    }
}

function respondToMessage(message) {
    const resident = locations[player.location].residents[0]; // Выбираем первого жителя для простоты
    let response = '';

    const dialogue = resident.dialogues.find(d => message.toLowerCase().includes(d.input));
    if (dialogue) {
        response = dialogue.response;
    } else {
        response = 'Извините, я не понимаю вас.';
    }

    chatOutput.innerHTML += `<strong>${resident.name}:</strong> ${response}<br>`;
}

function checkQuests() {
    player.quests.forEach(quest => {
        if (!quest.completed && player.inventory.includes('яблоко')) {
            quest.completed = true;
            player.inventory.push(quest.reward);
            gameOutput.innerHTML += `Вы завершили квест: ${quest.description} и получили награду: ${quest.reward}.<br>`;
        }
    });
}

function exitChat() {
    chat.style.display = 'none';
    gameOutput.innerHTML += `Вы вышли из чата.<br>`;
}

attackBtn.addEventListener('click', () => {
    processCommand('атака');
});

exploreBtn.addEventListener('click', () => {
    processCommand('исследовать');
});

takeBtn.addEventListener('click', () => {
    processCommand('взять');
});

useBtn.addEventListener('click', () => {
    processCommand('использовать');
});

moveBtn.addEventListener('click', () => {
    processCommand('перейти');
});

talkBtn.addEventListener('click', () => {
    processCommand('говорить');
});

sendChatBtn.addEventListener('click', sendMessage);

exitChatBtn.addEventListener('click', exitChat); // Add event listener for exit chat button

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

startGame();