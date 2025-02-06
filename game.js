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
const exitChatBtn = document.getElementById('exitChatBtn');

const player = {
    name: 'Злодей',
    health: 100,
    inventory: [],
    location: 'крепость',
    visibleItems: [],
    quests: []
};

function startGame() {
    gameOutput.innerHTML = "Добро пожаловать в текстовую RPG!<br>";
    initializeLocationsSelect();
    showLocation();
    updateStats();
}

function initializeLocationsSelect() {
    for (const location in locations) {
        const option = document.createElement('option');
        option.value = location;
        option.text = location.charAt(0).toUpperCase() + location.slice(1);
        locationsSelect.appendChild(option);
    }
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
    updateItemsSelect();
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
    } else if (command === 'помощь') {
        showHelp();
    } else if (command === 'статус') {
        updateStats();
    } else {
        gameOutput.innerHTML += 'Неизвестная команда. Введите "помощь" для списка команд.<br>';
    }
    updateStats();
}

function attackEnemy() {
    const location = locations[player.location];
    if (location.enemy) {
        if (player.health <= 0) {
            gameOutput.innerHTML += 'Вы не можете атаковать, у вас нет здоровья.<br>';
            return;
        }
        const damage = Math.floor(Math.random() * 20) + 1;
        location.enemy.health -= damage;
        gameOutput.innerHTML += `Вы атаковали врага и нанесли ${damage} урона.<br>`;
        if (location.enemy.health <= 0) {
            gameOutput.innerHTML += 'Вы победили врага!<br>';
            location.enemy = null;
        } else {
            enemyAttack();
        }
    } else {
        gameOutput.innerHTML += 'Некого атаковать.<br>';
    }
}

function enemyAttack() {
    const location = locations[player.location];
    if (location.enemy) {
        const damage = Math.floor(Math.random() * 15) + 1;
        player.health -= damage;
        gameOutput.innerHTML += `Враг атаковал вас и нанес ${damage} урона.<br>`;
        if (player.health <= 0) {
            gameOutput.innerHTML += 'Вы проиграли. Игра окончена.<br>';
        }
    }
}

function showHelp() {
    gameOutput.innerHTML += 'Доступные команды: атака, помощь, исследовать, взять, использовать, перейти, говорить, статус<br>';
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
        gameOutput.innerHTML += `Вы переходите в ${location}.<br>`;
        if (locations[location].enemy || locations[location].residents) {
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

function scrollToChatBottom() {
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function startChat() {
    chat.style.display = 'flex';
    chatOutput.innerHTML = '';
    const location = locations[player.location];
    if (location.enemy) {
        chatOutput.innerHTML += `<strong>${location.enemy.name}:</strong> ${location.enemy.dialogues[0]}<br>`;
    } else {
        location.residents.forEach(resident => {
            chatOutput.innerHTML += `<strong>${resident.name}:</strong> Привет! Как я могу вам помочь?<br>`;
        });
    }
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

function exitChat() {
    chat.style.display = 'none';
    gameOutput.innerHTML += `Вы вышли из чата.<br>`;
    scrollToBottom();
}

function respondToMessage(message) {
    if (!message.trim()) return;

    const location = locations[player.location];
    let response = '';

    if (location.enemy) {
        if (message.toLowerCase().includes('сдаюсь')) {
            response = getRandomResponse('сдаться');
            location.enemy = null;
            gameOutput.innerHTML += 'Некого атаковать. Вы сдались, и враг вас отпустил. Вы сбежали.<br>';
        } else {
            response = getRandomResponse('default');
        }
    } else if (location.residents && location.residents.length > 0) {
        const resident = location.residents[0];
        if (message.toLowerCase().includes('привет')) {
            response = getRandomResponse('привет');
        } else if (message.toLowerCase().includes('квест')) {
            response = getRandomResponse('квест');
            const quest = resident.quests[0];
            if (quest && !quest.completed) {
                player.quests.push(quest);
            }
        } else if (message.toLowerCase().includes('спасибо')) {
            response = getRandomResponse('спасибо');
        } else {
            response = getRandomResponse('default');
        }
    } else {
        response = getRandomResponse('default');
    }

    chatOutput.innerHTML += `<strong>${location.enemy ? location.enemy.name : location.residents[0].name}:</strong> ${response}<br>`;
}

function getRandomResponse(category) {
    const categoryResponses = responses[category] || responses.default;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
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
exitChatBtn.addEventListener('click', exitChat);

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

startGame();